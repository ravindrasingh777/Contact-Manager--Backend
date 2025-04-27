const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ravindrasinghrss2004@gmail.com',       // your Gmail address
      pass: 'ybcy trvb skfk qrhd',          // use an App Password if 2FA is on
    },
  });


  function sendMail(to, sub, msg) {
    transporter.sendMail(
      {
        from: '"Contact Manager" <ravindrasinghrss2004@gmail.com>',
        to: to,
        subject: sub,
        html: msg,
      },
      (error, info) => {
        if (error) {
          console.error("Email error:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      }
    );
  }
  
  
  module.exports =sendMail;

  