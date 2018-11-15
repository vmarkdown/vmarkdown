const parse = require('vremark-parse');
const registerPromiseWorker = require('promise-worker/register');

registerPromiseWorker(function (message) {
    // console.time('parse');
    // const r = parse(message.markdown || '', message.options || {});
    // console.timeEnd('parse');
    // return r;
    return parse(message.markdown || '', message.options || {});
});