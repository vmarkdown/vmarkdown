const path = require('path');
const merge = require('webpack-merge');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]",
        libraryExport: 'default'
    },
    resolve: {
        alias: {
            'vremark': path.resolve(__dirname, 'dist', 'vremark.common.js')
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
    // merge({
    //     entry:{
    //         vremark: './src/libs/vremark.js'
    //     }
    // }, config),
    merge({
        entry:{
            VMarkdown: './src/index.js'
        },
        externals: {
            // 'vremark': 'vremark',
            // 'vremark-plugin-katex': 'vremarkPluginKatex'
        }
    }, config)
];

