import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Inner Studios services, pricing, digital production process, and partnerships.',
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
