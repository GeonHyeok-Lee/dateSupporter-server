import Twilio from "twilio";

const TWILIO_USERNAME: string = process.env.TWILIO_SID || "";
const TWILIO_PASSWORD: string = process.env.TWILIO_TOKEN || "";

const twilioClient = Twilio(TWILIO_USERNAME, TWILIO_PASSWORD);

export const sendSMS = (to: string, body: string) => {
  if (process.env.NODE_ENV === "development") {
    return console.error("Didn't send twilio message. because 'NODE_ENV' is development.");
  }
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE
  });
};

export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is: ${key}`);
