import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
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

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stratacoms.pt'),
  title: {
    template: '%s | stratacoms',
    default: 'stratacoms | Agência de Comunicação e Redes Sociais',
  },
  description: 'A stratacoms é uma agência de comunicação portuguesa especializada em gestão de redes sociais, criação de conteúdo, community management e estratégia de marca.',
  keywords: ['stratacoms', 'Agência de Comunicação', 'Gestão de Redes Sociais', 'Criação de Conteúdo', 'Community Management', 'Estratégia e Branding', 'Social Media', 'Portugal'],
  authors: [{ name: 'stratacoms' }],
  creator: 'stratacoms',
  publisher: 'stratacoms',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'stratacoms | Agência de Comunicação e Redes Sociais',
    description: 'A stratacoms é uma agência de comunicação portuguesa especializada em gestão de redes sociais, criação de conteúdo, community management e estratégia de marca.',
    url: 'https://stratacoms.pt',
    siteName: 'stratacoms',
    images: [
      {
        url: '/images/feature_preview.png', // Replace with your actual hero OG image
        width: 1200,
        height: 630,
        alt: 'stratacoms Hero Image',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'stratacoms | Agência de Comunicação e Redes Sociais',
    description: 'A stratacoms é uma agência de comunicação portuguesa especializada em gestão de redes sociais, criação de conteúdo, community management e estratégia de marca.',
    images: ['/images/feature_preview.png'],
    creator: '@stratacoms',
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
      className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} h-full antialiased`}
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
