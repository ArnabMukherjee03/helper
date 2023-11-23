const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

exports.sendMail = async ({email,subject,html} )=>{
  
    const info = await transporter.sendMail({
        from: '"Helpers" <Helpers.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: html, // html body
      });
      return info;
}