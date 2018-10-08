const vremark = require('../assets/vremark.common');
const renderer = require('remark-vue-renderer');

const math = require('remark-math');
const katex = require('../assets/vremark-plugin-katex.common');
const highlight = require('../assets/vremark-plugin-highlight.common');
// const flowchart = require('../../src/plugins/flowchart/index');
// const sequence = require('../../src/plugins/sequence/index');
// const mermaid = require('../../src/plugins/mermaid/index');

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
    .use(highlight, {
    }).use(math).use(katex, {
    // }).use(flowchart, {
    // }).use(sequence, {
    // }).use(mermaid, {
    }).data({
        'settings': {
            'renderer': renderer,
            'rootClassName': 'markdown-body'
        }
    }).freeze();

module.exports = processor;