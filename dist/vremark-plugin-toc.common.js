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

"use strict";


var slug = __webpack_require__(1);
var util = __webpack_require__(8);

module.exports = toc;

var DEFAULT_HEADING = 'toc|table[ -]of[ -]contents?';

function toc(options) {

    var self = this;

    var settings = options || {};
    var heading = settings.heading || DEFAULT_HEADING;
    var depth = settings.maxDepth || 6;
    var tight = settings.tight;

    this.use(slug);

    return transformer;

    /* Adds an example section based on a valid example
     * JavaScript document to a `Usage` section. */
    function transformer(node) {
        var result = util(node, {
            heading: heading,
            maxDepth: depth,
            tight: tight
        });

        if (result.index === null || result.index === -1 || !result.map || !result.toc) {
            return;
        }

        var toc = result.toc;
        toc.properties = toc.properties?toc.properties:{};
        toc.properties.className = 'vremark-toc';
        toc.children = [ result.map ];
        toc.tagName = 'div';

        // self.data('toc', toc);
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = __webpack_require__(2)
var visit = __webpack_require__(3)
var slugs = __webpack_require__(6)()

module.exports = slug

function slug() {
  return transformer
}

/* Patch slugs on heading nodes. */
function transformer(ast) {
  slugs.reset()

  visit(ast, 'heading', visitor)

  function visitor(node) {
    var data = node.data || (node.data = {})
    var props = data.hProperties || (data.hProperties = {})
    var id = props.id

    id = id ? slugs.slug(id, true) : slugs.slug(toString(node))

    data.id = id
    props.id = id
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = toString

/* Get the text content of a node.  If the node itself
 * does not expose plain-text fields, `toString` will
 * recursivly try its children. */
function toString(node) {
  return (
    valueOf(node) ||
    (node.children && node.children.map(toString).join('')) ||
    ''
  )
}

/* Get the value of `node`.  Checks, `value`,
 * `alt`, and `title`, in that order. */
function valueOf(node) {
  return (
    (node && node.value ? node.value : node.alt ? node.alt : node.title) || ''
  )
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visit

var visitParents = __webpack_require__(4)

var CONTINUE = visitParents.CONTINUE
var SKIP = visitParents.SKIP
var EXIT = visitParents.EXIT

visit.CONTINUE = CONTINUE
visit.SKIP = SKIP
visit.EXIT = EXIT

function visit(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor
    visitor = test
    test = null
  }

  visitParents(tree, test, overload, reverse)

  function overload(node, parents) {
    var parent = parents[parents.length - 1]
    var index = parent ? parent.children.indexOf(node) : null
    return visitor(node, index, parent)
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visitParents

var is = __webpack_require__(5)

var CONTINUE = true
var SKIP = 'skip'
var EXIT = false

visitParents.CONTINUE = CONTINUE
visitParents.SKIP = SKIP
visitParents.EXIT = EXIT

function visitParents(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor
    visitor = test
    test = null
  }

  one(tree, null, [])

  // Visit a single node.
  function one(node, index, parents) {
    var result

    if (!test || is(test, node, index, parents[parents.length - 1] || null)) {
      result = visitor(node, parents)

      if (result === EXIT) {
        return result
      }
    }

    if (node.children && result !== SKIP) {
      return all(node.children, parents.concat(node)) === EXIT ? EXIT : result
    }

    return result
  }

  // Visit children in `parent`.
  function all(children, parents) {
    var min = -1
    var step = reverse ? -1 : 1
    var index = (reverse ? children.length : min) + step
    var child
    var result

    while (index > min && index < children.length) {
      child = children[index]
      result = child && one(child, index, parents)

      if (result === EXIT) {
        return result
      }

      index = typeof result === 'number' ? result : index + step
    }
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable max-params */

/* Expose. */
module.exports = is

/* Assert if `test` passes for `node`.
 * When a `parent` node is known the `index` of node */
function is(test, node, index, parent, context) {
  var hasParent = parent !== null && parent !== undefined
  var hasIndex = index !== null && index !== undefined
  var check = convert(test)

  if (
    hasIndex &&
    (typeof index !== 'number' || index < 0 || index === Infinity)
  ) {
    throw new Error('Expected positive finite index or child node')
  }

  if (hasParent && (!is(null, parent) || !parent.children)) {
    throw new Error('Expected parent node')
  }

  if (!node || !node.type || typeof node.type !== 'string') {
    return false
  }

  if (hasParent !== hasIndex) {
    throw new Error('Expected both parent and index')
  }

  return Boolean(check.call(context, node, index, parent))
}

function convert(test) {
  if (typeof test === 'string') {
    return typeFactory(test)
  }

  if (test === null || test === undefined) {
    return ok
  }

  if (typeof test === 'object') {
    return ('length' in test ? anyFactory : matchesFactory)(test)
  }

  if (typeof test === 'function') {
    return test
  }

  throw new Error('Expected function, string, or object as test')
}

function convertAll(tests) {
  var results = []
  var length = tests.length
  var index = -1

  while (++index < length) {
    results[index] = convert(tests[index])
  }

  return results
}

/* Utility assert each property in `test` is represented
 * in `node`, and each values are strictly equal. */
function matchesFactory(test) {
  return matches

  function matches(node) {
    var key

    for (key in test) {
      if (node[key] !== test[key]) {
        return false
      }
    }

    return true
  }
}

function anyFactory(tests) {
  var checks = convertAll(tests)
  var length = checks.length

  return matches

  function matches() {
    var index = -1

    while (++index < length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

/* Utility to convert a string into a function which checks
 * a given node’s type for said string. */
function typeFactory(test) {
  return type

  function type(node) {
    return Boolean(node && node.type === test)
  }
}

/* Utility to return true. */
function ok() {
  return true
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var emoji = __webpack_require__(7)

module.exports = BananaSlug

function BananaSlug () {
  var self = this
  if (!(self instanceof BananaSlug)) return new BananaSlug()

  self.reset()
}

/**
 * Generate a unique slug.
 * @param  {string} value String of text to slugify
 * @param  {boolean} [false] Keep the current case, otherwise make all lowercase
 * @return {string}       A unique slug string
 */
BananaSlug.prototype.slug = function (value, maintainCase) {
  maintainCase = maintainCase === true
  var self = this
  var slug = slugger(value, maintainCase)
  var occurrences = self.occurrences[slug]

  if (self.occurrences.hasOwnProperty(slug)) {
    occurrences++
  } else {
    occurrences = 0
  }

  self.occurrences[slug] = occurrences

  if (occurrences) {
    slug = slug + '-' + occurrences
  }

  return slug
}

/**
 * Reset - Forget all previous slugs
 * @return void
 */
BananaSlug.prototype.reset = function () {
  this.occurrences = {}
}

var whitespace = /\s/g

function lower (string) {
  return string.toLowerCase()
}

function slugger (string, maintainCase) {
  var re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g
  var replacement = '-'

  if (typeof string !== 'string') return ''
  if (!maintainCase) string = string.replace(/[A-Z]+/g, lower)
  return string.trim()
    .replace(re, '')
    .replace(emoji(), '')
    .replace(whitespace, replacement)
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function() {
	return /[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83C\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uD83C\uDDFE\uD83C[\uDDEA\uDDF9]|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDFC\uD83C[\uDDEB\uDDF8]|\uD83C\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uD83C\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF8\uDDFE\uDDFF]|\uD83C\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uD83C\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uD83C\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uD83C\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uD83C\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uD83C\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uD83C\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uD83C\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uD83C\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uD83C\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uD83C\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uD83C\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uD83C\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uD83C\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uD83C\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uD83C\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|[#\*0-9]\u20E3/g;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = toc;

/* Dependencies */
var toExpression = __webpack_require__(9);
var search = __webpack_require__(10);
var contents = __webpack_require__(13);

/**
 * Get a TOC representation of `node`.
 *
 * @param {Mdast} node - MDAST.
 * @param {Object} options - Configuration.
 * @return {Array} - TOC Markdown.
 */
function toc(node, options) {
    var settings = options || {};
    var heading = settings.heading ? toExpression(settings.heading) : null;
    var result = search(node, heading, settings.maxDepth || 6);
    var map = result.map;

    result.map = map.length ? contents(map, settings.tight) : null;

    /* No given heading */
    if (!heading) {
        result.index = null;
        result.endIndex = null;
    }

    return result;
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = toExpression;

/**
 * Transform a string into an applicable expression.
 *
 * @param {string} value - Content to expressionise.
 * @return {RegExp} - Expression from `value`.
 */
function toExpression(value) {
    return new RegExp('^(' + value + ')$', 'i');
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = search;

/* Dependencies */
var toString = __webpack_require__(2);
var visit = __webpack_require__(3);
var slugs = __webpack_require__(6)();
var isClosingHeading = __webpack_require__(11);
var isOpeningHeading = __webpack_require__(12);

/* Constants. */
var HEADING = 'heading';

/**
 * Search a node for a location.
 *
 * @param {Node} root - Parent to search in.
 * @param {RegExp} expression - Heading-content to search
 *   for.
 * @param {number} maxDepth - Maximum-depth to include.
 * @return {Object} - Results.
 */
function search(root, expression, maxDepth) {
    var length = root.children.length;
    var depth = null;
    var lookingForToc = expression !== null;
    var map = [];
    var headingIndex;
    var closingIndex;

    if (!lookingForToc) {
        headingIndex = -1;
    }

    slugs.reset();


    function parse(child, index, parent) {
        var value = toString(child);
        var id =
            child.data && child.data.hProperties && child.data.hProperties.id;
        id = slugs.slug(id || value);

        if ( child.identifier !== 'toc' && parent !== root) {
            return;
        }


        if (lookingForToc) {
            if (isOpeningHeading(child, depth, expression)) {

                closingIndex = index;
                lookingForToc = false;

                headingIndex = index + 1;
                depth = child.depth;
            }
        }

        if (!lookingForToc && value && child.depth <= maxDepth) {
            map.push({
                depth: child.depth,
                value: value,
                id: id
            });

            child.props = child.props?child.props:{};
            child.props.id = id;
        }
    }

    var tocNode = null;
    var nodes = [];

    visit(root, 'linkReference', function (child, index, parent) {
        // nodes.push([child, index, parent]);
        if(child.identifier === 'toc'){
            tocNode = [child, index, parent];
        }
    });

    if(tocNode){

        visit(root, HEADING, function(child, index, parent) {
            nodes.push([child, index, parent]);
        });

        if(tocNode){
            parse.apply(this, tocNode);
            nodes.forEach(function (item) {
                parse.apply(this, item);
            });
        }

    }








    if (headingIndex && !closingIndex) {
        closingIndex = length + 1;
    }

    if (headingIndex === undefined) {
        headingIndex = -1;
        closingIndex = -1;
        map = [];
    }


    return {
        index: headingIndex,
        endIndex: closingIndex,
        map: map,
        toc: tocNode?tocNode[2]:null
    };
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = isClosingHeading;

/* Constants. */
var HEADING = 'heading';

/**
 * Check if `node` is the next heading.
 *
 * @param {Node} node - Node to check.
 * @param {number} depth - Depth of opening heading.
 * @return {boolean} - Whether znode is a closing heading.
 */
function isClosingHeading(node, depth) {
    return depth && node
        // && node.type === HEADING
        && node.depth <= depth;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = isOpeningHeading;

/* Dependencies */
var toString = __webpack_require__(2);

/* Constants. */
var HEADING = 'heading';

/**
 * Check if `node` is the main heading.
 *
 * @param {Node} node - Node to check.
 * @param {number} depth - Depth to check.
 * @param {RegExp} expression - Expression to check.
 * @return {boolean} - Whether `node` is a main heading.
 */
function isOpeningHeading(node, depth, expression) {
    return (
        depth === null &&
        node &&
        // node.type === HEADING &&
        expression.test(toString(node))
    );
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = contents;

/* Dependencies */
var list = __webpack_require__(14);
var insert = __webpack_require__(15);

/**
 * Transform a list of heading objects to a markdown list.
 *
 * @param {Array.<Object>} map - Heading-map to insert.
 * @param {boolean?} [tight] - Prefer tight list-items.
 * @return {Object} - List node.
 */
function contents(map, tight) {
    var minDepth = Infinity;
    var index = -1;
    var length = map.length;
    var table;

    /*
     * Find minimum depth.
     */

    while (++index < length) {
        if (map[index].depth < minDepth) {
            minDepth = map[index].depth;
        }
    }

    /*
     * Normalize depth.
     */

    index = -1;

    while (++index < length) {
        map[index].depth -= minDepth - 1;
    }

    /*
     * Construct the main list.
     */

    table = list();

    /*
     * Add TOC to list.
     */

    index = -1;

    while (++index < length) {
        insert(map[index], table, tight);
    }

    return table;
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = list;

/* Constants */
var LIST = 'list';

/**
 * Create a list.
 *
 * @return {Object} - List node.
 */
function list() {
    return {
        type: LIST,
        ordered: false,
        children: []
    };
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = insert;

/* Dependencies */
var listItem = __webpack_require__(16);
var list = __webpack_require__(14);

/* Constants */
var LIST = 'list';
var LIST_ITEM = 'listItem';
var PARAGRAPH = 'paragraph';
var LINK = 'link';
var TEXT = 'text';

/**
 * Insert a `node` into a `parent`.
 *
 * @param {Object} node - `node` to insert.
 * @param {Object} parent - Parent of `node`.
 * @param {boolean?} [tight] - Prefer tight list-items.
 * @return {undefined}
 */
function insert(node, parent, tight) {
    var children = parent.children;
    var length = children.length;
    var last = children[length - 1];
    var isLoose = false;
    var index;
    var item;

    if (node.depth === 1) {
        item = listItem();

        item.children.push({
            type: PARAGRAPH,
            children: [
                {
                    type: LINK,
                    title: null,
                    url: '#' + node.id,
                    children: [
                        {
                            type: TEXT,
                            value: node.value
                        }
                    ]
                }
            ]
        });

        children.push(item);
    } else if (last && last.type === LIST_ITEM) {
        insert(node, last, tight);
    } else if (last && last.type === LIST) {
        node.depth--;

        insert(node, last, tight);
    } else if (parent.type === LIST) {
        item = listItem();

        insert(node, item, tight);

        children.push(item);
    } else {
        item = list();
        node.depth--;

        insert(node, item, tight);

        children.push(item);
    }

    /*
    * Properly style list-items with new lines.
    */

    if (parent.type === LIST_ITEM) {
        parent.loose = tight ? false : children.length > 1;
    } else {
        if (tight) {
            isLoose = false;
        } else {
            index = -1;

            while (++index < length) {
                if (children[index].loose) {
                    isLoose = true;

                    break;
                }
            }
        }

        index = -1;

        while (++index < length) {
            children[index].loose = isLoose;
        }
    }
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = listItem;

/* Constants */
var LIST_ITEM = 'listItem';

/**
 * Create a list item.
 *
 * @return {Object} - List-item node.
 */
function listItem() {
    return {
        type: LIST_ITEM,
        loose: false,
        children: []
    };
}


/***/ })
/******/ ]);