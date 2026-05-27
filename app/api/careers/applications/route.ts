import {
  CAREERS_API_BASE,
  CareerApplicationPayload,
  fetchCareerJobs,
  findJobBySlug,
} from "@/lib/careers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function assertString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }

  return value.trim();
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CareerApplicationPayload;

    const name = assertString(payload.name, "name");
    const email = assertString(payload.email, "email");
    const phone = assertString(payload.phone, "phone");
    const portfolio = assertString(payload.portfolio, "portfolio");
    const message = assertString(payload.message, "message");
    const discoverySource = assertString(payload.discoverySource, "discoverySource");
    const roleSlug = assertString(payload.roleSlug, "roleSlug");

    const jobs = await fetchCareerJobs();
    const job = payload.jobId
      ? jobs.find((item) => item.id === payload.jobId) ?? findJobBySlug(jobs, roleSlug)
      : findJobBySlug(jobs, roleSlug);

    if (!job) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    const submissionBody = {
      form_id: job.form_id || null,
      user_id: null,
      status: "pending",
      candidate_message: message,
      referral_input: payload.referralEmail?.trim() || null,
      screening_answers: {
        source: "studios-web-careers",
        job_id: job.id,
        job_title: job.title,
        applicant: {
          name,
          email,
          phone,
          portfolio,
        },
        discovery: {
          source: discoverySource,
          referral_email: payload.referralEmail?.trim() || null,
          other: payload.discoveryOther?.trim() || null,
        },
      },
      extra_attachments: {
        resume_file_name: payload.resumeFileName || null,
      },
    };

    const response = await fetch(`${CAREERS_API_BASE}/v1/content/careers/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionBody),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = data?.detail || data?.error || data?.message || "Failed to submit application";
      return NextResponse.json({ success: false, error }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit application";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
