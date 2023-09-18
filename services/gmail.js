const {createMicroAppMailTemplate} = require("../data/templates")
const axios = require("axios")
require("dotenv").config();

const STRAPI_URL = process.env.STRAPI_URL ?? "https://devstrapi.thedigitalacademy.co.za"
const SENDER_ADDRESS = process.env.SENDER_ADDRESS ?? "ayobasupport@thedigitalacademy.co.za"
const REPLY_TO = process.env.REPLY_TO ?? "no-reply@thedigitalacademy.co.za"
const CC_ADDRESS = process.env.CC_ADDRESS ?? "developersupport@ayoba.me"

async function sendMail(body) {
  createMicroAppMailTemplate.microAppName = body.Body.data.title
  const mailOptions = {
    from: SENDER_ADDRESS,
    replyTo: REPLY_TO,
    cc: CC_ADDRESS,
    to: body.Body.data.user_email,
    subject: `Automated: MicroApp ${createMicroAppMailTemplate.microAppName} is now ready for Testing`,
    ...createMicroAppMailTemplate.returnHTML(),
  };
  const mail = await axios.post(STRAPI_URL + "/api/email/", mailOptions)
  if (mail.data) console.log("Outgoing email successful")
  else console.log("Outgoing email failed")
}


module.exports = {sendMail}