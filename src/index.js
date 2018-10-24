const NodeUtil = require("./util/node");
const Event = require('./util/event');
// const vremark = require('vremark');
const loadPlugins = require('./load-plugins');
const render = require('vremark-render');

const PromiseWorker = require('promise-worker');
// import Worker from './vmarkdown.worker.js';
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
        // self._bindEvents(self.options);
    }

    _bindEvents(options) {
        const self = this;

        if(options.eventListener === 'storage') {

            window.addEventListener("storage", function(event){
                const key = event.key;
                const value = event.newValue;
                switch (key) {
                    case 'change':{
                        self.setValue(value);
                        break;
                    }
                    case 'cursorChange':{
                        let cursor = JSON.parse(value);
                        self.emit('cursorChange', cursor);
                        break;
                    }
                    case 'firstVisibleLineChange':{
                        let firstVisibleLine = parseInt(value, 10);
                        self.emit('firstVisibleLineChange', firstVisibleLine);
                        break;
                    }
                }
            });

        }
    }

    setValue(value) {
        this.value = value;
        this.emit('change', value);
    }

    getValue() {
        return this.value;
    }

    compile(h) {
        const self = this;

        console.time('all');

        const hast = vremark.parse(self.value, self.options);

        self.hast = hast;

        const vdom = vremark.render(hast, Object.assign({}, self.options, {
            h: h,
            mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body'
        }));

        console.timeEnd('all');

        return vdom;
    }

    async toVDom(h) {
        const self = this;
        // console.log(await parse(self.value));

        // const self = this;
        console.time('worker');
        const {mdast, hast, plugins} = await parse(self.value, {
            rootClassName: 'markdown-body',
            rootTagName: 'main',
            hashid: true
        });
        console.timeEnd('worker');

        console.log( mdast );
        console.log( hast );
        console.log( plugins );

        self.hast = hast;

        await loadPlugins(plugins, function has(plugin) {
            return !!Vue.component(plugin.component);
        }, function load(plugin) {
            return new Promise(async function (resolve, reject) {

                let component = null;

                switch (plugin.component) {
                    case 'vremark-math' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-math" */
                            'vremark-math'
                            );
                        break;
                    case 'vremark-chart' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-chart" */
                            'vremark-chart'
                            );
                        break;
                    case 'vremark-flowchart' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-flowchart" */
                            'vremark-flowchart'
                            );
                        break;
                    case 'vremark-g2' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-g2" */
                            'vremark-g2'
                            );
                        break;
                    case 'vremark-highlight' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-highlight" */
                            'vremark-highlight'
                            );
                        break;
                    case 'vremark-mermaid' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-mermaid" */
                            'vremark-mermaid'
                            );
                        break;
                    case 'vremark-sequence' :
                        component = await import(
                            /* webpackChunkName: "vremark-component-sequence" */
                            'vremark-sequence'
                            );
                        break;
                }

                resolve(component.default || component);

            });
        }, function register(component) {
            Vue.component(component.name, component);
        });

        console.time('render');
        const vdom = render(hast, {
            h: h
        });
        console.timeEnd('render');
        // self.vdom = vdom;
        // console.log( vdom );

        return vdom || h('div', {}, '======');
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

Event.mixin(VMarkDown);

module.exports = VMarkDown;