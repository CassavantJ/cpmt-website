import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, interest, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const interestLabels = {
    general: "General Inquiry",
    "new-machine": "New Machine Quote",
    "used-machine": "Pre-Owned Machine",
    service: "Service & Repair",
    automation: "Automation Solutions",
    financing: "Financing",
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Website Inquiry: ${interestLabels[interest] || interest} - ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Interest: ${interestLabels[interest] || interest}`,
      ``,
      `Message:`,
      message,
    ].join("\n"),
    html: `
      <h2>New Website Inquiry</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Interest</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${interestLabels[interest] || interest}</td></tr>
      </table>
      <h3 style="margin-top: 20px;">Message</h3>
      <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
