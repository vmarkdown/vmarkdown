// const Renderer = require('./renderer');
// const createElement = require('./create-element');

const Parser = require('./parser');

module.exports = function vdom(options = {}) {

    const parser = new Parser(options);

    // const renderer = new Renderer(options);
    return function transformer(root) {
        // console.log('transformer')
        // console.log(root);
        // return createElement(root);
        // return '<div>====</div>';
        return parser.parse(root);
    };

};