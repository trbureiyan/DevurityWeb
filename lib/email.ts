//import { google } from "googleapis";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

/*const oAuth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

oAuth2client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});


*/

export interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

const emailTransporter = () => {
  const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.KEY_EMAIL,
    },
  } as SMTPTransport.Options);

  return emailTransporter;
};

export const sendEmail = async (options: EmailOptions) => {
  const { to, subject, htmlBody } = options;
  try {
    const email = emailTransporter();
    await email.sendMail({
      to,
      subject,
      html: htmlBody,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
