/* eslint-disable no-process-env */
import nodemailer from "nodemailer";

export const mailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <title>Nouveau message de contact</title>
    <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }

      td {
        padding: 8px;
      }
    </style>
  </head>
  <body>
    <h4>Bonjour,</h4>
    <p>
      <b><%= name %></b> a envoyé un message de contact depuis le site hestiaecobat.fr.
    </p>
    <table>
      <tr>
        <td>Nom:</td>
        <td><b><%= name %></b></td>
      </tr>
      <tr>
        <td>E-mail:</td>
        <td><b><%= email %></b></td>
      </tr>
      <tr>
        <td>Numéro de téléphone:</td>
        <td><b><%= phone %></b></td>
      </tr>
      <tr>
        <td>Adresse:</td>
        <td><% if (locals.address) { %><b><%= address %></b><% } %></td>
      </tr>
      <tr>
        <td>Code postal:</td>
        <td><% if (locals.zipcode) { %><b><%= zipcode %></b><% } %></td>
      </tr>
      <tr>
        <td>Date:</td>
        <td><% if (locals.date) { %><b><%= date %></b><% } %></td>
      </tr>
      <tr>
        <td>Heure:</td>
        <td><% if (locals.time) { %><b><%= time %></b><% } %></td>
      </tr>
      <tr>
        <td>Service:</td>
        <td><% if (locals.serviceName) { %><b><%= serviceName %></b><% } %></td>
      </tr>
    </table>
  </body>
</html>
`;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendEmail = (toEmail, subject, content, htmlContent) => {
  console.log("Send email");

  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.SMTP_AUTH_USER,
      to: toEmail,
      subject,
      text: content,
      html: htmlContent,
    }, (err, info) => {
      if (err) reject(err);

      console.log(info);

      resolve();
    });
  });
};

export {sendEmail};
