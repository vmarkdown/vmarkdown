const render = require('vremark-render');

export default class VMarkdown {

    constructor(options) {
        const self = this;
        self.options = Object.assign({}, options);
        self.plugins = [];
    }

    async process(hast, options = {}) {
        const self = this;
        return await render(hast, self.plugins, Object.assign({}, self.options, options));
    }
}
