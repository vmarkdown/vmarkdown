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

    const node = vmarkdown.findNode(cursor, {
        depth: 2
    });

    let coverageRatio = 0;
    if(node) {
        const position = node.position;
        if( position && position.start.line < position.end.line) {
            const firstVisibleLine = cursor.line;
            const startLine = position.start.line;
            const endLine = position.end.line;
            const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
            const allLine = endLine - startLine + 1;
            coverageRatio = (currentLine-startLine)/allLine;
        }

    }

    store.$emit('cursorChange', {
        node,
        coverageRatio,
        cursor: cursor
    });



    // const node = vmarkdown.findNode(cursor, {
    //     depth: 2
    // });
    //
    // console.log(node);
    //
    // // debugger
    //
    // store.$emit('cursorChange', node, cursor);
});

function onScroll() {

    const firstVisibleLine = editor.getFirstVisibleLine();
    // store.$emit('vmarkdown/scrollTo', firstVisibleLine);

    const node = vmarkdown.findNode({
        line: firstVisibleLine,
        column: 1
    }, {
        boundary: true,
        next: true
    });

    let coverageRatio = 0;
    if(node) {
        const position = node.position;
        const startLine = position.start.line;
        const endLine = position.end.line;
        const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
        const allLine = endLine - startLine + 1;
        coverageRatio = (currentLine-startLine)/allLine;
    }

    store.$emit('scrollTo', {
        firstVisibleLine: firstVisibleLine,
        node: node,
        coverageRatio: coverageRatio
    });





    // const firstVisibleLine = editor.getFirstVisibleLine();
    //
    // let scrollTop = -1;
    // if(firstVisibleLine === 1){
    //     scrollTop = editor.getScrollTop();
    // }
    //
    // const node = vmarkdown.findNode({
    //     line: firstVisibleLine,
    //     column: 1
    // }, {
    //     boundary: true,
    //     next: true
    // });
    //
    // console.log(node);

    // store.$emit('firstVisibleLineChange', node, firstVisibleLine, scrollTop);
    // store.$emit('firstVisibleLineChange', firstVisibleLine, scrollTop);

}

editor.on('scroll', _.throttle(onScroll, 100));

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
