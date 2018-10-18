// import VMarkDown from '../../src/index';
let VMarkDown = require('../../src/index');
// VMarkDown = VMarkDown.default?VMarkDown.default:VMarkDown;
const vmarkdown = new VMarkDown({
    // eventListener: 'storage'
    sequence: false
});
module.exports = vmarkdown;