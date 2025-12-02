const Brevo = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();

const client = new Brevo.TransactionalEmailsApi();
client.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, html }) => {
  return await client.sendTransacEmail({
    sender: {
      email: process.env.BREVO_FROM_EMAIL,
      name: "Compilex Tech"
    },
   to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

module.exports = sendEmail;
