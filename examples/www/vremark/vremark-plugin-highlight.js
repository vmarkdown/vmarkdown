define("vremark-plugin-highlight", ["vremark-plugin-highlight-libs"], function(__WEBPACK_EXTERNAL_MODULE__1389__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "vremark/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1379);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1379:
/***/ (function(module, exports, __webpack_require__) {

const themes = {
    'default':__webpack_require__(1380),
    'github':__webpack_require__(1382),
    'monokai-sublime':__webpack_require__(1384),
    'darcula':__webpack_require__(1386)
};

let style = themes.default;
style.use();

const plugin = {
    name: 'vremark-plugin-highlight',
    component: __webpack_require__(1388),
    setTheme(theme) {

        if( themes.hasOwnProperty(theme) ) {
            if(style) {
                style.unuse();
            }
            style = themes[theme];
            style.use();
        }












        // switch (theme) {
        //     case 'default':
        //     case 'github':
        //     case 'darcula':
        //     case 'monokai-sublime':
        //     default:
        // }




        // console.log(theme);
        // var self = this;
        //
        //
        // // var container = document.getElementById('vremark-plugin-highlight');
        // // if(!container){
        // //     container = document.createElement('style');
        // //     container.id = 'vremark-plugin-highlight';
        // //     document.head.appendChild(container);
        // // }
        // // if(bgs[theme]){
        // //     // container.innerHTML = 'pre.vremark-plugin-highlight{'+bgs[theme]+'}';
        // //     container.innerHTML = bgs[theme];
        // // }
        // // else{
        // //     container.innerHTML = '';
        // // }
        //
        // if(self.style) {
        //     self.style.unuse();
        // }
        //
        // function getTheme(theme) {
        //     switch (theme) {
        //         case 'default':
        //             return require('./themes/default.less');
        //         case 'github':
        //             return require('./themes/github.less');
        //         case 'darcula':
        //             return require('./themes/darcula.less');
        //         case 'monokai-sublime':
        //             return require('./themes/monokai-sublime.less');
        //         default:
        //             return require('./themes/github.less');
        //     }
        // }
        // //
        // var style = getTheme(theme);
        // // debugger
        // style.use();
        //
        // self.style = style;




        // require.ensure([], function(){
        //
        //
        //
        //     //
        //     // setTimeout(function () {
        //     //     style.use();
        //     // }, 1000);
        //     //
        //     //
        //     // setTimeout(function () {
        //     //     style.unuse();
        //     // }, 5000);
        //
        // }, 'vremark-plugin-highlight-themes');

    }
};

module.exports = plugin;



/***/ }),

/***/ 1380:
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(1381);
var options = {"hmr":true};
options.insertInto = undefined;

if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;

exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(65)(content, options);
	}

	return exports;
};

exports.unuse = exports.unref = function() {
  if(refs > 0 && !(--refs)) {
	   dispose();
		 dispose = null;
  }
};
if(false) { var lastRefs; }

/***/ }),

/***/ 1381:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "pre.vremark-plugin-highlight {\n  background: #F0F0F0; }\n\n/*\n\nOriginal highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n\n*/\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #F0F0F0; }\n\n/* Base color: saturation 0; */\n.hljs,\n.hljs-subst {\n  color: #444; }\n\n.hljs-comment {\n  color: #888888; }\n\n.hljs-keyword,\n.hljs-attribute,\n.hljs-selector-tag,\n.hljs-meta-keyword,\n.hljs-doctag,\n.hljs-name {\n  font-weight: bold; }\n\n/* User color: hue: 0 */\n.hljs-type,\n.hljs-string,\n.hljs-number,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-quote,\n.hljs-template-tag,\n.hljs-deletion {\n  color: #880000; }\n\n.hljs-title,\n.hljs-section {\n  color: #880000;\n  font-weight: bold; }\n\n.hljs-regexp,\n.hljs-symbol,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link,\n.hljs-selector-attr,\n.hljs-selector-pseudo {\n  color: #BC6060; }\n\n/* Language color: hue: 90; */\n.hljs-literal {\n  color: #78A960; }\n\n.hljs-built_in,\n.hljs-bullet,\n.hljs-code,\n.hljs-addition {\n  color: #397300; }\n\n/* Meta color: hue: 200 */\n.hljs-meta {\n  color: #1f7199; }\n\n.hljs-meta-string {\n  color: #4d99bf; }\n\n/* Misc effects */\n.hljs-emphasis {\n  font-style: italic; }\n\n.hljs-strong {\n  font-weight: bold; }\n", ""]);

// exports


/***/ }),

/***/ 1382:
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(1383);
var options = {"hmr":true};
options.insertInto = undefined;

if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;

exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(65)(content, options);
	}

	return exports;
};

