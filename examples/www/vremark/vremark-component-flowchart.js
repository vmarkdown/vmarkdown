(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([[1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);


const flowchart = __webpack_require__(13);
const COMPONENT_NAME = 'vremark-component-flowchart';

module.exports = {
    name: COMPONENT_NAME,
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    render(h) {
        return h('div', {
            'class': [COMPONENT_NAME]
        });
    },
    methods:{
        compile() {
            var self = this;
            try {
                var diagram = flowchart.parse(self.code);
                diagram.drawSVG(self.$el);
                self.diagram = diagram;
            } catch (e) {
                console.error(e);
            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
    },
    destroyed(){
        var self = this;
        self.diagram && self.diagram.clean();
    }
};



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(11).default
var update = add("096faa58", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(9)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".vremark-component-flowchart {\n  text-align: center;\n  margin-bottom: 1.1em; }\n  .vremark-component-flowchart text {\n    font-family: \"Helvetica Neue\",Arial,\"Hiragino Sans GB\",\"STHeiti\",\"Microsoft YaHei\",\"WenQuanYi Micro Hei\",SimSun,Song,sans-serif; }\n  .vremark-component-flowchart [stroke=\"#000000\"] {\n    stroke: #2c3f51; }\n  .vremark-component-flowchart text[stroke=\"#000000\"] {\n    stroke: none; }\n  .vremark-component-flowchart [fill=\"#000\"],\n  .vremark-component-flowchart [fill=\"#000000\"],\n  .vremark-component-flowchart [fill=\"black\"] {\n    fill: #2c3f51; }\n", ""]);

// exports


/***/ })
]]);