import remark from 'remark';

import vdom from './vdom';
remark.vdom = vdom;

import toc from 'remark-toc';
remark.toc = toc;

import html from 'remark-html';
remark.html = html;

export default remark;