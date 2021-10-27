const { default: getConfig } = require("next/config");

module.exports = {
  serverRuntimeConfig: {
    rewriteRoutes: [
      {
        source: "/articles/:article",
        destination: "/article",
      },
      // Order matters for "wider match"
      {
        source: "/:prefectureName/:city",
        destination: "/city",
      },
    ],
  },
  async rewrites() {
    // Get shared "rewriteRoutes" config through "serverRuntimeConfig".
    const { serverRuntimeConfig } = getConfig();
    const { rewriteRoutes } = serverRuntimeConfig;
    return rewriteRoutes;
  },
};
