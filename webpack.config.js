const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
    'axios': 'axios',
    "@testing-library/react": "@testing-library/react"
  },
  output: {
    filename: 'index.js',
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
  },
};