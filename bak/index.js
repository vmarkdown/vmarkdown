import remark from 'remark';
// import unified from 'unified';
// import vdom from 'remark-vdom';
import vdom from './vdom';

export default function vmarkdown(md, options, callback) {
    // unified()
    //     .use(markdown)
    //     .use(vdom, options)
    //     .process(md, function(err, file) {
    //         if (err) throw err
    //         // console.dir(file.contents, {depth: null})
    //         callback(file.contents);
    //     });
    // var h = options.h;

    // remark()
    //     // .use(vdom, options)
    //     .process(md, function(err, file) {
    //         if (err) throw err;
    //         callback(file.contents);
    //     });

    // remark()
    //     .data('settings', {commonmark: true, emphasis: '*', strong: '*'})
    //     .process(md, function (err, file) {
    //         if (err) throw err;
    //         callback(file.contents);
    //     });
    // remark().use(vdom, options).processSync('*foo*')

    // remark()
    //     .use(vdom, options)
    //     .process(md, function (err, file) {
    //         if (err) throw err;
    //         console.log(file)
    //         // callback(file.contents);
    //     });
    var file = remark().use(vdom, options).processSync(md);
    return file.contents;
}