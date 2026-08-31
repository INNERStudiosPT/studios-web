// Configuração do backend de conteúdos (vagas, candidaturas, contacto).
//
// Estes endpoints pertenciam à antiga infraestrutura (api.innerstudios.pt) e
// estão TEMPORARIAMENTE DESATIVADOS até o novo backend da stratacoms estar
// disponível. Enquanto `CONTENT_API_ENABLED` for `false`:
//   - os pedidos GET (vagas) usam os dados estáticos de fallback;
//   - os pedidos POST (candidaturas, contacto) não são enviados para o exterior,
//     seguindo o fluxo de sucesso localmente.
//
// Para reativar: mudar `CONTENT_API_ENABLED` para `true` e atualizar
// `CONTENT_API_BASE` para o domínio do novo backend.
export const CONTENT_API_ENABLED = false;
export const CONTENT_API_BASE = "https://api.innerstudios.pt/v1/content";
