const workerParse = require('./vmarkdown-worker');

export default class VMarkdown {

    constructor(options) {
        const self = this;
        self.options = Object.assign({}, options);
        self.vast = null;
    }

    static async parse(markdown, options) {
        return await workerParse(markdown, options);
    }

    async process(markdown = '', options = {}) {
        const self = this;
        self.vast = await VMarkdown.parse(markdown, Object.assign({}, self.options, options));
        return self.vast;
    }

    findNode(position, _options = {}) {

        const options = Object.assign({}, {
            boundary: false,
            next: false,
            depth: 1,
        }, _options);

        const self = this;
        // const node = NodeUtil.findNode(self.hast, position);
        // return node;

        if(!self.vast) return null;

        const root = self.vast;

        // if( position.line < root.position.start.line
        //     && position.line > root.position.end.line ){
        //     return null;
        // }

        const children = root.children;


        for(let i=0;i<children.length;i++) {

            const node = children[i];

            if( options.boundary && (i === children.length - 1) && (position.line > node.position.end.line) ) {
                return node;
            }

            if( position.line <= node.position.end.line ) {
                if( options.next || position.line >= node.position.start.line ) {
                    return node;
                }
            }

            // if( options.next && position.line <= node.position.end.line) {
            //     return node;
            // }
            // else{
            //     if( position.line >= node.position.start.line
            //         && position.line <= node.position.end.line
            //     ){
            //         return node;
            //     }
            // }



        }

        return null;

        // && position.column <= node.position.end.column
        // if( position.line >= root.position.start.line
        //     && position.column <= root.position.end.line ){
        //
        //     debugger
        //
        //
        // }



    }

}