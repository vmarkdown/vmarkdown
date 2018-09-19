import vremark from './libs/vremark';

import React from 'react';
const h = React.createElement;

export default class Markdown {

    constructor(options) {

    }

    parse() {

    }

    compile() {

    }
}
/*
export default function vmarkdown(md, options) {

    const processor = vremark().data({
        'h': h,
        // 'hljs': window.hljs,
        // 'flowchart': window.flowchart,
        // 'mermaid': window.mermaid,
        // 'katex': window.katex,
        // 'Diagram': window.Diagram,
    });

    const file = processor.processSync(md);

    return file.contents;

    // var file = vremark()
    //     .use(vremark.toc, {
    //         // heading: 'TOO'
    //     })
    //     // .use(vremark.vdom, options)
    //     .use(vremark.html)
    //     .processSync(md);

    // var parser = vremark();
    //
    // parser = parser.use(vremark.math);
    // parser = parser.use(vremark.katex);
    //
    // if(options.toc) {
    //     parser = parser.use(vremark.toc, options.toc);
    // }
    // if(options.vdom) {
    //     parser = parser.use(vremark.vdom, options.vdom);
    // }
    // if(options.html) {
    //     parser = parser.use(vremark.html, options.html);
    // }
    //
    //
    //
    // var file = parser.processSync(md);
    //
    // return file.contents;
}
*/