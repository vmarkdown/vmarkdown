const NodeUtil = require("./util/node");
const Event = require('./util/event');
const render = require('vremark-render');
const PromiseWorker = require('promise-worker');

const Worker = require('./vmarkdown.worker.js');
const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

function parse(markdown, options) {
    return promiseWorker.postMessage({
        markdown: markdown,
        options: options
    });
}

class VMarkDown {

    constructor(options) {
        const self = this;
        self.options = options || {};
        self.value = '';
        self.hast = {
            position:{
                start: {
                    line: -1,
                    column: 0
                },
                end: {
                    line: -1,
                    column: 0
                }
            }
        };

        self.pluginManager = options.pluginManager;
    }

    getValue() {
        return this.value;
    }

    refresh(h) {
        const self = this;
        const vdom = render(self.hast, {
            h: h
        });
        return vdom;
    }

    async render(markdown = '', options) {
        const self = this;

        console.time('worker');
        const {mdast, hast, plugins} = await parse(markdown, {
            rootClassName: 'markdown-body',
            rootTagName: 'main',
            hashid: true
        });
        console.timeEnd('worker');

        console.log( mdast );
        console.log( hast );
        console.log( plugins );

        self.hast = hast;

        console.time('plugins');
        self.pluginManager.load(plugins, function () {
            console.timeEnd('plugins');
            self.emit('refresh', hast);
        });

        console.time('render');
        const vdom = render(hast, options);
        console.timeEnd('render');

        return vdom;
    }


    findNodeFromLine(line) {
        const self = this;
        const node = NodeUtil.findNodeFromLine(self.hast, line);
        return node;
    }

    findNodeByLine(line) {
        const self = this;
        const node = NodeUtil.findNodeByLine(self.hast, line);
        return node;
    }

    findNode(position) {
        const self = this;
        const node = NodeUtil.findNode(self.hast, position);
        return node;
    }
}

VMarkDown.PluginManager = render.PluginManager;

Event.mixin(VMarkDown);

module.exports = VMarkDown;