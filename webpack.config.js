const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var isProduction = (process.env.NODE_ENV == "production");

var basePlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: "index.html",
        title: "Antlr Expression Parsers"
    })
];
var developmentPlugins = [
   
];
var productionPlugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({ "process.env": { "NODE_ENV": JSON.stringify("production") } }),
    new UglifyJsPlugin({ sourceMap : false })
   ];


var plugins = (isProduction) ? basePlugins.concat(productionPlugins) : basePlugins.concat(developmentPlugins);


module.exports = {
    entry: "./index.js",
    resolve: {
        extensions: [".js"],
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000
    },
    output: {
        filename: "antlr-exp-parsers.js",
        path: path.join(__dirname, "./", "build"),
    },
    // Source maps support ("inline-source-map" also works)
    devtool: (isProduction) ? "source-map" : "eval",

    // Add the loader for .ts files.
    module: {
        rules: [
            // { test: /\.js?$/, loaders: ['es6-loader'], exclude: /(node_modules)|(assets)|(build)|(dist)|(electron)/ },
        ],
        
    },
    node: { module: "empty", net: "empty", fs: "empty" },
    plugins: plugins
};