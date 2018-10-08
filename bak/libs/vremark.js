import remark from 'remark';

import vdom from './vdom';
remark.vdom = vdom;

import toc from 'remark-toc';
remark.toc = toc;

import html from 'remark-html';
remark.html = html;

import math from 'remark-math';
remark.math = math;

import katex from 'remark-html-katex';
remark.katex = katex;

export default remark;