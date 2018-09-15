import remark from 'remark';
// import vdom from './vdom';
import toc from 'remark-toc';
// import html from 'remark-html';
import math from 'remark-math';
// import katex from 'remark-html-katex';
import checkbox from './plugins/remark-checkbox';
import html from './plugins/remark-html';
import vdom from './plugins/vdom/remark-vdom';
import table from './plugins/remark-table';
import katex from './plugins/remark-html-katex/index';

function vremark(options) {

    let processor = remark();

    processor = processor.use(checkbox, {});
    processor = processor.use(table, {});
    processor = processor.use(html, {});

    if(options.math) {
        processor = processor.use(math, options.math);
    }
    if(options.katex) {
        processor = processor.use(katex, options.katex);
    }
    if(options.toc) {
        processor = processor.use(toc, options.toc);
    }

    processor = processor.use(vdom, options.vdom || {});


    // if(options.vdom) {
    //     processor = processor.use(vdom, options.vdom);
    // }
    // else {
    //     processor = processor.use(html, options.html || {});
    // }

    // processor = processor.use(html, options.html || {});


    // return function (md) {
    //     const vfile = processor.processSync(md);
    //     return vfile.contents;
    // }

    // return {
    //
    //     parse() {
    //
    //     }
    //
    //
    // }

    // processor.render = function () {
    //
    //
    // };

    return processor;
}

// vremark.parse = remark.parse;
// const r = remark
// console.log(r);

export default vremark;