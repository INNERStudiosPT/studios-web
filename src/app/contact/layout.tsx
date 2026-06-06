import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Inner Studios. We are always looking for new partnerships, projects, and top-tier talent to join our ecosystem.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
