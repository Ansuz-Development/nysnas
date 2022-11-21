/* eslint-disable no-process-env */
const fs = require("fs");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sgSender = process.env.SENDGRID_SENDER;

const sendMailByGrid = (toEmail, subject, content, htmlContent, attachment) => {
  console.log("Send Email by grid");

  const attachments = [];
  if (attachment) {
    attachments.push({
      content: fs.readFileSync(attachment.filepath).toString("base64"),
      filename: attachment.originalFilename,
      disposition: "attachment",
    });
  }

  return sgMail
    .send({
      to: toEmail,
      from: sgSender,
      subject,
      text: content,
      html: htmlContent,
      attachments,
    });
};

export {sendMailByGrid};
