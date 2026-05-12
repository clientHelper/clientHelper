export const runtime = "nodejs";

import { Resend } from "resend";
import { z } from "zod";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 d"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  brand_name: z.string().min(1).max(120),
  contact_name: z.string().min(1).max(120),
  contact_email: z.email().max(200),
  brand_link: z.string().max(300).optional(),
  extra_notes: z.string().max(5000).optional(),
  summary: z.string().max(10000),
  locale: z.enum(["en", "bg"]).optional(),
  answers: z.record(z.string(), z.string()).optional(),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // IP RATE LIMIT
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return Response.json(
        {
          error:
            "You've reached the submission limit. Please try again tomorrow.",
        },
        { status: 429 }
      );
    }

    // PARSE BODY
    const body = await req.json();

    // HONEYPOT SPAM FIELD
    if (body.website) {
      return Response.json({ error: "Spam detected" }, { status: 400 });
    }

    // PAYLOAD SIZE PROTECTION
    if (JSON.stringify(body).length > 15000) {
      return Response.json({ error: "Payload too large" }, { status: 413 });
    }

    // VALIDATE INPUT
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Invalid form data" }, { status: 400 });
    }
    const {
      brand_name,
      contact_name,
      contact_email,
      brand_link,
      extra_notes,
      summary,
    } = parsed.data;

    // PREVENT EMAIL HEADER INJECTION
    if (contact_email.includes("\n") || contact_email.includes("\r")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    // SEND EMAIL
    await resend.emails.send({
      from: "Since Seven <info@sinceseven.com>",
      to: "shikrenov@proton.me",
      replyTo: contact_email,
      subject: `${brand_name || "New"} Website Questionnaire`,
      text: `
Brand: ${brand_name}
Contact: ${contact_name}
Email: ${contact_email}
Link: ${brand_link || "-"}

--------------------

${summary}

--------------------

Notes:
${extra_notes || "-"}
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("SEND ERROR:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
