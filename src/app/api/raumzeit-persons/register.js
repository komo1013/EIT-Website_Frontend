import { sendEmail } from "./nodemailer";

// Example usage
sendEmail({
  to: "recipient@example.com",
  subject: "Test Email",
  html: "<h1>Hello</h1><p>This is a test email.</p>",
});
 export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        // Validate input
        if (!email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            await sendEmail({
                to: email,
                subject,
                html: `<p>${message}</p>`,
            });
            return res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
