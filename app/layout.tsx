import { PersonalizeProvider } from "@/components/context/PersonalizeContext";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Contentstack-Nextjs-Starter-App",
  applicationName: "Contentstack-Nextjs-Starter-App",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'X-DNS-Prefetch-Control': 'on',
  },
};

export const viewport: Viewport = {
  themeColor: '#317EFB',
  initialScale: 1,
  minimumScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout should never be reached due to middleware redirects
  // suppressHydrationWarning is needed because nested [lang]/layout.tsx sets lang/dir attributes
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
      <PersonalizeProvider>
        {children}
        </PersonalizeProvider>
      </body>
    </html>
  );
}