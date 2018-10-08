// const processor = require('./processor');

const VMarkdown = require('vmarkdown').default;
const vmarkdown = new VMarkdown({
    // h: h,
    // renderer: renderer,
    lineNumbers: false
});

// console.log(vmarkdown.parse('# h1'));
// var change = {
//     action: "insert",
//     content: ["="],
//     end: {line: 1, column: 5},
//     start: {line: 1, column: 5}
// };
// vmarkdown.patch(change);

const preview = new Vue({
    // el: '#app',
    data() {
        return {
            type: 'render',
            change: {},
            md: '',
            vdom: null
        }
    },
    methods: {
        setValue(vdom) {
            // this.vdom = vdom;
            this.type = 'render';
            this.md = vdom;
        },
        changeValue(md, change) {
            // console.log(change);


            // let startLine = change.start.line;
            // let endLine = change.end.line;
            this.md = md;
            this.change = change;
            this.type = 'change';


        }
    },
    render(h) {
        // debugger
        // const file = processor().data('h', h).processSync(this.md);
        // return file.contents;

        if( this.type === 'render' ) {
            return vmarkdown.render(this.md, h);
        }

        const vdom = vmarkdown.patch(this.md, this.change, h);
        return vdom;
        // return this.vdom;
    }
});

module.exports = preview;