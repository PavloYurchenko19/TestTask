const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: false,
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: 'auto'
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          cacheCompression: false,
          cacheDirectory: true,
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(css)$/,
        use: [ 'style-loader','css-loader','import-glob-loader']
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader:MiniCssExtractPlugin.loader,
        }, 'css-loader','sass-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
        type: 'asset/resource',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "/public",
              publicPath: "/public"
            }
          }
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true
      },
      inject: true
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new TerserWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public',
          to: 'public',
          globOptions: {
            ignore: ['**/index.html','**/manifest.json','**/robots.txt'],
          },
        },
      ],
    })
  ]
}