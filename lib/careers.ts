export const CAREERS_API_BASE = "https://api.innerstudios.pt";

export type CareerJob = {
  id: string;
  title: string;
  description: string | null;
  requirements: string[] | string | null;
  location: string | null;
  type: string | null;
  salary_range: string | null;
  is_active: boolean;
  form_id: string | null;
  created_at: string;
};

export type CareerApplicationPayload = {
  jobId: string | null;
  roleSlug: string;
  name: string;
  email: string;
  phone: string;
  portfolio: string;
  discoverySource: string;
  referralEmail?: string;
  discoveryOther?: string;
  message: string;
  resumeFileName?: string;
};

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatRoleSlug(slug: string | string[] | undefined) {
  const value = Array.isArray(slug) ? slug[0] : slug;

  return value
    ? value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "General Application";
}

export async function fetchCareerJobs(): Promise<CareerJob[]> {
  const url = new URL("/api/supabase/rest/v1/jobs", CAREERS_API_BASE);
  url.searchParams.set("select", "id,title,description,requirements,location,type,salary_range,is_active,form_id,created_at");
  url.searchParams.set("is_active", "eq.true");
  url.searchParams.set("order", "created_at.desc");

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch career jobs: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function findJobBySlug(jobs: CareerJob[], slug: string | string[] | undefined) {
  const value = Array.isArray(slug) ? slug[0] : slug;
  if (!value) return null;

  return jobs.find((job) => slugify(job.title) === value || job.id === value) ?? null;
}

export function splitRequirements(requirements: CareerJob["requirements"]) {
  if (!requirements) return [];
  if (Array.isArray(requirements)) return requirements.filter(Boolean);

  return requirements
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
