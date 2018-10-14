const md = require('../md/demo.md');
const vmarkdown = require('./vmarkdown');

const editor = new CodeMirrorEditor(document.getElementById('editor'), {
    value: md,
    lineNumbers: true
});


editor.on('cursorChange', function (cursor) {
    // console.log('cursorChange');
    // localStorage.setItem("cursor", JSON.stringify(cursor));
    vmarkdown.emit('cursorChange', cursor);
});

function onScroll() {
    const firstVisibleLine = editor.getFirstVisibleLine();
    // console.log(firstVisibleLine);
    vmarkdown.emit('firstVisibleLineChange', firstVisibleLine);
    // localStorage.setItem("cursor", JSON.stringify(cursor));
    // localStorage.setItem("markdown", editor.getValue());
    // localStorage.setItem("firstVisibleLine", editor.getFirstVisibleLine());
}

editor.on('scroll', _.throttle(onScroll, 300));

function onChange() {
    // console.log('onChange');
    // localStorage.setItem("markdown", editor.getValue());
    const value = editor.getValue();
    vmarkdown.setValue(value)
}

setTimeout(function () {
    vmarkdown.setValue(md);
}, 100);

editor.on('change', _.debounce(onChange, 500));

module.exports = editor;