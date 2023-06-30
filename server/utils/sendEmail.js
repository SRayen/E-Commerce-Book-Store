import nodemailer from "nodemailer";

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    //Transport Layer Security (TLS)
    tls: {
      /* By default, Node.js (which Nodemailer is built upon) verifies the server's (Backend SErver) TLS certificate when making a 
         secure connection.
       Setting rejectUnauthorized to false disables this default behavior and allows the connection to be established even if the server's 
       TLS certificate is self-signed or invalid.*/
      rejectUnauthorized: false,
    },
  });

  //Option for sending Email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };
  //Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log("err = ", err);
    } else {
      console.log("info= = ", info);
    }
  });
};

export default sendEmail;
