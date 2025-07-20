import nodemailer from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quadriabdulsalam2024@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function sendContactEmail(data: EmailData): Promise<void> {
  const { name, email, message, subject } = data;

  const mailOptions = {
    from: 'quadriabdulsalam2024@gmail.com',
    to: 'abdulsalamquadri500@gmail.com',
    replyTo: email, // Set reply-to as the actual sender's email
    subject: subject ? `${subject} - ${name}` : `New Portfolio Contact: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 5px;">Contact Details:</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 5px;">Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #000; border-radius: 4px;">
            <p style="line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This email was sent from your portfolio contact form by <strong>${name}</strong> (${email}).</p>
          <p><strong>Reply directly to this email to respond to ${name}.</strong></p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}