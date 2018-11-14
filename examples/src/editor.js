const store = require('./store');

const editor = new CodeMirrorEditor(document.getElementById('editor'), {
    lineNumbers: true
});

editor.on('cursorChange', function (cursor) {
    store.$emit('cursorChange', cursor);
});

function onScroll() {
    const firstVisibleLine = editor.getFirstVisibleLine();

    let scrollTop = -1;
    if(firstVisibleLine === 1){
        scrollTop = editor.getScrollTop();
    }

    store.$emit('firstVisibleLineChange', firstVisibleLine, scrollTop);
}

editor.on('scroll', _.throttle(onScroll, 300));

function onChange() {
    store.$emit('change', editor.getValue());
}


editor.on('change', _.debounce(onChange, 500));

// vmarkdown.emit('change');

module.exports = editor;