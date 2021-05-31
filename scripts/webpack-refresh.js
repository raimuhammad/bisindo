const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

module.exports = {
  load(config) {
    const webpack = require("webpack");
    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: require.resolve("ts-loader"),
    //       options: {
    //         getCustomTransformers: () => ({
    //           before: [ReactRefreshTypeScript()],
    //         }),
    //       },
    //     },
    //   ],
    // });
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
  },
};
