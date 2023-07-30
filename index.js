const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const tough = require("tough-cookie");
const http = require("http");
require("dotenv").config();
const {
  fetchIcon,
  authenticate,
  uploadImage,
  getIconID,
  getPermissions,
  getLanguages,
  getCountries,
  getCategory,
  createCMS,
} = require("./services/helpers/cms.js");
const { iconUploadTemplate, createTemplate } = require("./data/templates.js");
const path = require("path");

// Instance of an express Node Server
const server = express();

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"))
})
// Creates A REST API Endpoint
server.post("/", bodyParser.json(), async (req, res) => {
  await updateQueue(req.body, "In Progress");
  // Authenticate
  if (process.env.APIKEY !== req.headers["x-api-key"]) {
    console.log("Not Authorized to Access This Endpoint");
    await updateQueue(
      req.body,
      "Error",
      "Not Authorized to Access This Endpoint"
    );
    return res
      .status(403)
      .json({ message: "Not Authorized to Access This Endpoint" });
  }

  if (
    !req.body.hasOwnProperty("Records") ||
    !req.body.Records.length ||
    !req.body.Records[0].hasOwnProperty("body") ||
    !req.body.Records[0].hasOwnProperty("messageID")
  ) {
    console.log("Invalid request body");
    await updateQueue(req.body, "Error", "Invalid request body");
    return res.status(400).json({ message: "Invalid request body" });
  }
  const result = await handler(req.body);
  //   await sendEmail(event);
  if (result.status === 201) {
    await updateQueue(req.body, "Created");
    await updateDev(req.body.Records[0].body.id, true);
  } else {
    console.log("Error Creating MicroApp - Error: " + result.message);
    await updateQueue(req.body, "Error", result.message);
  }
  return res.status(result.status).json({ message: result.message });
});

const handler = async (event) => {
  // Program Starts
  console.log("Processing " + event.Records[0].messageID);

  // Check if Message Body Is Valid ie has an image to process
  if (
    !event.Records[0].body.hasOwnProperty("Body") ||
    !event.Records[0].body.hasOwnProperty("Icon") ||
    !event.Records[0].body.Icon.hasOwnProperty("Image") ||
    event.Records[0].body.Icon.Image.length < 1
  ) {
    console.log("No Image or Icon to Upload");
    return { status: 500, message: "No Image or Icon to Upload" };
  }
  return await createMicroApp(
    event.Records[0].body,
    event.Records[0].messageID
  );
};

