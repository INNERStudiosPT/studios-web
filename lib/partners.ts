const API_BASE = "https://api.innerstudios.pt";

export type Partner = {
  id: string;
  name: string;
  logo: string;
  type: "partner" | "sponsor" | string;
  description: string | null;
  website: string | null;
  invert: boolean;
  sort_order: number | null;
  is_active: boolean;
};

export async function fetchPartners(): Promise<Partner[]> {
  const response = await fetch(`${API_BASE}/api/v1/sponsors`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch partners: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data.filter((partner) => partner.is_active !== false) : [];
}
