import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== 'object' ||
      body === null ||
      !('name' in body) ||
      !('email' in body) ||
      !('phone' in body)
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { name, email, phone, projectType, budget, message } = body as Record<string, string>;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    // TODO: Replace with your email service (SendGrid, Nodemailer, Resend, etc.)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'contact@archstudio.in',
    //   to: 'hello@archstudio.in',
    //   subject: `New inquiry from ${name}`,
    //   html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p>...`,
    // });

    console.log('[Contact Form]', { name, email, phone, projectType, budget, message });

    return NextResponse.json({
      message: 'Thank you for your inquiry. We will contact you within 24 hours.',
    });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Failed to process your request' }, { status: 500 });
  }
}
