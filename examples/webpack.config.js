const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            'vremark-parse': path.resolve(__dirname, 'www/', 'vremark-parse.min.js'),
            'vremark-render': path.resolve(__dirname, 'www/', 'vremark-render.min.js'),
            'vmarkdown': path.resolve(__dirname, '../src', 'index.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.md$/,
                use: 'text-loader'
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { name: '[name].js' }
                    // options: { name: 'name].[hash].js' }
                }
            }
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
                plugins: JSON.stringify(require('./www/plugins.json'))
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
    merge(config, {
        entry: {
            'example-vmarkdown-main': path.resolve(__dirname, 'src/index.js')
        },
        externals: {

        }
    })
];

