// import VMarkDown from '../../src/index';
// let VMarkDown = require('../../src/index');
// VMarkDown = VMarkDown.default?VMarkDown.default:VMarkDown;

let VMarkDown = require('vmarkdown');
const vmarkdown = new VMarkDown({
    // eventListener: 'storage'
    // raw: false,
    // raw: true

    G2: true
});
module.exports = vmarkdown;