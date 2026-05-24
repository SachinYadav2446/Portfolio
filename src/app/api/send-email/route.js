import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.SMTP_TO || 'yadavsachin2446@gmail.com';

    // If SMTP environment variables are not configured yet, do a graceful fallback simulation
    if (!host || !user || !pass) {
      console.warn("SMTP credentials are not fully configured. Performing mock email dispatch.");
      return NextResponse.json({
        success: true,
        simulated: true,
        message: 'SMTP credentials missing. Mock dispatch successful.'
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      replyTo: email,
      to: toEmail,
      subject: `New Signal Transmitted by ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 25px; color: #222; border: 1px solid #e1e1e8; border-radius: 12px; max-width: 600px; background: #fafafd;">
          <h2 style="color: #e63946; border-bottom: 2px solid #e63946; padding-bottom: 10px; margin-top: 0;">New Engineering Signal</h2>
          <p style="margin: 0.5rem 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 0.5rem 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #e63946; text-decoration: none;">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #e6e6f0; margin: 20px 0;" />
          <p style="margin: 0.5rem 0; font-weight: bold; color: #555;">Message Content:</p>
          <div style="background: #ffffff; padding: 18px; border-left: 4px solid #e63946; border-radius: 6px; border-top: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee; white-space: pre-wrap; line-height: 1.6; color: #333;">
            ${message}
          </div>
          <footer style="margin-top: 25px; font-size: 0.8rem; color: #888; border-top: 1px solid #eee; padding-top: 12px; text-align: center;">
            This email was automatically transmitted via the Portfolio SMTP mail system.
          </footer>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SMTP routing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch email via SMTP.' },
      { status: 500 }
    );
  }
}
