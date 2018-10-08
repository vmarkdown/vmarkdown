// module.exports = function (target, source, from, to) {
//
//     var children = target.children;
//
//     for (var i=0;i<10;i++) {
//
//         var item = children[i];
//         var position = item.position;
//
//         if( line === position.start.line && line === position.start.line ){
//             children[i] = source.children[0];
//         }
//
//     }
//
//
// };



// function findRange(root, from, to) {
//
//     var result = [];
//
//     var children = root.children;
//
//     for (var i=0;i<children.length;i++) {
//
//         var item = children[i];
//         var position = item.position;
//
//         if( position.start.line>=from && position.end.line<=to ){
//             result.push(item);
//         }
//
//     }
//
//     return result;
// }

function fixPosition(root, position, offset) {
    offset = offset?offset:0;
    root.position.start.line = position.start.line + offset;
    root.position.end.line = position.end.line + offset;
    var children = root.children;
    children && children.forEach(function (item) {
        item.position.start.line = position.start.line + offset;
        item.position.end.line = position.end.line + offset;
    });
}

function replace(target, source, from) {
    var children = target.children;
    var sourceChildren = source.children;
    var sourceIndex = 0;
    for (var i=0;i<children.length;i++) {
        var item = children[i];
        var position = item.position;
        // if( position.start.line>=from && position.end.line<=to ){
        //     var sourceItem = sourceChildren[sourceIndex++];
        //     fixPosition(sourceItem, position);
        //     children[i] = sourceItem;
        // }
        if( position.start.line === from && position.end.line === from ){
            var sourceItem = sourceChildren[sourceIndex++];
            fixPosition(sourceItem, position);
            children[i] = sourceItem;
        }
    }
    return target;
}

function insert(target, source, from) {
    var children = target.children;
    var insetIndex = -1;

    for (var i=0;i<children.length-1;i++) {

        var up = children[i];
        var down = children[i+1];

        if( from > up.position.end.line && from < down.position.start.line ){
            insetIndex = i + 1;
            break;
        }
    }

    if(insetIndex > -1){
        var sourceItem = source.children[0];
        fixPosition(sourceItem, {
            start:{
                line: from
            },
            end:{
                line: from
            }
        });
        children.splice(insetIndex, 0, sourceItem);
    }

    return target;
}

function remove(target, from, to) {

    to = from;

    var children = target.children;
    for (var i=0;i<children.length;i++) {
        var item = children[i];
        var position = item.position;
        if( position.start.line>=from && position.end.line<=to ){
            children[i] = { "type": "__remove__" };
        }
    }

    var cha = -1 * (to-from+1);
    for (var j=children.length-1;j>to-1;j--) {
        var item = children[j];
        var position = item.position;
        fixPosition(item, position, cha);
    }

    // fixPosition(target, target.position, cha);

    target.children = target.children.filter(function (item) {
        return item.type !== '__remove__';
    });

    return target;
}


module.exports = {
    replace: replace,
    insert: insert,
    remove: remove
};
