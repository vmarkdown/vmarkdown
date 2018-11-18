// const md = require('../md/test.md');
//
// const editor = require('./editor');
//
// const preview = require('./preview');
//
// setTimeout(function () {
//     editor.setValue(md);
// }, 0);
require('github-markdown-css');

const md = require('../md/test.md');

import VMarkdownParse from '../../src/vmarkdown-parse';
import VMarkdownRender from '../../src/vmarkdown-render';

/*
(async ()=>{

    const vmarkdown = new VMarkdownParse();

    const hast = await vmarkdown.process(md);
    console.log(hast);

    console.time('findNode');

    const node = vmarkdown.findNode({
        line: 169,
        column: 1
    }, {
        boundary: false,
        next: false
    });

    console.timeEnd('findNode');

    console.log(node);


})();
*/


function loadPlugins() {

    return new Promise(function (resolve, reject) {

        requirejs([
            'vremark-plugin-math',
            'vremark-plugin-flowchart',
            'vremark-plugin-mermaid',
            'vremark-plugin-sequence',
            'vremark-plugin-g2',
            'vremark-plugin-chart',
            'vremark-plugin-highlight',
            'vremark-plugin-resume'

        ], function () {
            const plugins = Array.prototype.slice.call(arguments);
            resolve(plugins);

            // Array.prototype.slice.call(arguments).forEach(function (plugin) {
            //     vmarkdown.registerPlugin(plugin);
            // });
            //
            // setTimeout(function () {
            //     app.refresh();
            // }, 0);
        });


    });





}

(async ()=>{


    const plugins = await loadPlugins();

    plugins.forEach(function (plugin) {
        Vue.component(plugin.name, plugin.component);
    });

    const parser = new VMarkdownParse({
        config: {
            root: {
                tagName: 'main',
                className: 'markdown-body'
            }
        },
        plugins: (function () {
            const o = {};
            plugins.map((x)=>x.name).forEach(function (name) {
                o[name] = {
                    component: name
                };
            });
            return o;
        })()
    });

    const hast = await parser.process(md);

    console.log(parser.mdast);

    const renderer = new VMarkdownRender({
    });

    const app = new Vue({
        el: '#app',
        render(h) {
            const vdom = renderer.process(hast, {h});
            console.log(vdom);
            return vdom;
        }
    });




})();







