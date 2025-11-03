// lib/nodemailer.js oder utils/email.js
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.h-ka.de',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// Function to send an email
export async function sendEmail({ to, subject, html }) {
  const text = htmlToText(html);
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}
