// Get the current npm script that just executed
const currentTask = process.env.npm_lifecycle_event; 
// Require path from node.js
const path = require('path');
// npm install clean-webpack-plugin --save-dev
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// npm install mini-css-extract-plugin --save-dev
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// npm install html-webpack-plugin --save-dev
const HtmlWebpackPlugin = require('html-webpack-plugin');
// npm in fs-extra --save-dev
const fse = require('fs-extra');
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
// Our own webpack plugin to copy images to the dist folder
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', () => {
      // To host on github we need to name the folder to docs not dist
      // fse.copySync('./app/assets/images', './dist/assets/images');
      fse.copySync("./app/assets/images", "./docs/assets/images");
    });
  }
}

let cssConfig = {
  // For all css files using regx
  test: /\.css$/i,
  // Use the following plugins when webpack see .css file in App.js
  use: [
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
};
// Get all the files in ./app folder used in the config.plugins
let pages = fse.readdirSync('./app').filter((file) => {
  return file.endsWith('.html');
}).map((page) => {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  });
});

let config = {
  // Where the starting script
  entry: "./app/assets/scripts/App.js",
  // Add webpack plugins to render the html files
  plugins: pages,
  // Where to put additional plugins for webpacks like css
  module: {
    rules: [
      cssConfig
    ],
  },
};
if(currentTask == 'dev') {
  cssConfig.use.unshift(
    // npm i style-loader --save-dev for parsing styles in browsers & in App.js
    "style-loader"
  );
  // After bundling what the name and location
  config.output = {
    // Name after bundling
    filename: "bundled.js",
    // Absolute location to store the bundled by using path.resolve
    path: path.resolve(__dirname, "app"),
  };
  // Use devSErver -> npm i webpack-dev-server --save-dev => "script":{"dev":"webpack-dev-server"}
  config.devServer = {
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
  };
  // Required by webpack 
  config.mode = "development";
}
if (currentTask == "build") {
  // Use babel loader to ensure old browser compatability
  // npm install @babel/core @babel/preset-env babel-loader --save-dev
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  });
  // Extract css to its own files
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  // npm install cssnano --save-dev to minify the css extracted files
  postCSSPlugins.push(require('cssnano'));
  // After bundling what the name and location
  config.output = {
    // Name after bundling
    // Dealing with browser caching with filename and chunkFilename
    filename: "[name].[chuckhash].js",
    chunkFilename: "[name].[chuckhash].js",
    // Absolute location to store the bundled by using path.resolve
    // To host on github we need to name the folder to docs not dist
    // path: path.resolve(__dirname, "dist"),
    path: path.resolve(__dirname, "docs"),
  };
  // Required by webpack 
  config.mode = "production";
  // Split vendor codes, our codes to separate files
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    }
  };
  config.plugins.push(
    // Remove old files so only new files
    new CleanWebpackPlugin(),
    // Create the plugin
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
    // Create our own plugin
    new RunAfterCompile()
  );
}

// Export the {} for webpack npm i webpack webpack-cli --save-dev
// Inside package.json => "script": {"dev":"webpack"} for no webpack-dev-server
module.exports = config;
