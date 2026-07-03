import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required contact specification fields." },
        { status: 400 }
      );
    }

    // Log contact dispatch payload
    console.log(`[CONTACT DISPATCH TRANSMISSION] From: ${name} (${email}) | Payload: ${message}`);

    // Here you can drop in Resend / SendGrid / nodemailer API call
    return NextResponse.json({ success: true, timestamp: Date.now() }, { status: 200 });
  } catch (err) {
    console.error("Contact API payload processing failure:", err);
    return NextResponse.json(
      { error: "Internal server transmission error." },
      { status: 500 }
    );
  }
}
