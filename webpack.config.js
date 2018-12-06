const path = require('path');
const merge = require('webpack-merge');
const base = require('./config/webpack.config.base');
const production = (process.env.NODE_ENV === 'production');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: production?'[name].[contenthash].min.js':'[name].js',
        libraryTarget: "umd",
        library: "[name]",
        libraryExport: 'default'
    },
    resolve: {
        alias: {}
    },
    module:{
        rules: [
            // production?{
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }:{}
        ]
    },
    externals: {
    },
    plugins: [
    ],
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             uglifyOptions: {
    //                 compress: {
    //                     drop_console: true
    //                 }
    //             }
    //         })
    //     ]
    // }
};

module.exports = [
    merge(base, config, {
        entry:{
            'vmarkdown-parse': path.resolve(__dirname, './src', 'vmarkdown-parse.js')
        },
        output: {
            library: "VMarkdownParse",
            publicPath: 'vmarkdown/',
        }
    }),
    merge(base, config, {
        entry:{
            'vmarkdown-render': path.resolve(__dirname, './src', 'vmarkdown-render.js')
        },
        output: {
            library: "VMarkdownRender",
            publicPath: 'vmarkdown/',
        }
    })
];

