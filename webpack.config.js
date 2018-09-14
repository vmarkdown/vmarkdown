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
    module:{
    },
    externals: {
    }
};

module.exports = [
    merge({
        entry:{
            vremark: './src/libs/vremark.js'
        }
    }, config),
    merge({
        entry:{
            vmarkdown: './src/index.js'
        },
        externals: {
            vremark: 'vremark'
        }
    }, config)
];

