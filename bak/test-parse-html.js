

var toH = require('hast-to-hyperscript')
var h = require('hyperscript')

var tree = {
    type: 'element',
    tagName: 'p',
    properties: {id: 'alpha', className: ['bravo']},
    children: [
        {type: 'text', value: 'charlie '},
        {
            type: 'element',
            tagName: 'strong',
            properties: {style: 'color: red;'},
            children: [{type: 'text', value: 'delta'}]
        },
        {type: 'text', value: ' echo.'}
    ]
}

// Transform (`hyperscript` needs `outerHTML` to stringify):
var doc = toH(h, tree)

console.log(doc)





// var unified = require('unified')
var parse = require('rehype-parse')
//
// const html = `<div><h1/>World!</h1></div>`;
//
// const processor = unified().use(parse)
//
// const ast = processor.parse(html);
//
// console.log( JSON.stringify(ast, null, 4) );


// console.log(parse)

// const result = unified()
//     .use(parse, {emitParseErrors: true, duplicateAttribute: false})
//     // .use(rehype2remark)
//     .use(stringify)
//     .processSync(html);
// //
// console.log(result);
// var rehype = require('rehype');
//
// rehype().process('<title>Hi</title><h2>Hello world!', function (err, file) {
//     console.log(String(file));
// });