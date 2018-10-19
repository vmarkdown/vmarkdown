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
            'vremark': path.resolve(__dirname, 'www', 'vremark.js'),
            'vmarkdown': path.resolve(__dirname, '../src', 'index.js'),

            // 'vremark': path.resolve(__dirname, 'assets', 'vremark.common.js'),
            // 'vremark-plugin-flowchart': path.resolve(__dirname, 'assets', 'vremark-plugin-flowchart.common.js'),
            // 'vremark-plugin-highlight': path.resolve(__dirname, 'assets', 'vremark-plugin-highlight.common.js'),
            // 'vremark-plugin-mermaid': path.resolve(__dirname, 'assets', 'vremark-plugin-mermaid.common.js'),
            // 'vremark-plugin-sequence': path.resolve(__dirname, 'assets', 'vremark-plugin-sequence.common.js'),
            // 'vremark-plugin-katex': path.resolve(__dirname, 'assets', 'vremark-plugin-katex.common.js'),
            // 'vremark-plugin-toc': path.resolve(__dirname, 'assets', 'vremark-plugin-toc.common.js'),
            // 'mdast-util-incremental': path.resolve(__dirname, 'assets', 'incremental.js')
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
            }
        ]
    },
    externals: {
        'katex': 'katex',
        'lowlight': 'lowlight',

        'flowchart.js': 'flowchart',
        'underscore': '_',
        'mermaid': 'mermaid',
        '@antv/g2': 'G2'


        // 'flowchart.js': 'flowchart',
        // 'highlight.js': 'hljs',
        // 'katex': 'katex',
        // 'mermaid': 'mermaid',
        // 'underscore': '_'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/index.html'
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

