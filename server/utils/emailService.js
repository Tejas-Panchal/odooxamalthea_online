// Simple email service - replace with actual email service in production
// For now, this just logs the email content

const sendResetPasswordEmail = async (email, resetUrl) => {
  // TODO: Implement with nodemailer, SendGrid, or your preferred email service
  
  const emailContent = {
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset for your account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
    `,
    text: `
      Password Reset Request
      
      You requested a password reset for your account.
      Please visit the following link to reset your password:
      ${resetUrl}
      
      This link will expire in 10 minutes.
      If you didn't request this password reset, please ignore this email.
    `
  };
  
  // For development - just log the email
  console.log('=== EMAIL CONTENT ===');
  console.log('To:', emailContent.to);
  console.log('Subject:', emailContent.subject);
  console.log('Reset URL:', resetUrl);
  console.log('===================');
  
  // TODO: Replace with actual email sending
  // Example with nodemailer:
  
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text
  });
  
  
  return Promise.resolve();
};

module.exports = {
  sendResetPasswordEmail
};