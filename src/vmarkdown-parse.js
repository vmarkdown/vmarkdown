const workerParse = require('./vmarkdown-worker');

const find = require('./util/node');

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

    findNode(position, options = {}) {
        return find(this.vast, position, Object.assign({}, {
            boundary: false,
            next: false,
            depth: 1,
        }, options));
    }

    static calCoverageRatio(position, firstVisibleLine) {
        let coverageRatio = 0;
        if( position && position.start.line < position.end.line) {
            const startLine = position.start.line;
            const endLine = position.end.line;
            const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
            const allLine = endLine - startLine + 1;
            coverageRatio = (currentLine-startLine)/allLine;
        }
        return coverageRatio;
    }
}
