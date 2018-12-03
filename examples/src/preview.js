require('github-markdown-css');

const store = require('./store');

import VMarkdown from '../../src/vmarkdown-render';

(async ()=>{

    const preview = new VMarkDownPreview({
        scrollContainer: '#preview'
    });

    const app = new Vue({
        el: '#app',
        render(h) {
            return this.vdom || h('div', {}, 'loading');
        },
        methods: {
            async refresh(vast) {
                this.vdom = await this.vmarkdown.process(vast);
                this.$forceUpdate();
            }
        },
        beforeMount() {
            this.vmarkdown = new VMarkdown({
                h: this.$createElement
            });
        },
        async mounted() {
            const self = this;
            store.$on('change', function (vast) {
                self.refresh(vast);
            });

            store.$on('cursorChange', function (node, cursor) {
                preview.activeTo(self, node, cursor);
            });

            store.$on('firstVisibleLineChange', function (node, firstVisibleLine, scrollTop) {
                if(scrollTop === 0){
                    preview.goTop();
                    return;
                }
                preview.scrollTo(self, node, firstVisibleLine);
            });

        }

    });

})();

