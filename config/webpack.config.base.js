const path = require('path');
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    mode: 'none',
    output: {
    },
    resolve: {
        alias: {
            'vremark-parse': path.resolve(__dirname, '../examples/www/vremark', 'vremark-worker.js'),
            'vremark-render': path.resolve(__dirname, '../examples/www/vremark', 'vremark-render.js'),
            // 'vremark-plugin-manager': path.resolve(__dirname, '../examples/www/vremark', 'vremark-plugin-manager.js'),

            'vmarkdown': path.resolve(__dirname, '../src', 'index.js')
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
                    options: { name: production?'[name].[hash].min.js':'[name].js' }
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

