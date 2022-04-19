const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "cdn-icons-png.flaticon.com",
      "i.scdn.co",
    ],
  },
});
