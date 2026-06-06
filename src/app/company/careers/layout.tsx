import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Inner Studios team. We are hiring engineers, designers, and strategists to build the new standard of digital craft.',
  alternates: {
    canonical: '/company/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
