const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return String(path.join(__dirname, dir));
}

export default (config, env, helpers) => {
  //devServer

  if (env.production) {
    config.performance.hints = false;
    config.devtool = false;
  } else {
    config.devServer.hot = false;
  }
  //Babel loader
  //antd babel-plugin-import
  let Plugin = helpers.getLoadersByName(config, "babel-loader")[0].rule.options.plugins;
  Plugin.push(["import", { libraryName: "antd", style: true }]);
  //Enable async
  Plugin.push("transform-regenerator");
  Plugin.push([
    "transform-runtime",
    {
      helpers: false,
      polyfill: false,
      regenerator: true
    }
  ]);

  //Custom  Alias
  const alias = config.resolve.alias;

  let customAlias = {
    "@": resolve("src"),
    src: resolve("src"),
    "~": resolve("src/routes"),
    routes: resolve("src/routes"),
    "#": resolve("src/components"),
    components: resolve("src/components"),
    "^": resolve("src/assets"),
    assets: resolve("src/assets")
  };

  for (var key in customAlias) {
    if (customAlias.hasOwnProperty(key)) {
      var resolvePath = customAlias[key];
      alias[String(key)] = resolvePath;
    }
  }

  // begin custom Provide
  let provide = {
    React: "react",
    Link: ["preact-router/match", "Link"]
  };
  let extend_provide = {
    react: ["Component"],
    mobx: ["observable", "action", "autorun", "runInAction", "computed"],
    ["mobx-react"]: ["Provider", "observer", "inject"]
  };

  for (let key in extend_provide) {
    extend_provide[key].forEach(i => (provide[i] = [key, i]));
  }

  config.plugins.push(new webpack.ProvidePlugin(provide));

  //Antd
  const lessloader = helpers
    .getLoadersByName(config, "proxy-loader")
    .filter(loader => loader.loader.options.loader === "less-loader")[0].loader.options;
  lessloader.options.modifyVars = {
    "@primary-color": "#3498db",
    "@btn-height-lg": "40px",
    "@btn-height-base": "32px",
    "@font-size-base": "14px",
    "@font-family": ' "Comfortaa", @font-family-no-number',
    "@icon-url": '"/assets/font/iconfont/iconfont"'
  };
};