exports.unuse = exports.unref = function() {
  if(refs > 0 && !(--refs)) {
	   dispose();
		 dispose = null;
  }
};
if(false) { var lastRefs; }

/***/ }),

/***/ 1383:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "pre.vremark-plugin-highlight {\n  background: #f8f8f8; }\n\n/*\n\ngithub.com style (c) Vasily Polovnyov <vast@whiteants.net>\n\n*/\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8; }\n\n.hljs-comment,\n.hljs-quote {\n  color: #998;\n  font-style: italic; }\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-subst {\n  color: #333;\n  font-weight: bold; }\n\n.hljs-number,\n.hljs-literal,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag .hljs-attr {\n  color: #008080; }\n\n.hljs-string,\n.hljs-doctag {\n  color: #d14; }\n\n.hljs-title,\n.hljs-section,\n.hljs-selector-id {\n  color: #900;\n  font-weight: bold; }\n\n.hljs-subst {\n  font-weight: normal; }\n\n.hljs-type,\n.hljs-class .hljs-title {\n  color: #458;\n  font-weight: bold; }\n\n.hljs-tag,\n.hljs-name,\n.hljs-attribute {\n  color: #000080;\n  font-weight: normal; }\n\n.hljs-regexp,\n.hljs-link {\n  color: #009926; }\n\n.hljs-symbol,\n.hljs-bullet {\n  color: #990073; }\n\n.hljs-built_in,\n.hljs-builtin-name {\n  color: #0086b3; }\n\n.hljs-meta {\n  color: #999;\n  font-weight: bold; }\n\n.hljs-deletion {\n  background: #fdd; }\n\n.hljs-addition {\n  background: #dfd; }\n\n.hljs-emphasis {\n  font-style: italic; }\n\n.hljs-strong {\n  font-weight: bold; }\n", ""]);

// exports


/***/ }),

/***/ 1384:
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(1385);
var options = {"hmr":true};
options.insertInto = undefined;

if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;

exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(65)(content, options);
	}

	return exports;
};

exports.unuse = exports.unref = function() {
  if(refs > 0 && !(--refs)) {
	   dispose();
		 dispose = null;
  }
};
if(false) { var lastRefs; }

/***/ }),

/***/ 1385:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "pre.vremark-plugin-highlight {\n  background: #23241f; }\n\npre.vremark-plugin-highlight .vremark-hljs-line-number {\n  color: #606366; }\n\n/*\n\nMonokai Sublime style. Derived from Monokai by noformnocontent http://nn.mit-license.org/\n\n*/\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #23241f; }\n\n.hljs,\n.hljs-tag,\n.hljs-subst {\n  color: #f8f8f2; }\n\n.hljs-strong,\n.hljs-emphasis {\n  color: #a8a8a2; }\n\n.hljs-bullet,\n.hljs-quote,\n.hljs-number,\n.hljs-regexp,\n.hljs-literal,\n.hljs-link {\n  color: #ae81ff; }\n\n.hljs-code,\n.hljs-title,\n.hljs-section,\n.hljs-selector-class {\n  color: #a6e22e; }\n\n.hljs-strong {\n  font-weight: bold; }\n\n.hljs-emphasis {\n  font-style: italic; }\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-name,\n.hljs-attr {\n  color: #f92672; }\n\n.hljs-symbol,\n.hljs-attribute {\n  color: #66d9ef; }\n\n.hljs-params,\n.hljs-class .hljs-title {\n  color: #f8f8f2; }\n\n.hljs-string,\n.hljs-type,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-selector-id,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-addition,\n.hljs-variable,\n.hljs-template-variable {\n  color: #e6db74; }\n\n.hljs-comment,\n.hljs-deletion,\n.hljs-meta {\n  color: #75715e; }\n", ""]);

// exports


/***/ }),

/***/ 1386:
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(1387);
var options = {"hmr":true};
options.insertInto = undefined;

if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;

exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(65)(content, options);
	}

	return exports;
};

exports.unuse = exports.unref = function() {
  if(refs > 0 && !(--refs)) {
	   dispose();
		 dispose = null;
  }
};
if(false) { var lastRefs; }

/***/ }),

/***/ 1387:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "pre.vremark-plugin-highlight {\n  background: #2b2b2b; }\n\npre.vremark-plugin-highlight .vremark-hljs-line-number {\n  color: #606366; }\n\n/*\n\nDarcula color scheme from the JetBrains family of IDEs\n\n*/\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #2b2b2b; }\n\n.hljs {\n  color: #bababa; }\n\n.hljs-strong,\n.hljs-emphasis {\n  color: #a8a8a2; }\n\n.hljs-bullet,\n.hljs-quote,\n.hljs-link,\n.hljs-number,\n.hljs-regexp,\n.hljs-literal {\n  color: #6896ba; }\n\n.hljs-code,\n.hljs-selector-class {\n  color: #a6e22e; }\n\n.hljs-emphasis {\n  font-style: italic; }\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-section,\n.hljs-attribute,\n.hljs-name,\n.hljs-variable {\n  color: #cb7832; }\n\n.hljs-params {\n  color: #b9b9b9; }\n\n.hljs-string {\n  color: #6a8759; }\n\n.hljs-subst,\n.hljs-type,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-symbol,\n.hljs-selector-id,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-template-tag,\n.hljs-template-variable,\n.hljs-addition {\n  color: #e0c46c; }\n\n.hljs-comment,\n.hljs-deletion,\n.hljs-meta {\n  color: #7f7f7f; }\n", ""]);

