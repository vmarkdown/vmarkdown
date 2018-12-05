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
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonpVMarkDownPreview"] = window["webpackJsonpVMarkDownPreview"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__(1);
__webpack_require__(2);

__webpack_require__(3);

const $ = __webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);

$.scrollTo && $.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 300,
    interrupt: true,
    queue : false,
    easing: 'easeOutQuad'
    // easing: 'easeOutQuart'
});

// import Vue from 'vue';
// import VMarkdown from 'vmarkdown-render';

const ACTIVE_CLASS = 'vmarkdown-preview-active';
const ACTIVE_CLASS_DURATION = 2000;

function _scrollTo(scrollContainer, target, options) {
    if(!target) return;
    scrollContainer = scrollContainer || window;
    $( scrollContainer ).stop();
    $( scrollContainer ).stop( true ).scrollTo(target, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({
    beforeCreate(){},
    beforeMount() {
        const self = this;
        // const settings = self.$options.settings;
        // const plugins = self.$options.plugins;
        // self.vmarkdown = new VMarkdown(Object.assign({}, settings, {
        //     h: this.$createElement
        // }));

        // self.vmarkdown = new VMarkdown({
        //     h: this.$createElement,
        //     plugins: plugins
        // });

        // self.vmarkdown = self.$options.vmarkdown;
    },
    methods: {
        getDom(node) {
            if(!node) return null;
            const self = this;
            if(node.data && node.data.ref) {
                var dom = self.$refs[node.data.ref];
                if(dom && dom._isVue) {
                    dom = dom.$el;
                }
                return dom;
            }
            return null;
        },

        setValue(vdom) {
            this.vdom = vdom;
            this.$forceUpdate();
        },

        // async setValue(vast) {
        //     this.vdom = await this.vmarkdown.process(vast);
        //     this.$forceUpdate();
        // },
        scrollTo({node, coverageRatio = 0, firstVisibleLine}) {
            const self = this;
            if(!firstVisibleLine || firstVisibleLine <= 1) {
                // $.scrollTo({
                //     top: 0
                // });
                const scrollContainer = self.$options.scrollContainer;
                $(scrollContainer).scrollTo({
                    top: 0
                });
                return;
            }

            if(!node) {
                return;
            }


            const target = self.getDom(node);

            const options = {};
            if(coverageRatio) {
                Object.assign(options, {
                    over: {
                        top: coverageRatio
                    }
                });
            }

            const scrollContainer = self.$options.scrollContainer;
            _scrollTo(scrollContainer, target, options);
        },
        activeTo({node, coverageRatio = 0, cursor}) {
            const self = this;

            if(self._$target){
                self._$target.removeClass(ACTIVE_CLASS);
                self._$target = null;
            }

            if(!node) {
                return;
            }

            const target = self.getDom(node);
            if(!target) return;

            var $target = $(target);
            self._$target = $target;
            $target.addClass(ACTIVE_CLASS);
            setTimeout(function () {
                $target.removeClass(ACTIVE_CLASS);
            }, ACTIVE_CLASS_DURATION);

            const options = {};

            if(cursor) {
                Object.assign(options, {
                    offset: {
                        top: -1 * cursor.top
                    }
                })
            }

            if(coverageRatio) {
                Object.assign(options, {
                    over: {
                        top: coverageRatio
                    }
                })
            }

            const scrollContainer = self.$options.scrollContainer;
            _scrollTo(scrollContainer, target, options);
        }
    },
    render(h) {

        return h('div', {
            class: ['vmarkdown-preview']
        }, [
            this.vdom || h('div', {
                style:{
                    'text-align':'center',
                    'max-width': '150px',
                    'margin': '100px auto'
                },
                domProps:{
                    innerHTML: __webpack_require__(7)
                }
            })
        ]);

    }
});


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 120 120\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <g id=\"circle\" class=\"g-circles g-circles--v1\">\n        <circle id=\"12\" transform=\"translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) \" cx=\"35\" cy=\"16.6987298\" r=\"10\"></circle>\n        <circle id=\"11\" transform=\"translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) \" cx=\"16.6987298\" cy=\"35\" r=\"10\"></circle>\n        <circle id=\"10\" transform=\"translate(10, 60) rotate(-90) translate(-10, -60) \" cx=\"10\" cy=\"60\" r=\"10\"></circle>\n        <circle id=\"9\" transform=\"translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) \" cx=\"16.6987298\" cy=\"85\" r=\"10\"></circle>\n        <circle id=\"8\" transform=\"translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) \" cx=\"35\" cy=\"103.30127\" r=\"10\"></circle>\n        <circle id=\"7\" cx=\"60\" cy=\"110\" r=\"10\"></circle>\n        <circle id=\"6\" transform=\"translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) \" cx=\"85\" cy=\"103.30127\" r=\"10\"></circle>\n        <circle id=\"5\" transform=\"translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) \" cx=\"103.30127\" cy=\"85\" r=\"10\"></circle>\n        <circle id=\"4\" transform=\"translate(110, 60) rotate(-90) translate(-110, -60) \" cx=\"110\" cy=\"60\" r=\"10\"></circle>\n        <circle id=\"3\" transform=\"translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) \" cx=\"103.30127\" cy=\"35\" r=\"10\"></circle>\n        <circle id=\"2\" transform=\"translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) \" cx=\"85\" cy=\"16.6987298\" r=\"10\"></circle>\n        <circle id=\"1\" cx=\"60\" cy=\"10\" r=\"10\"></circle>\n    </g>\n\n    <use xlink:href=\"#circle\" class=\"use\"/>\n</svg>"

/***/ })
/******/ ])["default"];
});