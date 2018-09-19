let index = 0;
function uniqueId(prefix) {
    return prefix + index++;
}

function createElement(node) {

    let vnode = null;
    let children = [];

    switch (node.type) {
        case 'root':
            vnode = h('div', {
                key: uniqueId('div_'),
                className: 'markdown-body'
            }, children);
            break;
        case 'heading':
            vnode = h('h'+node.depth, {
                key: uniqueId('heading_')
            }, children);
            break;
        case 'text':
            vnode = h('span', {
                key: uniqueId('text_'),
            }, node.value);
            break;
        case 'checkbox':
            vnode = h('input', {
                key: uniqueId('checkbox_'),
                type: 'checkbox',
                checked: node.checked,
                readOnly: true
            });
            break;
        case 'strong':
            vnode = h('strong', {
                key: uniqueId('strong_')
            }, children);
            break;
        case 'paragraph':
            vnode = h('p', {
                key: uniqueId('paragraph_')
            }, children);
            break;
        case 'blockquote':
            vnode = h('blockquote', {
                key: uniqueId('blockquote_')
            }, children);
            break;
        case 'thematicBreak':
            vnode = h('hr', {
                key: uniqueId('hr_')
            });
            break;
        case 'html':
            vnode = h('code', {
                key: uniqueId('html_')
            }, node.value);
            break;
        case 'image':
            vnode = h('img', {
                key: uniqueId('image_'),
                src: node.url,
                alt: node.alt,
                title: node.title
            });
            break;
        case 'list':
            vnode = h(node.ordered?'ol':'ul', {
                key: uniqueId('list_'),
                // loose: node.loose,
                // ordered: node.ordered,
                // start: node.start
            }, children);
            break;
        case 'listItem':
            vnode = h('li', {
                key: uniqueId('listItem_'),
                // loose: node.loose,
                // checked: node.checked
            }, children);
            break;
        case 'inlineCode':
            vnode = h('code', {
                key: uniqueId('inlineCode_'),
            }, node.value);
            break;
        case 'code':
            vnode = h('pre', {
                key: uniqueId('pre_')
            }, [
                h('code', {
                    key: uniqueId('code_'),
                    className: 'language-'+node.lang
                }, node.value)
            ]);
            break;
        case 'link':
            vnode = h('a', {
                key: uniqueId('link_'),
                href: node.url,
                title: node.title
            }, children);
            break;
        case 'table':
            // vnode = h('table', {
            //     key: uniqueId('table_')
            // }, [
            //     h('tbody',{key: uniqueId('tbody_')}, children)
            // ]);

            let tableHeadVdomChildren = [];
            let tableBodyVdomChildren = [];
            vnode = h('table', {
                key: uniqueId('table_')
            }, [
                h('thead', {key: uniqueId('thead_')}, tableHeadVdomChildren),
                h('tbody', {key: uniqueId('tbody_')}, tableBodyVdomChildren)
            ]);


            let align = node.align || [];
            let tableChildren = node.children;

            for(let i=0;i<tableChildren.length;i++){
                let tableRow = tableChildren[i];
                let tableRowChildren = tableRow.children;
                let tableRowVdomChildren = [];

                if(i===0){
                    tableHeadVdomChildren.push(
                        h('tr', {
                            key: uniqueId('tableRow_')
                        }, tableRowVdomChildren)
                    );
                }
                else{
                    tableBodyVdomChildren.push(
                        h('tr', {
                            key: uniqueId('tableRow_')
                        }, tableRowVdomChildren)
                    );
                }

                for(let j=0;j<tableRowChildren.length;j++){
                    let tableCellChildren = tableRowChildren[j].children;
                    tableRowVdomChildren.push(
                        h( (i===0)?'th':'td', {
                            key: uniqueId('tableCell_'),
                            align: j<align.length?align[j]:''
                        }, createElements(tableCellChildren))
                    );
                }
            }



            break;
        /*case 'tableRow':
            vnode = h('tr', {
                key: uniqueId('tableRow_')
            }, children);
            break;
        case 'tableCell':
            vnode = h('td', {
                key: uniqueId('tableCell_'),
                align: ''
            }, children);
            break;*/
        default:
            vnode = null;
    }

    if(vnode && node.children){

        for(let i=0;i<node.children.length;i++){
            let n = node.children[i];
            children.push(
                createElement(n)
            );
        }

    }

    return vnode;
}

function createElements(nodes) {
    let vnodes = [];
    for(let i=0;i<nodes.length;i++){
        let node = nodes[i];
        vnodes.push(createElement(node))
    }
    return vnodes;
}

module.exports = createElement;