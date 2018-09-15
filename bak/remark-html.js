const visit = require('unist-util-visit');

module.exports = function checkbox(options = {}) {

    var Compiler = this.Compiler;
    var visitors = Compiler.prototype.visitors;
    // var original = visitors.heading;

    // visitors.heading = function heading(node) {
    //     return (node.depth === 2 ? '\n' : '') + original.apply(this, arguments);
    // }

    visitors.checkbox = function (node) {
        // return (node.depth === 2 ? '\n' : '') + original.apply(this, arguments);

        return '<input type="checkbox" '+(node.checked?'checked':'')+'>';

    };






    // debugger

    return function transformer(root) {

        // return '<div>====</div>';
        // return root;


        debugger

    };

};