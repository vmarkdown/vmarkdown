require('./editor');
require('./preview');

// const md = require('../md/test.md');
//
// const editor = require('./editor');
//
// const preview = require('./preview');
//
// setTimeout(function () {
//     editor.setValue(md);
// }, 0);




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
*/









