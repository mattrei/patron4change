let path = require('path');
let webpack = require('webpack');

module.exports = {

  devtool: '#inline-source-map',

  entry: [
  	'webpack-hot-middleware/client', // for hot reload
  	'./client/index.js' // entry point for the client app
  ],

  //
  output: {
  	path: path.join(__dirname, 'build'),
  	filename: 'bundle.js',
  	publicPath: '/static/'
  },

  //
  plugins: [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
  ],

  //
  resolve: {
	alias: {
	},
	extensions: ['', '.js']
  },

  module: {
  	loaders: [
  		{
  		  test: /\.js$/,
  		  loader: 'babel',
  		  exclude: /node_modules/,
  		  include: __dirname,
  		  query: {
  		    presets: [ 'react-hmre', 'es2015', 'stage-0', 'react' ],
  		    plugins: [ 'transform-decorators-legacy' ],
  		  }
  		},
  		{
  		  test: /\.css$/,
  		  loader: 'style!css',
  		},
  	]
  }
};
