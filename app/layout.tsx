import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "INNER Studios",
  description: "A videogame programming studio landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={robotoMono.variable} suppressHydrationWarning>
        {children}
        <a 
          href="https://circle.innerstudios.pt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="innercircle-banner"
          aria-label="Looking for Innercircle?"
        >
          LOOKING FOR INNERCIRCLE?
        </a>
      </body>
    </html>
  );
}
