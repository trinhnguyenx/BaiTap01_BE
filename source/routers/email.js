const express = require("express");
const { mailService } = require("../Services/mail.service");
const app = express();

app.use(express.json());

app.post("/email", async (req, res) => {
  try {
    const { emailFrom, emailTo, emailSubject, emailText } = req.body;

    await mailService.sendEmail({
      emailFrom: emailFrom,
      emailTo: emailTo,
      emailSubject: emailSubject,
      emailText: emailText,
    });

    return res.status(200).json({
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to send email",
    });
  }
});

app.listen(3000, () => console.log("Server is listening on PORT 3000"));

module.exports = app;
