async function sendEmail(event) {
  const nodemailer = require("nodemailer");
  const smtpTransport = require("nodemailer-smtp-transport");

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: process.env.sesAccessKey,
        pass: process.env.sesSecretKey,
      },
    })
  );

  const text = JSON.stringify(event.Records[0]);

  const mailOptions = {
    from: "delali@thedigitalacademy.co.za",
    to: "dfunani@gmail.com",
    bcc: "delali@thedigitalacademy.co.za",
    subject: "Test subject",
    text: text,
  };
  console.log(process.env.sesAccessKey);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      };
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: text,
      }),
    };
  });
}
