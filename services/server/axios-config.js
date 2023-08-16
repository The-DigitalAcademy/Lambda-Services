const axios = require("axios");
const tough = require("tough-cookie");
const http = require("http");

const axiosConfig = async() => {
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
    return instance
}

module.exports = {
    axiosConfig
}