const vmarkdown = require('./vmarkdown');

const preview = new VMarkDownPreview({
    scrollContainer: '#preview'
});

const app = new Vue({
    el: '#app',
    render(h) {
        return vmarkdown.compile(h);
    }
});

vmarkdown.on('change', function (value) {
    app.$forceUpdate();
});

vmarkdown.on('firstVisibleLineChange', function (firstVisibleLine) {
    const node = vmarkdown.findNodeFromLine(firstVisibleLine);
    preview.scrollTo(node);
});

vmarkdown.on('cursorChange', function (cursor) {
    console.log('cursorChange');
    const node = vmarkdown.findNode(cursor);
    console.log(node)
    preview.activeTo(node, cursor);
});

module.exports = preview;



// vmarkdown.setValue(md);

// window.addEventListener("storage", function(event){
//     const key = event.key;
//     const value = event.newValue;
//     switch (key) {
//         case 'change':{
//             vmarkdown.setValue(value);
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








//
// const preview = new VMarkDownPreview({
//     container: '#app',
//     scrollContainer: '#preview',
//     vmarkdown: vmarkdown
// });
//
// module.exports = preview;