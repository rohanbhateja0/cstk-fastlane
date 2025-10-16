import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from "@/components/footer";
import "./globals.css"; // Importing global CSS styles
// import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

const zodiak = localFont({
  src: [
    {
      path: '../fonts/Zodiak-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Zodiak-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Zodiak-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-zodiak',
  display: 'swap',
});


const inter = Inter({ subsets: ["latin"] });




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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        
        
      </head>
      <body className={`${satoshi.variable} ${zodiak.variable}`}>
        <div className="fastlanewebsite">
          <Header />
          <main>
            <>
              {children}
            </>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
