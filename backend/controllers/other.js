"use strict";
const { validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");


exports.sendMessage = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
        error: errors.array()[0].msg,
        parameter: errors.array()[0].param,
        });
    }

    const {firstName,lastName,email,message} = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "theberrytree.org@gmail.com", // Change to your recipient
      from: "theberrytree.org@gmail.com", // Change to your verified sender
      subject: "User Query",
      html: `
        <h5>From : ${firstName} ${lastName}</h5>
          <h5>${email}</h5>
          <hr/>
          <h4>Query: </h4>
          <h5 style="border-style: groove">${message}</h5>
          <br/>
          <h6 style="color:blue">PoolIt</h6>
        `,
    };
    sgMail
      .send(msg)
      .then(() => {
        return res.status(200).json({
          message: "Message Sent Successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          error: error,
        });
      });
}