module.exports = function attacher(options = {}) {
    return function transformer(root) {

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

    };
};