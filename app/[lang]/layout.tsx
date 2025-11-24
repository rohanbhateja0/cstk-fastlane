import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from "@/components/footer";
import "../globals.css";
import localFont from 'next/font/local';
import { Locale, isValidLocale, defaultLocale, isRTL, getTextDirection } from '@/lib/i18n';
import RTLProvider from '@/components/RTLProvider';
import { PersonalizeProvider } from '@/components/context/PersonalizeContext';
import { LyticsProvider } from '@/components/context/LyticsContext';
import LyticsScript from '@/components/LyticsScript';

const satoshi = localFont({
  src: [
    {
      path: '../../fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Satoshi-Italic.woff2',
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
      path: '../../fonts/Zodiak-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Zodiak-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Zodiak-Italic.woff2',
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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Await params before accessing properties
  const { lang } = await params;
  
  // Validate and get locale
  const locale: Locale = isValidLocale(lang) ? lang as Locale : defaultLocale;
  const direction = getTextDirection(locale);

  return (
    <html lang={locale} dir={direction} className={isRTL(locale) ? 'rtl' : 'ltr'}>
      <head>
        
      </head>
      <body className={`${satoshi.variable} ${zodiak.variable} ${isRTL(locale) ? 'rtl' : 'ltr'}`}>
        <LyticsScript />
        <PersonalizeProvider>
          <LyticsProvider>
            <RTLProvider locale={locale}>
              <div className="fastlanewebsite">
                <Header locale={locale} />
                <main>
                  <>
                    {children}
                  </>
                </main>
              </div>
              <Footer locale={locale} />
            </RTLProvider>
          </LyticsProvider>
        </PersonalizeProvider>
      </body>
    </html>
  );
}