// exports


/***/ }),

/***/ 1388:
/***/ (function(module, exports, __webpack_require__) {

const { hljs } = __webpack_require__(1389);

__webpack_require__(1390);

var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

function getLines (text) {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
}

function getLinesCount (text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
}


function format(html) {
    var lines = getLines(html);

    if (lines[lines.length-1].trim() === '') {
        lines.pop();
    }

    return lines.map(function (line, index) {
        return ['<div class="vremark-hljs-line">', '<span class="vremark-hljs-line-number">'+(index+1)+'</span>',line, '</div>'].join('');
    }).join('');
}


module.exports = {
    name: 'vremark-plugin-highlight',
    props: {
        'lang': {
            type: String,
            required: true
        },
        'code': {
            type: String,
            required: true
        },
        'lineNumbers': {
            type: Boolean,
            default: false
        },
        'theme': {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            result: this.code || ''
        }
    },
    render(h) {
        return h('pre', {
            'class': ['vremark-plugin-highlight']
        }, [
            h('code', {
                'class': ['hljs', this.lang],
                domProps:{
                    innerHTML: this.result
                }
            })
        ]);
    },
    methods:{
        compile() {
            var self = this;

            try {
                var value = hljs.highlight(self.lang, self.code).value;
                var result = self.lineNumbers?format(value):value;
                self.result = result;
            }
            catch (e) {
                e && e.message && (self.result = e.message);
            }

            // try {
            //     var value = hljs.highlight(self.lang, self.code).value;
            //     var result = format(value);
            //     // debugger
            //     self.result = result;
            // }
            // catch (e) {
            //     self.result = hljs.highlightAuto(self.code).value;
            // }
        }
    },
    mounted() {
        var self = this;

        self.compile();

        // require(['highlight.js'], function (hljs) {
        //     self.compile(hljs);
        // });




        // plugin.setTheme('github');



        // require.ensure([], function(){
        //
        //     // function getTheme(theme) {
        //     //     switch (theme) {
        //     //         case 'github':
        //     //             return require('./themes/github.less');
        //     //         case 'monokai-sublime':
        //     //             return require('./themes/monokai-sublime.less');
        //     //         default:
        //     //             return require('./themes/github.less');
        //     //     }
        //     // }
        //     //
        //     // var style = getTheme(self.theme);
        //     //
        //     // setTimeout(function () {
        //     //     style.use();
        //     // }, 1000);
        //     //
        //     //
        //     // setTimeout(function () {
        //     //     style.unuse();
        //     // }, 5000);
        //
        //     // plugin.setTheme('monokai-sublime');
        //     var hljs = require('highlight.js');
        //     self.compile(hljs);
        // }, 'vremark-plugin-highlight-libs');




//         require.ensure(["highlight.js/styles/a11y-dark.css", "highlight.js/styles/a11y-light.css", "highlight.js/styles/agate.css", "highlight.js/styles/an-old-hope.css", "highlight.js/styles/androidstudio.css", "highlight.js/styles/arduino-light.css", "highlight.js/styles/arta.css", "highlight.js/styles/ascetic.css", "highlight.js/styles/atelier-cave-dark.css", "highlight.js/styles/atelier-cave-light.css", "highlight.js/styles/atelier-dune-dark.css", "highlight.js/styles/atelier-dune-light.css", "highlight.js/styles/atelier-estuary-dark.css", "highlight.js/styles/atelier-estuary-light.css", "highlight.js/styles/atelier-forest-dark.css", "highlight.js/styles/atelier-forest-light.css", "highlight.js/styles/atelier-heath-dark.css", "highlight.js/styles/atelier-heath-light.css", "highlight.js/styles/atelier-lakeside-dark.css", "highlight.js/styles/atelier-lakeside-light.css", "highlight.js/styles/atelier-plateau-dark.css", "highlight.js/styles/atelier-plateau-light.css", "highlight.js/styles/atelier-savanna-dark.css", "highlight.js/styles/atelier-savanna-light.css", "highlight.js/styles/atelier-seaside-dark.css", "highlight.js/styles/atelier-seaside-light.css", "highlight.js/styles/atelier-sulphurpool-dark.css", "highlight.js/styles/atelier-sulphurpool-light.css", "highlight.js/styles/atom-one-dark.css", "highlight.js/styles/atom-one-dark-reasonable.css", "highlight.js/styles/atom-one-light.css", "highlight.js/styles/brown-paper.css", "highlight.js/styles/brown-papersq.png", "highlight.js/styles/codepen-embed.css", "highlight.js/styles/color-brewer.css", "highlight.js/styles/darcula.css", "highlight.js/styles/dark.css", "highlight.js/styles/darkula.css", "highlight.js/styles/default.css", "highlight.js/styles/docco.css", "highlight.js/styles/dracula.css", "highlight.js/styles/far.css", "highlight.js/styles/foundation.css", "highlight.js/styles/github.css", "highlight.js/styles/github-gist.css", "highlight.js/styles/gml.css", "highlight.js/styles/googlecode.css", "highlight.js/styles/grayscale.css", "highlight.js/styles/gruvbox-dark.css", "highlight.js/styles/gruvbox-light.css", "highlight.js/styles/hopscotch.css", "highlight.js/styles/hybrid.css", "highlight.js/styles/idea.css", "highlight.js/styles/ir-black.css", "highlight.js/styles/isbl-editor-dark.css", "highlight.js/styles/isbl-editor-light.css", "highlight.js/styles/kimbie.dark.css", "highlight.js/styles/kimbie.light.css", "highlight.js/styles/lightfair.css", "highlight.js/styles/magula.css", "highlight.js/styles/mono-blue.css", "highlight.js/styles/monokai.css", "highlight.js/styles/monokai-sublime.css", "highlight.js/styles/nord.css", "highlight.js/styles/obsidian.css", "highlight.js/styles/ocean.css", "highlight.js/styles/paraiso-dark.css", "highlight.js/styles/paraiso-light.css", "highlight.js/styles/pojoaque.css", "highlight.js/styles/pojoaque.jpg", "highlight.js/styles/purebasic.css", "highlight.js/styles/qtcreator_dark.css", "highlight.js/styles/qtcreator_light.css", "highlight.js/styles/railscasts.css", "highlight.js/styles/rainbow.css", "highlight.js/styles/routeros.css", "highlight.js/styles/school-book.css", "highlight.js/styles/school-book.png", "highlight.js/styles/shades-of-purple.css", "highlight.js/styles/solarized-dark.css", "highlight.js/styles/solarized-light.css", "highlight.js/styles/sunburst.css", "highlight.js/styles/tomorrow.css", "highlight.js/styles/tomorrow-night.css", "highlight.js/styles/tomorrow-night-blue.css", "highlight.js/styles/tomorrow-night-bright.css", "highlight.js/styles/tomorrow-night-eighties.css", "highlight.js/styles/vs.css", "highlight.js/styles/vs2015.css", "highlight.js/styles/xcode.css", "highlight.js/styles/xt256.css", "highlight.js/styles/zenburn.css"], function(){
//             require('./index.scss');
//             var hljs = require('highlight.js');
//
//
//             require('highlight.js/styles/github.css');
//
//             setTimeout(function () {
//                 require('highlight.js/styles/atelier-cave-dark.css');
//
//             }, 3000);
//
//             // var style = require('style-loader/useable!highlight.js/styles/arduino-light.css');
//             // style.unuse();
// // debugger
//
//             self.compile(hljs);
//         }, 'vremark-plugin-highlight-libs');



        // require.ensure([], function(){
        //     // require('highlight.js/styles/github.css');
        //     // require('highlight.js/styles/monokai-sublime.css');
        //     var hljs = require('highlight.js');
        //     self.compile(hljs);
        // }, 'vremark-plugin-highlight-libs');


        // require('highlight.js/styles/monokai-sublime.css');
        // var hljs = require('highlight.js');
        // self.compile(hljs);

        // await import(
        //     'highlight.js/styles/monokai-sublime.css'
        // );

        // const hljs = await import(
        //     'highlight.js'
        // );
        // self.compile(hljs.default);




        // require.ensure([], function(){
        //     var hljs = require('highlight.js');
        //     self.compile(hljs);
        // }, 'vremark-plugin-highlight-libs');








    }
};

/***/ }),

/***/ 1389:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1389__;

/***/ }),

/***/ 1390:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1391);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(65)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 1391:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "pre.vremark-plugin-highlight {\n  font-size: 0.8em; }\n  pre.vremark-plugin-highlight .vremark-hljs-line-number {\n    text-align: right;\n    display: inline-block;\n    min-width: 30px;\n    margin-right: 16px;\n    margin-left: -10px;\n    color: rgba(27, 31, 35, 0.3);\n    padding-top: 1px;\n    padding-bottom: 1px; }\n", ""]);

// exports


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(66);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 66:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ })});;