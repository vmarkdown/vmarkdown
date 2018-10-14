(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VMarkDownPreview"] = factory();
	else
		root["VMarkDownPreview"] = factory();
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VMarkDownPreview; });
/* harmony import */ var _util_preview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
__webpack_require__(1);



$.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 300
});

function scrollTo(target, options) {
    $(window).stop();
    $(window).scrollTo(target, options);
}

const ACTIVE_CLASS = 'vamrkdown-preview-active';

class VMarkDownPreview extends _util_preview__WEBPACK_IMPORTED_MODULE_0__["default"] {

    constructor(options) {
        super();
        const self = this;
        self.$scrollContainer = $(options.scrollContainer || window);

        self.vmarkdown = options.vmarkdown;
        self.preview = new Vue({
            el: options.container,
            render(h) {
                return self.vmarkdown.compile(h);
            }
        });

        self.vmarkdown.on('change', function () {
            self.preview.$forceUpdate();
        });

        self.vmarkdown.on('firstVisibleLineChange', function (firstVisibleLine) {
            self.scrollToLine(firstVisibleLine);
        });

        self.vmarkdown.on('cursorChange', function (cursor) {
            self.activeTo(cursor);
        });
    }

    on(type, handler) {

    }

    scrollTo() {

    }

    _scrollTo(target, options) {
        const self = this;
        self.$scrollContainer.stop();
        self.$scrollContainer.scrollTo(target, options);
    }

    scrollToLine(line) {

        const self = this;

        const node = self.vmarkdown.findNodeFromLine(line);
        // const self = this;
        //
        // const node = NodeUtil.findNodeFromLine(self.hast, line);
        //
        // console.log(node);
        //
        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        // dom.scrollIntoView();
        self._scrollTo(dom);
    }

    activeTo(position) {
        const self = this;

        const node = self.vmarkdown.findNode(position);

        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        $(self.preview.$el).find('.'+ACTIVE_CLASS).removeClass(ACTIVE_CLASS);
        $(dom).addClass(ACTIVE_CLASS);

        dom.scrollIntoViewIfNeeded();
        // scrollTo(dom, {
        //     over: 0.5,
        //     offset: -1 * ($(window).height() / 2)
        // });
    }


    activeToLine(line) {
        const self = this;

        const node = self.vmarkdown.findNodeByLine(line);

        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        $(self.preview.$el).find('.active-line').removeClass(ACTIVE_CLASS);
        $(dom).addClass(ACTIVE_CLASS);

        scrollTo(dom, {
            // over: 3,
            offset: -1 * ($(window).height() / 2)
        });


        // scrollTo(dom);

        // const hash = node.hash;
        //
        // const $target = $('[data-hash='+hash+']');
        //
        // $('.active').removeClass('active');
        //
        // $target.addClass('active');
        //
        //
        // if($target.length>0) {
        //     $target[0].scrollIntoViewIfNeeded();
        //     // scrollTo($target[0]);
        // }
    }

}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Preview; });
class Preview {

    on(type, handler) {

    }

    scrollTo() {

    }

    scrollToLine(line) {

    }

    activeTo(position) {

    }
}

/***/ })
/******/ ])["default"];
});