(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CodeMirrorEditor"] = factory();
	else
		root["CodeMirrorEditor"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);

// import Editor from './codemirror-editor';
// export default Editor;
const Editor = __webpack_require__(3);
module.exports = Editor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// import Editor from './base/editor';
const Editor = __webpack_require__(4);

// var deepClone = function (obj) {
//     var _tmp,result;
//     _tmp = JSON.stringify(obj);
//     result = JSON.parse(_tmp);
//     return result;
// }

class CodeMirrorEditor extends Editor {

    constructor(el, options) {
        super();
        const self = this;
        self.options = options || {};
        self.editor = CodeMirror(el,
            Object.assign({
                theme:'default vmarkdown',
                value: '',
                mode:  "markdown",
                // viewportMargin: 100,
                // maxHighlightLength: Infinity,
                lineWrapping: true,
                styleActiveLine: true,
                scrollbarStyle: "native", //overlay

                dragDrop: true,
                selectionsMayTouch: false,

                // pollInterval: 5000,
                extraKeys: {
                    "Enter": "newlineAndIndentContinueMarkdownList"
                }
            }, self.options)
        );
    }

    on(type, handler) {
        const self = this;
        switch (type) {
            case 'beforeChange': {
                // self.editor.on("beforeChange", function (editor, change) {
                //     self._describeBeforeChange(change);
                //     // self.$onChange(change, handler);
                // });
                break;
            }
            case 'change': {
                // self.editor.on("beforeChange", function (editor, change) {
                //     // self._describeChange(change);
                //     // self.$onChange(change, handler);
                // });
                self.editor.on("change", function (editor, change) {
                    // self._describeChange(change);
                    self.$onChange(change, handler);
                });
                break;
            }
            // case 'incremental': {
            //     self.editor.on("change", function (editor, change) {
            //         self.$onIncremental(change, handler);
            //     });
            //     break;
            // }
            case 'scroll': {
                self.editor.on("scroll", function () {
                    self.$onScroll(handler);
                });
                break;
            }
            case 'cursorChange': {
                self.editor.on("cursorActivity", function () {
                    self.$onCursorChange(handler);
                });
                break;
            }
        }
    }

    $onChange(change, handler) {

        // console.log(change);

        const self = this;
        var origin = change.origin;
        var from = change.from;
        var to = change.to;
        var text = change.text;
        var removed = change.removed;

        var fromLine = from.line + 1;
        var toLine = to.line + 1;
        //
        var fromColumn = from.ch + 1;
        var toColumn = to.ch + 1;

        const incremental = {
            origin: origin,
            changes: []
        };

        if(origin=== '+input' && text[0].length>0 && removed[0].length ===0) {
            incremental.origin = 'insert';
        } else if(origin=== '+input' && text[0].length>0 && removed[0].length>0) {
            incremental.origin = 'replace';
        } else if(origin=== '+delete' && removed[0].length>0) {
            incremental.origin = 'remove';
        }

        if( origin === '+input' || origin === '+delete' ) {

            let index = 0;
            let toLineIsEmpty = (removed.slice(-1)[0].length === 0);

            for(let i=fromLine;i<=toLine;i++) {

                if( i===fromLine &&
                    (
                        (text[0].length === 0 && removed[index].length > 0 && !toLineIsEmpty)
                        ||
                        (text[0].length > 0 && removed[0].length ===0 )
                        ||
                        (text[0].length > 0 && removed[index].length >0 )
                    )
                ) {

                    let surplus = self.getLine(i);
                    // console.log('line:', i , 'is replaced by', surplus);

                    incremental.changes.push({
                        action: 'replace',
                        line: i,
                        before: '',
                        after: surplus
                    });
                }
                else if( i===toLine && toLineIsEmpty) {

                }
                else{
                    // console.log('line:', i , 'deleted');

                    incremental.changes.push({
                        action: 'remove',
                        line: i,
                        before: '',
                        after: ''
                    });
                }

                index++;
            }

        }
        else{
            // console.log(origin, 'not support');
            // incremental.support = false;
        }

        handler && handler.call(self, incremental);
    }

    $onScroll(handler) {
        const self = this;
        handler && handler.call(self);
    }

    $onCursorChange(handler) {
        const self = this;
        const cursor = self.editor.getCursor();

        const result = {
            line: cursor.line + 1,
            column: cursor.ch + 1
        };

        const position = self.editor.cursorCoords(cursor.line);
        Object.assign(result, position);

        handler && handler.call(self, result);
    }

    getValue() {
        const self = this;
        return self.editor.getValue();
    }

    setValue(value) {
        const self = this;
        const newValue = value + '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
        self.editor.setValue(newValue);
    }

    scrollTo(scrollTop) {
    }

    async scrollToLine(line) {
        const self = this;

    }

    scrollIntoViewByLine(line) {
        const self = this;
        const params = {
            line: line,
            ch: 0
        };
        self.editor.scrollIntoView(params);
    }

    getScrollTop() {

    }

    getFirstVisibleLine() {
        const self = this;
        var top = self.editor.display.scroller.scrollTop; //+200;
        var result = self.editor.coordsChar({
            top: top,
            left: 0
        }, 'local');
        let lineIndex = result.line;
        let line = lineIndex + 1;
        return line;
    }

    getLastVisibleRow() {
        // return this.editor.getLastVisibleRow() + 1;
    }

    getLine(line) {
        const self = this;
        return self.editor.doc.getLine(line - 1);
    }
}

module.exports = CodeMirrorEditor;
// export default CodeMirrorEditor;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// import Emitter from './emitter';

class Editor {

    // constructor() {
    //     super();
    // }
    on(type, handler) {

    }

    getValue() {

    }

    setValue() {

    }

    scrollTo() {

    }

    scrollToLine(line) {

    }

    getLine(line) {

    }
}

module.exports = Editor;

/***/ })
/******/ ]);
});