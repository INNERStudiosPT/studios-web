import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carreiras',
  description: 'Junte-se à equipa stratacoms. Recrutamos talento em criação de conteúdo, gestão de redes sociais, community management e estratégia de comunicação.',
  alternates: {
    canonical: '/company/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
