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
      field_ozow_max_amount: null,
      field_ozow_min_amount: null,
      field_ozow_pay: false,
      field_ozow_sitecode: null,
      field_chat_uri: "",
      field_discovery_uri: "",
      field_user_permissions: [],
      field_use_ayoba_ux_overlay: false,
      field_use_ozow_ux_overlay: false,
      field_contains_purchases: false,
      field_domains: [],
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

module.exports = {
  iconUploadTemplate,
  createTemplate,
};
