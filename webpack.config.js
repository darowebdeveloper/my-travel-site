// Require path from node.js
const path = require('path');
// PostCSS plugins for webpack...
// npm i all of the following --save-dev
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("autoprefixer"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
];
// Export the {} for webpack npm i webpack webpack-cli --save-dev
// Inside package.json => "script": {"dev":"webpack"} for no webpack-dev-server
module.exports = {
  // Where the starting script
  entry: "./app/assets/scripts/App.js",
  // After bundling what the name and location
  output: {
    // Name after bundling
    filename: "bundled.js",
    // Absolute location to store the bundled by using path.resolve
    path: path.resolve(__dirname, "app"),
  },
  // Use devSErver -> npm i webpack-dev-server --save-dev => "script":{"dev":"webpack-dev-server"}
  devServer: {
    // Watch & reload the changes made to html files
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    // Where to serve to the output bundled directory by using path.join
    contentBase: path.join(__dirname, "app"),
    // Use hot module replacing (inject css & js) <=> need to add module.hot in the App.js file
    hot: true,
    port: 3000,
    // For local hosting with local network
    host: "0.0.0.0",
  },
  // Required by webpack 
  mode: "development",
  // Where to put additional plugins for webpacks like css
  module: {
    rules: [
      {
        // For all css files using regx
        test: /\.css$/i,
        // Use the following plugins when webpack see .css file in App.js
        use: [
          // npm i style-loader --save-dev for parsing styles in browsers & in App.js
          "style-loader",
          // npm i css-loader --save-dev for loading css in App.js
          // ?url=false not to handle images in css file like background-image
          "css-loader?url=false",
          {
            // npm i postcss-loader --save-dev to understand postcss
            loader: "postcss-loader",
            options: {
              // Many plugins for postcss-loader
              plugins: postCSSPlugins,
            },
          },
        ],
      },
    ],
  },
};