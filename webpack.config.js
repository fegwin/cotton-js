const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cotton.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['es2015'],
  //       },
  //     },
  //   ],
  // },
};
