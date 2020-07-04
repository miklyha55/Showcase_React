var webpack = require('webpack');
var path = require('path');

module.exports = {
  
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './src/index.js'
  ],

  output: {
    publicPath: 'http://localhost:3000/',
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    hot: true,
    historyApiFallback: true
  },

  module: {
  	rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 
            '@babel/preset-react', {
            'plugins': ['@babel/plugin-proposal-class-properties']}]
          }
        }
      },

  		{
        test: /\.less$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
  	]
  }

};