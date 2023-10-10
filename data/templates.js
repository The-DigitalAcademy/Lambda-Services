// Icon Upload Template
const iconUploadTemplate = {
  data: {
    type: "media--icon",
    attributes: {
      name: "",
    },
    relationships: {
      field_media_image: {
        data: {
          type: "file--file",
          id: "",
        },
      },
    },
  },
};

// Create Micro-App Template
const createTemplate = {
  data: {
    type: "node--microapp",
    attributes: {
      title: "",
      body: {
        value: "",
        summary: "",
      },
      status: true,
      field_developer: "",
      field_momo: false,
      field_momo_phone: "",
      field_allow_multipage: true,
      field_ozow_max_amount: 0,
      field_ozow_min_amount: 0,
      field_ozow_pay: false,
      field_ozow_sitecode: "",
      field_chat_uri: "",
      field_discovery_uri: "",
      field_user_permissions: [],
      field_use_ayoba_ux_overlay: false,
      field_use_ozow_ux_overlay: false,
      field_contains_purchases: false,
      field_enable_disclaimer: true,
      field_domains: [],
      field_use_proxy: true,
    },
    relationships: {
      field_languages_term: {
        data: [],
      },
      field_category: {
        data: [],
      },
      field_countries_term: {
        data: [],
      },
      field_image: {
        data: {
          type: "file--file",
          id: "",
        },
      },
      field_media_image: {
        data: {
          type: "media--icon",
          id: "",
        },
      },
    },
  },
};

// Email Body for Create MIcroApp
const createMicroAppMailTemplate = {
  microAppName: "Micro App",
  returnHTML() {
    return {
      html: String.raw`
      <!DOCTYPE html>
      <html>
      <head>
         <title>Ayoba ${this.microAppName} Announcement</title>
      </head>
      <body>
         <p style="font-size: 16px;">
            <strong>Aye yo ${this.microAppName} team,</strong>
         </p>
         <p style="font-size: 16px;">
            Great news! Your microApp, <strong>${this.microAppName}</strong>, is now available for testing on the Ayoba Developer APK.
         </p>
         <p style="font-size: 16px;">
            To get the ball rolling, download and install the Ayoba Developer APK, which serves as the Ayoba testing environment, to check how your microApp will behave in a live environment.
         </p>
         <p style="font-size: 16px;">
            We want your publication process to be super smooth, so we suggest reviewing your microApp's quality and functionality, identifying any open bugs, and reviewing any bug fixes before requesting to publish into the Ayoba Live environment.
         </p>
         <p style="font-size: 16px;">
            Here’s a quick checklist to help you identify some common issues:
         </p>
         <ul>
            <li style="font-size: 16px;">Ensure forms work as expected.</li>
            <li style="font-size: 16px;">Check the permissions requested by the microApp are used.</li>
            <li style="font-size: 16px;">Test end-to-end use cases for both positive and negative scenarios.</li>
            <li style="font-size: 16px;">Ensure the core functionality of the microApp works.</li>
            <li style="font-size: 16px;">Check the general compatibility of the microApp with the Ayoba platform.</li>
         </ul>
         <p style="font-size: 16px;">
            If your microApp allows users to use MoMo Payment and has domains or subdomains that need whitelisting, please add those details via the Ayoba Developer Portal.
         </p>
         <p style="font-size: 16px;">
            Once you have concluded the testing, take the plunge and submit your publication request via the Ayoba Developer Portal or drop us an email. We’ll get started with our Vetting Onboarding and Compliance checks process as well as Publication to the Ayoba Live app.
         </p>
         <p style="font-size: 16px;">
            Feel free to reach out to us anytime if you have any questions or need clarification.
         </p>
         <p style="font-size: 16px;">
            Have an <strong>ayoba day</strong>,
         </p>
      </body>
      </html>
      `,
    };
  },
};

module.exports = {
  iconUploadTemplate,
  createTemplate,
  createMicroAppMailTemplate,
};
