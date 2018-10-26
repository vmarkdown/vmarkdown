require('github-markdown-css');
require('./loading.css');

const store = require('./store');
const VMarkDown = require('vmarkdown');

const preview = new VMarkDownPreview({
    scrollContainer: '#preview'
});

const pluginManager = new VMarkDown.PluginManager({
    loader: function (plugin) {

        return new Promise(function (success, fail) {

            Vue.component(plugin, function (resolve, reject) {
                requirejs([plugin], function(component){
                    resolve(component);
                    success();
                }, function (e) {
                    // reject();
                    resolve({
                        render(h) {
                            return h('pre', {}, [
                                h('code', {}, e.message)
                            ])
                        }
                    });
                    console.error(e);
                    fail();
                });
            });

        });

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
        refresh() {
            const self = this;
            console.time('refresh');
            const vdom = self.vmarkdown.refresh();
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

        vmarkdown.$on('refresh', function (hast) {
            self.refresh(hast);
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