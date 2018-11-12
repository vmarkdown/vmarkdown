require('github-markdown-css');
require('./loading.css');

const store = require('./store');
const VMarkDown = require('vmarkdown');
Vue.use(VMarkDown);

const preview = new VMarkDownPreview({
    scrollContainer: '#preview'
});

const vmarkdown = new VMarkDown({
    config: {
        root: {
            tagName: 'main',
            className: 'markdown-body'
        }
    }
});

requirejs([
    'vremark-plugin-math',
    'vremark-plugin-flowchart',
    'vremark-plugin-mermaid',
    'vremark-plugin-sequence',
    'vremark-plugin-g2',
    'vremark-plugin-chart',
    'vremark-plugin-highlight'

], function () {
    Array.prototype.slice.call(arguments).forEach(function (plugin) {
        vmarkdown.registerPlugin(plugin);
    });

    setTimeout(function () {
        app.refresh();
    }, 2000);
});

const app = new Vue({
    el: '#app',
    // data: {
    //     vdom: null
    // },
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
            // console.time('refresh');
            // const vdom = await self.vmarkdown.process(value, true);
            // console.timeEnd('refresh');
            // self.vdom = vdom;
            self.setValue(value || self.md);
        },
        async setValue(md) {
            const self = this;
            self.md = md;
            const vdom = await self.vmarkdown.process(md);
            self.vdom = vdom;
            self.$forceUpdate();
        }
    },
    beforeMount(){
        const self = this;
        const h = self.$createElement;
        vmarkdown.h = h;
        self.vmarkdown = vmarkdown;

        vmarkdown.$on('refresh', function (value) {
            self.refresh(value);
        });
    },
    async mounted(){

        const self = this;

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