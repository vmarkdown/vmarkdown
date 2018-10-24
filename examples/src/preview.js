const store = require('./store');

const preview = new VMarkDownPreview({
    scrollContainer: '#preview'
});


const VMarkDown = require('vmarkdown');

const vmarkdown = new VMarkDown({
});

// vmarkdown.setValue(md);

const app = new Vue({
    el: '#app',
    data:{
        vdom: null
    },
    render(h) {
        return this.vdom || h('div', {}, 'loading');
    },
    methods: {
        async setValue(md) {
            const self = this;
            vmarkdown.setValue(md);
            const h = self.$createElement;
            const vdom = await vmarkdown.toVDom(h);
            self.vdom = vdom;
        }
    },
    async mounted(){

        const self = this;

        store.$on('change', function (value) {
            self.setValue(value);
        });

        store.$on('cursorChange', function (cursor) {
            const node = vmarkdown.findNode(cursor);
            console.log('cursorChange================', cursor);
            console.log(node);
            preview.activeTo(node, cursor);
        });

        store.$on('firstVisibleLineChange', function (firstVisibleLine) {
            const node = vmarkdown.findNodeFromLine(firstVisibleLine);
            console.log('firstVisibleLineChange================');
            console.log(node);
            preview.scrollTo(node);
        });


    }
});






// const app = new Vue({
//     el: '#app',
//     render(h) {
//         return h('div', {}, 'loading');
//         // return vmarkdown.compile(h);
//     }
// });

// vmarkdown.on('change', function (value) {
//     app.$forceUpdate();
// });
//
// vmarkdown.on('firstVisibleLineChange', function (firstVisibleLine) {
//     // const node = vmarkdown.findNodeFromLine(firstVisibleLine);
//     // preview.scrollTo(node);
// });
//
// vmarkdown.on('cursorChange', function (cursor) {
//     console.log('cursorChange');
//     // const node = vmarkdown.findNode(cursor);
//     // console.log(node)
//     // preview.activeTo(node, cursor);
// });





// vmarkdown.setValue(md);

// window.addEventListener("storage", function(event){
//     debugger
//
//     const key = event.key;
//     const value = event.newValue;
//     switch (key) {
//         case 'change':{
//             // vmarkdown.setValue(value);
//             // app.$forceUpdate();
//
//             app.setValue(value);
//             break;
//         }
//         case 'cursorChange':{
//             let cursor = JSON.parse(value);
//             vmarkdown.emit('cursorChange', cursor);
//             break;
//         }
//         case 'firstVisibleLineChange':{
//             let firstVisibleLine = parseInt(value, 10);
//             vmarkdown.emit('firstVisibleLineChange', firstVisibleLine);
//             break;
//         }
//     }
// });



module.exports = preview;




//
// const preview = new VMarkDownPreview({
//     container: '#app',
//     scrollContainer: '#preview',
//     vmarkdown: vmarkdown
// });
//
// module.exports = preview;