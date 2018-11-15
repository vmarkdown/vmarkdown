const PromiseWorker = require('promise-worker');
const Worker = require('./vmarkdown.worker.js');
const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

module.exports = function parse(markdown, options) {
    return promiseWorker.postMessage({
        markdown: markdown,
        options: options
    });
};
