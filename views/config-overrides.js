const TsConfig = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;


function injectForkTsPlugin(config){
  const forkTsPlugin = config.plugins.find((plugin) => {
    return plugin.constructor.name === 'ForkTsCheckerWebpackPlugin';
  });

  if (forkTsPlugin) {
    // Check this, it may be forkTsPlugin.xxx.async - do a console.log(forkTsPlugin) to check structure
    forkTsPlugin.async = true;
    forkTsPlugin.checkSyntacticErrors = false;
  }

  config.resolve = {
    ...config.resolve,
    plugins: [
      ...(config.resolve.plugins ? config.resolve.plugins : []),
      new TsConfig(),
    ],
  };
  return config;
}

module.exports = function override(config) {
  config = injectForkTsPlugin(config);
  return config;
};
