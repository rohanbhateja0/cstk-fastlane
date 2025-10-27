import { NextResponse, NextRequest } from 'next/server';
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID;
  if (!projectUid) {
    console.warn('⚠️ PERSONALIZE: Project UID not configured');
    return NextResponse.next();
  }

  try {
    // Set custom Edge API URL if provided
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
      Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
    }

    // Get test attributes from cookies (set via test page)
    const testCountry = request.cookies.get('test_country')?.value;
    const testDeviceType = request.cookies.get('test_device_type')?.value;
    const testEnrolledUser = request.cookies.get('test_enrolled_user')?.value;

    // Build custom attributes
    const customAttributes: Record<string, any> = {};
    
    if (testCountry) {
      customAttributes.COUNTRY = testCountry; // Use COUNTRY (uppercase) to match Personalize attribute
      console.log('🧪 TEST MODE - COUNTRY:', testCountry);
    }
    
    if (testDeviceType) {
      customAttributes.deviceType = testDeviceType;
      console.log('🧪 TEST MODE - Device Type:', testDeviceType);
    }

    if (testEnrolledUser !== undefined) {
      customAttributes['Enrolled User'] = testEnrolledUser === 'true';
      console.log('🧪 TEST MODE - Enrolled User:', testEnrolledUser === 'true');
    }

    // Initialize the Personalize SDK
    const personalizeSdk = await Personalize.init(projectUid, {
      request,
    } as any);

    // Get user ID for debugging
    const userId = (personalizeSdk as any)._userId;
    console.log('👤 USER ID:', userId);

    // Set custom attributes if any
    if (Object.keys(customAttributes).length > 0) {
      Personalize.set(customAttributes);
      personalizeSdk.set(customAttributes);
      console.log('✅ PERSONALIZE - Attributes set:', customAttributes);
      
      // IMPORTANT: Fetch project manifest AND user manifest, then merge
      // The SDK's set() method doesn't automatically refetch with attributes
      console.log('🔄 Fetching manifests...');
      
      try {
        const edgeApiUrl = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL || 'https://personalize-edge.contentstack.com';
        
        // 1. Fetch PROJECT manifest (full details about experiences and variants)
        console.log('📡 Step 1: Fetching project manifest...');
        const projectManifestResponse = await fetch(`${edgeApiUrl}/manifest`, {
          method: 'GET',
          headers: {
            'x-project-uid': projectUid,
          },
        });

        let projectManifest: any = {};
        if (projectManifestResponse.ok) {
          projectManifest = await projectManifestResponse.json();
          console.log('✅ Project manifest fetched');
          console.log('📊 Project Experiences:', projectManifest.experiences?.length || 0);
          console.log('🔍 DEBUG - Full project manifest:', JSON.stringify(projectManifest, null, 2));
        } else {
          console.log('❌ Project manifest fetch failed:', projectManifestResponse.status);
        }

        // 2. Fetch USER manifest (which variants are selected for this user)
        console.log('📡 Step 2: Fetching user manifest with attributes...');
        const queryParams = new URLSearchParams({
          user_id: userId,
          ...customAttributes,
        });
        const userManifestUrl = `${edgeApiUrl}/manifest?${queryParams.toString()}`;
        
        const userManifestResponse = await fetch(userManifestUrl, {
          method: 'GET',
          headers: {
            'x-project-uid': projectUid,
          },
        });

        if (userManifestResponse.ok) {
          const userManifest = await userManifestResponse.json();
          console.log('✅ User manifest fetched');
          console.log('📊 Active Variants:', userManifest.activeVariants);
          console.log('🔍 DEBUG - Full user manifest:', JSON.stringify(userManifest, null, 2));
          
          // 3. Merge: Take project manifest structure and add user's selected variants
          const mergedManifest = {
            ...projectManifest,
            ...userManifest, // This adds activeVariants and selected experiences
          };
          
          if (projectManifest.experiences) {
            console.log('📊 Full Experience Details:');
            projectManifest.experiences.forEach((exp: any, i: number) => {
              const activeVariantShortUid = userManifest.activeVariants?.[exp.short_uid];
              console.log(`   ${i}. ${exp.name || 'Unnamed'} (short: ${exp.short_uid})`);
              console.log(`      Selected variant: ${activeVariantShortUid || 'null'}`);
              if (exp.variants) {
                exp.variants.forEach((v: any) => {
                  const isActive = v.short_uid === activeVariantShortUid;
                  console.log(`      ${isActive ? '✅' : '  '} ${v.name} (${v.uid}, short: ${v.short_uid})`);
                });
              }
            });
          }
          
          // Update SDK's internal manifest with merged data
          (personalizeSdk as any)._manifestData = mergedManifest;
          console.log('✅ SDK manifest updated with merged data');
        } else {
          console.log('❌ User manifest fetch failed:', userManifestResponse.status);
        }
      } catch (err) {
        console.log('❌ Manifest fetch error:', err);
      }
    }

    // DEBUG: Check manifest data
    const manifest = (personalizeSdk as any)._manifestData || (personalizeSdk as any).manifest;
    console.log('📊 MANIFEST - Experiences:', manifest?.experiences?.length || 0);
    
    if (manifest?.experiences) {
      manifest.experiences.forEach((exp: any, i: number) => {
        console.log(`📊 Experience ${i} (${exp.short_uid}):`, {
          name: exp.name,
          type: exp.type,
          status: exp.status,
          variants: exp.variants?.length || 0
        });
        
        // Log variant details
        if (exp.variants) {
          exp.variants.forEach((variant: any) => {
            console.log(`   └ Variant ${variant.short_uid}:`, variant.name, 
              variant.audience ? `(Audience: ${variant.audience.name})` : '(No audience)');
          });
        }
      });
    }

    // Get the variant parameter
    const variantParam = personalizeSdk.getVariantParam();
    console.log('🎯 PERSONALIZE - Variant Parameter:', variantParam || 'NONE');
    
    // DEBUG: Check what variants are selected
    const variants = personalizeSdk.getVariants();
    console.log('🎯 SELECTED VARIANTS:', variants);

    // Add variant parameter to URL
    const parsedUrl = new URL(request.url);
    parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, 'variantParam');

    // Rewrite the request
    const response = NextResponse.rewrite(parsedUrl);

    // Add state to response (cookies for user identification)
    personalizeSdk.addStateToResponse(response);

    // CRITICAL: Also set variant param in a cookie for client-side access
    response.cookies.set('personalize_variants', variantParam, {
      httpOnly: false, // Must be readable by client JavaScript
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    console.log('✅ MIDDLEWARE - Set variant cookie:', variantParam);

    response.headers.set('cache-control', 'no-store');

    return response;
  } catch (error) {
    console.error('❌ PERSONALIZE middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

