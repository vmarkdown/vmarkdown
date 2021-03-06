const path = require('path');
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    mode: 'none',
    output: {
    },
    resolve: {
        alias: {
            // 'vremark-parse': path.resolve(__dirname, '../examples/www/vremark', 'vremark-parse.js'),
            // 'vremark-render': path.resolve(__dirname, '../examples/www/vremark', 'vremark-render.js'),

            'vremark-parse': path.resolve(__dirname, '../src/libs/vremark', 'vremark-parse.js'),
            'vremark-render': path.resolve(__dirname, '../src/libs/vremark', 'vremark-render.js'),

            'vmarkdown': path.resolve(__dirname, '../src', 'index.js'),
            'vmarkdown-parse': path.resolve(__dirname, '../src', 'vmarkdown-parse.js'),
            'vmarkdown-render': path.resolve(__dirname, '../src', 'vmarkdown-render.js')
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
                test: /\.svg$/,
                use: 'text-loader'
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { name: production?'[name].[contenthash].min.js':'[name].js' }
                }
            }
        ]
    },
    externals: {
    },
    plugins: [
    ],
    node: {
        fs: 'empty'
    }
};