async function createMicroApp(body, messageID) {
  // Create a new cookie jar
  let cookieJar = new tough.CookieJar();

  // Create a new instance of Axios
  let instance = await axios.create({
    jar: cookieJar,
    withCredentials: true,
    httpsAgent: new http.Agent({
      rejectUnauthorized: false,
      requestCert: true,
      keepAlive: true,
    }),
    headers: {
      "Content-Type": "application/vnd.api+json",
    },
  });

  // Getting Image from S3 Bucket provided by Strapi
  console.log("Fetching Icon - S3 Bucket...");
  let icon = await fetchIcon(body);
  if (!icon) return { status: 500, message: "Error: Couldn't fetch Icon" };

  // Get CSRF - For Session Management Cross Site Request Forgery
  console.log("Authenticating...");
  let res = await authenticate(instance);
  if (!res) return { status: 500, message: "Error: Couldn't Authenticate" };

  instance.defaults.headers["x-csrf-token"] = res.data;

  // Upload image to server
  console.log("Uploading Icon to DevCMS...");
  // Create Image ByteArray
  const imageBlob = new Uint8Array(icon.data);
  let image_upload = await uploadImage(imageBlob, body, instance);
  if (!image_upload)
    return { status: 500, message: "Error: Couldn't Upload Image" };

  // Populate the iconTemplate
  iconUploadTemplate.data.attributes.name = body.Icon.Image[0].name;
  iconUploadTemplate.data.relationships.field_media_image.data.id =
    image_upload.data.data.id;

  //  Retrieve Icon ID
  console.log("Confirming Icon Details on DevCMS...");
  let icon_id = await getIconID(iconUploadTemplate, instance);
  if (!icon_id) return { status: 500, message: "Error: Couldn't Get Icon ID" };

  // Create Permissions for Micro App
  console.log("Updating Permissions...");
  let permissions = await getPermissions();
  if (!permissions)
    return { status: 500, message: "Error: Couldn't Load Permissions" };

  // Updating Languages for the Create Micro App Request Body
  console.log("Updating Languages...");
  let languageIDS = await getLanguages(instance);
  if (!languageIDS)
    return { status: 500, message: "Error: Couldn't Load Languages" };

  // Update Countries
  console.log("Updating Countries...");
  let countryIDS = await getCountries(instance);
  if (!countryIDS)
    return { status: 500, message: "Error: Couldn't Load Countries" };

  // Update Categories
  console.log("Updating Categories...");
  let categoryIDS = await getCategory(instance);
  if (!categoryIDS)
    return { status: 500, message: "Error: Couldn't Load Categories" };

  updateCreateTemplate(
    body,
    icon_id,
    permissions,
    languageIDS,
    categoryIDS,
    countryIDS
  );

  // Create MicroApp on DevCMS
  console.log("Creating Micro App - DevCMS");
  return await createCMS(createTemplate, messageID, instance);
}

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
  createTemplate.data.attributes.field_user_permissions = [
    ...new Set(
      permissions.data.data[0].attributes.permissions.permissions
        .filter((permission) => body.Body.data[permission.name])
        .map((obj) =>
          obj.name === "language" ||
          obj.name === "profile" ||
          obj.name === "presence"
            ? "User" +
              obj.name.slice(0, 1).toUpperCase() +
              obj.name.split(" ").join("").slice(1)
            : obj.name === "message"
            ? "Send" +
              obj.name.slice(0, 1).toUpperCase() +
              obj.name.split(" ").join("").slice(1)
            : obj.name === "msisdn"
            ? obj.name.toUpperCase()
            : obj.name === "ozow" || obj.name === "momo"
            ? "MoMoCollections"
            : obj.name.slice(0, 1).toUpperCase() +
              obj.name.split(" ").join("").slice(1)
        )
    ),
  ];

  createTemplate.data.relationships.field_languages_term.data =
    languageIDS.data.data
      .filter((language) =>
        body.Body.data.languages
          .map((lang) => JSON.parse(lang.name))
          .flat()
          .includes(language.attributes.name)
      )
      .map((language) => {
        return { type: language.type, id: language.id };
      });

  // Populate Creation Template with Category Data
  createTemplate.data.relationships.field_category.data = [
    {
      type: "taxonomy_term--category",
      id: "7f26b86b-6c0d-463b-aaee-b343406c90f6",
    },
    ...categoryIDS.data.data
      .filter((category) =>
        JSON.parse(body.Body.data.category).includes(category.attributes.name)
      )
      .map((category) => {
        return { type: category.type, id: category.id };
      }),
  ];

  // Populate Creation Template with Countries
  createTemplate.data.relationships.field_countries_term.data =
    countryIDS.data.data
      .filter((country) =>
        body.Body.data.momo
          ? Object.keys(body.Body.data.MomoCountries)
              .sort()
              .filter((e, i) => i === 0)
              .map((country, index) =>
                country === "congobrazzaville"
                  ? "Congo (Brazzaville)"
                  : country.slice(0, 1).toUpperCase() + country.slice(1)
              )
              .includes(country.attributes.name.split(" ").join(""))
          : body.Body.data.countries
              .map((countryName) =>
                JSON.parse(countryName.name.split(" ").join(""))
              )
              .flat()
              .includes(country.attributes.name.split(" ").join(""))
      )
      .map((country) => {
        return { type: country.type, id: country.id };
      });

  console.log("Taxonomy Fields Updated");

  // Populating the Creation Template with Payments - MOMO
  console.log("Updating MoMo Payment...");
  createTemplate.data.attributes.field_momo = body.Body.data.momo;
  createTemplate.data.attributes.field_adv_momo_phone = Object.keys(
    body.Body.data.MomoCountries
  )
    .sort()
    .filter((e, i) => i === 0)
    .map((country, index) => {
      return {
        country:
          country === "congobrazzaville"
            ? "Congo (Brazzaville)"
            : country.slice(0, 1).toUpperCase() + country.slice(1),
        calling_code: body.Body.data.MomoCountries[country].slice(0, 4),
        phone: body.Body.data.MomoCountries[country].slice(4),
      };
    });

  // Populating the Creation Template with Payments - OZOW
  console.log("Updating OZOW Payment...");
  createTemplate.data.attributes.field_ozow_pay = body.Body.data.ozow;
  createTemplate.data.attributes.field_contains_purchases =
    body.Body.data.billing;
  createTemplate.data.attributes.field_domains = body.Body.data.domains;
};

const updateQueue = async (body, status, error = "") => {
  console.log("Updating QueueID: " + body.QueueID?.data.id);
  if (body.hasOwnProperty("QueueID")) {
    try{
    await axios.put(
      "https://devstrapi.thedigitalacademy.co.za/api/voc-automation-messagelogs/" +
        body.QueueID.data.id,
      {
        data: {
          status: status,
          statusMessage: error,
        },
      }
    );
    }
    catch(err){
      console.log(err)
    }
  }
};

const updateDev = async (microappID, data) => {
  try{
  console.log("Updating DevStrapi...");
  const microAppReqID = await axios.get(
    "https://devstrapi.thedigitalacademy.co.za/api/publish-micro-apps?filters[microAppId][$eq]=" +
      microappID
  );
  await axios.put(
    "https://devstrapi.thedigitalacademy.co.za/api/publish-micro-apps/" +
      microAppReqID.data.data[0].id,
    {
      data: {
        dev: data,
      },
    }
  );
  console.log("Updated DevStrapi Successfully");}
  catch(err){
    console.log(err)
  }
};

// Perpetual Server Listener
server.listen(process.env.PORT, () => console.log("Listing to port 3030"));
