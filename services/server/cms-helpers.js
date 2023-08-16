const axios = require("axios");
require("dotenv").config();
const {credentials} = require("./auth-config")

const STRAPI_URL = process.env.STRAPI_URL ?? "https://devstrapi.thedigitalacademy.co.za" // Defaults to DevStrapi
const DEV_CMS = process.env.DEV_CMS ?? "http://devcms.ayoba.me" // Defaults to DEV CMS
const PROD_CMS = process.env.PROD_CMS ?? "http://devcms.ayoba.me"
const CMS_ID = process.env.CMS_ID ?? "/jsonapi/15c1ad2ea0d3"

const fetchIcon = async (body) => {
  try {
    let icon = await axios.get(body.Icon.Image[0].formats.thumbnail.url, {
      responseType: "arraybuffer", // Set the response type as arraybuffer to handle binary data
    });
    console.log("Icon Fetched Successfully");
    return icon;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const authenticate = async (instance) => {
  try {
    let res = await instance.get(DEV_CMS + "/session/token");
    console.log("Authenticated Successfully");
    return res;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

const uploadImage = async (imageBlob, body, instance) => {
  try {
    let image_upload = await instance.post(
      DEV_CMS + CMS_ID + "/media/icon/field_media_image",
      imageBlob,
      {
        headers: {
          "Content-Type": `application/octet-stream`,
          "Content-Disposition": `file; filename="${body.Icon.Image[0].formats.thumbnail.hash}${body.Icon.Image[0].formats.thumbnail.ext}"`,
        },
        auth: credentials,
      }
    );
    console.log("Uploaded Icon: " + image_upload.data.data.id);
    return image_upload;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getIconID = async (iconUploadTemplate, instance) => {
  try {
    let icon_id = await instance.post(
      DEV_CMS + CMS_ID + "/media/icon",
      iconUploadTemplate,
      {
        auth: credentials,
      }
    );
    console.log("Confirmed Icon: " + icon_id.data.data.id);
    return icon_id;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getPermissions = async () => {
  try {
    let permissions = await axios.get(
      STRAPI_URL + "/api/micro-app-permissions"
    );
    console.log("Permissions Fetched Successfully");
    return permissions;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getLanguages = async (instance) => {
  try {
    let languageIDS = await instance.get(
      DEV_CMS + CMS_ID + "/taxonomy_term/languages"
    );
    console.log("Languages Fetched Successfully");
    return languageIDS;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getCountries = async (instance) => {
  try {
    let countryIDS = await instance.get(
      DEV_CMS + CMS_ID + "/taxonomy_term/countries"
    );
    console.log("Countries Fetched Successfully");
    return countryIDS;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getCategory = async (instance) => {
  try {
    let categoryIDS = await instance.get(
      DEV_CMS + CMS_ID + "/taxonomy_term/category"
    );
    console.log("Categories Fetched Successfully");
    return categoryIDS;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const createCMS = async (createTemplate, messageID, instance) => {
  try {
    let res = await instance.post(
      DEV_CMS + CMS_ID + "/node/microapp",
      createTemplate,
      {
        auth: credentials,
      }
    );
    console.log("Successfully Created Micro App - DevCMS");
    return {
      status: 201,
      message: "Successfully Created MicroAppID: " + res.data.data.id + " ========= MessageId: " + messageID,
    };
  } catch (error) {
    console.log("Couldn't Create Micro App - DevCMS");
    console.log("Error: ", error);
    return { status: 500, message: error };
  }
};

module.exports = {
  fetchIcon,
  authenticate,
  uploadImage,
  getIconID,
  getPermissions,
  getLanguages,
  getCountries,
  getCategory,
  createCMS
};
