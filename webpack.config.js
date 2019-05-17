const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('config');
const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`));
const { sep } = path;

/*-------------------------------------------------*/
const outputPath = 'lib';

module.exports = {
    // webpack optimization mode
    mode: ( process.env.NODE_ENV ? process.env.NODE_ENV : 'development' ),

    // entry file(s)
    entry: './src/index.js',

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
        })
    ],

    // development server configuration
    devServer: {

        // must be true for SPAs
        historyApiFallback: true,

        // open browser on server start
        open: config.get('open')
    },

    // generate source map
    devtool: ( 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map' ),
};
