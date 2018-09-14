import vremark from 'vremark';

export default function vmarkdown(md, options) {
    var file = vremark().use(vremark.vdom, options).processSync(md);
    return file.contents;
}