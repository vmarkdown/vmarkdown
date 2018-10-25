const store = require('./store');

const preview = new VMarkDownPreview({
    scrollContainer: '#preview'
});

const VMarkDown = require('vmarkdown');

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

const vmarkdown = new VMarkDown({
    pluginManager: pluginManager
});

const app = new Vue({
    el: '#app',
    data:{
        vdom: null
    },
    render(h) {
        return this.vdom || h('div', {}, 'loading');
    },
    methods: {
        refresh() {
            const self = this;
            const h = self.$createElement;
            console.time('refresh');
            const vdom = vmarkdown.refresh(h);
            console.timeEnd('refresh');
            self.vdom = vdom;
        },
        async setValue(md) {
            const self = this;
            const h = self.$createElement;
            const vdom = await vmarkdown.render(md, {
                h: h
            });
            self.vdom = vdom;
        }
    },
    async mounted(){

        const self = this;

        vmarkdown.on('refresh', function (hast) {
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
            // console.log('firstVisibleLineChange================');
            // console.log(node);
            preview.scrollTo(node);
        });


    }
});


module.exports = preview;