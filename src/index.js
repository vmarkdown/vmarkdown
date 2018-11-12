const NodeUtil = require("./util/node");
const Event = require('./util/event');
const render = require('vremark-render');

const workerParse = require('vremark-parse');

function h(tagName, data, value) { return value }

class VMarkDown {

    constructor(options) {
        const self = this;

        self.options = options || {};

        self.plugins = self.options.plugins || {};
        // self.h = options.h || function (tagName, data, value) { return value };
        self.h = h;

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

    registerPlugin(plugin) {
        VMarkDown.Vue && VMarkDown.Vue.component(plugin.component.name, plugin.component);
        this.plugins[plugin.name] = {
            component: plugin.component.name
        };
    }

    async process(markdown = '') {

        const self = this;

        const options = Object.assign({}, self.options, {
            plugins: self.plugins
        });

        const {mdast, hast} = await VMarkDown.parse(markdown, options);
        self.mdast = mdast;
        self.hast = hast;

        const vdom = VMarkDown.render(hast, {
            h: self.h,
            plugins: self.plugins
        });

        return vdom;
    }

    async refresh(value) {
        return await process(value);
    }

    static async parse(markdown, options) {

        console.time('worker');
        const {mdast, hast} = await workerParse(markdown, options);
        console.timeEnd('worker');

        console.log( mdast );
        console.log( hast );
        // console.log( plugins );

        return {mdast, hast};
    }

    static render(hast, options) {
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

// VMarkDown.PluginManager = render.PluginManager;

Event.mixin(VMarkDown);

VMarkDown.install = function (Vue, options) {
    VMarkDown.Vue = Vue;
};

module.exports = VMarkDown;