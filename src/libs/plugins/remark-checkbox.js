const visit = require('unist-util-visit');

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        visit(root, 'list', function (node) {

            // console.log(node);

            visit(node, 'listItem', function (item) {

                if( item.hasOwnProperty('checked') && (item.checked !== null) ){


                    if(item.children.length>0 && item.children[0].type === "paragraph"){
                        let children = item.children[0].children;
                        children.unshift({
                            type: 'text',
                            value: ' '
                        });
                        children.unshift({
                            type: 'checkbox',
                            checked: item.checked
                        });
                    }




                    // console.log(item);

                }

            });

        });

    };

};