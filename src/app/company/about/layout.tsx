import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Inner Studios. We engineer robust digital solutions, immersive games, and premium web platforms for modern businesses.',
  alternates: {
    canonical: '/company/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
