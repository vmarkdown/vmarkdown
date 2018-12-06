const render = require('vremark-render');

export default class VMarkdown {

    constructor(options) {
        const self = this;
        self.options = Object.assign({
            plugins: {
                settings: {},
                plugins: []
            }
        }, options);
        // self.plugins = self.options.plugins || {
        //     settings: {},
        //     plugins: []
        // };

        // self.h = h;

        // self.plugins = plugins || {
        //     settings: {},
        //     plugins: []
        // };
        //
        // self.settings = settings || {};

        // self.h = self.options.h;



    }

    async process(hast, options = {}) {
        const self = this;
        return await render(hast, self.options.plugins, Object.assign({
            h: self.options.h,
            register: self.options.register,
        }, self.options.plugins.settings, options));
    }
}
