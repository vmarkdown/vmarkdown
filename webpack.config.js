const path = require('path');
const merge = require('webpack-merge');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]",
        // libraryExport: 'default'
    },
    resolve: {
        alias: {
            'vremark': path.resolve(__dirname, 'examples/www', 'vremark.js'),

            // 'vremark': path.resolve(__dirname, 'dist', 'vremark.common.js'),
            // 'vremark-plugin-flowchart': path.resolve(__dirname, 'dist', 'vremark-plugin-flowchart.common.js'),
            // 'vremark-plugin-highlight': path.resolve(__dirname, 'dist', 'vremark-plugin-highlight.common.js'),
            // 'vremark-plugin-mermaid': path.resolve(__dirname, 'dist', 'vremark-plugin-mermaid.common.js'),
            // 'vremark-plugin-sequence': path.resolve(__dirname, 'dist', 'vremark-plugin-sequence.common.js'),
            // 'vremark-plugin-katex': path.resolve(__dirname, 'dist', 'vremark-plugin-katex.common.js'),
            // 'vremark-plugin-toc': path.resolve(__dirname, 'dist', 'vremark-plugin-toc.common.js'),
        }
    },
    module:{
    },
    externals: {
    },
    plugins: [
    ]
};

module.exports = [
    merge(config, {
        entry:{
            vmarkdown: './src/index.js'
        },
        output: {
            library: "VMarkDown"
        },
        externals: {
            'katex': 'katex',
            'lowlight': 'lowlight',


            // 'flowchart.js': 'flowchart',
            // 'Raphael': 'Raphael',
            // 'raphael': 'Raphael',
            // // 'highlight.js': 'highlight.js',
            // 'highlight.js': 'hljs',

            // 'mermaid': 'mermaid',
            // 'underscore': 'underscore'
        }
    })
];

