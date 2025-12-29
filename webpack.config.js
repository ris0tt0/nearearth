const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'jayneo',
  filename: 'remoteEntry.js',
  shared: {
    '@emotion/react': { singleton: true },
    '@emotion/styled': { singleton: true },
    '@mui/material': { singleton: true },
    '@mui/system': { singleton: true },
    '@mui/x-date-pickers': { singleton: true },
    axios: { singleton: true },
    'date-fns': { singleton: true },
    'js-logger': { singleton: true },
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
  // exposes: {
  //   './DateUtils': path.resolve(__dirname, 'src/utils.ts'),
  //   './Apod': path.resolve(__dirname, 'src/components/apod/index.tsx'),
  //   './CommandsProvider': path.resolve(__dirname, 'src/providers/commands.tsx'),
  // },
};

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'neo-[name].js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    port: 9004,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'near earth objects',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true,
      defaults: true,
    }),
    new ModuleFederationPlugin({
      ...federationConfig,
    }),
    new FederatedTypesPlugin({
      federationConfig,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
