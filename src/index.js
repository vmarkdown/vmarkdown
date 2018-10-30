const NodeUtil = require("./util/node");
const Event = require('./util/event');
const render = require('vremark-render');
const PromiseWorker = require('promise-worker');

const Worker = require('./vmarkdown.worker.js');
const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

function workerParse(markdown, options) {
    return promiseWorker.postMessage({
        markdown: markdown,
        options: options
    });
}

class VMarkDown {

    constructor(options) {
        const self = this;

        self.options = Object.assign({
            rootClassName: 'markdown-body',
            rootTagName: 'main',
            hashid: true
        }, options?{
            rootClassName: options.rootClassName,
            rootTagName: options.rootTagName,
            hashid: options.hasOwnProperty('hashid') ? options.hashid: true
        }:{});

        self.pluginManager = options.pluginManager;
        self.h = options.h || function (tagName, data, value) { return value };

        self.mdast = {};
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
    }

    async refresh(value) {
        // const self = this;
        // const vdom = render(self.hast, {
        //     h: self.h
        // });
        // return vdom;

        return await process(value);
    }

    async render1(markdown = '', options) {
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
        self.pluginManager && self.pluginManager.load(plugins, function () {
            console.timeEnd('plugins');
            self.$emit('refresh', hast);
        });

        console.time('render');
        const vdom = render(hast, options);
        console.timeEnd('render');

        return vdom;
    }

    static async parse(markdown, options) {

        console.time('worker');
        const {mdast, hast, plugins} = await workerParse(markdown, options);
        console.timeEnd('worker');

        console.log( mdast );
        console.log( hast );
        console.log( plugins );

        return {mdast, hast, plugins};
    }

    static render(hast, options) {
        console.time('render');
        const vdom = render(hast, options);
        console.timeEnd('render');
        return vdom;
    }

    async process(markdown = '', noDetect) {
        const self = this;

        const {mdast, hast, plugins} = await VMarkDown.parse(markdown,
            Object.assign({}, self.options, self.pluginManager?{
                plugins: self.pluginManager.getPlugins()
            }:{})
        );

        self.mdast = mdast;
        self.hast = hast;

        // console.time('plugins');
        // self.pluginManager && self.pluginManager.load(plugins, function () {
        //     console.timeEnd('plugins');
        //     self.$emit('refresh', hast);
        // });
        if( !noDetect && self.pluginManager && plugins.length > 0 ){
            self.pluginManager.load(plugins).then(function (loaded) {
                var isRefresh = loaded?loaded.length>0:false;
                if(isRefresh) {
                    self.$emit('refresh', markdown);
                }
            });
        }

        const vdom = VMarkDown.render(hast, {
            h: self.h
        });

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