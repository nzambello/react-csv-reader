var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'react-csv-reader.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CSVReader',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      root: 'PropTypes'
    }
  }
};
