/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: { // available at build time
        CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY ,
        CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
        CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH ? process.env.CONTENTSTACK_BRANCH : 'main',
        CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
        CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST, //app host
        CONTENTSTACK_PREVIEW_HOST: process.env.CONTENTSTACK_PREVIEW_HOST, // live-preview host
        CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN, // live-preview token
        CONTENTSTACK_LIVE_EDIT_TAGS: process.env.CONTENTSTACK_LIVE_EDIT_TAGS,
        CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST,
        // Personalize Configuration
        CONTENTSTACK_PERSONALIZE_EDGE_API_URL: process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL,
        CONTENTSTACK_PERSONALIZE_PROJECT_UID: process.env.CONTENTSTACK_PERSONALIZE_PROJECT_UID,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.contentstack.io',
            port: '',
            pathname: '/**',
          },
        ],
    },
    async headers() {
        const headers = [
            {
                key: 'X-DNS-Prefetch-Control',
                value: 'on'
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
            },
            {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin'
            },
            {
                key: 'Permissions-Policy',
                value: 'camera=(), microphone=(), geolocation=()'
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block'
            }
        ];

        // Only add X-Frame-Options in production to allow iframe embedding in development/preview
        // This is needed for Contentstack live preview and other iframe scenarios
        if (process.env.NODE_ENV === 'production') {
            headers.push({
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN'
            });
        }

        // Only add HSTS in production (HTTPS required)
        if (process.env.NODE_ENV === 'production') {
            headers.push({
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload'
            });
        }

        return [
            {
                // Apply to all routes
                source: '/:path*',
                headers: headers
            },
        ];
    }
};

export default nextConfig;
