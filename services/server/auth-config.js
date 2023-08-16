// Credentials Manager
require("dotenv").config();

const credentials = {
    username: process.env.CMS_USERNAME,
    password: process.env.CMS_PASSWORD,
  }
  module.exports = {
    credentials
  }