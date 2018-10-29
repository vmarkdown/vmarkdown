require('github-markdown-css');
require('./loading.css');

const store = require('./store');
const VMarkDown = require('vmarkdown');

const preview = new VMarkDownPreview({
    scrollContainer: '#preview'
});

const PluginManager = require('vremark-plugin-manager');

// const pluginManager = new PluginManager({
//     loader: function (plugin) {
//
//         return new Promise(function (success, fail) {
//
//             Vue.component(plugin, function (resolve, reject) {
//                 requirejs([plugin], function(component){
//                     resolve(component);
//                     success();
//                 }, function (e) {
//                     // reject();
//                     resolve({
//                         render(h) {
//                             return h('pre', {}, [
//                                 h('code', {}, e.message)
//                             ])
//                         }
//                     });
//                     console.error(e);
//                     fail();
//                 });
//             });
//
//         });
//
//     }
// });
const pluginManager = new PluginManager({
    plugins: [

    ],
    config: {
        paths: Object.assign({
        }, window.__plugins__)
    },
    onOneLoaded: function (plugin) {
        const component = plugin.component || plugin;
        Vue.component(component.name, component);
    }
});

const app = new Vue({
    el: '#app',
    data: {
        vdom: null
    },
    render(h) {
        return this.vdom || h('div', {
            'class': ['loading-container'],
            domProps: {
                innerHTML: require('./loading.svg')
            }
        });
    },
    methods: {
        async refresh(value) {
            const self = this;
            console.time('refresh');
            const vdom = await self.vmarkdown.process(value, true);
            console.timeEnd('refresh');
            self.vdom = vdom;
        },
        async setValue(md) {
            const self = this;
            const vdom = await self.vmarkdown.process(md);
            self.vdom = vdom;
        }
    },
    async mounted(){

        const self = this;

        const h = self.$createElement;

        const vmarkdown = new VMarkDown({
            h: h,
            pluginManager: pluginManager,
            rootClassName: 'markdown-body',
            rootTagName: 'main',
            hashid: true
        });

        self.vmarkdown = vmarkdown;

        vmarkdown.$on('refresh', function (value) {
            self.refresh(value);
        });

        store.$on('change', function (value) {
            self.setValue(value);
        });

        store.$on('cursorChange', function (cursor) {
            const node = vmarkdown.findNode(cursor);
            // console.log('cursorChange================', cursor);
            // console.log(node);
            preview.activeTo(node, cursor);
        });

        store.$on('firstVisibleLineChange', function (firstVisibleLine) {
            const node = vmarkdown.findNodeFromLine(firstVisibleLine);
            // console.log('firstVisibleLineChange================', firstVisibleLine);
            // console.log(node);
            preview.scrollTo(node, firstVisibleLine);
        });


    }
});


module.exports = preview;