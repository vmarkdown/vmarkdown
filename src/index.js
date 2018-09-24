import vremark from 'vremark';
import math from 'remark-math';
import flowchart from 'vremark-plugin-flowchart';
import highlight from 'vremark-plugin-highlight';
import katex from 'vremark-plugin-katex';
import mermaid from 'vremark-plugin-mermaid';
// import sequence from 'vremark-plugin-sequence';
import toc from 'vremark-plugin-toc';
import breaks from 'remark-breaks';



export default class VMarkdown {

    constructor(options = {}) {
        const self = this;
        self.processor = vremark()
            .use(function plugin(options) {
                return function transform(root) {
                    root.children.forEach(function (node, i) {
                        node.properties = node.properties?node.properties:{};
                        node.properties['data-line'] = node.position.start.line;
                    });
                    return root;
                }
            })

            .use(toc, {})
            .use(breaks)

            .use(highlight, {
                lineNumbers: options.lineNumbers
            }).use(math)
            .use(katex, {})
            .use(flowchart, {})
            // .use(sequence, {})
            .use(mermaid, {})
            .data({'settings': options || {}});
    }

    /*
    * MDAST
    * */
    parse(md) {
        const self = this;
        return self.processor.runSync(md);
    }

    render(md) {
        const file = this.processor.processSync(md);
        return file.contents;
    }

}