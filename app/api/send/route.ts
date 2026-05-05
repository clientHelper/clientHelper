import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      brand_name,
      contact_name,
      contact_email,
      brand_link,
      extra_notes,
      summary,
    } = body;

    await resend.emails.send({
      from: "Since Seven <info@sinceseven.com>",
      to: "shikrenov@proton.me",
      replyTo: contact_email, // ✅ correct field name
      subject: `${brand_name || "New"} Website Questionnaire`,
      text: `
Brand: ${brand_name}
Contact: ${contact_name}
Email: ${contact_email}
Link: ${brand_link}

--------------------

${summary}

--------------------

Notes:
${extra_notes}
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
