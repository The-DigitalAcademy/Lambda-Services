const setPermissions = (body, permissions) => {
  return [
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
};

const setLanguages = (body, languageIDS) => {
  return languageIDS.data.data
    .filter((language) =>
      body.Body.data.languages
        .map((lang) => JSON.parse(lang.name))
        .flat()
        .map((name) => name.toLowerCase())
        .includes(language.attributes.name.toLowerCase())
    )
    .map((language) => {
      return { type: language.type, id: language.id };
    });
};

const setCategories = (body, categoryIDS) => {
  return [
    {
      type: "taxonomy_term--category",
      id: "7f26b86b-6c0d-463b-aaee-b343406c90f6",
    },
    ...categoryIDS.data.data
      .filter((category) =>
        JSON.parse(body.Body.data.category)
          .map((category) => category.toLowerCase())
          .includes(category.attributes.name.toLowerCase())
      )
      .map((category) => {
        return { type: category.type, id: category.id };
      }),
  ];
};

const setCountries = (body, countryIDS) => {
  return countryIDS.data.data
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
};

const setMOMOPhone = (body) => {
  return Object.keys(body.Body.data.MomoCountries)
    .sort()
    .map((country, index) => {
      return {
        country:
          country === "congobrazzaville"
            ? "Congo (Brazzaville)"
            : country.slice(0, 1).toUpperCase() + country.slice(1),
        calling_code: body.Body.data.MomoCountries[country].slice(0, 4),
        phone: body.Body.data.MomoCountries[country].slice(4),
      };
    })
    .filter((dict) =>
      Object.values(dict).every((currentValue) => Boolean(currentValue))
    )
    .filter((e, i) => i === 0);
};

module.exports = {
  setPermissions,
  setLanguages,
  setCategories,
  setCountries,
  setMOMOPhone,
};
