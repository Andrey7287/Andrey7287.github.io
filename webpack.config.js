'use strict';

const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {

	entry: {
		main: NODE_ENV == 'development' ?
			['webpack-dev-server/client?http://localhost:8080/',
			 'webpack/hot/dev-server',
			 './frontend/main'] :
			'./frontend/main'
	},

	output: {
		path: __dirname + '/js',
		publicPath: '/js/',
		filename: "[name].js?"
	},

	watch: NODE_ENV == 'development',

	devtool: "source-map",

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.ProvidePlugin({
			lockr: 'lockr/lockr'
		}),
		new ExtractTextPlugin("../[name].css", {
			allChunks: true
		})
	],

	module: {

		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-1'],
					plugins: ['transform-runtime']
				}
			},
			{
				test: /\.png$/,
				loader:'file?name=i/[hash].[ext]'
			},{
				test: /\.scss$/,
				loader: NODE_ENV == 'development' ?
				'style-loader!css-loader!sass-loader' :
				ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url-loader?sourceMap!sass-loader?sourceMap')
			}
		]
	},

	resolve: {
		modulesDirectories: ["web_modules", "node_modules", "spritesmith-generated"]
	},

	devServer: NODE_ENV == 'development' ? {
		hot: true
	} : {}

};

if ( NODE_ENV == 'development' ){
	module.exports.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
}
if ( NODE_ENV == 'production' ){
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
}
