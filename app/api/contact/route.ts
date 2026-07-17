import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const contactEmail = process.env.CONTACT_EMAIL || "affiliatemg@scorpioplay.com";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }
    const name = clean(body.name, 100);
    const email = clean(body.email, 160).toLowerCase();
    const requirements = clean(body.requirements, 3000);

    if (name.length < 2 || requirements.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid name, email, and requirements." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !pass || !from) {
      console.error("Contact form email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM.");
      return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email us directly." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Scorpio Play Website <${from}>`,
      to: contactEmail,
      replyTo: `${name} <${email}>`,
      subject: `New Casino Game API request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nRequirements:\n${requirements}`,
      html: `<div style="font-family:Arial,sans-serif;color:#102027;line-height:1.6"><h2 style="color:#087d5b">New Casino Game API request</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p><h3>Requirements</h3><p style="white-space:pre-wrap">${escapeHtml(requirements)}</p></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to deliver API access request:", error);
    return NextResponse.json({ error: "Unable to send your request. Please try again shortly." }, { status: 500 });
  }
}
