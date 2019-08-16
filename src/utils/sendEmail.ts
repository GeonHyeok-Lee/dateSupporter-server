import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  publicApiKey: process.env.MAILGUN_PUBLIC_API_KEY,
  domain: "sandbox94227a1a9e6e4bb99b6c49c5d3f6459b.mailgun.org"
});

const sendEmail = (to: string, subject: string, html: string) => {
  const emailData = {
    from: "dlrjsgur1992@gmail.com",
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (
  to: string,
  name: string,
  key: string
) => {
  const emailSubject = `Hello! ${name}, please verify your email`;
  const emailBody = `Your key: ${key}`;
  return sendEmail(to, emailSubject, emailBody);
};
