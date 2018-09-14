import vremark from 'vremark';

export default function vmarkdown(md, options) {
    // var file = vremark()
    //     .use(vremark.toc, {
    //         // heading: 'TOO'
    //     })
    //     // .use(vremark.vdom, options)
    //     .use(vremark.html)
    //     .processSync(md);

    var parser = vremark();

    if(options.toc) {
        parser = parser.use(vremark.toc, options.toc);
    }
    if(options.vdom) {
        parser = parser.use(vremark.vdom, options.vdom);
    }
    if(options.html) {
        parser = parser.use(vremark.html, options.html);
    }

    var file = parser.processSync(md);

    return file.contents;
}