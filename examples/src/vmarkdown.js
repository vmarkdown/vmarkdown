// import VMarkDown from '../../src/index';
let VMarkDown = require('../../src/index');
// VMarkDown = VMarkDown.default?VMarkDown.default:VMarkDown;
const vmarkdown = new VMarkDown({
    // eventListener: 'storage'
});
module.exports = vmarkdown;