require("dotenv").config();
const axios = require("axios");
const {setPermissions, setCategories, setLanguages, setCountries, setMOMOPhone} = require("./create-template-helpers")
const {createTemplate} = require("../../data/templates")

const STRAPI_URL = process.env.STRAPI_URL ?? "https://devstrapi.thedigitalacademy.co.za" // Defaults to DevStrapi

const Authenticated = async (headers) => {
  if (!headers.hasOwnProperty("x-api-key") || process.env.APIKEY !== headers["x-api-key"]) {
    console.log("Not Authorized to Access the Endpoint");
    await updateQueue(
      body,
      "Error",
      "Not Authorized to Access This Endpoint"
    );
    return { status: 403, data: { message: "Not Authorized to Access This Endpoint" } };
  }
  return { status: 203, data: { message: "Authorized" } }
}


const validateRequestBody = async (body) => {
  if (
    !body.hasOwnProperty("Records") ||
    !body.Records.length ||
    !body.Records[0].hasOwnProperty("body") ||
    !body.Records[0].hasOwnProperty("messageID")
  ) {
    console.log("Invalid request body");
    await updateQueue(body, "Error", "Invalid request body");
    return { status: 400, data: { message: "Invalid request body" } }
  };
  return { status: 200, data: { message: "Valid Request Body" } }
}

const validateImageBody = async(body) => {
  if (
    !body.Records[0].body.hasOwnProperty("Body") ||
    !body.Records[0].body.hasOwnProperty("Icon") ||
    !body.Records[0].body.Icon.hasOwnProperty("Image") ||
    body.Records[0].body.Icon.Image.length < 1
  ) {
    await updateQueue(body, "Error", "Invalid request body: No Image or Icon found");
    return { status: 400, message: "No Image or Icon to Upload" };
  }
  return { status: 200, message: "Valid Image or Icon to Upload" };
}

const updateQueue = async (body, status, error = "") => {
  if (body.hasOwnProperty("QueueID")) {
    try {
      await axios.put(
        STRAPI_URL + "/api/voc-automation-messagelogs/" +
        body.QueueID.data.id,
        {
          data: {
            status: status,
            statusMessage: error,
          },
        }
      );
    }
    catch (err) {
      console.log(err)
    }
  }
};

const updateDev = async (microappID, data) => {
  try {
    console.log("Updating STRAPI...");
    const microAppReqID = await axios.get(
      STRAPI_URL + "/api/publish-micro-apps?filters[microAppId][$eq]=" +
      microappID
    );
    await axios.put(
      STRAPI_URL + "/api/publish-micro-apps/" +
      microAppReqID.data.data[0].id,
      {
        data: {
          dev: data,
        },
      }
    );
    console.log("Updated STRAPI Successfully");
  }
  catch (err) {
    console.log(err)
  }
};

const updateCreateTemplate = (
  body,
  icon_id,
  permissions,
  languageIDS,
  categoryIDS,
  countryIDS
) => {
  // Populate the Creation template
  createTemplate.data.attributes.title = body.Body.data.title;
  createTemplate.data.attributes.field_discovery_uri =
    body.Body.data.discoveryUri;
  createTemplate.data.attributes.field_chat_uri = body.Body.data.chatUri;
  createTemplate.data.attributes.body.value = body.Body.data.description;
  createTemplate.data.attributes.body.summary =
    body.Body.data.short_description;
  createTemplate.data.attributes.field_developer = body.Body.data.developer;

  createTemplate.data.relationships.field_image.data.id =
    icon_id.data.data.relationships.field_media_image.data.id;
  createTemplate.data.relationships.field_media_image.data.id =
    icon_id.data.data.id;

  // Populate the Creation Template with Permissions
  createTemplate.data.attributes.field_user_permissions = setPermissions(body, permissions)

  // Populate Data for languages
  createTemplate.data.relationships.field_languages_term.data = setLanguages(body, languageIDS)

  // Populate Creation Template with Category Data
  createTemplate.data.relationships.field_category.data = setCategories(body, categoryIDS)

  // Populate Creation Template with Countries
  createTemplate.data.relationships.field_countries_term.data = setCountries(body, countryIDS)

  console.log("Taxonomy Fields Updated");

  // Populating the Creation Template with Payments - MOMO
  console.log("Updating MoMo Payment...");
  createTemplate.data.attributes.field_momo = body.Body.data.momo;
  createTemplate.data.attributes.field_adv_momo_phone = setMOMOPhone(body)

  // Populating the Creation Template with Payments - OZOW
  console.log("Updating OZOW Payment...");
  createTemplate.data.attributes.field_ozow_pay = body.Body.data.ozow;
  createTemplate.data.attributes.field_contains_purchases =
    body.Body.data.billing;
  createTemplate.data.attributes.field_domains = body.Body.data.domains;
};

module.exports = {
  Authenticated,
  validateRequestBody,
  updateCreateTemplate,
  updateQueue,
  updateDev,
  validateImageBody
}