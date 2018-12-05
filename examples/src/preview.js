require('github-markdown-css');

const store = require('./store');

// const settings = {
//     flowchart: {
//
//     }
// };

import Vue from 'vue';
import VMarkdown from '../../src/vmarkdown-render';


function register(component) {
    Vue.component(component.name, component);
}


const Preview = Vue.extend(VMarkDownPreview);
const preview = new Preview({
    el: '#app',
    scrollContainer: '#preview'
});

const vmarkdown = new VMarkdown({
    h: preview.$createElement,
    plugins: require('../../src/libs/vremark/vremark-plugins.js'),
    register: register
});

store.$on('change', async function (vast) {
    const vdom = await vmarkdown.process(vast);
    preview.setValue(vdom);
});

store.$on('scrollTo', function (options) {
    console.log(options);

    preview.scrollTo(options);
});
store.$on('cursorChange', function (options) {
    preview.activeTo(options);
});





// import VMarkdown from '../../src/vmarkdown-render';
// (async ()=>{
//
//     const preview = new VMarkDownPreview({
//         scrollContainer: '#preview'
//     });
//
//     const app = new Vue({
//         el: '#app',
//         render(h) {
//             return this.vdom || h('div', {}, 'loading');
//         },
//         methods: {
//             async refresh(vast) {
//                 this.vdom = await this.vmarkdown.process(vast);
//                 this.$forceUpdate();
//             }
//         },
//         beforeMount() {
//             this.vmarkdown = new VMarkdown({
//                 h: this.$createElement
//             });
//         },
//         async mounted() {
//             const self = this;
//             store.$on('change', function (vast) {
//                 self.refresh(vast);
//             });
//
//             store.$on('cursorChange', function (node, cursor) {
//                 preview.activeTo(self, node, cursor);
//             });
//
//             store.$on('firstVisibleLineChange', function (node, firstVisibleLine, scrollTop) {
//                 if(scrollTop === 0){
//                     preview.goTop();
//                     return;
//                 }
//                 preview.scrollTo(self, node, firstVisibleLine);
//             });
//
//         }
//
//     });
//
// })();

