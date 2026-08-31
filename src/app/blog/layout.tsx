import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Recursos',
  description: 'Ideias, guias e novidades da equipa stratacoms sobre redes sociais, criação de conteúdo, community management e estratégia de comunicação.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
