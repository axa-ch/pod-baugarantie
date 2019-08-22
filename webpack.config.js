const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlStringReplace = require('webpack-html-string-replace-plugin');
const config = require('config');
require('dotenv').config();
const fs = require('fs');

const babelrc = JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`));
const { sep } = path;

/*-------------------------------------------------*/
const outputPath = 'dist';

const entryFile = 'standalone.js';

module.exports = {
  // webpack optimization mode
  mode: ( process.env.NODE_ENV ? process.env.NODE_ENV : 'development' ),

  // entry file(s)
  entry: `./src/${entryFile}`,

  // output file(s) and chunks
  output: {
    library: 'PodBaugarantie',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, outputPath),
    filename: 'index.js',
    publicPath: config.get('publicPath')
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /.js$/,
        include: [
          /src/,
          new RegExp(`node_modules${sep}lit-html`),
          new RegExp(`node_modules${sep}lit-element`),
          new RegExp(`node_modules${sep}@axa-ch(?!${sep}patterns-library-polyfill)`),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            ...babelrc
          }
        }
      },
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new HtmlStringReplace({
      enable: true,
      patterns: [
        {
          match: /data-api-url="([^"]*)"/g,
          replacement: () => {
            return `data-api-url="${process.env.API_URL || 'http://localhost:3000'}"`;
          }
        },
      ]
    })
  ],

  // development server configuration
  devServer: {

    // must be true for SPAs
    historyApiFallback: true,

    // open browser on server start
    open: ( process.env.NODE_ENV === 'production' ? false : config.get('open') )
  },

  // generate source map
  devtool: ( process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map' ),
};
