module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const toVDom = __webpack_require__(1);

const PluginManager = __webpack_require__(6);

function render(hast, options) {
    return toVDom(hast, options);
}

render.PluginManager = PluginManager;

module.exports = render;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(3);
// var data = require('./data');
module.exports = function toDom(node, options) {
    // data(node, options);
    var parser = new Parser(options);
    return parser.parse(node);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var mode = __webpack_require__(4);
var renderer = __webpack_require__(5);

function Parser(options) {
    this.options = options || {};
    this.dataFuc = null;
    this.h = this.options.h || function (tagName, properties, value) {
        return value;
    };
    // this.renderer = this.options.renderer || renderer;
    this.renderer = Object.assign(renderer, this.options.renderer || {});
}

Parser.prototype.parseNodes = function(nodes, parent) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        node.index = i;
        node.parent = parent;
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node, parent) {
    if(!node) return null;
    var children = this.parseNodes(node.children, node);
    var h = this.h;
    if(!this.renderer[node.type]){
        // throw new Error('renderer:'+node.type+' not found!');
        console.error('renderer:'+node.type+' not found!');
        return null;
    }
    return this.renderer[node.type].apply(null, [h, node, node.data, children, this.options]);

    /*
    var properties = {};
    if(!this.dataFuc){
        var data = mode(node, h, this.options.mode);
        if(data) {
            this.dataFuc = data;
        }
    }
    if(this.dataFuc){
        properties = this.dataFuc(node, this.options);
    }

    if(!this.renderer[node.type]){
        throw new Error('renderer:'+node.type+' not found!');
    }
    return this.renderer[node.type].apply(null, [h, node, properties, children, this.options]);*/
};

Parser.prototype.parse = function(root) {
    try {
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

var defaultModes = {

    'vue': {
        test: function (h) {
            return h && h.toString().indexOf('vm') > -1;
        },
        data: function (node, options) {

            var props = node.data || {};

            props.attrs = props.attrs || {};

            Object.assign(props.attrs, node.properties);

            if(node.hasOwnProperty('hash')) {
                options.hashid && Object.assign(props.attrs, {
                    id: node.hash
                });

                Object.assign(props, {
                    key: node.hash
                });
            }

            return props;

        }
    },

    'preact': {
        test: function () {
            return false;
        },
        data: function (node) {
            return node.properties;
        }
    }

};

module.exports = function (node, h, mode) {

    if(mode) {
        if( isString(mode) && defaultModes.hasOwnProperty(mode) ) {
            return defaultModes[mode].data;
        }

        if( isFunction(mode) ) {
            return mode;
        }
    }

    var list = Object.keys(defaultModes);
    for (var i=0;i<list.length;i++) {
        var item = list[i];
        var m = defaultModes[item];
        if( m.test(h) ) {
            return m.data;
        }
    }

    return null;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {

    root: function(h, node, data, children, options) {
        return h(node.tagName, data, children);
    },
    element: function(h, node, data, children, options) {
        return h(node.tagName, data, children);
    },
    text: function(h, node) {
        return node.value;
    },
    comment: function () {
        
    },
    // component: function (h, node, data) {
    //     return h(node.component, data);
    // },
    raw: function (h, node) {
        return node.value;
    }

};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class PluginManager {

    constructor(options) {
        this.options = options || {
            paths: {},
            loader: function () {}
        };
        this.plugins = {};
    }

    has(plugin) {
        return this.plugins[plugin];
    }

    async _loadPlugin(plugin) {

        if(this.has(plugin)){
            return true;
        }

        try {
            await this.options.loader(plugin);
            this.plugins[plugin] = true;
        }
        catch (e) {
            return false;
        }

        return true;
    }

    async loadSync(plugins, callback) {

    }

    load(plugins, callback) {

        const self = this;

        const loads = Object.keys(plugins).map(function (plugin) {
            return self._loadPlugin(plugin);
        });

        Promise.all(loads).then(function () {
            callback && callback();
        });

    }

    unload(plugins) {

    }

}

module.exports = PluginManager;

/***/ })
/******/ ]);