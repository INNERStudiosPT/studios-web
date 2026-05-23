const API_BASE = "https://api.innerstudios.pt";

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string | null;
  is_published: boolean;
};

export async function fetchLatestNews(limit = 6): Promise<NewsItem[]> {
  const url = new URL("/api/v1/content/news", API_BASE);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
