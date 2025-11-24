import { NextRequest, NextResponse } from 'next/server';
import * as contentstack from '@contentstack/management';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Initialize Contentstack Management SDK
    const client = contentstack.client({
      host: process.env.CONTENTSTACK_REGION === 'EU' ? 'eu-api.contentstack.com' : 'api.contentstack.com',
    });

    const stack = client.stack({
      api_key: process.env.CONTENTSTACK_API_KEY as string,
      management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN as string,
    });

    // Create entry in Contentstack
    const entryData = {
      title: `${firstName} ${lastName} - ${email}`,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber || '',
      subscription_status: 'active',
      subscribed_at: new Date().toISOString(),
    };

    const entry = await stack
      .contentType('newsletter_subscription')
      .entry()
      .create({ entry: entryData });

    console.log('Newsletter subscription created:', entry.uid);

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      entry_uid: entry.uid,
    });
  } catch (error: any) {
    console.error('Error creating newsletter subscription:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

