const render = require('vremark-render');

export default class VMarkdown {

    constructor(options) {
        const self = this;
        self.options = Object.assign({}, options);
    }

    process(hast, options = {}) {
        const self = this;
        return render(hast, Object.assign({}, self.options, options));
    }
}