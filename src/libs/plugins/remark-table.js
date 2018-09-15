const visit = require('unist-util-visit');

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        visit(root, 'table', function (node) {
            const align = node.align;

            if (!align || align.length === 0){
                return;
            }

            visit(node, 'tableCell', function (td, index) {
                if(index<align.length){
                    td.align = align[index];
                }
            });
        });

    };

};