const workerParse = require('./vmarkdown-worker');

export default class VMarkdown {

    constructor(options) {
        const self = this;
        self.options = Object.assign({}, options);
        self.mdast = null;
        self.hast = null;
    }

    static async parse(markdown, options) {
        return await workerParse(markdown, options);
    }

    async process(markdown = '', options = {}) {
        const self = this;
        return await VMarkdown.parse(markdown, Object.assign({}, self.options, options));
    }

    findNode(position, _options = {}) {

        const options = Object.assign({}, {
            boundary: false,
            next: false
        }, _options);

        const self = this;
        // const node = NodeUtil.findNode(self.hast, position);
        // return node;

        if(!self.hast) return null;

        const root = self.hast;

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