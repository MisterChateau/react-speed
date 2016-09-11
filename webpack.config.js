const webpack = require('webpack');

// File ops
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Folder ops
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// PostCSS support
const postcssImport = require('postcss-easy-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

// Constants
const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build/');
const STYLE = path.join(__dirname, 'app/style.css');
const PUBLIC = path.join(__dirname, 'app/public');
const TEMPLATE = path.join(__dirname, 'app/templates/index.html');
const NODE_MODULES = path.join(__dirname, 'node_modules');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = {
    // Paths and extensions
    entry: {
        app: APP,
        style: STYLE
    },
    output: {
        path: BUILD,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: APP
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss'],
                include: [APP, NODE_MODULES]
            },
            {
                test: /\.json$/,
                loader: 'json',
                include: [APP, NODE_MODULES]
            }
        ]
    },
    // Configure PostCSS plugins
    postcss: function processPostcss(webpack) {
        return [
            postcssImport({
                addDependencyTo: webpack
            }),
            precss,
            autoprefixer({ browsers: ['last 3 versions']})
        ];
    },
    // Source maps used for debugging information
    devtool: 'eval-source-map',
    // webpack-dev-server configuration
    devServer: {
        historyApiFallback: true,
        hot: true,
        host: HOST,
        port: PORT,
        // CopyWebpackPlugin: This is required for webpack-dev-server.
        // The path should be an absolute path to your build destination. outputPath: BUILD
        outputPath: BUILD
    },
    pl
};