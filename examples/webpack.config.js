const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('../config/webpack.config.base');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js',
        // libraryTarget: "umd",
        // library: "[name]",
        // libraryExport: 'default'
    },
    resolve: {
        alias: {

        }
    },
    module: {
        rules: [

        ]
    },
    externals: {
        'vue': 'Vue'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/index.ejs',
            templateParameters: {
                plugins: JSON.stringify(require('./www/vremark/plugins.json'))
            }
        })
    ],
    devServer: {
        // hotOnly: true,
        hot: false,
        inline: false,
        contentBase: path.join(__dirname, "www")
    }
};

module.exports = [
    merge(base, config, {
        entry: {
            'example-vmarkdown-main': path.resolve(__dirname, 'src/index.js')
        },
        externals: {

        }
    })
];

