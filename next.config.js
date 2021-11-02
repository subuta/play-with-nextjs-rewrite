const { default: getConfig } = require("next/config");

const rewriteRoutes = [
  {
    source: "/articles/:article",
    destination: "/article",
  },
  // Order matters for "wider match"
  {
    source: "/:prefectureName/:city",
    destination: "/city",
  },
];

module.exports = {
  serverRuntimeConfig: {
    rewriteRoutes,
  },
  async rewrites() {
    return rewriteRoutes;
  },
};
