import VMarkdownParse from '../../src/vmarkdown-parse';
const vmarkdown = new VMarkdownParse({
    config: {
        root: {
            tagName: 'main',
            className: 'markdown-body'
        }
    }
});



const store = require('./store');

const editor = new CodeMirrorEditor(document.getElementById('editor'), {
    lineNumbers: true
});

editor.on('cursorChange', function (cursor) {
    const node = vmarkdown.findNode(cursor);
    store.$emit('cursorChange', node, cursor);
});

function onScroll() {
    const firstVisibleLine = editor.getFirstVisibleLine();

    let scrollTop = -1;
    if(firstVisibleLine === 1){
        scrollTop = editor.getScrollTop();
    }

    const node = vmarkdown.findNode({
        line: firstVisibleLine,
        column: 1
    }, {
        boundary: true,
        next: true
    });

    store.$emit('firstVisibleLineChange', node, firstVisibleLine, scrollTop);


    // store.$emit('firstVisibleLineChange', firstVisibleLine, scrollTop);

}

editor.on('scroll', _.throttle(onScroll, 300));

async function onChange() {
    // store.$emit('change', editor.getValue());

    const value = editor.getValue();

    const vast = await vmarkdown.process(value);

    console.log(vast);

    store.$emit('change', vast);
}


editor.on('change', _.debounce(onChange, 500));

// vmarkdown.emit('change');

// module.exports = editor;

const md = require('../md/test.md');

editor.setValue(md);
