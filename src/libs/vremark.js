import remark from 'remark';
import vdom from './vdom';
import toc from 'remark-toc';
import html from 'remark-html';
import math from 'remark-math';
import katex from 'remark-html-katex';

function vremark(options) {

    let processor = remark();

    if(options.math) {
        processor = processor.use(math, options.math);
    }
    if(options.katex) {
        processor = processor.use(katex, options.katex);
    }
    if(options.toc) {
        processor = processor.use(toc, options.toc);
    }
    if(options.vdom) {
        processor = processor.use(vdom, options.vdom);
    }
    else {
        processor = processor.use(html, options.html || {});
    }

    return function (md) {
        const vfile = processor.processSync(md);
        return vfile.contents;
    }

}

vremark.parse = remark.parse;

// const r = remark
// console.log(r);

export default vremark;