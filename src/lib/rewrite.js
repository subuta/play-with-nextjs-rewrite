const _ = require("lodash");
const { default: getConfig } = require("next/config");
const { match } = require("path-to-regexp");

let router = null;

class Router {
  constructor(routes) {
    this.routes = this.prepareRoutes(routes);
  }

  prepareRoutes(routes) {
    return _.map(routes, (route) => {
      // SEE: https://github.com/pillarjs/path-to-regexp
      route.match = match(route.source, { decode: decodeURIComponent });
      return route;
    });
  }

  match(pathname) {
    let route, query;

    const matched = _.some(this.routes, (_route) => {
      const matched = _route.match(pathname);
      if (!matched) return;
      route = _route;
      query = matched.params;
      return true;
    });

    if (!matched) return;

    return {
      query,
      route,
    };
  }
}

module.exports = {
  getRouter() {
    if (!router) {
      // Get "rewriteRoutes" config.
      const { serverRuntimeConfig } = getConfig();
      const { rewriteRoutes } = serverRuntimeConfig;
      router = new Router(rewriteRoutes);
    }
    return router;
  },
};
