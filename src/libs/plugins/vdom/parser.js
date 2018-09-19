const Renderer = require('./renderer');

const isArray = (function isArray() {
    if (Array.isArray) return Array.isArray;
    return function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
})();

function Parser(options) {
    this.options = options;
    this.renderer =  new Renderer(options);
}

Parser.prototype.parse = function(nodes) {

    if(!nodes) return null;

    if(isArray(nodes)){
        let vnodes = [];
        for(let i=0;i<nodes.length;i++){
            let node = nodes[i];
            vnodes.push(this.parse(node));
        }
        return vnodes;
    }

    const node = nodes;
    if(!this.renderer[node.type]){
        throw new Error('renderer no method:'+ node.type);
    }

    let children = node.children?this.parse(node.children):[];
    return this.renderer[node.type](node, children);
};

module.exports = Parser;