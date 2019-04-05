const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*-------------------------------------------------*/

module.exports = {
  // webpack optimization mode
  mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

  // entry file(s)
  entry: './src/index.js',

  // output file(s) and chunks
  output: {
    library: 'PodBaugarantie',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'index.js',
    publicPath: '/',
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    port: 3000,

    // must be true for SPAs
    historyApiFallback: true,
  },

  // generate source map
  devtool: (process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map'),
};
