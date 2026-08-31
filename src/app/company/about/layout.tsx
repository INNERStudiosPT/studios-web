import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre nós',
  description: 'Conheça a stratacoms. Ajudamos marcas a comunicar melhor com gestão de redes sociais, criação de conteúdo, community management e estratégia.',
  alternates: {
    canonical: '/company/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
