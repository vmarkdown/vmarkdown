// require('../assets/vremark.css');
// require('../assets/GitHub-ReadMe.css');
// require('../assets/markdown.css');
require('../../vmarkdown.css');

// const VMarkdown = require('vmarkdown').default;
// const vmarkdown = new VMarkdown({
//     // h: h,
//     // renderer: renderer,
//     lineNumbers: false
// });


const editor = require('./editor');

const preview = require('./preview');

function setValue() {
    const value = editor.getValue();
    preview.setValue(value);
}

editor.on("change",  function (change) {
    // setValue();
    preview.changeValue(change);
});

// setValue();

function initValue() {
    const value = editor.getValue();
    preview.setValue(value);
    // const vm = vmarkdown;
    // debugger
    // const vdom = vmarkdown.render(value);
    // preview.setValue(vdom);

    preview.$mount('#preview');
}
initValue();