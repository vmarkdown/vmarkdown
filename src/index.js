import vremark from 'vremark';
import math from 'remark-math';
import flowchart from 'vremark-plugin-flowchart';
import highlight from 'vremark-plugin-highlight';
import katex from 'vremark-plugin-katex';
import mermaid from 'vremark-plugin-mermaid';
// import sequence from 'vremark-plugin-sequence';
import toc from 'vremark-plugin-toc';
import breaks from 'remark-breaks';
import renderer from 'remark-vue-renderer';

import incremental from 'mdast-util-incremental';

// console.log(incremental);


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
                // console.log(root);
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
        // self.mdast = mdast;
        return mdast;
    }

    _render(h, mdast) {
        const file = this.processor().data('h', h).processSync(md);
        return file.contents;
    }

    patch(h, incremental) {
        const self = this;


        const md = incremental.content[0];

        if(incremental.action === 'reset') {
            let mdast = self.parse(md);
            self.mdast = mdast;
            return self._render(h, mdast);
        }

        else if(incremental.action === 'insert') {

        }


        else if(incremental.action === 'replace') {

        }


        else if(incremental.action === 'remove') {

        }


        // const file = this.processor().data({
        //     h: h,
        //     change: change
        // }).processSync(md);
        // return file.contents;

        // console.log(change);
        //
        // let startLine = change.start.line - 1;
        // let endLine = change.end.line;
        //
        //
        // const lines = getLines(md);
        //
        // console.log(lines);
        //
        // const subLines = lines.slice(startLine, endLine);
        //
        //
        // if(subLines.length>0){
        //
        //     let line = subLines[0];
        //     console.log(line);
        //
        //     let mdast = self.parse(line);
        //
        //     console.log(mdast);
        // }

        return h('div',{},'====');
    }

    render(h, mdast) {
        const file = this.processor().data('h', h).processSync(md);
        return file.contents;
    }

    // render(md, h) {
    //     const file = this.processor().data('h', h).processSync(md);
    //     return file.contents;
    // }

}