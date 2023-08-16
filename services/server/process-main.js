require("dotenv").config();
const { Authenticated, validateRequestBody, updateCreateTemplate,
    updateQueue,
    updateDev, validateImageBody } = require("./process-helpers")
const {axiosConfig} = require("./axios-config")
const {fetchIcon, authenticate, uploadImage, getIconID, getPermissions, getLanguages, getCountries, getCategory, createCMS} = require("./cms-helpers")
const {iconUploadTemplate, createTemplate} = require("../../data/templates")

const processRequests = async (body, headers) => {
    await updateQueue(body, "In Progress");
    // Authenticate
    const isAuthenticated = await Authenticated(headers)
    if (isAuthenticated.status !== 203) return isAuthenticated

    const isValidBody = await validateRequestBody(body)
    if (isValidBody.status !== 200) return isValidBody

    const result = await processMain(body);

    //   await sendEmail(event);
    return await processOutcome(body, result)
}

const processMain = async (body) => {
    // Program Starts
    console.log("Processing " + body.Records[0].messageID);

    // Check if Message Body Is Valid ie has an image to process
    const isValidImage = await validateImageBody(body)
    if (isValidImage.status !== 200) return isValidImage
    return await createMicroApp(
        body.Records[0].body,
        body.Records[0].messageID
    );
};

async function createMicroApp(body, messageID) {
    // Create a new cookie jar
    let instance = await axiosConfig()

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

const processOutcome = async (body, result) => {
    if (result.status === 201) {
        await updateQueue(body, "Created");
        await updateDev(body.Records[0].body.id, true);
    }
    else {
        await updateQueue(body, "Error", result.message);
    }

    return { status: result.status, data: { message: result.message } };
}

module.exports = {
    processRequests
}