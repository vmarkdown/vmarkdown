import vremark from 'vremark';
import math from 'remark-math';
import flowchart from 'vremark-plugin-flowchart';
import highlight from 'vremark-plugin-highlight';
import katex from 'vremark-plugin-katex';
import mermaid from 'vremark-plugin-mermaid';
// import sequence from 'vremark-plugin-sequence';
import toc from 'vremark-plugin-toc';
import breaks from 'remark-breaks';
import renderer from 'remark-preact-renderer';

function getLines (text) {
    var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
}

export default class VMarkdown {

    constructor(options = {}) {
        const self = this;
        options.renderer = renderer;

        const processor = vremark()
            // .use(function plugin(options) {
            //     return function transform(root) {
            //         root.children.forEach(function (node, i) {
            //             node.properties = node.properties?node.properties:{};
            //             node.properties['data-line'] = node.position.start.line;
            //         });
            //         return root;
            //     }
            // })

            .use(toc, {})
            .use(breaks)

            .use(highlight, {
                lineNumbers: options.lineNumbers
            }).use(math)
            .use(katex, {})
            .use(flowchart, {})
            // .use(sequence, {})
            .use(mermaid, {})

            .data({'settings': options || {}})
            .freeze();


        self.processor = processor().use(function plugin(options) {
            return function transform(root) {
                console.log(root);
                return root;
            }
        }).freeze();

        self.mdast = null;
    }

    /*
    * MDAST
    * */
    parse(md) {
        const self = this;
        // return self.processor.runSync(md);

        let mdast = self.processor.parse(md);
        mdast = self.processor.runSync(mdast);
        self.mdast = mdast;
        return mdast;
    }

    patch(md, change, h) {
        // const file = this.processor().data({
        //     h: h,
        //     change: change
        // }).processSync(md);
        // return file.contents;

        console.log(change);

        let startLine = change.start.line - 1;
        let endLine = change.end.line;


        const lines = getLines(md);

        console.log(lines);

        const subLines = lines.slice(startLine, endLine);

        console.log(subLines);


        return h('div',{},'====');
    }

    render(md, h) {
        const file = this.processor().data('h', h).processSync(md);
        return file.contents;
    }

}