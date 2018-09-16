import vremark from 'vremark';
import vremarkPluginKatex from 'vremark-plugin-katex';

export default class VMarkdown {

    constructor(options) {

        this.processor = vremark(options)
            .use(vremarkPluginKatex);

    }



    render(md) {
        const file = this.processor.data('h', 'h').processSync(md);
        const vdom = file.contents;
        return vdom;
    }

}