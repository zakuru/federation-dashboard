const cleanObject = (object) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value === "true") return { ...acc, [key]: true };
    if (value === "false") return { ...acc, [key]: false };
    if (value === "null") return { ...acc, [key]: null };
    if (!isNaN(Number(value))) return { ...acc, [key]: Number(value) };
    return { ...acc, [key]: value };
  }, {});
};

module.exports.privateConfig = !process.browser
  ? cleanObject(
      Object.assign(
        {
          AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
          AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
          AUTH0_BASE_URL: process.env.EXTERNAL_URL,
          AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
          REDIRECT_URI: process.env.REDIRECT_URI,
          AUTH0_SECRET: process.env.AUTH0_SECRET
            ? new Buffer.from(process.env.AUTH0_SECRET, "base64").toString(
                "ascii"
              )
            : undefined,
          WITH_AUTH: process.env.WITH_AUTH,
          VERSION_MANAGER: process.env.VERSION_MANAGER,
          PAGESPEED_KEY: process.env.PAGESPEED_KEY,
          USE_CLOUD: process.env.USE_CLOUD,
          EXTERNAL_URL:
            process.env.EXTERNAL_URL || "http://mf-dash.ddns.net:3000/",
        },
        require("dotenv").config().parsed || {}
      )
    )
  : {};

module.exports.publicConfig = !process.browser
  ? cleanObject(
      Object.assign(
        {},
        {
          AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
          AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
          REDIRECT_URI: process.env.REDIRECT_URI,
          WITH_AUTH: process.env.WITH_AUTH,
          AUTH0_BASE_URL: process.env.EXTERNAL_URL,
          EXTERNAL_URL:
            process.env.EXTERNAL_URL || "http://mf-dash.ddns.net:3000/",
          EXTERNAL_API_ROUTE: process.env.EXTERNAL_API_ROUTE,
        }
      )
    )
  : JSON.parse(
      document.getElementById("publicConfig")
        ? document.getElementById("publicConfig").innerHTML
        : "{}"
    );
