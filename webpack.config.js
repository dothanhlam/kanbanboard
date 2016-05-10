/**
 * Created by LamDo on 4/22/16.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },

            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ]
    },


    devServer: {
        hot: true,
        inline: true,
        progress: true,
        historyApiFallback: true,
        stats: 'errors-only',
        port: process.env.PORT,
        host: process.env.HOST
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({ title: 'Kanban Board by React-ES6' })
    ]
};