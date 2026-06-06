import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Insights, tutorials, and latest news from the Inner Studios team on web engineering, game development, and digital marketing.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
