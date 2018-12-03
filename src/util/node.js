// const findNode = require("./unist-find-node/index");
//
// function _findNode(root, position) {
//     let node = findNode(root, position);
//
//     if(!node || node.type === 'root') {
//         return null;
//     }
//
//     return node;
// }
//
//
// function findNodeByLine(root, line) {
//     let node = findNode(root, {line: line,column: 1});
//
//     if(!node || node.type === 'root') {
//         return null;
//     }
//
//     return node;
// }
//
// function findNodeFromLine(root, line, maxNum = 10) {
//
//     let node = findNode(root, {line: line,column: 1});
//
//     if(!root.position || !root.position.end) {
//         return null;
//     }
//
//     const lastLine = root.position.end.line;
//
//     if(!node || node.type === 'root') {
//         if(maxNum <=0 && line + 1 > lastLine) {
//             return null;
//         }
//         return findNodeFromLine(root, line + 1, maxNum - 1);
//     }
//
//     return node;
// }




function findNode(root, position, options = {}) {
    if(!root || !root.children || root.children.length === 0) return null;

    const children = root.children;

    for(let i=0;i<children.length;i++) {

        const node = children[i];

        if(!node.position || node.type === 'text' ) {
            continue;
        }

        if(

            (options.boundary && (i === children.length - 1) && (position.line > node.position.end.line))
            ||
            (
                (position.line <= node.position.end.line)
                &&
                ( options.next || position.line >= node.position.start.line )
            )
        ) {

            // if(options.depth === 1){
            //     return node;
            // }
            //
            // const depthNode = findNode(node, position, {
            //     depth: 1
            // });
            // return depthNode?depthNode:node;


            // const depthNode = findNode(node, position, options);
            // return depthNode?depthNode:node;



            return node;

        }


    }

    return null;

}

module.exports = findNode;

// module.exports = {
    // findNodeByLine: findNodeByLine,
    // findNodeFromLine: findNodeFromLine,
    // findNode: _findNode
// };
