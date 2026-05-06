const API_BASE = "https://api.innerstudios.pt";

export type GalleryImage = {
  id: string;
  title: string;
  photo_url: string;
  description: string | null;
  created_at: string;
};

export const DEFAULT_GALLERY_IMAGES = [
  "https://d190l94l27qeq7.cloudfront.net/gallery-photos/be6f26d7-4f86-4557-89dd-7bd53065e6b2/1777909324389-acffd3c42bd9f.jpg",
  "https://d190l94l27qeq7.cloudfront.net/gallery-photos/be6f26d7-4f86-4557-89dd-7bd53065e6b2/1777909283279-4b739d281708c8.jpg",
  "https://d190l94l27qeq7.cloudfront.net/gallery-photos/be6f26d7-4f86-4557-89dd-7bd53065e6b2/1777909181719-5f65ed5f18f52.jpg",
  "https://d190l94l27qeq7.cloudfront.net/gallery-photos/341fc70b-e9e7-4672-b7cc-c9203f171482/1777831649240-f9b41fedfe00a.jpg",
  "https://setcqfbeelfkovrbnkrz.supabase.co/storage/v1/object/public/gallery-photos/707d47d3-faa1-4cfc-b4da-612996ee5141/1771701684692-13d273aed07c8.jpg",
  "https://setcqfbeelfkovrbnkrz.supabase.co/storage/v1/object/public/gallery-photos/cef35b81-3b9b-4fc0-9f02-d206d74c9526/1771792528764-a68d071087ec.jpg",
  "https://setcqfbeelfkovrbnkrz.supabase.co/storage/v1/object/public/gallery-photos/341fc70b-e9e7-4672-b7cc-c9203f171482/1771762312570-1460c56c382708.jpg",
  "https://setcqfbeelfkovrbnkrz.supabase.co/storage/v1/object/public/gallery-photos/599d733f-5847-4d18-9b63-8aea0b3ef9be/1771761844289-e4758cd14cd468.jpg",
  "https://setcqfbeelfkovrbnkrz.supabase.co/storage/v1/object/public/gallery-photos/cef35b81-3b9b-4fc0-9f02-d206d74c9526/1771728225740-5f2ef0914e2a4.jpg",
  "https://setcqfbeelfkovrbnkrz.supabase.co/storage/v1/object/public/gallery-photos/cef35b81-3b9b-4fc0-9f02-d206d74c9526/1771727414767-39a70427bc2fb8.jpg",
];

export async function fetchGalleryImages(limit = 18): Promise<GalleryImage[]> {
  const url = new URL("/api/supabase/rest/v1/gallery_photos", API_BASE);
  url.searchParams.set("select", "id,title,photo_url,description,created_at,is_public,is_draft,is_archived,page_post_status");
  url.searchParams.set("is_public", "eq.true");
  url.searchParams.set("is_draft", "eq.false");
  url.searchParams.set("is_archived", "eq.false");
  url.searchParams.set("page_post_status", "eq.published");
  url.searchParams.set("order", "created_at.desc");
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch gallery images: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function toGalleryUrls(images: GalleryImage[]) {
  const urls = images.map((image) => image.photo_url).filter(Boolean);
  return urls.length > 0 ? urls : DEFAULT_GALLERY_IMAGES;
}

export function galleryImageAt(urls: string[], index: number) {
  const source = urls.length > 0 ? urls : DEFAULT_GALLERY_IMAGES;
  return source[index % source.length];
}
