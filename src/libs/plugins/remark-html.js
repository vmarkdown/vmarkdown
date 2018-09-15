const visit = require('unist-util-visit');

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        visit(root, 'paragraph', function (node) {
            visit(node, 'html', function (item) {
                item.type = 'text';
            });
        });

    };

};