const axios = require("axios");

const fetchIcon = async (body) => {
  try {
    let icon = await axios.get(body.Icon.Image[0].formats.thumbnail.url, {
      responseType: "arraybuffer", // Set the response type as arraybuffer to handle binary data
    });
    return icon;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const authenticate = async (instance) => {
  try {
    let res = await instance.get("http://devcms.ayoba.me/session/token");
    return res;
  } catch (err) {
    console.log("Error: ", error);
    return null;
  }
};

const uploadImage = async (imageBlob, body, instance) => {
  try {
    let image_upload = await instance.post(
      "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/media/icon/field_media_image",
      imageBlob,
      {
        headers: {
          "Content-Type": `application/octet-stream`,
          "Content-Disposition": `file; filename="${body.Icon.Image[0].formats.thumbnail.hash}${body.Icon.Image[0].formats.thumbnail.ext}"`,
        },
        auth: {
          username: "DA.Dylan",
          password: "DA.Dylan123",
        },
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
      "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/media/icon",
      iconUploadTemplate,
      {
        auth: {
          username: "DA.Dylan",
          password: "DA.Dylan123",
        },
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
      "https://devstrapi.thedigitalacademy.co.za/api/micro-app-permissions"
    );
    return permissions;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getLanguages = async (instance) => {
  try {
    let languageIDS = await instance.get(
      "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/taxonomy_term/languages"
    );
    return languageIDS;
  } catch (error) {
    return null;
  }
};

const getCountries = async (instance) => {
  try {
    let countryIDS = await instance.get(
      "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/taxonomy_term/countries"
    );
    return countryIDS;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const getCategory = async (instance) => {
  try {
    let categoryIDS = await instance.get(
      "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/taxonomy_term/category"
    );
    return categoryIDS;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

const createCMS = async (createTemplate, messageID, instance) => {
  try {
    let res = await instance.post(
      "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/node/microapp",
      createTemplate,
      {
        auth: {
          username: "DA.Dylan",
          password: "DA.Dylan123",
        },
      }
    );
    console.log(JSON.stringify("Successfully Created Micro App - DevCMS"));
    return {
      status: 201,
      message: "Successfully Created MicroAppID: " + res.data.data.id + " ========= MessageId: " + messageID,
    };
  } catch (error) {
    console.log(JSON.stringify("Couldn't Creat Micro App - DevCMS"));
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
  createCMS,
};
