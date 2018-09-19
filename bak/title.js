var toString = require('mdast-util-to-string');

module.exports = function attacher(options = {}) {
    return function transformer(root) {

        debugger

        for(let i=0;i<root.children.length;i++){
            var node = root.children[i];

            if(node.type === 'list'){
                let children = node.children;
                for(let j=0;j<children.length;j++){
                    let listItem = children[j];


                    if(listItem.hasOwnProperty('checked')){

                        listItem.children.push(
                            {
                                type: 'checkbox',
                                checked: listItem.checked
                            }
                        );


                    }

                }

            }
        }
        // let heading = {
        //     type: 'heading',
        //     depth: 1,
        //     children: [{ type: 'text', value: options.heading }],
        // };
        //
        // let first = root.children[0];
        // if (first && first.type === 'heading') {
        //     if (toString(first) !== options.heading) {
        //         root.children[0] = heading;
        //     }
        // } else {
        //     root.children.unshift(heading);
        // }
    };
};