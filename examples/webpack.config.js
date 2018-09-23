const path = require('path');
const merge = require('webpack-merge');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // libraryTarget: "umd",
        // library: "[name]",
        // libraryExport: 'default'
    },
    resolve: {
        alias: {
            'vmarkdown': path.resolve(__dirname, '../src', 'index.js'),
            'vremark': path.resolve(__dirname, '../dist', 'vremark.common.js'),
            'vremark-plugin-flowchart': path.resolve(__dirname, '../dist', 'vremark-plugin-flowchart.common.js'),
            'vremark-plugin-highlight': path.resolve(__dirname, '../dist', 'vremark-plugin-highlight.common.js'),
            'vremark-plugin-mermaid': path.resolve(__dirname, '../dist', 'vremark-plugin-mermaid.common.js'),
            'vremark-plugin-sequence': path.resolve(__dirname, '../dist', 'vremark-plugin-sequence.common.js'),
            'vremark-plugin-katex': path.resolve(__dirname, '../dist', 'vremark-plugin-katex.common.js'),
            'vremark-plugin-toc': path.resolve(__dirname, '../dist', 'vremark-plugin-toc.common.js'),

        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
        'flowchart.js': 'flowchart',
        'highlight.js': 'hljs',
        'katex': 'katex',
        'mermaid': 'mermaid',
        'underscore': '_'
    },
    plugins: [

    ]
};

module.exports = [
    merge(config, {
        entry: {
            'example-vmarkdown-main': path.resolve(__dirname, 'index.js')
        },
        externals: {

        }
    })
];

