import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacte-nos',
  description: 'Fale com a stratacoms. Ajudamos a sua marca a comunicar melhor com gestão de redes sociais, criação de conteúdo, community management e estratégia.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
