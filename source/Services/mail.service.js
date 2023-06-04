const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const mailService = {
  async sendEmail({ emailFrom, emailTo, emailSubject, emailText }) {
    console.log(
      "here" + process.env.SMTP_HOST,
      process.env.SMTP_USER,
      process.env.SMTP_PASS
    );
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail(
      {
        from: emailFrom,
        to: emailTo,
        subject: emailSubject,
        text: emailText,
      },
      (err, infor) => {
        if (err) {
          console.log(err);
        } else {
          console.log(infor);
        }
      }
    );
  },
};

Object.freeze(mailService);

module.exports = {
  mailService,
};
