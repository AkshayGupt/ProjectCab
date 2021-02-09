
const dotenv = require("dotenv");
dotenv.config({ path: "./sendgrid.env" });

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: '189301019.akshay@gmail.com', // Change to your recipient
  from: 'theberrytree.org@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })