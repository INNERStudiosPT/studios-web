import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import MicrosoftClarity from "../components/MicrosoftClarity";
import { PostHogProvider } from "../components/PostHogProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://innerstudios.pt'),
  title: {
    template: '%s | Inner Studios',
    default: 'Inner Studios | The New Standard of Digital Craft',
  },
  description: 'Inner Studios is a leading creative production house designing and engineering modern web solutions for ambitious brands worldwide.',
  keywords: ['Inner Studios', 'Creative Production', 'Web Engineering', 'Game Development', 'Digital Assets', 'SaaS', 'Portugal'],
  authors: [{ name: 'Inner Studios' }],
  creator: 'Inner Studios',
  publisher: 'Inner Studios',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Inner Studios | The New Standard of Digital Craft',
    description: 'Inner Studios is a leading creative production house designing and engineering modern web solutions for ambitious brands worldwide.',
    url: 'https://innerstudios.pt',
    siteName: 'Inner Studios',
    images: [
      {
        url: '/images/feature_preview.png', // Replace with your actual hero OG image
        width: 1200,
        height: 630,
        alt: 'Inner Studios Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inner Studios | The New Standard of Digital Craft',
    description: 'Inner Studios is a leading creative production house designing and engineering modern web solutions for ambitious brands worldwide.',
    images: ['/images/feature_preview.png'],
    creator: '@innerstudios',
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PostHogProvider>
          {children}
          <CookieBanner />
          <MicrosoftClarity />
        </PostHogProvider>
        <Script 
          src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
