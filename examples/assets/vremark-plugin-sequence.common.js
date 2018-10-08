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

var visit = __webpack_require__(1);
var Diagram =  __webpack_require__(4);

module.exports = function (options = {}) {

    return function transformer(root) {

        visit(root, 'code', function (node) {

            if(node.lang !== 'sequence') {
                return;
            }

            var code = node.value;
            var diagram = Diagram.parse(code);

            var container = document.createElement('div');
            container.style.width = 0;
            container.style.height = 0;
            // container.style.width = '400';
            // container.style.height = '400';

            document.body.appendChild(container);
            diagram.drawSVG(container, {theme: 'simple'});

            var innerHTML = container.innerHTML;
            container.parentElement.removeChild(container);

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'vremark-sequence';
            node.type = 'html';
            node.value = innerHTML;
        });

    };

};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visit

var visitParents = __webpack_require__(2)

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visitParents

var is = __webpack_require__(3)

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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, module, global) {var _ = __webpack_require__(8);
var WebFont = __webpack_require__(9);
var Snap = __webpack_require__(10);

"use strict";

function Diagram() {
    this.title = void 0, this.actors = [], this.signals = []
}

function ParseError(message, hash) {
    _.extend(this, hash), this.name = "ParseError", this.message = message || ""
}

function AssertException(message) {
    this.message = message
}

function assert(exp, message) {
    if (!exp) throw new AssertException(message)
}

function registerTheme(name, theme) {
    Diagram.themes[name] = theme
}

function getCenterX(box) {
    return box.x + box.width / 2
}

function getCenterY(box) {
    return box.y + box.height / 2
}

function clamp(x, min, max) {
    return x < min ? min : x > max ? max : x
}

function wobble(x1, y1, x2, y2) {
    assert(_.all([x1, x2, y1, y2], _.isFinite), "x1,x2,y1,y2 must be numeric");
    var factor = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / 25, r1 = clamp(Math.random(), .2, .8),
        r2 = clamp(Math.random(), .2, .8), xfactor = Math.random() > .5 ? factor : -factor,
        yfactor = Math.random() > .5 ? factor : -factor,
        p1 = {x: (x2 - x1) * r1 + x1 + xfactor, y: (y2 - y1) * r1 + y1 + yfactor},
        p2 = {x: (x2 - x1) * r2 + x1 - xfactor, y: (y2 - y1) * r2 + y1 - yfactor};
    return "C" + p1.x.toFixed(1) + "," + p1.y.toFixed(1) + " " + p2.x.toFixed(1) + "," + p2.y.toFixed(1) + " " + x2.toFixed(1) + "," + y2.toFixed(1)
}

function handRect(x, y, w, h) {
    return assert(_.all([x, y, w, h], _.isFinite), "x, y, w, h must be numeric"), "M" + x + "," + y + wobble(x, y, x + w, y) + wobble(x + w, y, x + w, y + h) + wobble(x + w, y + h, x, y + h) + wobble(x, y + h, x, y)
}

function handLine(x1, y1, x2, y2) {
    return assert(_.all([x1, x2, y1, y2], _.isFinite), "x1,x2,y1,y2 must be numeric"), "M" + x1.toFixed(1) + "," + y1.toFixed(1) + wobble(x1, y1, x2, y2)
}

Diagram.prototype.getActor = function (alias, name) {
    alias = alias.trim();
    var i, actors = this.actors;
    for (i in actors) if (actors[i].alias == alias) return actors[i];
    return i = actors.push(new Diagram.Actor(alias, name || alias, actors.length)), actors[i - 1]
}, Diagram.prototype.getActorWithAlias = function (input) {
    input = input.trim();
    var alias, name, s = /([\s\S]+) as (\S+)$/im.exec(input);
    return s ? (name = s[1].trim(), alias = s[2].trim()) : name = alias = input, this.getActor(alias, name)
}, Diagram.prototype.setTitle = function (title) {
    this.title = title
}, Diagram.prototype.addSignal = function (signal) {
    this.signals.push(signal)
}, Diagram.Actor = function (alias, name, index) {
    this.alias = alias, this.name = name, this.index = index
}, Diagram.Signal = function (actorA, signaltype, actorB, message) {
    this.type = "Signal", this.actorA = actorA, this.actorB = actorB, this.linetype = 3 & signaltype, this.arrowtype = signaltype >> 2 & 3, this.message = message
}, Diagram.Signal.prototype.isSelf = function () {
    return this.actorA.index == this.actorB.index
}, Diagram.Note = function (actor, placement, message) {
    if (this.type = "Note", this.actor = actor, this.placement = placement, this.message = message, this.hasManyActors() && actor[0] == actor[1]) throw new Error("Note should be over two different actors")
}, Diagram.Note.prototype.hasManyActors = function () {
    return _.isArray(this.actor)
}, Diagram.unescape = function (s) {
    return s.trim().replace(/^"(.*)"$/m, "$1").replace(/\\n/gm, "\n")
}, Diagram.LINETYPE = {SOLID: 0, DOTTED: 1}, Diagram.ARROWTYPE = {
    FILLED: 0,
    OPEN: 1
}, Diagram.PLACEMENT = {
    LEFTOF: 0,
    RIGHTOF: 1,
    OVER: 2
}, "function" != typeof Object.getPrototypeOf && ("object" == typeof"test".__proto__ ? Object.getPrototypeOf = function (object) {
    return object.__proto__
} : Object.getPrototypeOf = function (object) {
    return object.constructor.prototype
});
var parser = function () {
    function Parser() {
        this.yy = {}
    }

    var o = function (k, v, o, l) {
        for (o = o || {}, l = k.length; l--; o[k[l]] = v) ;
        return o
    }, $V0 = [5, 8, 9, 13, 15, 24], $V1 = [1, 13], $V2 = [1, 17], $V3 = [24, 29, 30], parser = {
        trace: function () {
        },
        yy: {},
        symbols_: {
            error: 2,
            start: 3,
            document: 4,
            EOF: 5,
            line: 6,
            statement: 7,
            NL: 8,
            participant: 9,
            actor_alias: 10,
            signal: 11,
            note_statement: 12,
            title: 13,
            message: 14,
            note: 15,
            placement: 16,
            actor: 17,
            over: 18,
            actor_pair: 19,
            ",": 20,
            left_of: 21,
            right_of: 22,
            signaltype: 23,
            ACTOR: 24,
            linetype: 25,
            arrowtype: 26,
            LINE: 27,
            DOTLINE: 28,
            ARROW: 29,
            OPENARROW: 30,
            MESSAGE: 31,
            $accept: 0,
            $end: 1
        },
        terminals_: {
            2: "error",
            5: "EOF",
            8: "NL",
            9: "participant",
            13: "title",
            15: "note",
            18: "over",
            20: ",",
            21: "left_of",
            22: "right_of",
            24: "ACTOR",
            27: "LINE",
            28: "DOTLINE",
            29: "ARROW",
            30: "OPENARROW",
            31: "MESSAGE"
        },
        productions_: [0, [3, 2], [4, 0], [4, 2], [6, 1], [6, 1], [7, 2], [7, 1], [7, 1], [7, 2], [12, 4], [12, 4], [19, 1], [19, 3], [16, 1], [16, 1], [11, 4], [17, 1], [10, 1], [23, 2], [23, 1], [25, 1], [25, 1], [26, 1], [26, 1], [14, 1]],
        performAction: function (yytext, yyleng, yylineno, yy, yystate, $$, _$) {
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return yy.parser.yy;
                case 4:
                    break;
                case 6:
                    $$[$0];
                    break;
                case 7:
                case 8:
                    yy.parser.yy.addSignal($$[$0]);
                    break;
                case 9:
                    yy.parser.yy.setTitle($$[$0]);
                    break;
                case 10:
                    this.$ = new Diagram.Note($$[$0 - 1], $$[$0 - 2], $$[$0]);
                    break;
                case 11:
                    this.$ = new Diagram.Note($$[$0 - 1], Diagram.PLACEMENT.OVER, $$[$0]);
                    break;
                case 12:
                case 20:
                    this.$ = $$[$0];
                    break;
                case 13:
                    this.$ = [$$[$0 - 2], $$[$0]];
                    break;
                case 14:
                    this.$ = Diagram.PLACEMENT.LEFTOF;
                    break;
                case 15:
                    this.$ = Diagram.PLACEMENT.RIGHTOF;
                    break;
                case 16:
                    this.$ = new Diagram.Signal($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0]);
                    break;
                case 17:
                    this.$ = yy.parser.yy.getActor(Diagram.unescape($$[$0]));
                    break;
                case 18:
                    this.$ = yy.parser.yy.getActorWithAlias(Diagram.unescape($$[$0]));
                    break;
                case 19:
                    this.$ = $$[$0 - 1] | $$[$0] << 2;
                    break;
                case 21:
                    this.$ = Diagram.LINETYPE.SOLID;
                    break;
                case 22:
                    this.$ = Diagram.LINETYPE.DOTTED;
                    break;
                case 23:
                    this.$ = Diagram.ARROWTYPE.FILLED;
                    break;
                case 24:
                    this.$ = Diagram.ARROWTYPE.OPEN;
                    break;
                case 25:
                    this.$ = Diagram.unescape($$[$0].substring(1))
            }
        },
        table: [o($V0, [2, 2], {3: 1, 4: 2}), {1: [3]}, {
            5: [1, 3],
            6: 4,
            7: 5,
            8: [1, 6],
            9: [1, 7],
            11: 8,
            12: 9,
            13: [1, 10],
            15: [1, 12],
            17: 11,
            24: $V1
        }, {1: [2, 1]}, o($V0, [2, 3]), o($V0, [2, 4]), o($V0, [2, 5]), {
            10: 14,
            24: [1, 15]
        }, o($V0, [2, 7]), o($V0, [2, 8]), {14: 16, 31: $V2}, {23: 18, 25: 19, 27: [1, 20], 28: [1, 21]}, {
            16: 22,
            18: [1, 23],
            21: [1, 24],
            22: [1, 25]
        }, o([20, 27, 28, 31], [2, 17]), o($V0, [2, 6]), o($V0, [2, 18]), o($V0, [2, 9]), o($V0, [2, 25]), {
            17: 26,
            24: $V1
        }, {24: [2, 20], 26: 27, 29: [1, 28], 30: [1, 29]}, o($V3, [2, 21]), o($V3, [2, 22]), {
            17: 30,
            24: $V1
        }, {17: 32, 19: 31, 24: $V1}, {24: [2, 14]}, {24: [2, 15]}, {
            14: 33,
            31: $V2
        }, {24: [2, 19]}, {24: [2, 23]}, {24: [2, 24]}, {14: 34, 31: $V2}, {14: 35, 31: $V2}, {
            20: [1, 36],
            31: [2, 12]
        }, o($V0, [2, 16]), o($V0, [2, 10]), o($V0, [2, 11]), {17: 37, 24: $V1}, {31: [2, 13]}],
        defaultActions: {3: [2, 1], 24: [2, 14], 25: [2, 15], 27: [2, 19], 28: [2, 23], 29: [2, 24], 37: [2, 13]},
        parseError: function (str, hash) {
            if (!hash.recoverable) throw new Error(str);
            this.trace(str)
        },
        parse: function (input) {
            function lex() {
                var token;
                return token = lexer.lex() || EOF, "number" != typeof token && (token = self.symbols_[token] || token), token
            }

            var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "",
                yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1,
                args = lstack.slice.call(arguments, 1), lexer = Object.create(this.lexer), sharedState = {yy: {}};
            for (var k in this.yy) Object.prototype.hasOwnProperty.call(this.yy, k) && (sharedState.yy[k] = this.yy[k]);
            lexer.setInput(input, sharedState.yy), sharedState.yy.lexer = lexer, sharedState.yy.parser = this, "undefined" == typeof lexer.yylloc && (lexer.yylloc = {});
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            "function" == typeof sharedState.yy.parseError ? this.parseError = sharedState.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
            for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, yyval = {}; ;) {
                if (state = stack[stack.length - 1], this.defaultActions[state] ? action = this.defaultActions[state] : (null !== symbol && "undefined" != typeof symbol || (symbol = lex()), action = table[state] && table[state][symbol]), "undefined" == typeof action || !action.length || !action[0]) {
                    var errStr = "";
                    expected = [];
                    for (p in table[state]) this.terminals_[p] && p > TERROR && expected.push("'" + this.terminals_[p] + "'");
                    errStr = lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"), this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    })
                }
                if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                switch (action[0]) {
                    case 1:
                        stack.push(symbol), vstack.push(lexer.yytext), lstack.push(lexer.yylloc), stack.push(action[1]), symbol = null, preErrorSymbol ? (symbol = preErrorSymbol, preErrorSymbol = null) : (yyleng = lexer.yyleng, yytext = lexer.yytext, yylineno = lexer.yylineno, yyloc = lexer.yylloc, recovering > 0 && recovering--);
                        break;
                    case 2:
                        if (len = this.productions_[action[1]][1], yyval.$ = vstack[vstack.length - len], yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        }, ranges && (yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]]), r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args)), "undefined" != typeof r) return r;
                        len && (stack = stack.slice(0, -1 * len * 2), vstack = vstack.slice(0, -1 * len), lstack = lstack.slice(0, -1 * len)), stack.push(this.productions_[action[1]][0]), vstack.push(yyval.$), lstack.push(yyval._$), newState = table[stack[stack.length - 2]][stack[stack.length - 1]], stack.push(newState);
                        break;
                    case 3:
                        return !0
                }
            }
            return !0
        }
    }, lexer = function () {
        var lexer = {
            EOF: 1,
            parseError: function (str, hash) {
                if (!this.yy.parser) throw new Error(str);
                this.yy.parser.parseError(str, hash)
            },
            setInput: function (input, yy) {
                return this.yy = yy || this.yy || {}, this._input = input, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
            },
            input: function () {
                var ch = this._input[0];
                this.yytext += ch, this.yyleng++, this.offset++, this.match += ch, this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                return lines ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), ch
            },
            unput: function (ch) {
                var len = ch.length, lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - len), this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), lines.length - 1 && (this.yylineno -= lines.length - 1);
                var r = this.yylloc.range;
                return this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - len]), this.yyleng = this.yytext.length, this
            },
            more: function () {
                return this._more = !0, this
            },
            reject: function () {
                return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                })
            },
            less: function (n) {
                this.unput(this.match.slice(n))
            },
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
            },
            upcomingInput: function () {
                var next = this.match;
                return next.length < 20 && (next += this._input.substr(0, 20 - next.length)), (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
            },
            showPosition: function () {
                var pre = this.pastInput(), c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^"
            },
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer && (backup = {
                    yylineno: this.yylineno,
                    yylloc: {
                        first_line: this.yylloc.first_line,
                        last_line: this.last_line,
                        first_column: this.yylloc.first_column,
                        last_column: this.yylloc.last_column
                    },
                    yytext: this.yytext,
                    match: this.match,
                    matches: this.matches,
                    matched: this.matched,
                    yyleng: this.yyleng,
                    offset: this.offset,
                    _more: this._more,
                    _input: this._input,
                    yy: this.yy,
                    conditionStack: this.conditionStack.slice(0),
                    done: this.done
                }, this.options.ranges && (backup.yylloc.range = this.yylloc.range.slice(0))), lines = match[0].match(/(?:\r\n?|\n).*/g), lines && (this.yylineno += lines.length), this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                }, this.yytext += match[0], this.match += match[0], this.matches = match, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(match[0].length), this.matched += match[0], token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), token) return token;
                if (this._backtrack) {
                    for (var k in backup) this[k] = backup[k];
                    return !1
                }
                return !1
            },
            next: function () {
                if (this.done) return this.EOF;
                this._input || (this.done = !0);
                var token, match, tempMatch, index;
                this._more || (this.yytext = "", this.match = "");
                for (var rules = this._currentRules(), i = 0; i < rules.length; i++) if (tempMatch = this._input.match(this.rules[rules[i]]), tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                    if (match = tempMatch, index = i, this.options.backtrack_lexer) {
                        if (token = this.test_match(tempMatch, rules[i]), token !== !1) return token;
                        if (this._backtrack) {
                            match = !1;
                            continue
                        }
                        return !1
                    }
                    if (!this.options.flex) break
                }
                return match ? (token = this.test_match(match, rules[index]), token !== !1 && token) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                })
            },
            lex: function () {
                var r = this.next();
                return r ? r : this.lex()
            },
            begin: function (condition) {
                this.conditionStack.push(condition)
            },
            popState: function () {
                var n = this.conditionStack.length - 1;
                return n > 0 ? this.conditionStack.pop() : this.conditionStack[0]
            },
            _currentRules: function () {
                return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
            },
            topState: function (n) {
                return n = this.conditionStack.length - 1 - Math.abs(n || 0), n >= 0 ? this.conditionStack[n] : "INITIAL"
            },
            pushState: function (condition) {
                this.begin(condition)
            },
            stateStackSize: function () {
                return this.conditionStack.length
            },
            options: {"case-insensitive": !0},
            performAction: function (yy, yy_, $avoiding_name_collisions, YY_START) {
                switch ($avoiding_name_collisions) {
                    case 0:
                        return 8;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        return 9;
                    case 4:
                        return 21;
                    case 5:
                        return 22;
                    case 6:
                        return 18;
                    case 7:
                        return 15;
                    case 8:
                        return 13;
                    case 9:
                        return 20;
                    case 10:
                        return 24;
                    case 11:
                        return 24;
                    case 12:
                        return 28;
                    case 13:
                        return 27;
                    case 14:
                        return 30;
                    case 15:
                        return 29;
                    case 16:
                        return 31;
                    case 17:
                        return 5;
                    case 18:
                        return "INVALID"
                }
            },
            rules: [/^(?:[\r\n]+)/i, /^(?:\s+)/i, /^(?:#[^\r\n]*)/i, /^(?:participant\b)/i, /^(?:left of\b)/i, /^(?:right of\b)/i, /^(?:over\b)/i, /^(?:note\b)/i, /^(?:title\b)/i, /^(?:,)/i, /^(?:[^\->:,\r\n"]+)/i, /^(?:"[^"]+")/i, /^(?:--)/i, /^(?:-)/i, /^(?:>>)/i, /^(?:>)/i, /^(?:[^\r\n]+)/i, /^(?:$)/i, /^(?:.)/i],
            conditions: {
                INITIAL: {
                    rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
                    inclusive: !0
                }
            }
        };
        return lexer
    }();
    return parser.lexer = lexer, Parser.prototype = parser, parser.Parser = Parser, new Parser
}();
"undefined" != "function" && "undefined" != typeof exports && (exports.parser = parser, exports.Parser = parser.Parser, exports.parse = function () {
    return parser.parse.apply(parser, arguments)
}, exports.main = function (args) {
    args[1] || (console.log("Usage: " + args[0] + " FILE"), process.exit(1));
    // var source = require("fs").readFileSync(require("path").normalize(args[1]), "utf8");
    var source = '';
    return exports.parser.parse(source)
}, "undefined" != typeof module && __webpack_require__.c[__webpack_require__.s] === module && exports.main(process.argv.slice(1))), ParseError.prototype = new Error, Diagram.ParseError = ParseError, Diagram.parse = function (input) {
    parser.yy = new Diagram, parser.yy.parseError = function (message, hash) {
        throw new ParseError(message, hash)
    };
    var diagram = parser.parse(input);
    return delete diagram.parseError, diagram
};
var DIAGRAM_MARGIN = 10, ACTOR_MARGIN = 10, ACTOR_PADDING = 10, SIGNAL_MARGIN = 5, SIGNAL_PADDING = 5,
    NOTE_MARGIN = 10, NOTE_PADDING = 5, NOTE_OVERLAP = 15, TITLE_MARGIN = 0, TITLE_PADDING = 5,
    SELF_SIGNAL_WIDTH = 20, PLACEMENT = Diagram.PLACEMENT, LINETYPE = Diagram.LINETYPE,
    ARROWTYPE = Diagram.ARROWTYPE, ALIGN_LEFT = 0, ALIGN_CENTER = 1;
AssertException.prototype.toString = function () {
    return "AssertException: " + this.message
}, String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
}), Diagram.themes = {};
var BaseTheme = function (diagram, options) {
    this.init(diagram, options)
};
if (_.extend(BaseTheme.prototype, {
    init: function (diagram, options) {
        this.diagram = diagram, this.actorsHeight_ = 0, this.signalsHeight_ = 0, this.title_ = void 0
    }, setupPaper: function (container) {
    }, draw: function (container) {
        this.setupPaper(container), this.layout();
        var titleHeight = this.title_ ? this.title_.height : 0, y = DIAGRAM_MARGIN + titleHeight;
        this.drawTitle(), this.drawActors(y), this.drawSignals(y + this.actorsHeight_)
    }, layout: function () {
        function actorEnsureDistance(a, b, d) {
            assert(a < b, "a must be less than or equal to b"), a < 0 ? (b = actors[b], b.x = Math.max(d - b.width / 2, b.x)) : b >= actors.length ? (a = actors[a], a.paddingRight = Math.max(d, a.paddingRight)) : (a = actors[a], a.distances[b] = Math.max(d, a.distances[b] ? a.distances[b] : 0))
        }

        var diagram = this.diagram, font = this.font_, actors = diagram.actors, signals = diagram.signals;
        if (diagram.width = 0, diagram.height = 0, diagram.title) {
            var title = this.title_ = {}, bb = this.textBBox(diagram.title, font);
            title.textBB = bb, title.message = diagram.title, title.width = bb.width + 2 * (TITLE_PADDING + TITLE_MARGIN), title.height = bb.height + 2 * (TITLE_PADDING + TITLE_MARGIN), title.x = DIAGRAM_MARGIN, title.y = DIAGRAM_MARGIN, diagram.width += title.width, diagram.height += title.height
        }
        _.each(actors, function (a) {
            var bb = this.textBBox(a.name, font);
            a.textBB = bb, a.x = 0, a.y = 0, a.width = bb.width + 2 * (ACTOR_PADDING + ACTOR_MARGIN), a.height = bb.height + 2 * (ACTOR_PADDING + ACTOR_MARGIN), a.distances = [], a.paddingRight = 0, this.actorsHeight_ = Math.max(a.height, this.actorsHeight_)
        }, this), _.each(signals, function (s) {
            var a, b, bb = this.textBBox(s.message, font);
            s.textBB = bb, s.width = bb.width, s.height = bb.height;
            var extraWidth = 0;
            if ("Signal" == s.type) s.width += 2 * (SIGNAL_MARGIN + SIGNAL_PADDING), s.height += 2 * (SIGNAL_MARGIN + SIGNAL_PADDING), s.isSelf() ? (a = s.actorA.index, b = a + 1, s.width += SELF_SIGNAL_WIDTH) : (a = Math.min(s.actorA.index, s.actorB.index), b = Math.max(s.actorA.index, s.actorB.index)); else {
                if ("Note" != s.type) throw new Error("Unhandled signal type:" + s.type);
                if (s.width += 2 * (NOTE_MARGIN + NOTE_PADDING), s.height += 2 * (NOTE_MARGIN + NOTE_PADDING), extraWidth = 2 * ACTOR_MARGIN, s.placement == PLACEMENT.LEFTOF) b = s.actor.index, a = b - 1; else if (s.placement == PLACEMENT.RIGHTOF) a = s.actor.index, b = a + 1; else if (s.placement == PLACEMENT.OVER && s.hasManyActors()) a = Math.min(s.actor[0].index, s.actor[1].index), b = Math.max(s.actor[0].index, s.actor[1].index), extraWidth = -(2 * NOTE_PADDING + 2 * NOTE_OVERLAP); else if (s.placement == PLACEMENT.OVER) return a = s.actor.index, actorEnsureDistance(a - 1, a, s.width / 2), actorEnsureDistance(a, a + 1, s.width / 2), void(this.signalsHeight_ += s.height)
            }
            actorEnsureDistance(a, b, s.width + extraWidth), this.signalsHeight_ += s.height
        }, this);
        var actorsX = 0;
        return _.each(actors, function (a) {
            a.x = Math.max(actorsX, a.x), _.each(a.distances, function (distance, b) {
                "undefined" != typeof distance && (b = actors[b], distance = Math.max(distance, a.width / 2, b.width / 2), b.x = Math.max(b.x, a.x + a.width / 2 + distance - b.width / 2))
            }), actorsX = a.x + a.width + a.paddingRight
        }, this), diagram.width = Math.max(actorsX, diagram.width), diagram.width += 2 * DIAGRAM_MARGIN, diagram.height += 2 * DIAGRAM_MARGIN + 2 * this.actorsHeight_ + this.signalsHeight_, this
    }, textBBox: function (text, font) {
    }, drawTitle: function () {
        var title = this.title_;
        title && this.drawTextBox(title, title.message, TITLE_MARGIN, TITLE_PADDING, this.font_, ALIGN_LEFT)
    }, drawActors: function (offsetY) {
        var y = offsetY;
        _.each(this.diagram.actors, function (a) {
            this.drawActor(a, y, this.actorsHeight_), this.drawActor(a, y + this.actorsHeight_ + this.signalsHeight_, this.actorsHeight_);
            var aX = getCenterX(a);
            this.drawLine(aX, y + this.actorsHeight_ - ACTOR_MARGIN, aX, y + this.actorsHeight_ + ACTOR_MARGIN + this.signalsHeight_)
        }, this)
    }, drawActor: function (actor, offsetY, height) {
        actor.y = offsetY, actor.height = height, this.drawTextBox(actor, actor.name, ACTOR_MARGIN, ACTOR_PADDING, this.font_, ALIGN_CENTER)
    }, drawSignals: function (offsetY) {
        var y = offsetY;
        _.each(this.diagram.signals, function (s) {
            "Signal" == s.type ? s.isSelf() ? this.drawSelfSignal(s, y) : this.drawSignal(s, y) : "Note" == s.type && this.drawNote(s, y), y += s.height
        }, this)
    }, drawSelfSignal: function (signal, offsetY) {
        assert(signal.isSelf(), "signal must be a self signal");
        var textBB = signal.textBB, aX = getCenterX(signal.actorA), x = aX + SELF_SIGNAL_WIDTH + SIGNAL_PADDING,
            y = offsetY + SIGNAL_PADDING + signal.height / 2 + textBB.y;
        this.drawText(x, y, signal.message, this.font_, ALIGN_LEFT);
        var y1 = offsetY + SIGNAL_MARGIN + SIGNAL_PADDING,
            y2 = y1 + signal.height - 2 * SIGNAL_MARGIN - SIGNAL_PADDING;
        this.drawLine(aX, y1, aX + SELF_SIGNAL_WIDTH, y1, signal.linetype), this.drawLine(aX + SELF_SIGNAL_WIDTH, y1, aX + SELF_SIGNAL_WIDTH, y2, signal.linetype), this.drawLine(aX + SELF_SIGNAL_WIDTH, y2, aX, y2, signal.linetype, signal.arrowtype)
    }, drawSignal: function (signal, offsetY) {
        var aX = getCenterX(signal.actorA), bX = getCenterX(signal.actorB), x = (bX - aX) / 2 + aX,
            y = offsetY + SIGNAL_MARGIN + 2 * SIGNAL_PADDING;
        this.drawText(x, y, signal.message, this.font_, ALIGN_CENTER), y = offsetY + signal.height - SIGNAL_MARGIN - SIGNAL_PADDING, this.drawLine(aX, y, bX, y, signal.linetype, signal.arrowtype)
    }, drawNote: function (note, offsetY) {
        note.y = offsetY;
        var actorA = note.hasManyActors() ? note.actor[0] : note.actor, aX = getCenterX(actorA);
        switch (note.placement) {
            case PLACEMENT.RIGHTOF:
                note.x = aX + ACTOR_MARGIN;
                break;
            case PLACEMENT.LEFTOF:
                note.x = aX - ACTOR_MARGIN - note.width;
                break;
            case PLACEMENT.OVER:
                if (note.hasManyActors()) {
                    var bX = getCenterX(note.actor[1]), overlap = NOTE_OVERLAP + NOTE_PADDING;
                    note.x = Math.min(aX, bX) - overlap, note.width = Math.max(aX, bX) + overlap - note.x
                } else note.x = aX - note.width / 2;
                break;
            default:
                throw new Error("Unhandled note placement: " + note.placement)
        }
        return this.drawTextBox(note, note.message, NOTE_MARGIN, NOTE_PADDING, this.font_, ALIGN_LEFT)
    }, drawTextBox: function (box, text, margin, padding, font, align) {
        var x = box.x + margin, y = box.y + margin, w = box.width - 2 * margin, h = box.height - 2 * margin;
        return this.drawRect(x, y, w, h), align == ALIGN_CENTER ? (x = getCenterX(box), y = getCenterY(box)) : (x += padding, y += padding), this.drawText(x, y, text, font, align)
    }
}), "undefined" != typeof Snap) {
    var xmlns = "http://www.w3.org/2000/svg", LINE = {stroke: "#000000", "stroke-width": 2, fill: "none"},
        RECT = {stroke: "#000000", "stroke-width": 2, fill: "#fff"}, LOADED_FONTS = {},
        SnapTheme = function (diagram, options, resume) {
            _.defaults(options, {
                "css-class": "simple",
                "font-size": 16,
                "font-family": "Andale Mono, monospace"
            }), this.init(diagram, options, resume)
        };
    _.extend(SnapTheme.prototype, BaseTheme.prototype, {
        init: function (diagram, options, resume) {
            BaseTheme.prototype.init.call(this, diagram), this.paper_ = void 0, this.cssClass_ = options["css-class"] || void 0, this.font_ = {
                "font-size": options["font-size"],
                "font-family": options["font-family"]
            };
            var a = this.arrowTypes_ = {};
            a[ARROWTYPE.FILLED] = "Block", a[ARROWTYPE.OPEN] = "Open";
            var l = this.lineTypes_ = {};
            l[LINETYPE.SOLID] = "", l[LINETYPE.DOTTED] = "6,2";
            var that = this;
            // this.waitForFont(function () {
            //     resume(that)
            // })
            resume(that);
        }, waitForFont: function (callback) {
            var fontFamily = this.font_["font-family"];
            if ("undefined" == typeof WebFont) throw new Error("WebFont is required (https://github.com/typekit/webfontloader).");
            return LOADED_FONTS[fontFamily] ? void callback() : void WebFont.load({
                custom: {families: [fontFamily]},
                classes: !1,
                active: function () {
                    LOADED_FONTS[fontFamily] = !0, callback()
                },
                inactive: function () {
                    LOADED_FONTS[fontFamily] = !0, callback()
                }
            })
        }, addDescription: function (svg, description) {
            var desc = document.createElementNS(xmlns, "desc");
            desc.appendChild(document.createTextNode(description)), svg.appendChild(desc)
        }, setupPaper: function (container) {
            var svg = document.createElementNS(xmlns, "svg");
            container.appendChild(svg), this.addDescription(svg, this.diagram.title || ""), this.paper_ = Snap(svg), this.paper_.addClass("sequence"), this.cssClass_ && this.paper_.addClass(this.cssClass_), this.beginGroup();
            var a = this.arrowMarkers_ = {}, arrow = this.paper_.path("M 0 0 L 5 2.5 L 0 5 z");
            a[ARROWTYPE.FILLED] = arrow.marker(0, 0, 5, 5, 5, 2.5).attr({id: "markerArrowBlock"}), arrow = this.paper_.path("M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"), a[ARROWTYPE.OPEN] = arrow.marker(0, 0, 9.6, 16, 9.6, 8).attr({
                markerWidth: "4",
                id: "markerArrowOpen"
            })
        }, layout: function () {
            BaseTheme.prototype.layout.call(this), this.paper_.attr({
                width: this.diagram.width + "px",
                height: this.diagram.height + "px"
            })
        }, textBBox: function (text, font) {
            var t = this.createText(text, font), bb = t.getBBox();
            return t.remove(), bb
        }, pushToStack: function (element) {
            return this._stack.push(element), element
        }, beginGroup: function () {
            this._stack = []
        }, finishGroup: function () {
            var g = this.paper_.group.apply(this.paper_, this._stack);
            return this.beginGroup(), g
        }, createText: function (text, font) {
            text = _.invoke(text.split("\n"), "trim");
            var t = this.paper_.text(0, 0, text);
            return t.attr(font || {}), text.length > 1 && t.selectAll("tspan:nth-child(n+2)").attr({
                dy: "1.2em",
                x: 0
            }), t
        }, drawLine: function (x1, y1, x2, y2, linetype, arrowhead) {
            var line = this.paper_.line(x1, y1, x2, y2).attr(LINE);
            return void 0 !== linetype && line.attr("strokeDasharray", this.lineTypes_[linetype]), void 0 !== arrowhead && line.attr("markerEnd", this.arrowMarkers_[arrowhead]), this.pushToStack(line)
        }, drawRect: function (x, y, w, h) {
            var rect = this.paper_.rect(x, y, w, h).attr(RECT);
            return this.pushToStack(rect)
        }, drawText: function (x, y, text, font, align) {
            var t = this.createText(text, font), bb = t.getBBox();
            return align == ALIGN_CENTER && (x -= bb.width / 2, y -= bb.height / 2), t.attr({
                x: x - bb.x,
                y: y - bb.y
            }), t.selectAll("tspan").attr({x: x}), this.pushToStack(t), t
        }, drawTitle: function () {
            return this.beginGroup(), BaseTheme.prototype.drawTitle.call(this), this.finishGroup().addClass("title")
        }, drawActor: function (actor, offsetY, height) {
            return this.beginGroup(), BaseTheme.prototype.drawActor.call(this, actor, offsetY, height), this.finishGroup().addClass("actor")
        }, drawSignal: function (signal, offsetY) {
            return this.beginGroup(), BaseTheme.prototype.drawSignal.call(this, signal, offsetY), this.finishGroup().addClass("signal")
        }, drawSelfSignal: function (signal, offsetY) {
            return this.beginGroup(), BaseTheme.prototype.drawSelfSignal.call(this, signal, offsetY), this.finishGroup().addClass("signal")
        }, drawNote: function (note, offsetY) {
            return this.beginGroup(), BaseTheme.prototype.drawNote.call(this, note, offsetY), this.finishGroup().addClass("note")
        }
    });
    var SnapHandTheme = function (diagram, options, resume) {
        _.defaults(options, {
            "css-class": "hand",
            "font-size": 16,
            "font-family": "danielbd"
        }), this.init(diagram, options, resume)
    };
    _.extend(SnapHandTheme.prototype, SnapTheme.prototype, {
        drawLine: function (x1, y1, x2, y2, linetype, arrowhead) {
            var line = this.paper_.path(handLine(x1, y1, x2, y2)).attr(LINE);
            return void 0 !== linetype && line.attr("strokeDasharray", this.lineTypes_[linetype]), void 0 !== arrowhead && line.attr("markerEnd", this.arrowMarkers_[arrowhead]), this.pushToStack(line)
        }, drawRect: function (x, y, w, h) {
            var rect = this.paper_.path(handRect(x, y, w, h)).attr(RECT);
            return this.pushToStack(rect)
        }
    }), registerTheme("snapSimple", SnapTheme), registerTheme("snapHand", SnapHandTheme)
}
if ("undefined" != typeof Raphael) {
    var LINE = {stroke: "#000000", "stroke-width": 2, fill: "none"},
        RECT = {stroke: "#000000", "stroke-width": 2, fill: "#fff"};
    Raphael.fn.line = function (x1, y1, x2, y2) {
        return assert(_.all([x1, x2, y1, y2], _.isFinite), "x1,x2,y1,y2 must be numeric"), this.path("M{0},{1} L{2},{3}", x1, y1, x2, y2)
    };
    var RaphaelTheme = function (diagram, options, resume) {
        this.init(diagram, _.defaults(options, {"font-size": 16, "font-family": "Andale Mono, monospace"}), resume)
    };
    _.extend(RaphaelTheme.prototype, BaseTheme.prototype, {
        init: function (diagram, options, resume) {
            BaseTheme.prototype.init.call(this, diagram), this.paper_ = void 0, this.font_ = {
                "font-size": options["font-size"],
                "font-family": options["font-family"]
            };
            var a = this.arrowTypes_ = {};
            a[ARROWTYPE.FILLED] = "block", a[ARROWTYPE.OPEN] = "open";
            var l = this.lineTypes_ = {};
            l[LINETYPE.SOLID] = "", l[LINETYPE.DOTTED] = "-", resume(this)
        }, setupPaper: function (container) {
            this.paper_ = new Raphael(container, 320, 200), this.paper_.setStart()
        }, draw: function (container) {
            BaseTheme.prototype.draw.call(this, container), this.paper_.setFinish()
        }, layout: function () {
            BaseTheme.prototype.layout.call(this), this.paper_.setSize(this.diagram.width, this.diagram.height)
        }, cleanText: function (text) {
            return text = _.invoke(text.split("\n"), "trim"), text.join("\n")
        }, textBBox: function (text, font) {
            text = this.cleanText(text), font = font || {};
            var p;
            font.obj_ ? p = this.paper_.print(0, 0, text, font.obj_, font["font-size"]) : (p = this.paper_.text(0, 0, text), p.attr(font));
            var bb = p.getBBox();
            return p.remove(), bb
        }, drawLine: function (x1, y1, x2, y2, linetype, arrowhead) {
            var line = this.paper_.line(x1, y1, x2, y2).attr(LINE);
            return void 0 !== arrowhead && line.attr("arrow-end", this.arrowTypes_[arrowhead] + "-wide-long"), void 0 !== arrowhead && line.attr("stroke-dasharray", this.lineTypes_[linetype]), line
        }, drawRect: function (x, y, w, h) {
            return this.paper_.rect(x, y, w, h).attr(RECT)
        }, drawText: function (x, y, text, font, align) {
            text = this.cleanText(text), font = font || {}, align = align || ALIGN_LEFT;
            var paper = this.paper_, bb = this.textBBox(text, font);
            align == ALIGN_CENTER && (x -= bb.width / 2, y -= bb.height / 2);
            var t;
            return font.obj_ ? t = paper.print(x - bb.x, y - bb.y, text, font.obj_, font["font-size"]) : (t = paper.text(x - bb.x - bb.width / 2, y - bb.y, text), t.attr(font), t.attr({"text-anchor": "start"})), t
        }
    });
    var RaphaelHandTheme = function (diagram, options, resume) {
        this.init(diagram, _.defaults(options, {"font-size": 16, "font-family": "daniel"}), resume)
    };
    _.extend(RaphaelHandTheme.prototype, RaphaelTheme.prototype, {
        setupPaper: function (container) {
            RaphaelTheme.prototype.setupPaper.call(this, container), this.font_.obj_ = this.paper_.getFont("daniel")
        }, drawLine: function (x1, y1, x2, y2, linetype, arrowhead) {
            var line = this.paper_.path(handLine(x1, y1, x2, y2)).attr(LINE);
            return void 0 !== arrowhead && line.attr("arrow-end", this.arrowTypes_[arrowhead] + "-wide-long"), void 0 !== arrowhead && line.attr("stroke-dasharray", this.lineTypes_[linetype]), line
        }, drawRect: function (x, y, w, h) {
            return this.paper_.path(handRect(x, y, w, h)).attr(RECT)
        }
    }), registerTheme("raphaelSimple", RaphaelTheme), registerTheme("raphaelHand", RaphaelHandTheme)
}
if ("undefined" != typeof Raphael && Raphael.registerFont({
    w: 209,
    face: {
        "font-family": "Daniel",
        "font-weight": 700,
        "font-stretch": "normal",
        "units-per-em": "360",
        "panose-1": "2 11 8 0 0 0 0 0 0 0",
        ascent: "288",
        descent: "-72",
        "x-height": "7",
        bbox: "-92.0373 -310.134 519 184.967",
        "underline-thickness": "3.51562",
        "underline-position": "-25.1367",
        "unicode-range": "U+0009-U+F002"
    },
    glyphs: {
        " ": {w: 179},
        "\t": {w: 179},
        "\r": {w: 179},
        "!": {
            d: "66,-306v9,3,18,11,19,24v-18,73,-20,111,-37,194v0,10,2,34,-12,34v-12,0,-18,-9,-18,-28v0,-85,23,-136,38,-214v1,-7,4,-10,10,-10xm25,-30v15,-1,28,34,5,35v-11,-1,-38,-36,-5,-35",
            w: 115
        },
        '"': {
            d: "91,-214v-32,3,-25,-40,-20,-68v3,-16,7,-25,12,-27v35,13,14,56,8,95xm8,-231v4,-31,1,-40,18,-75v37,7,11,51,11,79v-3,3,-4,8,-5,13v-17,4,-16,-10,-24,-17",
            w: 117
        },
        "#": {
            d: "271,-64v-30,26,-96,-7,-102,51v-6,2,-13,2,-24,-2v-2,-11,10,-21,2,-28v-14,5,-48,0,-48,22v0,23,-11,14,-29,10v-7,-6,6,-19,-1,-24r-32,4v-19,-8,-15,-24,5,-28r33,-6v4,0,24,-23,11,-27v-26,0,-63,14,-74,-10v3,-1,9,-17,16,-10v15,-8,81,4,89,-30v8,-14,16,-34,24,-38v23,9,24,38,5,49v37,24,55,-38,72,-43v19,10,20,23,-1,45v2,8,23,1,29,4v3,3,6,6,10,11v-14,13,-20,12,-45,12v-17,0,-16,17,-19,29v18,-7,49,3,67,-2v4,0,8,4,12,11xm161,-104v-30,-1,-44,10,-44,37v14,1,24,0,40,-5v0,-1,3,-10,8,-26v0,-4,-1,-6,-4,-6",
            w: 285
        },
        $: {
            d: "164,-257v29,4,1,42,-3,50v5,5,38,13,41,24v8,4,6,15,-2,21v-18,3,-36,-17,-49,-17v-17,1,-31,40,-28,48v5,4,8,8,9,10v13,1,35,37,28,44v-10,21,-36,20,-65,28v-10,10,-12,40,-17,51v-9,-3,-28,1,-18,-17v0,-13,5,-24,-1,-35v-18,1,-59,-10,-42,-29v21,0,56,16,55,-16v5,-4,9,-18,9,-26v-14,-15,-55,-41,-53,-65v2,-33,56,-19,98,-26v10,-14,31,-43,38,-45xm93,-152v11,-10,15,-15,14,-29v-17,-3,-37,1,-43,6v10,12,20,19,29,23xm111,-103v-8,1,-11,12,-10,22v10,0,28,2,27,-8v0,-4,-13,-15,-17,-14",
            w: 225
        },
        "%": {
            d: "181,-96v24,-7,67,-13,104,1v14,18,21,19,22,44v-13,43,-99,61,-146,36v-9,-9,-22,-11,-32,-29v0,-27,24,-53,52,-52xm139,-185v-9,68,-138,73,-131,-5v0,-3,3,-9,9,-17v13,1,27,1,17,-16v5,-39,63,0,93,-6v36,1,80,-9,102,11v15,32,12,32,-8,56v-16,21,-103,78,-152,125r-14,28v-23,11,-25,-7,-29,-20v34,-71,133,-98,171,-162v-13,-12,-52,-5,-61,1v0,1,1,3,3,5xm38,-190v0,34,55,29,70,8v0,-14,-20,-11,-32,-14v-14,-3,-24,-9,-40,-10v1,0,5,11,2,16xm172,-53v12,27,90,18,102,-5v-18,-7,-32,-10,-40,-10v-29,3,-57,-4,-62,15",
            w: 308
        },
        "&": {
            d: "145,-82v17,-8,47,-15,71,-26v13,2,25,12,9,23v-23,7,-40,16,-53,27r0,6v13,8,30,21,36,38v0,8,-4,12,-11,12v-19,0,-43,-39,-59,-44v-30,12,-65,29,-97,32v-32,3,-45,-41,-23,-63v21,-20,52,-26,70,-48v-4,-31,-12,-47,9,-73v13,-16,20,-29,23,-39v15,-15,32,-22,51,-22v30,9,62,64,32,96v-2,3,-47,42,-69,48v-15,8,-11,9,0,22v6,7,10,11,11,11xm114,-138v25,-13,62,-38,74,-62v0,-9,-10,-31,-20,-29v-28,7,-60,42,-60,75v0,10,2,15,6,16xm99,-91v-18,10,-54,18,-59,45v26,5,61,-12,77,-22v-1,-5,-13,-23,-18,-23",
            w: 253
        },
        "'": {d: "36,-182v-36,7,-34,-61,-17,-80v15,1,21,19,21,20r-1,-1v0,0,-1,12,-5,35v1,5,3,17,2,26", w: 63},
        "(": {
            d: "130,-306v13,2,23,43,-1,43v-49,43,-77,77,-90,148v5,49,27,67,64,101v4,14,5,6,2,19r-15,0v-35,-17,-79,-58,-79,-120v0,-58,66,-176,119,-191",
            w: 120
        },
        ")": {
            d: "108,-138v-2,73,-48,120,-98,153v-17,-5,-16,-20,-6,-31v52,-64,73,-62,74,-135v1,-42,-40,-98,-58,-128v0,-5,-1,-12,-2,-22v18,-18,25,0,42,27v25,39,50,66,48,136",
            w: 120
        },
        "*": {
            d: "121,-271v15,-5,36,-8,40,9v-5,10,-31,19,-47,31v0,11,34,43,14,53v-18,8,-24,-24,-34,-20v-4,10,-4,19,-12,41v-25,7,-15,-30,-17,-47v-13,-1,-17,9,-46,30r-10,0v-20,-32,37,-43,54,-64v-10,-11,-36,-33,-16,-51v3,0,14,8,33,24v8,-10,26,-39,32,-42v14,7,15,23,9,36",
            w: 177
        },
        "+": {
            d: "163,-64v-7,22,-65,2,-77,21v-2,10,-6,21,-11,35v-20,4,-21,-12,-19,-29v3,-23,-44,6,-39,-27v-8,-22,36,-8,49,-18v8,-13,6,-36,24,-40v19,-4,14,32,11,39v18,3,19,2,54,8v2,1,5,5,8,11",
            w: 170
        },
        ",": {d: "25,63v-26,21,-48,-2,-22,-24v14,-12,35,-40,35,-69v3,-2,3,-11,12,-9v35,17,5,88,-25,102", w: 97},
        "-": {d: "57,-94v19,4,55,-5,54,17v-15,23,-54,20,-91,15v-4,2,-13,-10,-11,-16v-1,-22,28,-15,48,-16", w: 124},
        ".": {d: "40,-48v21,20,21,44,-4,44v-33,0,-26,-24,-10,-44r14,0", w: 67},
        "/": {
            d: "21,20v-22,-45,21,-95,41,-126v38,-57,115,-158,193,-201v2,0,4,3,7,11v11,29,-15,34,-25,55v-81,56,-189,208,-197,261r-19,0",
            w: 275
        },
        0: {
            d: "78,-237v70,-47,269,-41,270,59v0,34,-11,53,-29,76v-13,35,-30,32,-85,64v-6,2,-10,6,-7,8v-73,14,-98,38,-173,1v-7,-13,-52,-48,-46,-88v9,-57,27,-75,70,-120xm123,-38v100,0,202,-46,195,-153v-32,-55,-144,-73,-211,-35v-16,34,-68,54,-53,108v6,25,1,22,-3,39v6,24,41,41,72,41",
            w: 353
        },
        1: {
            d: "39,-208v0,-14,6,-59,29,-39v3,4,6,13,10,24r-22,128r8,87v-4,6,-9,3,-16,2v-44,-38,-9,-137,-9,-202",
            w: 93
        },
        2: {
            d: "88,-35v47,-10,119,-24,168,-9v0,12,-23,13,-35,16v1,1,3,1,5,1v-74,8,-118,23,-194,23v-14,0,-20,-13,-21,-28v55,-40,83,-61,123,-104v26,-13,65,-67,71,-102v-1,-9,-11,-16,-22,-16v-20,-1,-120,29,-156,49v-10,-2,-30,-20,-10,-28v50,-21,111,-51,178,-48v25,10,44,22,36,39v12,30,-19,64,-34,83v-39,48,-37,39,-115,109v0,5,-3,8,-8,11v4,3,8,4,14,4",
            w: 265
        },
        3: {
            d: "188,-282v34,-10,74,25,47,51v-19,32,-55,50,-92,70v28,14,116,25,108,70v8,14,-49,40,-63,48v-29,9,-130,22,-168,42v-6,-5,-19,-7,-12,-22v56,-36,175,-21,210,-76v-9,-20,-88,-42,-97,-33v-20,-1,-41,2,-56,-7r5,-21v56,-25,103,-36,137,-78v1,-1,2,-5,4,-11v-15,-14,-56,7,-79,0v-10,9,-73,22,-92,31v-11,-4,-28,-23,-13,-30v50,-22,96,-26,154,-37v0,-1,8,3,7,3",
            w: 260
        },
        4: {
            d: "79,-249v-7,17,-29,75,-33,96v0,6,3,8,8,8v43,-2,111,6,141,-6v17,-47,20,-100,63,-148v9,4,16,7,21,10v-17,31,-44,95,-51,141v7,4,24,-4,23,10v-1,16,-29,12,-31,23v-10,22,-9,69,-7,103v-3,2,-7,5,-10,9v-47,-11,-23,-74,-16,-114v0,-4,-2,-6,-7,-6v-65,2,-89,13,-162,4v-22,-22,-2,-53,5,-76v16,-15,17,-57,35,-70v6,-1,21,11,21,16",
            w: 267
        },
        5: {
            d: "185,-272v30,7,45,-8,53,18v1,16,-17,18,-34,14v0,0,-95,-11,-129,1v-6,9,-24,33,-29,54v76,10,171,5,214,47v11,11,22,30,5,52v-14,12,-30,14,-34,27v-26,11,-141,63,-157,60v-16,-2,-25,-19,-4,-27v48,-18,128,-39,170,-86v4,-14,-65,-41,-85,-41r-92,0v-10,-4,-66,-1,-57,-23v0,-23,23,-51,35,-83v11,-28,133,-10,144,-13",
            w: 284
        },
        6: {
            d: "70,-64v9,-51,63,-74,123,-71v43,2,109,3,111,41r-25,47v0,1,1,2,2,3v-5,0,-39,10,-41,20v-15,3,-22,4,-22,11v-39,1,-77,20,-119,13v-42,-7,-35,-9,-77,-46v-56,-118,94,-201,176,-229v7,0,21,8,20,15v-2,17,-23,15,-43,24v-69,31,-119,72,-134,145v-5,25,36,68,78,64v59,-6,128,-18,153,-61v-7,-14,-13,-9,-32,-21v-67,-15,-118,-5,-150,43r0,12v-13,4,-17,-3,-20,-10",
            w: 310
        },
        7: {
            d: "37,-228v33,-14,173,-17,181,-19v28,-1,24,31,9,45v-17,15,-45,49,-59,69v-17,26,-55,67,-61,113v-10,13,-9,14,-14,20v-33,-13,-20,-25,-11,-53v16,-48,73,-115,109,-156v2,-7,5,-14,-10,-12v-26,4,-54,6,-76,13v-23,-5,-83,31,-94,-9v2,-8,18,-19,26,-11",
            w: 245
        },
        8: {
            d: "57,-236v40,-50,166,-51,213,-10v22,28,10,63,-22,78r-35,17v8,5,54,24,53,44v-5,14,-4,33,-18,42v-13,13,-35,18,-44,34v-60,27,-190,49,-194,-42v7,-41,17,-54,59,-70r0,-4v-32,-9,-73,-62,-26,-85v4,0,8,-2,14,-4xm142,-160v24,-2,160,-31,99,-72v-28,-18,-108,-33,-146,-5v-16,12,-28,30,-33,59v24,12,37,20,80,18xm41,-62v30,65,189,6,199,-37v3,-14,-60,-30,-74,-30v-70,0,-118,10,-125,67",
            w: 290
        },
        9: {
            d: "11,-192v15,-49,119,-61,161,-23v16,15,27,55,11,79v-20,62,-51,79,-96,118v-10,4,-45,27,-50,6v9,-15,66,-52,98,-99v-7,-7,-8,-3,-25,0v-49,-11,-96,-25,-99,-81xm145,-131v7,-5,13,-34,13,-41v-2,-51,-104,-38,-114,-6v-2,10,37,35,46,35v23,1,43,-1,55,12",
            w: 198
        },
        ":": {
            d: "39,-125v15,-8,40,-1,40,15v0,15,-6,22,-19,22v-13,0,-29,-21,-21,-37xm66,-17v-8,27,-51,19,-46,-8v-1,-6,8,-22,14,-20v29,0,30,6,32,28",
            w: 95
        },
        ";": {
            d: "56,-93v2,-30,37,-22,40,2v0,2,-1,7,-3,15v-13,8,-15,6,-27,4xm64,-44v11,-11,30,-4,32,14v-21,39,-63,71,-92,85v-5,0,-11,-2,-18,-8v11,-23,36,-36,50,-61v11,-7,19,-20,28,-30",
            w: 107
        },
        "<": {
            d: "166,-202v12,0,29,15,24,29v0,4,-119,64,-120,73v15,21,89,64,91,86v2,29,-18,12,-30,15v-27,-29,-59,-54,-95,-75v-18,-10,-25,-13,-24,-41",
            w: 176
        },
        "=": {
            d: "125,-121v18,7,55,-9,69,14v0,17,-45,26,-135,26v-18,0,-27,-7,-27,-21v-1,-37,60,-5,93,-19xm138,-71v20,0,48,-1,50,16v-13,24,-86,32,-131,29v-29,-2,-43,-10,-43,-24v-7,-23,36,-14,39,-17v27,6,57,-4,85,-4",
            w: 196
        },
        ">": {
            d: "4,-14v20,-48,77,-59,118,-94v-16,-19,-58,-52,-81,-75v-11,-7,-15,-38,-1,-40v33,16,83,71,121,105v26,23,-6,35,-41,53v-29,16,-56,28,-73,54v-21,15,-16,20,-34,15v-3,0,-9,-16,-9,-18",
            w: 174
        },
        "?": {
            d: "105,-291v57,-13,107,-4,107,39v0,67,-136,85,-155,137v-1,6,10,23,-4,23v-23,1,-33,-35,-23,-57v31,-41,124,-60,149,-103v-8,-21,-72,-5,-88,-1v-23,6,-59,39,-71,8v0,0,-1,0,1,-17v10,-4,45,-20,84,-29xm80,-25v-6,4,-8,39,-24,22v-24,3,-22,-21,-13,-35v17,-7,29,5,37,13",
            w: 216
        },
        "@": {
            d: "218,-207v23,8,42,14,47,37v44,68,-27,137,-87,85r1,0v0,2,-59,19,-61,17v-35,0,-42,-47,-17,-68r0,-4v-19,-1,-45,37,-49,40v-37,76,58,72,121,62v11,-2,34,-13,36,3v-14,31,-69,31,-114,33v-51,2,-99,-41,-80,-92v2,-30,22,-40,42,-63v35,-20,91,-53,161,-50xm217,-101v23,0,35,-19,35,-41v0,-43,-75,-41,-102,-19v36,3,55,16,62,41v-6,5,-6,19,5,19xm127,-110v8,5,51,-15,28,-16v-4,0,-25,4,-28,16",
            w: 291
        },
        A: {
            d: "97,-81v-23,-10,-39,38,-52,60v-8,6,-8,6,-22,18v-22,-7,-23,-37,-4,-49v7,-8,11,-15,15,-23r-1,1v-14,-26,23,-29,31,-40v1,-1,15,-29,26,-36v17,-31,39,-58,54,-92v16,-20,20,-51,41,-66v29,5,34,62,45,92v9,64,21,103,49,155v-3,25,-44,11,-54,0v-34,-12,-97,-29,-128,-20xm107,-118v20,6,80,10,111,17v6,-7,-4,-15,-7,-24v-11,-28,-9,-92,-30,-117v-9,9,-19,44,-34,55v-9,23,-27,40,-40,69",
            w: 294
        },
        B: {
            d: "256,-179v41,10,115,34,91,91v-6,3,-14,12,-19,20v-37,19,-50,34,-63,25v-9,10,-12,11,-34,13r3,-3v-4,-4,-12,-4,-18,0v0,0,2,2,5,4v-21,14,-26,6,-44,15v-4,0,-7,-2,-8,-5v-6,11,-20,-5,-18,11v-36,4,-91,35,-114,4v-7,-62,-10,-138,4,-199v-1,-19,-37,2,-37,-27v0,-8,2,-13,6,-15v68,-31,231,-92,311,-39v8,12,12,20,12,25v-8,42,-32,49,-77,80xm79,-160v72,-17,135,-39,184,-70v20,-13,31,-23,31,-27v1,-6,-30,-13,-38,-12v-54,0,-116,13,-186,41v11,21,1,48,9,68xm262,-43v0,-4,3,-6,-4,-5v0,1,1,2,4,5xm211,-140v-34,7,-94,24,-139,15v-6,20,-4,56,-4,82v0,29,43,1,56,2v48,-11,108,-25,154,-48v20,-10,32,-17,32,-25v0,-18,-33,-26,-99,-26xm195,-20v6,1,6,-2,5,-7v-3,2,-7,2,-5,7",
            w: 364
        },
        C: {
            d: "51,-114v-12,75,96,76,166,71r145,-10v9,2,9,5,9,18v-37,18,-85,28,-109,22v-18,10,-47,10,-71,10v-29,0,-68,1,-105,-11v-6,-1,-10,-3,-10,-8v-33,-13,-48,-33,-66,-59v-19,-114,146,-150,224,-177v35,0,88,-31,99,7v-1,29,-49,14,-76,28v-55,8,-115,35,-175,71v-13,8,-23,21,-31,38",
            w: 376
        },
        D: {
            d: "312,-78v-2,1,-3,7,-10,5v6,-3,10,-4,10,-5xm4,-252v2,-27,83,-38,106,-39v130,-7,267,1,291,109v0,0,-2,8,-3,25v-5,9,-4,28,-23,34v-4,4,-2,5,-7,0v-3,3,-15,7,-5,10v0,0,-10,14,-13,2v-11,1,-8,5,-20,14v1,2,7,3,9,1v-4,13,-22,13,-11,4v0,-3,1,-6,-3,-5v-40,29,-103,38,-141,65v10,6,22,-7,34,-3v-41,20,-127,44,-171,46v-21,1,-47,-33,-11,-39v15,-2,43,-6,56,-11v-16,-101,-5,-130,9,-207v2,0,4,-1,6,-3v-16,-17,-91,38,-103,-3xm297,-69v-7,3,-17,8,-25,7v1,1,3,2,5,2v-4,2,-11,5,-23,9v4,-11,30,-21,43,-18xm240,-51v10,0,12,2,0,6r0,-6xm220,-36v-1,-3,4,-6,6,-3v0,1,-2,1,-6,3xm125,-48v16,6,137,-46,155,-53v29,-18,101,-44,82,-93v-21,-53,-84,-61,-168,-67v-20,7,-50,3,-77,8v33,54,-12,132,8,205xm159,-22v-4,-1,-15,-5,-15,2v7,-1,12,-2,15,-2",
            w: 381
        },
        E: {
            d: "45,-219v-19,-36,34,-41,63,-36v44,-10,133,-8,194,-15v3,2,38,11,52,15v-73,19,-171,21,-246,38v-9,11,-16,32,-20,61v35,11,133,-6,183,3v1,6,2,7,3,14v-46,24,-118,16,-193,27v-15,13,-22,52,-22,66v60,1,121,-20,188,-20v22,10,53,-7,74,5v16,29,-23,26,-43,32v-73,4,-139,13,-216,27r-52,-10v-4,-22,23,-69,26,-98v-3,0,-10,-15,-12,-24v20,-12,34,-23,35,-67v2,-1,5,-5,5,-7v0,-4,-14,-11,-19,-11",
            w: 353
        },
        F: {
            d: "270,-258v13,2,59,6,48,34v-78,-3,-143,1,-212,22v-10,16,-21,43,-24,69r145,-9v8,3,29,-3,16,21v-14,-1,-59,13,-60,7v-12,13,-67,18,-108,21v-2,1,-4,3,-7,6v-2,23,-8,43,-7,69v1,28,-30,11,-40,5r10,-80r-26,-14v5,-10,10,-33,28,-25v21,-3,15,-46,26,-59v-1,-3,-32,-13,-28,-24v2,-22,45,-16,59,-30v47,4,99,-14,151,-9v5,-3,25,-3,29,-4",
            w: 236
        },
        G: {
            d: "311,-168v53,0,94,57,74,110v-31,37,-71,34,-136,52v-13,-7,-41,10,-57,7v-73,-1,-122,-17,-162,-59v-49,-51,-24,-80,5,-130v35,-61,138,-93,214,-106v16,4,42,-1,40,21v-5,40,-39,2,-73,21v-76,19,-162,65,-177,142v28,103,237,76,312,29v2,-3,3,-7,3,-13v-10,-35,-37,-43,-87,-45v-16,-13,-53,-9,-78,1v-4,-3,-5,-7,-5,-11v17,-29,73,-17,108,-24v12,4,18,5,19,5",
            w: 391
        },
        H: {
            d: "300,-268v18,12,19,32,4,51v-35,44,-34,140,-46,217v-1,5,-5,13,-11,12v-6,1,-19,-14,-18,-27r7,-106v-28,7,-76,22,-116,14v-18,2,-36,6,-55,3v-43,-8,-14,53,-33,75v-29,1,-26,-67,-21,-97v5,-31,28,-73,43,-98v2,2,7,3,14,3v13,33,-11,48,-13,78v61,4,118,2,176,2v8,0,13,-6,15,-20v4,-47,21,-87,54,-107",
            w: 288
        },
        I: {
            d: "63,-266v34,10,-4,105,-8,128r-24,126v-2,2,-3,1,-9,6v-12,-10,-12,-15,-12,-47v0,-93,9,-156,28,-188v10,-17,19,-25,25,-25",
            w: 79
        },
        J: {
            d: "235,-291v26,11,31,104,31,142v0,37,-2,95,-32,126v-33,34,-121,26,-167,1v-18,-11,-54,-29,-59,-59v0,-3,5,-15,16,-14v31,36,90,57,162,51v63,-30,56,-148,32,-226v-1,-16,11,-13,17,-21",
            w: 282
        },
        K: {
            d: "212,-219v17,-5,80,-60,80,-19v0,9,-2,14,-5,16r-132,78v-34,23,-54,32,-21,50v39,21,74,23,124,41v5,2,7,5,7,9v-4,24,-55,15,-79,8v-67,-19,-98,-36,-116,-83v9,-24,38,-35,66,-61v7,-4,49,-30,76,-39xm47,-194v11,-20,11,-45,31,-55v2,2,4,3,6,0v29,39,-21,96,-18,128v-17,24,-15,62,-29,113v-4,3,-10,7,-19,11v-12,-13,-10,-28,-8,-53v3,-31,17,-79,37,-144",
            w: 270
        },
        L: {
            d: "84,-43v58,0,179,-27,242,-4v3,17,-29,24,-40,26v-85,-4,-202,46,-268,3v-24,-16,-2,-33,-4,-57v26,-76,38,-108,86,-191v14,-7,26,-50,45,-32v6,22,5,31,-12,46v-20,39,-50,82,-67,142v-7,6,-19,46,-19,54v0,9,12,13,37,13",
            w: 331
        },
        M: {
            d: "174,-236v-1,52,-11,92,-7,143v10,5,15,-12,22,-18v42,-55,90,-130,136,-174r15,-18v42,2,32,53,11,80v-12,58,-54,143,-34,210v0,3,-3,12,-9,10v-31,-5,-32,-57,-27,-92v4,-27,12,-58,25,-93v-5,-10,5,-19,6,-30v-46,44,-66,110,-129,172v-11,10,-18,15,-22,15v-34,6,-28,-103,-28,-152v-28,22,-65,119,-96,170v-9,15,-34,3,-31,-19v30,-64,91,-177,139,-229v12,-1,29,13,29,25",
            w: 343
        },
        N: {
            d: "248,-20v-3,17,-37,18,-43,3v-24,-35,-53,-145,-80,-203v-32,40,-55,120,-92,174v-13,3,-26,-13,-27,-22r87,-171v4,-13,20,-57,42,-32v42,48,46,139,82,198v29,-45,46,-88,65,-153v12,-19,23,-42,38,-60v27,-1,14,18,4,44v-6,46,-32,68,-37,121v-15,29,-33,69,-39,101",
            w: 307
        },
        O: {
            d: "240,-268v85,1,163,29,150,125v13,7,-12,18,-5,26v-23,63,-133,112,-228,124v-80,-16,-171,-56,-148,-153v11,-47,20,-43,53,-83v17,-9,39,-22,73,-29v45,-10,81,-10,105,-10xm363,-156v16,-51,-62,-85,-111,-79v-25,-11,-50,8,-81,0v-15,10,-70,16,-85,31v6,20,-27,24,-39,45v-42,75,40,128,115,128v56,0,209,-71,201,-125",
            w: 383
        },
        P: {
            d: "70,-225v-7,-12,-36,16,-49,19v-4,0,-9,-5,-14,-17v21,-47,114,-55,172,-59v41,-3,132,33,99,87v-21,34,-72,59,-144,80v-2,16,-79,3,-74,46v3,25,-5,47,-10,68v-22,-1,-23,-29,-22,-56v2,-25,-20,-32,-8,-50v21,-5,10,-35,25,-57v6,-28,14,-48,25,-61xm71,-229v47,14,-2,50,-1,99v41,-3,113,-37,173,-76v5,-9,8,-14,8,-15v-28,-47,-125,-29,-180,-8",
            w: 252
        },
        Q: {
            d: "374,-217v20,59,-11,127,-48,156r30,38v-1,6,-8,16,-14,9v-3,0,-19,-9,-47,-26v-72,35,-173,75,-236,12v-70,-40,-67,-213,26,-217r8,5v24,-20,72,-48,112,-38v21,-4,22,-1,50,-2v66,-2,94,20,119,63xm296,-88v13,5,61,-49,63,-84v4,-62,-54,-78,-119,-76v-14,-6,-49,5,-71,3v-42,16,-89,41,-93,94v-9,11,1,25,-7,38v-12,-19,-7,-67,-1,-88v-56,30,-37,137,19,155v27,17,92,19,119,0v12,-2,29,-9,52,-20v2,-2,3,-3,3,-6v-11,-12,-46,-27,-54,-56v0,-13,3,-19,9,-19v18,1,60,52,80,59",
            w: 379
        },
        R: {
            d: "100,-275v96,-23,196,-10,208,78v-3,18,-17,52,-49,62v-14,20,-54,23,-79,40v-2,0,-14,2,-36,6v-40,8,-30,14,-3,33v37,27,52,30,118,55v16,6,31,23,12,27v-58,-2,-104,-29,-143,-61v-14,-3,-16,-15,-39,-27v-23,-19,-28,-12,-15,-38v63,-19,111,-15,163,-53v27,-20,43,-36,43,-49v0,-64,-120,-62,-173,-38v-9,4,-38,9,-40,18v-10,32,-16,70,-13,116v-10,21,-8,47,-6,75v2,31,-9,29,-27,22v-9,-55,5,-140,15,-190v-8,-6,-24,10,-24,-11v0,-34,16,-34,42,-55v2,-1,17,-4,46,-10",
            w: 297
        },
        S: {
            d: "13,-3v-7,-3,-22,-18,-5,-22v68,-15,119,-32,154,-45v51,-19,39,-34,3,-53v-46,-25,-82,-30,-121,-64v-33,-29,-50,-35,-25,-58v37,-20,119,-29,181,-29v29,0,44,6,44,18v-9,26,-62,6,-104,14v-17,2,-72,6,-92,16v37,53,132,58,180,111v8,9,11,20,11,30v-4,17,-23,35,-42,34v-21,16,-17,1,-49,17v-14,7,-41,9,-56,20v-25,-3,-49,10,-79,11",
            w: 234
        },
        T: {
            d: "141,-3v-36,-6,1,-49,-3,-79v10,-19,6,-35,15,-64r26,-85v-51,-9,-100,10,-141,14v-16,2,-30,-26,-11,-32v26,-8,143,-8,179,-19r12,6v67,-2,142,-1,200,-1v8,0,14,3,19,10v-18,16,-74,3,-103,14v-48,-4,-60,4,-113,7v-42,22,-36,130,-58,187v1,12,-9,44,-22,42",
            w: 277
        },
        U: {
            d: "365,-262v13,56,-22,104,-36,141v-19,22,-30,38,-57,56v-4,18,-60,35,-78,50v-53,28,-142,0,-161,-34v-31,-56,-37,-108,-11,-164v17,-33,29,-50,48,-29v-2,2,-3,7,-4,13v-44,36,-38,149,7,174v30,26,55,19,102,4v56,-17,66,-34,120,-76v12,-24,56,-68,46,-122r0,-16v0,1,-1,3,-1,6v4,-13,11,-10,25,-3",
            w: 368
        },
        V: {
            d: "246,-258v21,-22,31,-26,44,-8v1,1,-12,22,-28,35v-15,25,-41,38,-56,69v-13,15,-20,31,-28,57v-15,13,-11,29,-27,72v3,21,-5,24,-27,27v-33,-45,-54,-118,-84,-167v-5,-26,-18,-50,-25,-76v-3,-12,24,-8,29,-5v8,13,18,52,26,70r52,115v9,-2,4,-9,10,-21r25,-47v25,-44,46,-76,89,-121",
            w: 234
        },
        W: {
            d: "31,-213v16,46,17,106,41,151v31,-35,49,-89,76,-127v30,-15,39,27,52,56v10,22,21,48,35,67v2,0,4,-1,5,-3v16,-28,50,-76,79,-121v14,-21,40,-63,64,-83r5,8v-30,58,-76,110,-97,173v-18,28,-25,37,-33,63v-11,1,-16,25,-30,15v-21,-31,-44,-89,-62,-131v0,-2,-1,-3,-5,-5v-17,11,-16,36,-31,50v-20,33,-20,84,-68,94v-24,-19,-23,-81,-39,-111v-1,-15,-29,-94,-10,-108v9,2,12,5,18,12",
            w: 331
        },
        X: {
            d: "143,-183v43,-25,69,-36,126,-62v22,-10,86,-10,56,21v-51,3,-158,61,-154,64v10,15,41,30,50,52v27,17,46,60,70,82v9,14,-6,30,-24,20v-35,-43,-75,-100,-116,-132v-48,13,-100,47,-118,94v-1,49,-26,34,-27,4v-1,-26,13,-27,17,-48v22,-27,68,-55,90,-77v-9,-12,-60,-39,-79,-57v-6,-10,-6,-25,12,-25",
            w: 312
        },
        Y: {
            d: "216,-240v19,-14,42,10,22,26v-54,66,-121,109,-156,197v-8,21,-11,15,-30,4v3,-37,27,-61,33,-76v12,-12,15,-19,32,-42v-8,-6,-40,5,-45,5v-48,-6,-69,-65,-56,-113v14,0,13,-1,24,7v2,33,12,75,42,73v36,-2,102,-57,134,-81",
            w: 189
        },
        Z: {
            d: "60,-255v66,12,200,-34,240,21v-13,42,-63,62,-98,89v-19,15,-47,33,-82,55v-25,16,-47,32,-66,47v58,24,129,-6,208,-6v23,0,36,12,13,19v-33,2,-53,5,-86,10v-32,18,-88,15,-135,15v-9,-1,-55,-1,-48,-29v1,-24,30,-24,40,-41v64,-50,151,-86,208,-147v-38,-17,-155,12,-198,-4v0,0,-11,-33,4,-29",
            w: 310
        },
        "[": {
            d: "72,-258r-15,250v30,4,55,-3,80,-6v7,-1,8,17,9,23v-28,15,-73,23,-121,21v-7,0,-10,-6,-10,-17v0,-60,25,-193,22,-288v0,-16,13,-20,33,-19v9,-3,34,-12,51,-12v16,0,15,16,19,29v-16,7,-48,10,-68,19",
            w: 151
        },
        "\\": {
            d: "236,38v20,-18,-8,-74,-13,-90v-44,-78,-112,-190,-200,-253v-2,0,-5,4,-7,12v-11,31,13,36,24,58v74,61,174,219,180,273r16,0",
            w: 257
        },
        "]": {
            d: "133,-258v-23,-13,-84,6,-85,-32v0,-10,5,-15,14,-15v0,0,30,2,90,7v10,1,15,13,15,36v2,7,-8,59,-13,112r-11,125v-9,48,9,90,-59,71v-20,-4,-39,-1,-59,-4v-5,-10,-25,-12,-14,-30v8,-3,61,-13,78,-8v14,1,8,-7,10,-17v15,-69,21,-166,34,-245",
            w: 171
        },
        "^": {
            d: "68,-306v20,15,47,36,58,60v-1,4,0,7,-9,7v-26,0,-47,-38,-49,-32v-15,9,-41,50,-54,30v-2,-31,17,-23,33,-51v8,-9,15,-14,21,-14",
            w: 135
        },
        _: {
            d: "11,15v-8,33,18,45,50,34r205,2r197,-5v11,-5,14,-9,7,-28v-95,-21,-258,-10,-376,-10v-25,0,-72,-3,-83,7",
            w: 485
        },
        "`": {d: "75,-264v16,8,56,14,39,43v-30,-8,-65,-23,-105,-44v-1,-3,-3,-28,5,-25v16,5,44,17,61,26", w: 129},
        a: {
            d: "124,-56v10,4,59,41,65,50v1,7,-6,17,-12,17r-60,-30v-22,2,-42,21,-65,19v-33,4,-68,-67,-15,-81v41,-27,96,-39,110,9v0,6,-4,12,-11,16v-33,-25,-67,-5,-88,12v10,16,61,-18,76,-12",
            w: 196
        },
        b: {
            d: "80,-140v69,1,123,0,134,52v5,26,-71,71,-97,70v-11,11,-88,22,-94,22v-11,-3,-26,-18,-6,-24v19,-5,-2,-19,-1,-35v1,-18,11,-36,-5,-47v-6,-17,-6,-21,14,-32v6,-45,18,-89,28,-124v2,-7,8,-12,17,-15v5,3,10,11,16,28v-12,27,-13,63,-23,96v0,6,6,9,17,9xm87,-107v-40,-9,-31,31,-39,54v8,15,0,25,12,22v30,-8,60,-18,88,-32v39,-18,49,-33,-1,-42v-20,-4,-45,-7,-60,-2",
            w: 217
        },
        c: {
            d: "128,-123v29,-7,37,29,12,33v-27,-4,-40,6,-79,25v-8,4,-13,11,-16,22v30,32,91,3,134,11v5,13,-8,26,-22,19v-51,25,-139,28,-150,-30v6,-50,69,-82,121,-80",
            w: 194
        },
        d: {
            d: "224,-201v0,-35,-17,-111,24,-94v7,86,-2,119,0,197v-4,2,-8,21,-18,16v-62,-7,-154,-8,-185,29v6,17,28,26,51,26v16,0,100,-15,132,-18v7,5,-6,20,-10,22v-24,8,-122,42,-163,25v-32,-5,-62,-53,-36,-80v35,-37,118,-46,198,-43v1,-22,7,-49,7,-80",
            w: 265
        },
        e: {
            d: "4,-57v0,-58,51,-71,110,-74v33,-1,45,16,59,35v1,14,2,39,-7,42v-24,-2,-73,13,-99,11v-2,2,-2,3,-2,3v0,3,12,8,37,15v21,0,69,9,31,22v-9,14,-34,6,-56,6v-27,-5,-73,-28,-73,-60xm123,-102v-22,2,-68,5,-65,26v24,-2,66,5,79,-6v-5,-13,-1,-13,-14,-20",
            w: 182
        },
        f: {
            d: "6,-59v6,-29,53,-4,53,-43v0,-64,29,-118,84,-150v45,-25,167,-24,155,51v-1,2,-7,6,0,6r-10,2v-45,-58,-165,-39,-186,39v-7,26,-11,42,-9,62v44,8,95,-21,135,-7v-12,25,-39,21,-76,30v-19,5,-18,7,-54,19v-2,8,15,32,17,35v-6,25,-26,26,-40,-5r-15,-24v-41,10,-44,12,-54,-15",
            w: 234
        },
        g: {
            d: "132,-97v30,27,21,75,30,117v-12,31,-11,66,-36,103v-32,46,-105,83,-167,39v-31,-21,-49,-29,-51,-75v-2,-37,77,-50,121,-57v37,-6,68,-10,95,-11v7,-6,3,-32,4,-46v0,0,-1,1,-1,2v0,-18,-5,-31,-14,-45v-44,5,-79,20,-94,-18v3,-54,73,-54,125,-50v12,7,12,13,4,25v-30,-11,-76,8,-90,20v23,3,50,-16,74,-4xm-34,121v60,53,168,1,159,-86v-47,-7,-93,24,-142,30v-12,7,-45,19,-42,29v0,10,8,19,25,27",
            w: 188
        },
        h: {
            d: "100,-310v11,-2,10,19,11,20v-11,52,-40,133,-53,189v-6,30,-9,37,-9,47v27,0,113,-34,143,-34v42,0,31,47,39,79v0,4,-5,17,-16,16v4,2,11,3,4,6v-24,-1,-28,-34,-25,-64v-1,-1,-2,-3,-5,-5v-51,0,-110,38,-162,51v-9,1,-15,-15,-16,-23v17,-89,39,-141,71,-264v0,-9,6,-19,18,-18",
            w: 251
        },
        i: {
            d: "62,-209v7,18,9,23,-5,38v-23,-6,-21,-18,-11,-36v2,0,8,-1,16,-2xm34,-7v-18,-21,-8,-73,-1,-106v7,-10,20,-8,23,6v-1,36,7,72,-2,104v-8,2,-8,0,-20,-4",
            w: 80
        },
        j: {
            d: "88,-191v5,28,-18,40,-28,21v0,-20,12,-29,28,-21xm82,-99v28,-1,16,35,16,61v0,60,-19,150,-35,202v-12,8,-19,31,-35,16v-32,-7,-43,-19,-56,-44r2,-17v11,4,49,45,61,18v10,-55,27,-107,30,-171v0,-16,0,-59,17,-65",
            w: 120
        },
        k: {
            d: "59,-66v33,26,114,37,155,62v8,-4,22,-2,19,-17v0,-4,-12,-11,-30,-24v-36,-25,-54,-22,-99,-33v14,-21,119,-13,103,-63r-16,-7r-123,47r25,-93v-3,-15,16,-49,18,-81v1,-15,-21,-14,-25,-3v-31,82,-49,168,-75,257v2,2,22,30,27,10v2,-5,4,-9,9,-11v4,-16,4,-15,12,-44",
            w: 236
        },
        l: {
            d: "66,-300v21,-6,37,23,30,55v-10,51,-28,135,-28,208v0,11,6,36,-13,37v-29,-5,-30,-48,-25,-83r28,-177v-6,-17,1,-29,8,-40",
            w: 102
        },
        m: {
            d: "348,-59v-2,21,0,57,3,73v-17,3,-30,-1,-32,-16v-8,-7,-5,-44,-13,-70v-35,3,-82,49,-111,70v-12,8,-40,4,-39,-15r2,-56v-1,-13,4,-28,-8,-29v-35,8,-79,72,-115,87v-6,2,-20,-18,-21,-22v1,-20,14,-105,39,-64r8,15v17,-14,72,-56,93,-54v27,3,49,40,43,80v24,-2,66,-55,124,-53v11,14,28,23,27,54",
            w: 368
        },
        n: {
            d: "121,-136v37,6,62,54,62,111v0,32,-16,25,-31,17v-18,-30,-5,-45,-22,-85v-37,-13,-71,55,-92,65v-20,-3,-39,-39,-21,-62v2,-12,3,-15,11,-30v12,-8,20,11,29,12",
            w: 194
        },
        o: {
            d: "108,-139v52,-24,104,18,104,63v0,59,-66,67,-114,83v-52,-2,-115,-50,-80,-105v23,-18,52,-35,90,-41xm45,-60v16,54,125,16,131,-23v-12,-59,-129,-8,-131,23",
            w: 217
        },
        p: {
            d: "82,14v-10,12,-8,117,-24,142v-15,2,-19,0,-29,-13v0,-76,9,-113,22,-192v14,-27,35,-6,37,13v0,8,-3,21,-7,38v2,2,3,2,4,2v26,-9,116,-33,126,-72v-7,-17,-24,-33,-49,-31v-40,3,-116,13,-116,47v-5,7,-2,17,-16,20v-17,-12,-18,-20,-12,-38v8,-25,74,-61,110,-59v55,-15,113,15,118,70v-15,52,-84,79,-146,83v-5,0,-11,-4,-18,-10",
            w: 251
        },
        q: {
            d: "144,-147v27,-8,89,-3,97,31v-9,29,-42,-4,-73,1v-32,6,-118,20,-111,49v0,7,13,13,21,13v21,0,78,-24,104,-34v2,0,9,8,22,21v1,1,1,2,1,5v-27,90,-22,70,-43,203v11,15,-15,54,-33,33v-6,-8,-10,-20,-3,-28v1,-72,5,-114,15,-172v-35,3,-35,10,-59,8v-41,-4,-98,-41,-56,-85v33,-34,59,-27,118,-45",
            w: 248
        },
        r: {
            d: "242,-117v2,22,5,10,-14,23v-73,-7,-166,-23,-174,56v-8,6,-3,20,-8,36v-29,10,-40,-9,-33,-46v6,-31,7,-69,32,-55v58,-37,66,-42,175,-19v3,5,15,4,22,5",
            w: 229
        },
        s: {
            d: "154,-151v19,1,27,24,13,32v-4,1,-22,4,-53,7v-16,8,-22,-2,-39,9v23,21,89,16,96,62v-13,24,-85,35,-124,42v-9,-3,-18,-3,-27,0v-6,-4,-21,-16,-8,-25v30,-6,83,-13,102,-24v-17,-16,-80,-33,-97,-48v-3,-2,-4,-7,-4,-15v-6,-6,3,-13,15,-18v22,-9,94,-23,126,-22",
            w: 188
        },
        t: {
            d: "85,-150v10,-41,35,-126,65,-134v4,1,24,19,11,36v-17,22,-29,57,-36,104v26,8,50,-7,73,5v14,0,22,3,22,9v-1,19,-44,18,-57,23v-10,1,-46,0,-54,10v-10,24,-4,67,-20,98v-21,-3,-26,1,-26,-20v0,-9,2,-36,8,-81v-15,-13,-81,9,-77,-27v4,-38,71,6,91,-23",
            w: 194
        },
        u: {
            d: "207,-136v-1,-2,11,-14,14,-13v6,0,10,7,10,22v-3,40,-23,56,-40,82v-13,19,-62,43,-93,43v-67,-2,-111,-75,-71,-133v26,-3,21,29,19,49v-1,27,26,44,57,42v41,-2,93,-55,104,-92",
            w: 242
        },
        v: {
            d: "24,-127r52,71v42,-16,70,-54,124,-65v5,4,8,7,8,11v-8,19,-4,8,-33,32v0,1,-1,3,-1,5v-61,45,-93,68,-97,68v-40,-15,-50,-72,-68,-100v6,-14,10,-22,15,-22",
            w: 214
        },
        w: {
            d: "15,-139v38,-2,27,57,45,86v30,2,67,-66,101,-78v26,6,36,69,60,78v47,-35,51,-54,119,-104v3,0,7,-2,15,-4v19,23,-9,28,-21,49v-33,28,-68,90,-107,109v-10,6,-52,-47,-72,-71v-20,17,-85,74,-97,73v-38,7,-41,-98,-52,-122v0,-1,3,-7,9,-16",
            w: 325
        },
        x: {
            d: "95,-124v22,-13,78,-32,99,-31v16,0,23,6,23,18v0,22,-17,11,-49,21v-3,0,-45,20,-42,24v0,1,2,4,8,10v20,24,49,41,44,80v-35,3,-27,-9,-60,-44v-40,-43,-37,-26,-79,9v-1,1,-2,3,-3,8v-12,8,-28,10,-27,-11v-6,-8,45,-65,48,-65v-17,-21,-61,-52,-24,-68v9,0,48,37,62,49",
            w: 223
        },
        y: {
            d: "44,-65v22,33,70,4,99,-8v5,-4,28,-15,41,-31r17,0v25,47,-26,70,-40,114v-5,4,-9,8,-10,21v-16,12,-11,33,-27,51v-5,18,-12,43,-23,71v-1,-1,-2,34,-18,29v-12,1,-22,-12,-22,-23v20,-70,24,-65,68,-177v-47,16,-111,8,-116,-39v-11,-13,-7,-62,8,-62v18,0,22,26,23,54",
            w: 216
        },
        z: {
            d: "189,-43v9,-1,46,-6,41,12v0,7,-5,13,-15,14v-45,6,-148,24,-181,13v0,-3,-5,-8,-14,-15v5,-44,66,-46,90,-85v-15,-18,-84,21,-84,-14v0,-10,5,-17,14,-18v33,-3,79,-13,109,-3v4,-2,14,11,12,15v0,23,-26,51,-78,84v28,10,73,-3,106,-3",
            w: 244
        },
        "{": {
            d: "94,-303v27,-9,90,-14,79,26v-20,17,-55,-5,-87,13v-4,1,-6,4,-6,8v33,42,31,44,7,85v-6,10,-13,16,-13,13v5,6,17,17,15,31r-33,78v7,35,28,49,57,63r49,0v7,42,-51,41,-86,20v-43,-13,-51,-51,-56,-89v-2,-25,25,-54,27,-71v-3,-4,-46,-5,-41,-21v2,-10,-3,-29,11,-25v2,0,51,-17,52,-38v4,-3,-25,-23,-25,-49v0,-41,8,-30,50,-44",
            w: 179
        },
        "|": {
            d: "30,-308v26,5,14,50,15,80v5,78,-8,153,-3,225v-2,15,-1,31,-11,36v-8,-3,-25,-22,-25,-32r9,-183v0,-40,0,-78,1,-112v0,-4,9,-15,14,-14",
            w: 63
        },
        "}": {
            d: "47,-298v34,-17,118,-18,112,36v6,25,-76,98,-69,103v4,16,39,7,44,28v7,34,-34,17,-37,39v8,29,49,83,23,123v-15,23,-43,26,-73,46v-34,8,-43,11,-49,-17v1,-15,30,-15,33,-20v24,-12,70,-27,55,-61v-14,-33,-37,-68,-19,-103v-46,-50,46,-100,60,-141v-10,-16,-68,6,-77,-12",
            w: 143
        },
        "~": {
            d: "7,-254v2,-6,59,-50,67,-46v11,-1,35,19,46,26v5,0,27,-10,66,-31v21,8,-1,25,-7,38v-27,21,-48,31,-65,31v-24,-11,-37,-39,-65,-9v-7,7,-26,36,-42,11v3,-5,-3,-17,0,-20",
            w: 199
        },
        " ": {w: 179},
        "¡": {
            d: "86,-197v8,16,-7,41,-24,25v-11,-11,-4,-16,-3,-29v13,0,15,-2,27,4xm46,-107v4,-8,11,-16,23,-7v19,26,-5,57,-6,87v-7,0,-5,18,-9,28v0,14,-17,52,-11,70v-2,7,-15,28,-25,12v-4,-6,-15,-7,-6,-16v2,-39,14,-96,34,-174",
            w: 95
        },
        "¢": {
            d: "105,-188v13,-12,14,-18,26,-15v7,23,7,15,-3,49v6,0,18,14,17,20v-3,5,-12,19,-26,13v-14,1,-14,5,-16,21v10,10,46,-13,38,18v-9,17,-23,16,-54,20v-17,16,-4,55,-29,60v-37,-10,19,-64,-24,-71v-20,-10,-37,-47,-6,-62v23,-20,73,-4,77,-53xm65,-101v4,-9,7,-8,3,-13v-14,4,-22,10,-3,13",
            w: 154
        },
        "£": {
            d: "153,-170v3,22,62,0,49,39v-18,6,-31,12,-58,9v-12,-1,-17,30,-23,39v19,26,50,56,91,35v9,-2,27,-13,27,4v0,27,-27,39,-58,42v-32,-5,-59,-19,-78,-39v-6,1,-35,44,-57,39v-25,0,-37,-15,-37,-46v0,-41,43,-53,73,-50v4,1,12,-18,12,-21v-7,-15,-49,0,-44,-30v-2,-31,31,-16,60,-19v16,-30,25,-119,93,-113v16,2,75,16,50,44v-4,5,-7,7,-12,8v-18,-12,-32,-18,-41,-18v-35,-1,-38,52,-47,77xm43,-45v4,5,12,-2,11,-9v-1,2,-12,1,-11,9",
            w: 242
        },
        "¤": {
            d: "308,-133r-200,16v-2,1,-6,4,-10,10v70,-2,144,-14,211,-8v3,0,8,4,13,8v-1,4,-3,9,-9,17v-57,11,-164,6,-219,25v26,32,112,25,173,25v9,0,35,2,35,19v0,9,-4,13,-12,14v-115,12,-146,23,-211,-19v-12,-4,-22,-9,-25,-27v-6,-29,-61,3,-43,-49v17,-1,36,7,42,-12v-32,7,-36,-39,-11,-40v29,14,63,-25,73,-30v52,-25,72,-44,142,-44v23,0,21,41,-1,39v-35,-3,-61,9,-102,31v2,2,5,4,8,4v18,-6,101,-9,115,-9v7,0,55,13,31,30",
            w: 312
        },
        "€": {
            d: "308,-133r-200,16v-2,1,-6,4,-10,10v70,-2,144,-14,211,-8v3,0,8,4,13,8v-1,4,-3,9,-9,17v-57,11,-164,6,-219,25v26,32,112,25,173,25v9,0,35,2,35,19v0,9,-4,13,-12,14v-115,12,-146,23,-211,-19v-12,-4,-22,-9,-25,-27v-6,-29,-61,3,-43,-49v17,-1,36,7,42,-12v-32,7,-36,-39,-11,-40v29,14,63,-25,73,-30v52,-25,72,-44,142,-44v23,0,21,41,-1,39v-35,-3,-61,9,-102,31v2,2,5,4,8,4v18,-6,101,-9,115,-9v7,0,55,13,31,30",
            w: 312
        },
        "¥": {
            d: "31,-248v30,-3,64,64,74,59v37,-22,77,-65,107,-82v20,-11,34,18,21,32v-28,19,-52,38,-70,57v-18,8,-40,21,-35,60v2,19,39,7,64,7v25,0,16,21,2,27v-36,16,-46,8,-68,18v6,11,101,-20,66,24v-21,11,-42,12,-75,20v-2,1,-5,6,-10,18v-8,3,-11,10,-24,8v-7,-17,-2,-18,-9,-26v-13,5,-39,3,-53,-2v-10,-17,-7,-27,0,-34v23,-1,45,1,64,-5v-11,-7,-28,-4,-64,-6v-13,-8,-15,-24,-6,-35v33,-2,102,9,76,-37v-14,-14,-33,-38,-60,-66v-10,-10,-8,-28,0,-37",
            w: 219
        },
        "§": {
            d: "141,-115v12,10,29,36,28,56v-4,68,-129,69,-152,16v-1,-12,-10,-22,8,-23v17,3,47,21,67,23v16,1,40,-8,38,-21v-8,-49,-119,-30,-117,-85v1,-28,15,-45,-3,-64v-1,-53,55,-61,103,-62v15,-5,6,-5,20,-2v16,17,23,27,23,30v-1,26,-29,7,-45,7v-21,0,-51,2,-62,17v19,14,87,8,97,43v18,14,16,57,-5,65xm64,-147r57,17v10,-28,-22,-43,-47,-44v-25,-1,-35,19,-10,27",
            w: 174
        },
        "¨": {
            d: "124,-259v0,9,-4,13,-12,13v-18,0,-22,-21,-17,-35v19,-1,30,1,29,22xm23,-285v7,2,30,9,29,18v1,10,-9,19,-18,19v-19,0,-28,-26,-11,-37",
            w: 136
        },
        "©": {
            d: "102,-29v-74,5,-124,-84,-70,-140v22,-22,53,-35,97,-38v46,-4,88,49,74,100v0,44,-51,75,-101,78xm96,-66v42,-3,75,-23,75,-69v0,-23,-4,-38,-44,-38v-16,0,-33,6,-49,20v36,-4,55,-12,62,20v-5,16,-49,1,-50,21v10,15,53,-14,54,11v0,18,-14,27,-42,27v-22,1,-46,-11,-46,-31v0,-25,7,-39,20,-44v-1,-1,-2,-2,-3,-2v-51,22,-32,89,23,85",
            w: 217
        },
        "ª": {
            d: "6,-265v1,-31,58,-53,80,-22v-11,14,25,28,25,36v-2,8,-15,12,-27,10v-22,-29,-68,19,-78,-24xm52,-281v-8,1,-24,10,-9,13v11,1,24,-10,9,-13",
            w: 117
        },
        "«": {
            d: "191,-64v16,6,87,37,53,63v-39,-9,-71,-28,-107,-40v-14,-13,-13,-34,10,-47v27,-15,48,-55,84,-62v9,-2,21,10,21,18r-13,21v-16,5,-44,22,-51,41v0,4,1,6,3,6xm71,-65v17,6,87,35,55,62v-39,-8,-66,-27,-108,-40v-14,-13,-13,-36,10,-46v23,-18,50,-56,84,-63v9,-2,21,10,21,18r-13,22v-20,6,-32,17,-51,37v0,3,-1,11,2,10",
            w: 265
        },
        "¬": {
            d: "141,-99v47,7,103,-3,149,6v14,24,18,15,10,39v-10,34,-7,31,-26,76v-4,6,-15,8,-16,21v-4,2,-4,1,-13,5v-22,-33,-4,-33,16,-104v-5,-9,-28,-4,-38,-6r-183,4v-14,0,-41,-29,-17,-36v31,-9,82,5,118,-5",
            w: 315
        },
        "®": {
            d: "75,-194v78,-29,116,9,130,84v-2,42,-22,47,-57,67v-74,20,-161,-19,-129,-110v6,-18,29,-34,57,-40xm46,-86v51,36,84,21,129,-15v7,-15,0,-39,-10,-49v-13,-37,-49,-26,-86,-18v-28,7,-49,46,-33,82xm72,-123v-5,-43,68,-57,75,-14v-17,26,-18,17,3,32v2,25,-25,18,-45,7r-4,-4v-1,8,-3,20,-12,24v-10,-3,-21,-34,-17,-45xm112,-135v-10,-1,-20,13,-9,14v6,-6,9,-11,9,-14",
            w: 217
        },
        "¯": {
            d: "63,-295v28,-7,73,10,105,7v11,1,6,8,5,19v-37,21,-72,11,-136,11v-23,0,-31,-14,-27,-36v12,-15,40,0,53,-1",
            w: 183
        },
        "°": {
            d: "106,-268v0,36,-35,38,-51,46v-48,5,-60,-58,-25,-78v33,-11,76,-9,76,32xm38,-257v16,7,39,2,38,-17v-13,-9,-28,-1,-32,11v-5,3,-7,0,-6,6",
            w: 114
        },
        "±": {
            d: "93,-163v-7,46,76,-4,46,47v-14,6,-27,13,-38,8v-24,2,-14,28,-28,44r-14,0v-7,-12,-5,-15,-7,-33v-12,-7,-41,-1,-37,-24v2,-11,23,-17,36,-14r28,-38v4,0,9,4,14,10xm113,-27v-12,18,-58,27,-85,24v-16,2,-22,-23,-13,-36v28,-7,85,-11,98,12",
            w: 151
        },
        "´": {
            d: "52,-284v29,-11,50,-34,62,-14v3,12,-86,54,-94,56v-14,0,-16,-12,-12,-23v11,-5,25,-11,44,-19",
            w: 120
        },
        "¶": {
            d: "121,-237v21,-9,44,-13,63,-1v-1,7,5,6,7,11r-4,190v-2,33,4,39,-15,40v-16,1,-10,-20,-10,-33r4,-161v0,-17,-1,-34,-16,-25v2,10,1,23,1,35v-9,46,-6,75,-15,156v-3,4,-7,5,-12,5v-17,-10,-3,-89,-10,-115v-43,14,-98,10,-101,-29v-4,-53,59,-63,104,-75v3,1,4,2,4,2xm95,-204v2,9,-30,50,1,50v35,0,23,-13,29,-43v0,-1,-2,-7,-4,-15v-12,-1,-14,2,-26,8",
            w: 206
        },
        "¸": {
            d: "74,16v32,2,49,14,55,36v-3,7,-14,31,-29,33v-28,4,-57,11,-88,14v-19,-6,-13,-31,8,-33v20,-1,59,-5,73,-14v-17,-14,-68,8,-53,-37v9,-10,2,-28,24,-30v8,8,13,17,10,31",
            w: 129
        },
        "º": {
            d: "13,-273v1,-31,56,-41,83,-18v36,8,14,48,-9,52v-35,6,-64,-5,-74,-34xm81,-269v-7,-7,-20,-11,-29,-6v5,13,13,11,29,6",
            w: 128
        },
        "»": {
            d: "120,-129v9,-33,48,-10,64,5v9,20,86,52,50,86v-36,11,-66,31,-107,40v-6,-7,-9,-13,-9,-17v-2,-13,50,-46,63,-46v11,-18,-33,-42,-48,-47xm1,-128v10,-33,46,-8,64,6v8,19,86,50,51,85v-40,13,-69,30,-108,40v-6,-7,-8,-12,-8,-16v-2,-14,50,-46,63,-47v7,-13,-9,-20,-19,-30v-10,-9,-20,-15,-30,-17",
            w: 252
        },
        "¿": {
            d: "181,-247v3,1,31,2,29,15v-4,22,-37,27,-41,4v1,-5,7,-20,12,-19xm161,-34v-45,-1,-105,19,-124,51v0,11,18,17,54,17v39,0,82,-13,112,4v-10,35,-58,31,-100,31v-47,0,-80,-10,-99,-31v-10,-56,22,-73,64,-90v8,-3,32,-9,74,-18v21,-15,7,-62,22,-92v-1,-5,-1,-11,4,-12v16,0,24,7,24,22v-8,30,-8,73,-17,111v-3,5,-7,7,-14,7",
            w: 213
        },
        "À": {d: "161,-217v20,53,23,124,54,170v-2,20,-34,9,-42,0v-27,-12,-78,-18,-101,-18v-26,6,-29,51,-54,63v-18,-4,-19,-30,-3,-38v5,-9,15,-16,8,-29v1,-12,23,-9,26,-19v6,-10,11,-20,20,-27r70,-121v12,-4,16,4,22,19xm82,-91v17,3,62,7,86,13v-13,-33,-13,-80,-29,-109v-15,30,-38,63,-57,96xm150,-268v14,10,54,14,37,41v-28,-7,-62,-22,-100,-42v-2,-3,-2,-26,5,-23v16,4,42,17,58,24"},
        "Á": {d: "161,-217v20,53,23,124,54,170v-2,20,-34,9,-42,0v-27,-12,-78,-18,-101,-18v-26,6,-29,51,-54,63v-18,-4,-19,-30,-3,-38v5,-9,15,-16,8,-29v1,-12,23,-9,26,-19v6,-10,11,-20,20,-27r70,-121v12,-4,16,4,22,19xm82,-91v17,3,62,7,86,13v-13,-33,-13,-80,-29,-109v-15,30,-38,63,-57,96xm84,-250v31,-5,83,-53,100,-31v0,5,-11,15,-35,28v-16,5,-51,28,-53,25v-14,1,-16,-11,-12,-22"},
        "Â": {d: "161,-217v20,53,23,124,54,170v-2,20,-34,9,-42,0v-27,-12,-78,-18,-101,-18v-26,6,-29,51,-54,63v-18,-4,-19,-30,-3,-38v5,-9,15,-16,8,-29v1,-12,23,-9,26,-19v6,-10,11,-20,20,-27r70,-121v12,-4,16,4,22,19xm82,-91v17,3,62,7,86,13v-13,-33,-13,-80,-29,-109v-15,30,-38,63,-57,96xm202,-219v-27,-6,-40,-26,-61,-37v-21,7,-39,46,-65,23v-2,-4,-3,-10,-4,-14v19,-4,43,-32,61,-43v27,6,40,22,62,37v12,8,18,17,18,25v0,6,-3,9,-11,9"},
        "Ã": {d: "161,-217v20,53,23,124,54,170v-2,20,-34,9,-42,0v-27,-12,-78,-18,-101,-18v-26,6,-29,51,-54,63v-18,-4,-19,-30,-3,-38v5,-9,15,-16,8,-29v1,-12,23,-9,26,-19v6,-10,11,-20,20,-27r70,-121v12,-4,16,4,22,19xm82,-91v17,3,62,7,86,13v-13,-33,-13,-80,-29,-109v-15,30,-38,63,-57,96xm100,-285v26,-19,54,19,69,22v4,0,15,-5,34,-13v23,-9,22,-17,31,-12v3,11,-9,9,-7,21v-26,20,-46,30,-59,30v-3,3,-50,-26,-49,-29v-12,1,-31,35,-51,32v-3,-8,-5,-14,-5,-18v10,-9,16,-17,37,-33"},
        "Ä": {d: "161,-217v20,53,23,124,54,170v-2,20,-34,9,-42,0v-27,-12,-78,-18,-101,-18v-26,6,-29,51,-54,63v-18,-4,-19,-30,-3,-38v5,-9,15,-16,8,-29v1,-12,23,-9,26,-19v6,-10,11,-20,20,-27r70,-121v12,-4,16,4,22,19xm82,-91v17,3,62,7,86,13v-13,-33,-13,-80,-29,-109v-15,30,-38,63,-57,96xm187,-259v0,8,-4,13,-12,13v-18,0,-21,-20,-16,-34v18,-1,28,2,28,21xm90,-284v7,3,28,11,28,18v0,9,-9,18,-18,17v-17,0,-25,-24,-10,-35"},
        "Å": {d: "161,-217v20,53,23,124,54,170v-2,20,-34,9,-42,0v-27,-12,-78,-18,-101,-18v-26,6,-29,51,-54,63v-18,-4,-19,-30,-3,-38v5,-9,15,-16,8,-29v1,-12,23,-9,26,-19v6,-10,11,-20,20,-27r70,-121v12,-4,16,4,22,19xm82,-91v17,3,62,7,86,13v-13,-33,-13,-80,-29,-109v-15,30,-38,63,-57,96xm112,-239v-31,-17,-9,-61,29,-56v12,2,22,3,33,12v24,39,-30,62,-62,44xm119,-262v2,14,41,8,41,-4v0,-4,-8,-6,-24,-9v-10,-2,-17,10,-17,13"},
        "Æ": {
            d: "335,-259v0,30,-102,12,-122,34v10,21,2,79,16,100v24,-6,59,-13,86,-16v23,-2,32,21,13,26r-103,29v-3,22,-4,38,8,43v28,-5,60,-6,86,-14v5,-1,14,7,14,11v6,16,-90,40,-107,40v-29,0,-39,-19,-32,-46v-2,-4,0,-26,-9,-28v-29,2,-58,6,-88,6v-31,0,-40,74,-82,73v-18,-23,4,-37,12,-50v40,-65,112,-126,165,-207v20,-17,69,-11,112,-13v21,0,31,4,31,12xm123,-111v28,1,44,-2,67,-10v-4,-22,5,-49,-7,-65v-3,6,-65,61,-60,75",
            w: 348
        },
        "Ç": {
            d: "48,-108v-12,70,90,71,159,67r138,-9v9,-1,7,9,7,17v-37,16,-80,27,-103,21v-14,9,-40,3,-67,9v-30,0,-64,1,-100,-10v-6,-1,-10,-4,-10,-8v-32,-12,-46,-31,-63,-56v-16,-61,47,-103,83,-121v82,-42,118,-45,200,-60v21,-4,36,34,11,37v-90,11,-148,31,-225,77v-12,8,-23,20,-30,36xm172,18v29,4,47,14,53,35v-2,7,-14,31,-27,31v-28,7,-55,9,-84,14v-18,-5,-13,-32,7,-32v21,0,55,-5,69,-13v-16,-14,-63,10,-50,-35v9,-10,1,-27,23,-29v7,8,11,16,9,29",
            w: 331
        },
        "È": {
            d: "49,-160v1,-4,-10,-9,-15,-8v-15,-35,32,-30,57,-31r142,-8v2,1,30,7,40,10v-52,16,-133,17,-190,30v-7,9,-12,24,-15,47v26,10,102,-6,141,3v1,3,1,6,2,10v-36,18,-92,12,-149,21v-11,9,-16,41,-16,51v55,-1,111,-21,168,-13v15,-8,48,1,31,18v-53,16,-130,13,-198,29r-39,-8v-4,-19,17,-53,20,-76v-1,0,-7,-11,-9,-18v18,-7,22,-28,30,-57xm184,-236v6,9,5,13,0,23v-28,-7,-62,-21,-100,-41v-3,-2,-3,-27,5,-23v34,11,60,25,95,41",
            w: 252
        },
        "É": {
            d: "49,-160v1,-4,-10,-9,-15,-8v-15,-35,32,-30,57,-31r142,-8v2,1,30,7,40,10v-52,16,-133,17,-190,30v-7,9,-12,24,-15,47v26,10,102,-6,141,3v1,3,1,6,2,10v-36,18,-92,12,-149,21v-11,9,-16,41,-16,51v55,-1,111,-21,168,-13v15,-8,48,1,31,18v-53,16,-130,13,-198,29r-39,-8v-4,-19,17,-53,20,-76v-1,0,-7,-11,-9,-18v18,-7,22,-28,30,-57xm133,-248v27,-11,48,-32,59,-14v3,11,-79,52,-88,53v-14,1,-16,-11,-12,-21v10,-4,23,-11,41,-18",
            w: 252
        },
        "Ê": {
            d: "49,-160v1,-4,-10,-9,-15,-8v-15,-35,32,-30,57,-31r142,-8v2,1,30,7,40,10v-52,16,-133,17,-190,30v-7,9,-12,24,-15,47v26,10,102,-6,141,3v1,3,1,6,2,10v-36,18,-92,12,-149,21v-11,9,-16,41,-16,51v55,-1,111,-21,168,-13v15,-8,48,1,31,18v-53,16,-130,13,-198,29r-39,-8v-4,-19,17,-53,20,-76v-1,0,-7,-11,-9,-18v18,-7,22,-28,30,-57xm199,-211v-27,-6,-39,-26,-60,-37v-21,7,-40,47,-65,22v-2,-7,-2,-7,-4,-13v18,-5,44,-31,61,-43v27,6,41,22,62,37v12,9,18,17,18,25v0,6,-4,9,-12,9",
            w: 252
        },
        "Ë": {
            d: "49,-160v1,-4,-10,-9,-15,-8v-15,-35,32,-30,57,-31r142,-8v2,1,30,7,40,10v-52,16,-133,17,-190,30v-7,9,-12,24,-15,47v26,10,102,-6,141,3v1,3,1,6,2,10v-36,18,-92,12,-149,21v-11,9,-17,41,-17,51v55,0,112,-21,169,-13v15,-8,48,1,31,18v-53,16,-130,13,-198,29r-39,-8v-3,-21,17,-53,20,-76v-1,0,-7,-11,-9,-18v18,-7,22,-28,30,-57xm191,-236v0,8,-4,13,-12,13v-17,0,-19,-19,-16,-34v18,-1,29,1,28,21xm95,-261v7,3,29,9,28,18v0,7,-9,17,-18,17v-18,0,-26,-25,-10,-35",
            w: 252
        },
        "Ì": {
            d: "33,-5v-9,-6,-9,-12,-9,-36v0,-71,8,-119,22,-144v8,-13,14,-20,19,-20v27,20,-11,87,-10,120r-15,76v-1,1,-4,2,-7,4xm72,-247v7,6,55,15,36,40v-28,-7,-61,-21,-99,-41v-3,-2,-3,-27,5,-23v18,3,41,17,58,24",
            w: 111
        },
        "Í": {
            d: "26,-5v-9,-6,-9,-12,-9,-36v0,-71,7,-119,21,-144v8,-13,14,-20,19,-20v28,19,-7,89,-10,120v-2,21,-8,47,-14,76v-2,1,-2,0,-7,4xm6,-233v31,-6,83,-53,101,-31v2,11,-80,53,-89,53v-14,1,-14,-11,-12,-22",
            w: 104
        },
        "Î": {
            d: "53,-9v-15,7,-16,-3,-16,-32v0,-71,7,-119,21,-144v8,-13,14,-20,19,-20v28,19,-7,89,-10,120v-2,21,-8,47,-14,76xm137,-209v-27,-6,-40,-26,-61,-37v-8,0,-9,4,-13,10v-11,13,-50,37,-56,0v18,-5,43,-32,61,-43v28,5,40,21,62,36v12,9,18,17,18,25v0,6,-4,9,-11,9",
            w: 144
        },
        "Ï": {
            d: "33,-5v-9,-6,-9,-12,-9,-36v0,-71,8,-119,22,-144v8,-13,14,-20,19,-20v27,20,-11,87,-10,120r-15,76v-1,1,-4,2,-7,4xm111,-222v0,8,-4,12,-12,12v-18,0,-19,-19,-16,-33v18,-1,29,1,28,21xm15,-247v8,2,29,9,28,17v0,21,-37,24,-36,1v0,-7,2,-13,8,-18",
            w: 110
        },
        "Ñ": {
            d: "224,-182v1,-17,15,-24,22,-38v20,0,13,10,3,33v-3,36,-25,52,-28,94v-10,24,-30,55,-29,82r-19,7v-32,-8,-36,-70,-58,-111v-2,-23,-7,-27,-19,-54v-28,36,-41,93,-71,133v-9,5,-20,-9,-20,-17r73,-149v9,-24,31,-5,36,7v19,41,31,98,53,139v22,-35,34,-69,50,-118v2,-3,3,-3,7,-8xm203,-257v22,-8,41,-24,65,-26v3,11,-8,9,-7,21v-26,20,-46,31,-59,31v-2,3,-49,-27,-49,-29v-11,0,-32,31,-46,32v-11,-2,-12,-21,-4,-23v4,-6,28,-30,48,-34v17,-4,43,28,52,28",
            w: 219
        },
        "Ò": {
            d: "62,-184v78,-31,249,-50,238,74v-6,65,-102,105,-179,115v-77,-7,-152,-71,-101,-149v2,-5,24,-33,42,-40xm279,-120v14,-38,-47,-64,-85,-61v-20,-9,-41,7,-62,0v-11,7,-54,12,-66,24v0,20,-51,35,-38,66v-1,43,50,67,96,67v44,0,162,-55,155,-96xm161,-262v14,10,52,13,37,41v-28,-7,-62,-21,-100,-41v-3,-3,-3,-26,5,-24v16,5,42,17,58,24",
            w: 273
        },
        "Ó": {
            d: "62,-184v78,-31,249,-50,238,74v-6,65,-102,105,-179,115v-77,-7,-152,-71,-101,-149v2,-5,24,-33,42,-40xm279,-120v14,-38,-47,-64,-85,-61v-20,-9,-41,7,-62,0v-11,7,-54,12,-66,24v0,20,-51,35,-38,66v-1,43,50,67,96,67v44,0,162,-55,155,-96xm142,-250v27,-11,47,-32,59,-14v2,11,-80,53,-89,53v-13,1,-15,-11,-12,-21v10,-5,24,-11,42,-18",
            w: 273
        },
        "Ô": {
            d: "62,-184v78,-31,249,-50,238,74v-6,65,-102,105,-179,115v-77,-7,-152,-71,-101,-149v2,-5,24,-33,42,-40xm279,-120v14,-38,-47,-64,-85,-61v-20,-9,-41,7,-62,0v-11,7,-54,12,-66,24v0,20,-51,35,-38,66v-1,43,50,67,96,67v44,0,162,-55,155,-96xm157,-282v17,18,52,34,54,63v-24,12,-52,-36,-53,-29r-42,34v-23,-4,-6,-31,5,-34v1,1,27,-37,36,-34",
            w: 273
        },
        "Õ": {
            d: "62,-184v78,-31,249,-50,238,74v-6,65,-102,105,-179,115v-77,-7,-152,-71,-101,-149v2,-5,24,-33,42,-40xm279,-120v14,-38,-47,-64,-85,-61v-20,-9,-41,7,-62,0v-11,7,-54,12,-66,24v0,20,-51,35,-38,66v-1,43,50,67,96,67v44,0,162,-55,155,-96xm116,-270v26,-19,54,19,69,22v4,0,15,-5,34,-13v23,-10,22,-16,31,-12v3,11,-8,9,-7,21v-45,28,-47,42,-88,16v-29,-19,-12,-20,-43,2v-8,5,-12,18,-23,15v-13,-3,-12,-20,-4,-23v4,-6,14,-15,31,-28",
            w: 273
        },
        "Ö": {
            d: "62,-184v78,-31,249,-50,238,74v-6,65,-102,105,-179,115v-77,-7,-152,-71,-101,-149v2,-5,24,-33,42,-40xm279,-120v14,-38,-47,-64,-85,-61v-20,-9,-41,7,-62,0v-11,7,-54,12,-66,24v0,20,-51,35,-38,66v-1,43,50,67,96,67v44,0,162,-55,155,-96xm197,-229v0,8,-4,13,-12,13v-17,0,-19,-19,-16,-34v18,-1,29,1,28,21xm101,-254v7,3,28,9,27,18v1,8,-8,17,-17,17v-18,0,-26,-24,-10,-35",
            w: 273
        },
        "Ø": {
            d: "76,-211v41,-13,100,-22,140,-3v26,-19,40,-29,44,-29v10,0,15,7,15,20v0,15,-23,23,-30,35v23,39,29,114,-21,139v-36,19,-102,35,-147,18v-14,-5,-29,29,-46,35v-25,-13,-19,-24,3,-56v-9,-17,-28,-27,-28,-60v0,-38,23,-72,70,-99xm107,-66v55,15,125,-12,123,-70v0,-16,-5,-25,-13,-29r-110,95r0,4xm39,-108v-1,3,17,31,22,27v8,-6,109,-90,123,-106v-15,-11,-43,1,-63,2v-33,10,-80,35,-82,77",
            w: 270
        },
        "Ù": {
            d: "281,-202v6,67,-30,121,-71,152v-3,14,-47,26,-60,39v-41,20,-110,1,-125,-26v-24,-44,-28,-84,-8,-127v12,-26,23,-38,37,-22v-2,2,-3,5,-3,10v-34,26,-30,116,5,134v22,32,86,-1,109,-8v38,-28,104,-64,97,-149v2,-10,7,-8,19,-3xm151,-243v14,10,54,14,37,41v-28,-7,-61,-22,-99,-42v-3,-2,-4,-25,4,-23v16,5,42,17,58,24",
            w: 262
        },
        "Ú": {
            d: "281,-202v6,67,-30,121,-71,152v-3,14,-47,26,-60,39v-41,20,-110,1,-125,-26v-24,-44,-28,-84,-8,-127v12,-26,23,-38,37,-22v-2,2,-3,5,-3,10v-34,26,-30,116,5,134v22,32,86,-1,109,-8v38,-28,104,-64,97,-149v2,-10,7,-8,19,-3xm194,-265v3,-1,11,4,11,6v3,12,-81,52,-89,54v-14,0,-13,-9,-12,-22",
            w: 262
        },
        "Û": {
            d: "281,-202v6,67,-30,121,-71,152v-3,14,-47,26,-60,39v-41,20,-110,1,-125,-26v-24,-44,-28,-84,-8,-127v12,-26,23,-38,37,-22v-2,2,-3,5,-3,10v-34,26,-30,116,5,134v22,32,86,-1,109,-8v38,-28,104,-64,97,-149v2,-10,7,-8,19,-3xm150,-266v24,11,58,27,73,46v0,5,-3,6,-10,6v-28,2,-61,-30,-63,-25v-10,0,-57,40,-69,23v3,-10,-8,-15,8,-19v17,-1,34,-29,61,-31",
            w: 262
        },
        "Ü": {
            d: "281,-202v6,67,-30,121,-71,152v-3,14,-47,26,-60,39v-41,20,-110,1,-125,-26v-24,-44,-28,-84,-8,-127v12,-26,23,-38,37,-22v-2,2,-3,5,-3,10v-34,26,-29,116,5,134v22,32,86,-1,109,-8v38,-28,104,-64,97,-149v2,-10,7,-8,19,-3xm197,-227v0,8,-4,13,-12,13v-18,0,-21,-20,-16,-34v18,-1,28,2,28,21xm101,-252v7,3,27,10,27,18v0,8,-9,18,-18,17v-18,-1,-24,-25,-9,-35",
            w: 262
        },
        "ß": {d: "33,10v-29,4,-28,-32,-16,-70v18,-58,17,-137,56,-176v12,-24,46,-58,82,-43v20,8,47,24,47,54v0,30,-62,59,-67,90v33,23,56,33,63,63v-18,21,-22,36,-48,54v-24,17,-27,41,-53,16v-2,-19,7,-35,24,-42v15,-13,26,-22,34,-40v-13,-17,-78,-29,-56,-70v-3,-27,64,-54,66,-86v-8,-25,-41,-4,-52,8v-29,30,-47,83,-51,141v-17,25,-8,71,-29,101"},
        "à": {
            d: "118,-53v10,4,55,41,62,47v0,7,-5,16,-12,16r-57,-28v-20,3,-40,19,-61,18v-10,2,-43,-17,-42,-36v0,-14,7,-40,27,-41v39,-26,92,-36,104,9v0,6,-2,11,-9,15v-32,-24,-64,-6,-84,11v8,15,58,-17,72,-11xm99,-137v7,6,56,14,37,40v-28,-7,-62,-21,-100,-41v-2,-3,-2,-26,5,-23v16,4,42,17,58,24",
            w: 173
        },
        "á": {
            d: "118,-53v10,4,55,41,62,47v0,7,-5,16,-12,16r-57,-28v-20,3,-40,19,-61,18v-10,2,-43,-17,-42,-36v0,-14,7,-40,27,-41v39,-26,92,-36,104,9v0,6,-2,11,-9,15v-32,-24,-64,-6,-84,11v8,15,58,-17,72,-11xm32,-117v24,-3,85,-55,101,-32v3,11,-80,53,-89,53v-13,2,-14,-10,-12,-21",
            w: 173
        },
        "â": {
            d: "118,-53v10,4,55,41,62,47v0,7,-5,16,-12,16r-57,-28v-20,3,-40,19,-61,18v-10,2,-43,-17,-42,-36v0,-14,7,-40,27,-41v39,-26,92,-36,104,9v0,6,-2,11,-9,15v-32,-24,-64,-6,-84,11v8,15,58,-17,72,-11xm147,-97v-27,-6,-39,-26,-60,-37v-21,7,-38,46,-65,23v-2,-5,-3,-10,-4,-14v18,-4,43,-31,61,-42v28,5,40,21,62,36v12,8,18,17,18,25v0,6,-4,9,-12,9",
            w: 173
        },
        "ã": {
            d: "118,-53v10,4,55,41,62,47v0,7,-5,16,-12,16r-57,-28v-20,3,-40,19,-61,18v-10,2,-43,-17,-42,-36v0,-14,7,-40,27,-41v39,-26,92,-36,104,9v0,6,-2,11,-9,15v-32,-24,-64,-6,-84,11v8,15,58,-17,72,-11xm114,-136v22,-8,41,-24,64,-26v3,11,-7,10,-7,21v-26,20,-45,30,-58,30v-3,3,-49,-26,-49,-28v-10,-1,-32,35,-51,31v-12,-32,8,-29,32,-51v24,-21,54,20,69,23",
            w: 173
        },
        "ä": {
            d: "118,-53v10,4,55,41,62,47v0,7,-5,16,-12,16r-57,-28v-20,3,-40,19,-61,18v-32,5,-66,-64,-15,-77v39,-26,92,-36,104,9v0,6,-3,11,-9,15v-32,-24,-64,-6,-84,11v8,15,58,-17,72,-11xm142,-119v0,8,-4,13,-12,13v-18,0,-21,-20,-16,-34v18,-1,28,2,28,21xm46,-144v7,3,28,9,27,18v1,8,-9,18,-18,17v-18,-1,-25,-25,-9,-35",
            w: 173
        },
        "å": {
            d: "118,-53v10,4,55,41,62,47v0,7,-5,16,-12,16r-57,-28v-20,3,-40,19,-61,18v-10,2,-43,-17,-42,-36v0,-14,7,-40,27,-41v39,-26,92,-36,104,9v0,6,-2,11,-9,15v-32,-24,-64,-6,-84,11v8,15,58,-17,72,-11xm54,-101v-37,-20,-9,-71,34,-65v13,1,25,3,38,13v27,45,-34,73,-72,52xm61,-128v4,20,48,7,49,-5v0,-5,-9,-7,-28,-10v-12,-2,-21,11,-21,15",
            w: 173
        },
        "æ": {
            d: "145,-44r33,7v2,42,-59,29,-85,16v-6,7,-35,24,-48,15v-19,2,-35,-21,-33,-37v2,-24,5,-19,28,-36v-6,-8,-45,3,-33,-21v21,-22,58,-12,85,-1v6,-5,35,-28,45,-15v20,-4,36,17,36,35v0,23,-4,21,-28,37xm111,-72v12,3,49,-16,19,-17v-5,0,-20,12,-19,17xm74,-50v-14,-4,-48,16,-19,17v4,1,19,-14,19,-17",
            w: 184
        },
        "ç": {
            d: "108,-118v30,-6,56,21,25,33v-24,-6,-39,5,-75,23v-7,4,-12,12,-15,22v31,28,86,3,128,9v3,28,-29,16,-44,28v-53,15,-106,10,-120,-37v0,-48,62,-70,101,-78xm92,18v23,4,45,12,48,32v-2,6,-12,28,-25,28v-24,6,-50,10,-77,13v-16,-4,-11,-28,7,-29v17,-1,51,-4,63,-12v-14,-15,-57,10,-46,-32v9,-8,0,-25,21,-26v6,6,12,14,9,26",
            w: 171
        },
        "è": {
            d: "108,-124v42,-3,70,39,50,73v-22,-1,-70,12,-94,10v-1,1,-2,3,-2,3v0,3,12,7,35,14v18,0,64,7,30,21v-10,14,-31,6,-53,6v-26,-7,-70,-26,-70,-58v0,-54,48,-65,104,-69xm130,-78v-2,-35,-66,-13,-77,3v16,6,62,6,77,-3xm95,-166v7,6,54,14,37,40v-28,-7,-62,-21,-100,-41v-3,-3,-3,-26,5,-24v16,5,42,18,58,25",
            w: 161
        },
        "é": {
            d: "108,-124v42,-3,70,39,50,73v-22,-1,-70,12,-94,10v-1,1,-2,3,-2,3v0,3,12,7,35,14v18,0,64,7,30,21v-10,14,-31,6,-53,6v-26,-7,-70,-26,-70,-58v0,-54,48,-65,104,-69xm130,-78v-2,-35,-66,-13,-77,3v16,6,62,6,77,-3xm76,-169v26,-11,48,-32,59,-14v3,10,-80,53,-89,53v-14,1,-14,-10,-12,-21v15,-7,16,-7,42,-18",
            w: 161
        },
        "ê": {
            d: "108,-124v42,-3,70,39,50,73v-22,-1,-70,12,-94,10v-1,1,-2,3,-2,3v0,3,12,7,35,14v18,0,64,7,30,21v-10,14,-31,6,-53,6v-26,-7,-70,-26,-70,-58v0,-54,48,-65,104,-69xm130,-78v-2,-35,-66,-13,-77,3v16,6,62,6,77,-3xm145,-129v-27,-6,-39,-26,-60,-37v-8,0,-10,4,-14,10v-11,15,-51,34,-56,0v17,-4,44,-32,61,-43v28,5,41,21,63,36v12,8,17,17,17,25v0,6,-3,9,-11,9",
            w: 161
        },
        "ë": {
            d: "108,-124v42,-3,70,39,50,73v-22,-1,-70,12,-94,10r-3,3v0,3,12,7,36,14v18,0,64,7,30,21v-10,14,-31,6,-53,6v-26,-7,-67,-27,-71,-58v7,-52,48,-65,105,-69xm130,-78v-2,-35,-66,-13,-77,3v16,6,62,6,77,-3xm140,-144v0,8,-4,12,-12,12v-18,0,-19,-19,-16,-33v18,-1,29,1,28,21xm44,-169v7,3,28,9,28,17v0,9,-9,18,-18,18v-18,0,-25,-24,-10,-35",
            w: 161
        },
        "ì": {
            d: "57,-98v22,5,13,50,11,95v-7,1,-11,2,-20,-4v1,-7,-12,-18,-10,-24v4,-22,-2,-64,19,-67xm70,-139v14,10,54,14,37,41v-28,-7,-61,-22,-99,-42v-3,-2,-3,-25,5,-23v15,5,41,17,57,24",
            w: 109
        },
        "í": {
            d: "59,-98v20,4,15,53,10,95v-6,1,-11,2,-19,-4v1,-7,-12,-18,-10,-24v4,-22,-4,-65,19,-67xm50,-139v27,-11,49,-32,59,-14v3,11,-80,53,-89,53v-14,1,-14,-12,-11,-22v15,-7,14,-6,41,-17",
            w: 105
        },
        "î": {
            d: "72,-98v20,5,12,51,10,95v-6,2,-13,1,-20,-4v1,-8,-12,-18,-10,-24v4,-22,-3,-65,20,-67xm134,-94v-26,-7,-39,-25,-60,-37v-7,0,-9,4,-13,10v-14,15,-51,34,-56,-1v18,-4,45,-33,61,-43v27,6,40,22,62,37v12,8,18,17,18,25v0,6,-4,9,-12,9",
            w: 143
        },
        "ï": {
            d: "55,-97v19,5,15,53,10,95v-17,5,-26,-14,-30,-28v6,-20,-3,-65,20,-67xm110,-118v0,8,-4,13,-12,13v-17,0,-19,-19,-16,-34v18,-1,29,1,28,21xm14,-143v6,3,28,8,28,17v0,9,-9,18,-18,18v-18,0,-25,-24,-10,-35",
            w: 107
        },
        "ñ": {
            d: "115,-129v34,6,59,50,59,105v0,31,-15,24,-30,17v-15,-29,-5,-42,-20,-81v-35,-13,-68,52,-88,61v-20,-4,-38,-36,-19,-59v0,-12,3,-14,10,-28v11,-8,18,11,27,12xm117,-166v22,-7,41,-23,64,-26v3,11,-7,10,-7,21v-26,20,-45,30,-58,30v-3,3,-49,-26,-49,-28v-10,-1,-32,35,-51,31v-5,-12,-8,-16,0,-23v4,-6,28,-29,48,-33v17,-3,43,28,53,28",
            w: 171
        },
        "ò": {
            d: "102,-132v50,-20,99,16,99,60v0,54,-60,64,-108,79v-50,-2,-110,-48,-76,-100v22,-17,49,-33,85,-39xm136,-104v-34,0,-91,27,-94,47v16,51,125,16,125,-22v0,-17,-10,-25,-31,-25xm115,-181v14,10,51,13,37,40v-28,-7,-62,-21,-100,-41v-3,-2,-3,-26,5,-23v16,5,42,17,58,24",
            w: 191
        },
        "ó": {
            d: "102,-132v50,-20,99,16,99,60v0,54,-60,64,-108,79v-50,-2,-110,-48,-76,-100v22,-17,49,-33,85,-39xm136,-104v-34,0,-91,27,-94,47v16,51,125,16,125,-22v0,-17,-10,-25,-31,-25xm49,-154v24,-3,85,-55,101,-32v3,11,-80,53,-89,53v-14,0,-13,-8,-12,-21",
            w: 191
        },
        "ô": {
            d: "102,-132v50,-20,99,16,99,60v0,54,-60,64,-108,79v-50,-2,-110,-48,-76,-100v22,-17,49,-33,85,-39xm136,-104v-34,0,-91,27,-94,47v16,51,125,16,125,-22v0,-17,-10,-25,-31,-25xm110,-177v-22,6,-38,45,-65,22v-2,-4,-3,-9,-4,-13v18,-4,43,-32,61,-43v27,6,40,21,62,36v12,9,18,17,18,25v1,11,-15,10,-23,7",
            w: 191
        },
        "õ": {
            d: "102,-132v50,-20,99,16,99,60v0,54,-60,64,-108,79v-50,-2,-110,-48,-76,-100v22,-17,49,-33,85,-39xm136,-104v-34,0,-91,27,-94,47v16,51,125,16,125,-22v0,-17,-10,-25,-31,-25xm58,-199v26,-21,54,18,69,22v4,0,15,-5,34,-13v22,-9,21,-16,31,-13v3,11,-9,9,-7,22v-26,20,-46,30,-59,30v-2,4,-49,-28,-49,-29v-11,0,-32,31,-46,32v-12,-3,-13,-21,-4,-23v4,-6,14,-15,31,-28",
            w: 191
        },
        "ö": {
            d: "102,-132v50,-20,99,16,99,60v0,54,-60,64,-108,79v-50,-2,-110,-48,-76,-100v22,-17,49,-33,85,-39xm136,-104v-34,0,-91,27,-94,47v16,51,125,16,125,-22v0,-17,-10,-25,-31,-25xm161,-160v0,8,-4,13,-12,13v-17,0,-19,-19,-16,-34v18,-1,29,1,28,21xm65,-185v7,3,28,9,28,18v0,7,-9,18,-18,17v-18,1,-25,-24,-10,-35",
            w: 191
        },
        "÷": {
            d: "167,-158v-4,3,-7,9,-10,20v-23,4,-34,-8,-29,-31v14,-6,18,1,39,11xm78,-72v-53,11,-53,12,-69,-15v-1,-12,11,-17,22,-14v71,-13,151,-18,230,-24v11,1,21,16,23,28v-28,20,-90,11,-126,16v-36,5,-62,5,-80,9xm123,-40v19,-17,41,-1,41,17v0,13,-6,19,-17,19v-15,0,-29,-14,-24,-36",
            w: 293
        },
        "ø": {
            d: "76,-136v17,7,33,-8,51,0v9,-6,21,-13,36,-21v23,22,-13,31,3,50v11,13,4,21,14,35v-4,5,-1,14,-4,23v-14,23,-45,41,-84,39v-12,2,-29,28,-41,38v-2,-11,-34,-10,-15,-30v3,-7,5,-11,5,-11v-15,-24,-60,-54,-22,-89v23,-21,25,-32,57,-34xm102,-54v18,1,50,-19,30,-32v-12,7,-22,18,-30,32xm85,-92v-14,3,-26,8,-38,17v2,20,17,13,26,0v6,-8,12,-13,12,-17",
            w: 188
        },
        "ù": {
            d: "196,-129v-1,-4,12,-13,15,-13v6,0,8,7,8,21v0,24,-7,25,-13,45v-7,7,-14,21,-24,29v-9,24,-61,45,-89,45v-63,0,-105,-72,-67,-126v24,-3,19,27,18,46v-1,26,23,42,54,40v38,-3,88,-51,98,-87xm126,-166v7,6,56,14,37,40v-28,-7,-62,-22,-100,-42v-2,-3,-2,-26,5,-23v16,4,42,18,58,25",
            w: 213
        },
        "ú": {
            d: "196,-129v-1,-4,12,-13,15,-13v6,0,8,7,8,21v0,24,-7,25,-13,45v-7,7,-14,21,-24,29v-9,24,-61,45,-89,45v-63,0,-105,-72,-67,-126v24,-3,19,27,18,46v-1,26,23,42,54,40v38,-3,88,-51,98,-87xm106,-174v26,-11,48,-32,59,-14v3,11,-81,53,-89,54v-13,1,-15,-12,-11,-22v15,-7,14,-7,41,-18",
            w: 213
        },
        "û": {
            d: "196,-129v-1,-4,12,-13,15,-13v6,0,8,7,8,21v0,24,-7,25,-13,45v-7,7,-14,21,-24,29v-9,24,-61,45,-89,45v-63,0,-105,-72,-67,-126v24,-3,19,27,18,46v-1,26,23,42,54,40v38,-3,88,-51,98,-87xm172,-143v-27,-6,-39,-26,-60,-37v-8,0,-10,4,-14,10v-11,15,-49,35,-56,0v17,-4,44,-32,61,-43v27,6,41,21,63,36v12,9,17,17,17,25v0,6,-3,9,-11,9",
            w: 213
        },
        "ü": {
            d: "196,-129v-1,-4,12,-13,15,-13v6,0,8,7,8,21v0,24,-7,25,-13,45v-7,7,-14,21,-24,29v-9,24,-61,45,-89,45v-63,0,-105,-72,-67,-126v24,-3,19,27,18,46v-1,26,23,42,54,40v38,-3,88,-51,98,-87xm168,-161v0,8,-3,13,-11,13v-17,0,-20,-19,-17,-34v18,-1,29,1,28,21xm72,-186v7,3,29,9,28,18v0,7,-9,18,-18,17v-18,1,-25,-24,-10,-35",
            w: 213
        },
        "ÿ": {
            d: "118,85v-11,11,-11,38,-22,61v-2,-1,-2,31,-17,27v-11,0,-21,-10,-21,-22v20,-66,23,-61,64,-168v-22,1,-38,16,-58,4v-22,4,-51,-16,-51,-42v-11,-13,-7,-59,7,-58v16,1,21,24,22,51v21,33,66,5,94,-7v4,-3,26,-14,38,-29r17,0v23,44,-23,59,-34,102v-6,9,-13,9,-13,26v-15,6,-12,33,-27,48v0,2,1,4,1,7xm158,-136v0,8,-4,13,-12,13v-18,0,-21,-20,-16,-34v18,-1,29,1,28,21xm62,-161v7,3,28,9,27,18v1,8,-8,17,-17,17v-18,0,-26,-24,-10,-35",
            w: 190
        },
        "ı": {d: "43,-103v21,4,16,56,11,100v-7,2,-11,1,-20,-5v0,-7,-13,-18,-11,-25v4,-23,-3,-68,20,-70", w: 80},
        "Œ": {
            d: "247,-243v71,4,161,-7,245,-8v17,0,27,6,27,17v-8,27,-70,14,-104,23v-3,1,-52,0,-65,7r0,4v16,16,17,29,17,65v32,10,74,-14,99,16v-14,25,-76,17,-127,24v-17,18,-55,32,-75,51v85,0,128,-3,204,-11v15,-2,21,11,20,29v-78,24,-177,12,-270,24v-24,3,-24,-29,-48,-15v-46,7,-70,4,-105,-4v-19,-18,-42,-22,-52,-55v-10,-34,0,-47,12,-78v-18,-59,48,-78,105,-84v17,-18,103,-13,117,-5xm125,-45v76,-9,186,-43,209,-105v-26,-67,-137,-83,-217,-54v3,34,-45,25,-60,58v-41,48,5,108,68,101",
            w: 492
        },
        "œ": {
            d: "185,-54v25,28,107,-17,104,33v-12,12,-60,14,-87,14v0,0,1,1,2,1v-11,1,-39,-9,-50,-17v-28,17,-75,32,-114,7v-22,-14,-34,-11,-34,-41v0,-36,33,-49,48,-75v29,-16,72,-3,95,11v12,-9,48,-27,59,-26v30,0,64,15,65,40v0,7,-6,20,-20,37v-29,1,-44,11,-68,16xm226,-106v-21,-7,-41,-2,-48,13v14,1,42,-7,48,-13xm132,-87v-21,-35,-94,11,-92,24v-2,14,43,21,61,21v25,0,36,-20,31,-45",
            w: 295
        },
        "Ÿ": {
            d: "176,-189v35,20,-25,54,-39,72v-26,34,-57,57,-74,104v-10,15,-4,14,-23,3r0,-10v19,-44,27,-46,50,-81v-9,-5,-24,4,-34,4v-38,0,-54,-50,-44,-87v21,-5,18,19,22,35v4,18,15,27,29,27v41,0,60,-39,113,-67xm153,-222v0,8,-3,12,-11,12v-18,0,-21,-19,-16,-33v18,-1,28,2,27,21xm57,-247v8,2,29,9,28,17v0,21,-37,24,-36,1v0,-7,2,-13,8,-18",
            w: 135
        },
        "ƒ": {
            d: "115,-262v-23,6,-39,63,-38,96v1,3,57,2,54,16v1,22,-45,15,-51,30v3,34,12,68,10,103v14,17,-18,53,-28,63v-48,8,-89,5,-95,-37v20,-5,77,21,83,-18v17,-29,-4,-61,0,-98v0,-5,-3,-10,-7,-17v-33,4,-43,-17,-25,-37v10,-4,27,5,27,-10v0,-43,15,-77,32,-109v12,-7,16,-22,38,-20v11,1,51,35,25,55v-9,1,-16,-17,-25,-17",
            w: 145
        },
        "ˆ": {
            d: "144,-220v-29,0,-41,-27,-63,-39v-8,0,-11,5,-15,11v-17,12,-32,31,-54,13v-2,-5,-3,-9,-4,-14v20,-5,45,-33,64,-45v28,6,43,23,65,38v12,9,19,19,19,27v0,6,-4,9,-12,9",
            w: 165
        },
        "ˇ": {
            d: "39,-286v33,46,63,-4,96,-16v6,0,9,6,9,19v0,24,-49,46,-77,46v-32,0,-52,-28,-59,-48v0,-25,23,-17,31,-1",
            w: 153
        },
        "˘": {
            d: "65,-269v20,-11,45,-31,74,-36v20,30,-42,40,-59,66v-5,6,-11,8,-18,8v-8,-3,-45,-32,-51,-54v5,-24,14,-13,34,1",
            w: 158
        },
        "˙": {d: "23,-302v15,-13,32,1,32,18v1,22,-36,29,-39,4v0,0,3,-7,7,-22", w: 70},
        "˚": {
            d: "23,-225v-43,-24,-11,-85,41,-78v16,2,31,4,46,17v32,54,-41,86,-87,61xm33,-257v2,20,57,11,57,-6v0,-6,-11,-9,-33,-12v-14,-2,-24,13,-24,18",
            w: 123
        },
        "˛": {
            d: "82,-5v-8,12,-16,55,-21,75v0,4,2,7,7,7v6,0,22,-7,50,-20v8,0,12,7,12,20v-2,22,-6,14,-27,30v-15,12,-26,16,-30,16v-47,-8,-59,-14,-56,-75v8,-27,12,-54,25,-77v19,-21,35,15,40,24",
            w: 138
        },
        "˜": {
            d: "47,-300v26,-21,57,19,72,23v4,0,16,-5,36,-14v24,-10,22,-16,32,-13v3,12,-7,11,-7,23v-27,21,-48,32,-62,32v-3,2,-52,-27,-51,-31v-12,-2,-34,40,-54,33v-4,-13,-8,-18,1,-24v5,-7,16,-15,33,-29",
            w: 186
        },
        "˝": {
            d: "91,-249v15,-11,38,-53,57,-29v0,9,0,14,-3,23v-2,3,-20,22,-54,55v-5,5,-10,8,-16,8v-17,2,-6,-22,-7,-31v-1,0,-2,0,-4,1v-17,21,-29,31,-50,27v-5,-18,-3,-15,3,-27v23,-27,40,-46,48,-59v7,-12,31,3,29,9v-1,14,-3,24,-13,31v4,4,9,-1,10,-8",
            w: 151
        },
        "–": {
            d: "6,-66v-8,-72,79,-21,146,-39v37,-10,79,7,111,0v9,8,14,13,14,17v2,26,-72,13,-99,21v-83,4,-124,21,-172,1",
            w: 282
        },
        "—": {
            d: "175,-106v86,-9,201,1,286,-1v11,6,13,11,6,30v-118,15,-246,10,-377,10v-25,0,-73,3,-82,-8r-2,-26v11,-13,32,-9,52,-7v38,3,84,-5,117,2",
            w: 485
        },
        "‘": {d: "73,-262v-10,7,-41,39,-38,69v-15,13,-27,-16,-28,-28v-2,-20,51,-83,66,-83v20,0,25,41,0,42", w: 95},
        "’": {
            d: "74,-300v13,31,-1,99,-44,101v-13,0,-19,-5,-19,-15v6,-10,31,-34,35,-59v2,-11,1,-32,11,-32v6,0,11,2,17,5",
            w: 90
        },
        "‚": {d: "25,63v-26,21,-48,-2,-22,-24v14,-12,35,-40,35,-69v3,-2,3,-11,12,-9v35,17,5,88,-25,102", w: 97},
        "“": {
            d: "66,-261v-21,5,-37,51,-22,77v0,4,-2,6,-7,6v-31,-9,-38,-62,-12,-94v12,-15,21,-28,31,-34v16,-1,19,24,22,34v10,-11,22,-32,43,-23v-2,8,4,16,5,19v-6,11,-51,53,-29,74v-12,21,-30,5,-33,-17v-6,-13,9,-28,2,-42",
            w: 118
        },
        "”": {
            d: "120,-294v12,3,30,26,19,34v2,15,-40,70,-55,66v-40,-10,10,-51,14,-64v3,-3,8,-31,22,-36xm70,-306v14,3,26,34,16,49v-19,30,-31,45,-58,59v-12,-11,-33,-17,-7,-36v13,-19,36,-27,36,-59v0,-5,9,-13,13,-13",
            w: 148
        },
        "„": {
            d: "25,63v-26,21,-48,-2,-22,-24v11,-9,36,-41,35,-69v3,-2,4,-12,12,-9v36,14,5,89,-25,102xm84,64v-24,20,-45,-1,-21,-24v21,-20,32,-35,35,-69v3,-2,3,-11,12,-9v36,17,9,86,-26,102",
            w: 135
        },
        "†": {
            d: "22,-286v15,6,5,-20,19,-19v9,-3,15,21,17,22v6,1,12,3,20,6v3,10,5,16,-9,16v-34,-10,-6,51,-34,52v-20,-7,11,-47,-15,-49v-14,3,-25,-5,-17,-24v7,-2,14,-4,19,-4",
            w: 77
        },
        "‡": {
            d: "102,-284v16,2,42,-2,33,18v-7,15,-42,1,-38,30v3,3,31,1,30,11v4,15,-29,19,-36,24v-2,18,-4,24,-16,29r-25,-26v-25,7,-53,3,-42,-25v4,-10,70,0,51,-22v-17,4,-41,12,-39,-15v-5,-16,39,-18,44,-20v4,-2,7,-10,10,-24v19,-3,23,6,28,20",
            w: 145
        },
        "•": {d: "130,-114v0,47,-124,54,-120,-8r6,-31v44,-28,64,-34,104,0v8,6,10,20,10,39", w: 139},
        "…": {
            d: "244,-24v-1,21,-38,32,-41,3v-2,-19,23,-22,34,-17v0,7,0,15,7,14xm113,-24v0,-22,28,-21,38,-8v5,34,-39,40,-38,8xm35,-2v-10,-2,-36,-17,-18,-29v-1,-15,17,-17,31,-6v7,17,6,33,-13,35",
            w: 258
        },
        "‰": {
            d: "398,-131v58,-1,87,13,72,65v-1,30,-66,63,-99,65v-56,3,-99,-58,-62,-102v2,2,5,2,8,2v20,-16,51,-17,81,-30xm202,-279v33,0,94,-24,95,18v-7,31,-33,27,-54,55v-36,32,-71,74,-112,99v-18,18,-40,34,-51,58v-19,14,-25,37,-56,40v-17,2,-25,-29,-10,-40v15,-11,40,-37,52,-52r87,-72v-51,13,-100,6,-116,-27v1,-5,-6,-30,-9,-36v-3,-5,22,-41,27,-39v29,2,16,34,5,49v0,15,14,23,42,23v42,0,59,-31,28,-38v-17,-4,-53,3,-50,-23v0,-7,1,-12,4,-16v16,-9,36,4,49,5v0,0,23,-4,69,-4xm222,-118v33,-2,55,18,50,57v-29,36,-48,45,-96,50v-27,-5,-56,-17,-58,-51v13,-37,64,-43,104,-56xm335,-61v13,44,101,7,108,-31v-11,-3,-20,-4,-30,-4v-18,-1,-82,18,-78,35xm225,-244v-18,0,-29,-1,-46,3v7,15,6,28,0,43v15,-14,34,-30,46,-46xm164,-53v26,5,59,-10,76,-26v-17,-16,-49,2,-67,14v1,8,-8,6,-9,12",
            w: 485
        },
        "‹": {
            d: "64,-107v9,17,86,17,87,43v0,11,-4,16,-13,16v-36,-11,-70,-22,-109,-31v-19,-4,-18,-14,-9,-36v59,-56,93,-84,101,-84v17,0,19,20,13,29",
            w: 159
        },
        "›": {
            d: "41,-181v26,27,112,44,70,91r-82,60v-20,3,-25,-23,-13,-32r70,-51r-66,-46v-5,-6,-4,-28,5,-29v4,2,9,4,16,7",
            w: 137
        },
        "⁄": {
            d: "193,-305v7,6,17,31,3,41v-10,7,-12,13,-21,25v-79,56,-190,209,-197,260r-18,0v-23,-19,9,-70,15,-85v52,-83,121,-179,218,-241",
            w: 120
        },
        "™": {
            d: "213,-307v28,9,11,49,7,75v-1,4,-4,6,-11,6v-7,1,-11,-14,-11,-34v-14,-6,-34,34,-46,28v-2,0,-10,-9,-24,-27v-10,7,-3,36,-27,31v-15,-24,-3,-27,1,-48v-6,-7,-27,-1,-31,3v-3,14,-7,30,-11,51v-5,10,-29,9,-24,-12v-5,-8,1,-18,3,-35v-13,6,-33,2,-29,-18v20,-17,64,-17,100,-19v28,-1,29,30,45,39v11,-6,35,-32,58,-40",
            w: 239
        },
        "∆": {
            d: "18,-1v-24,-30,8,-48,25,-71v14,-19,34,-28,40,-56v20,-35,29,-14,57,4v9,39,43,62,57,102v0,16,-34,17,-50,14v-28,2,-72,4,-129,7xm139,-47r-22,-52v-12,-5,-12,15,-24,27v-7,6,-14,16,-23,28v23,1,36,-1,69,-3",
            w: 199
        },
        "∙": {d: "57,-77v6,18,-7,21,-19,23v-34,6,-25,-40,-9,-43v18,-3,29,8,28,20", w: 67},
        "√": {
            d: "364,-218v43,-21,80,-51,104,-32v-3,19,-24,21,-44,40v-41,15,-78,53,-136,78r-137,98v-20,16,-79,66,-91,68v-3,1,-25,-11,-24,-13v-4,-28,-43,-61,-30,-85v26,-15,42,19,58,32r295,-188v0,1,2,2,5,2",
            w: 474
        },
        "∞": {
            d: "322,-72v-4,22,-54,41,-76,41v-43,0,-83,-17,-114,-35v-46,19,-125,53,-128,-18v-1,-14,10,-22,13,-35v29,-10,62,-31,97,-4v37,28,47,5,75,-8v40,-19,73,-10,114,1v13,1,18,55,19,58xm228,-69v15,0,62,-12,61,-25v-19,-23,-89,-10,-105,11v0,2,1,4,2,4v28,6,42,10,42,10xm75,-102v-13,2,-41,4,-44,19v0,4,3,7,10,7v21,0,40,-6,54,-17v-9,-6,-16,-9,-20,-9",
            w: 330
        },
        "∫": {
            d: "62,-151v-7,-70,20,-130,63,-150v28,1,39,10,70,23v20,8,6,33,-6,35v-29,-13,-45,-20,-49,-20v-20,-4,-45,51,-43,70v8,60,5,129,5,189v0,62,-27,93,-79,93v-37,-1,-71,-14,-63,-57v21,0,79,34,91,-2v16,-3,14,-64,21,-85v-2,-31,-1,-74,-10,-96",
            w: 156
        },
        "≈": {
            d: "133,-112v21,15,48,-30,78,-17v3,3,5,7,5,9v-8,30,-47,45,-76,45v-19,0,-64,-48,-90,-21r-29,20v-6,-1,-17,-16,-15,-32v24,-17,70,-42,107,-21v4,4,10,9,20,17xm138,-57v28,2,48,-25,76,-26v13,30,-21,42,-40,53v-41,24,-77,-15,-114,-23v-15,14,-46,32,-49,-1v-3,-9,27,-28,54,-30",
            w: 223
        },
        "≠": {
            d: "48,-130v29,11,49,-57,60,-50v25,6,7,27,-1,46v22,5,29,7,21,22v-18,2,-48,-1,-50,15v9,8,53,-7,54,10v-4,22,-46,20,-72,24v-7,13,-18,32,-34,57v-8,6,-15,-3,-13,-14v-1,-9,15,-39,14,-45v-30,5,-24,-17,-13,-25v12,-1,36,4,29,-13v-14,0,-47,6,-36,-12v0,-18,27,-13,41,-15",
            w: 140
        },
        "≤": {
            d: "73,-109v10,15,87,16,87,42v0,11,-5,16,-13,16v-36,-11,-69,-24,-109,-31v-18,-8,-18,-13,-9,-36v59,-56,93,-83,101,-83v16,0,18,17,14,28v-27,24,-42,35,-71,64xm10,-29v35,-12,117,-26,148,-3v1,2,-5,19,-8,18r-124,15v-16,2,-26,-18,-16,-30",
            w: 168
        },
        "≥": {
            d: "115,-174v20,7,53,36,20,57v-19,11,-91,68,-82,59v-18,3,-25,-22,-13,-31v15,-10,14,-10,70,-51r-50,-37v-5,-4,-5,-27,4,-28v16,7,40,17,51,31xm14,-32v33,-10,86,-14,127,-10v12,12,5,23,-11,27v-49,9,-82,13,-99,13v-22,0,-24,-16,-17,-30",
            w: 163
        },
        "◊": {
            d: "76,-158v48,-8,64,11,100,36v28,19,-5,39,-22,54v-15,13,-40,32,-48,49v-17,5,-12,0,-27,-16v-6,-6,-86,-31,-68,-53r2,-9v27,-23,48,-44,63,-61xm93,-65v12,-2,35,-31,41,-38v-5,-10,-16,-14,-34,-24v-12,12,-36,29,-40,44v19,11,30,18,33,18",
            w: 199
        }
    }
}), "undefined" == typeof Raphael && "undefined" == typeof Snap) throw new Error("Raphael or Snap.svg is required to be included.");
if (_.isEmpty(Diagram.themes)) throw new Error("No themes were registered. Please call registerTheme(...).");
Diagram.themes.hand = Diagram.themes.snapHand || Diagram.themes.raphaelHand, Diagram.themes.simple = Diagram.themes.snapSimple || Diagram.themes.raphaelSimple, Diagram.prototype.drawSVG = function (container, options) {
    var defaultOptions = {theme: "hand"};
    if (options = _.defaults(options || {}, defaultOptions), !(options.theme in Diagram.themes)) throw new Error("Unsupported theme: " + options.theme);
    var div = _.isString(container) ? document.getElementById(container) : container;
    if (null === div || !div.tagName) throw new Error("Invalid container: " + container);
    var Theme = Diagram.themes[options.theme];
    new Theme(this, options, function (drawing) {
        drawing.draw(div)
    })
}, "undefined" != typeof jQuery && !function ($) {
    $.fn.sequenceDiagram = function (options) {
        return this.each(function () {
            var $this = $(this), diagram = Diagram.parse($this.text());
            $this.html(""), diagram.drawSVG(this, options)
        })
    }
}(jQuery);
var root = "object" == typeof self && self.self == self && self || "object" == typeof global && global.global == global && global;
 true ? ("undefined" != typeof module && module.exports && (exports = module.exports = Diagram), exports.Diagram = Diagram) : undefined



module.exports = Diagram;

/** js sequence diagrams 2.0.1
 *  https://bramp.github.io/js-sequence-diagrams/
 *  (c) 2012-2017 Andrew Brampton (bramp.net)
 *  @license Simplified BSD license.
 */
!function () {

}();



























































/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5), __webpack_require__(6)(module), __webpack_require__(7)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.6 - (c) Adobe Systems, Google. License: Apache 2.0 */
(function () {
    function aa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ba(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function n(a, b, c) {
        n = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
        return n.apply(null, arguments)
    }

    var p = Date.now || function () {
        return +new Date
    };

    function r(a, b) {
        this.D = a;
        this.m = b || a;
        this.F = this.m.document
    }

    r.prototype.createElement = function (a, b, c) {
        a = this.F.createElement(a);
        if (b) for (var d in b) b.hasOwnProperty(d) && ("style" == d ? a.style.cssText = b[d] : a.setAttribute(d, b[d]));
        c && a.appendChild(this.F.createTextNode(c));
        return a
    };

    function s(a, b, c) {
        a = a.F.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a.insertBefore(c, a.lastChild)
    }

    function t(a, b, c) {
        b = b || [];
        c = c || [];
        for (var d = a.className.split(/\s+/), f = 0; f < b.length; f += 1) {
            for (var e = !1, g = 0; g < d.length; g += 1) if (b[f] === d[g]) {
                e = !0;
                break
            }
            e || d.push(b[f])
        }
        b = [];
        for (f = 0; f < d.length; f += 1) {
            e = !1;
            for (g = 0; g < c.length; g += 1) if (d[f] === c[g]) {
                e = !0;
                break
            }
            e || b.push(d[f])
        }
        a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function u(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, f = c.length; d < f; d++) if (c[d] == b) return !0;
        return !1
    }

    function v(a) {
        if ("string" === typeof a.da) return a.da;
        var b = a.m.location.protocol;
        "about:" == b && (b = a.D.location.protocol);
        return "https:" == b ? "https:" : "http:"
    }

    function w(a, b) {
        var c = a.createElement("link", {rel: "stylesheet", href: b, media: "all"}), d = !1;
        c.onload = function () {
            d || (d = !0)
        };
        c.onerror = function () {
            d || (d = !0)
        };
        s(a, "head", c)
    }

    function x(a, b, c, d) {
        var f = a.F.getElementsByTagName("head")[0];
        if (f) {
            var e = a.createElement("script", {src: b}), g = !1;
            e.onload = e.onreadystatechange = function () {
                g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), e.onload = e.onreadystatechange = null, "HEAD" == e.parentNode.tagName && f.removeChild(e))
            };
            f.appendChild(e);
            setTimeout(function () {
                g || (g = !0, c && c(Error("Script load timeout")))
            }, d || 5E3);
            return e
        }
        return null
    };

    function y(a) {
        this.ca = a || "-"
    }

    y.prototype.d = function (a) {
        for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
        return b.join(this.ca)
    };

    function A(a, b) {
        this.V = a;
        this.N = 4;
        this.H = "n";
        var c = (b || "n4").match(/^([nio])([1-9])$/i);
        c && (this.H = c[1], this.N = parseInt(c[2], 10))
    }

    A.prototype.getName = function () {
        return this.V
    };

    function B(a) {
        return a.H + a.N
    }

    function ca(a) {
        var b = 4, c = "n", d = null;
        a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
        return c + b
    };

    function da(a, b) {
        this.a = a;
        this.h = a.m.document.documentElement;
        this.J = b;
        this.f = "wf";
        this.e = new y("-");
        this.Z = !1 !== b.events;
        this.u = !1 !== b.classes
    }

    function ea(a) {
        a.u && t(a.h, [a.e.d(a.f, "loading")]);
        C(a, "loading")
    }

    function D(a) {
        if (a.u) {
            var b = u(a.h, a.e.d(a.f, "active")), c = [], d = [a.e.d(a.f, "loading")];
            b || c.push(a.e.d(a.f, "inactive"));
            t(a.h, c, d)
        }
        C(a, "inactive")
    }

    function C(a, b, c) {
        if (a.Z && a.J[b]) if (c) a.J[b](c.getName(), B(c)); else a.J[b]()
    };

    function fa() {
        this.t = {}
    }

    function ga(a, b, c) {
        var d = [], f;
        for (f in b) if (b.hasOwnProperty(f)) {
            var e = a.t[f];
            e && d.push(e(b[f], c))
        }
        return d
    };

    function E(a, b) {
        this.a = a;
        this.q = b;
        this.j = this.a.createElement("span", {"aria-hidden": "true"}, this.q)
    }

    function G(a, b) {
        var c = a.j, d;
        d = [];
        for (var f = b.V.split(/,\s*/), e = 0; e < f.length; e++) {
            var g = f[e].replace(/['"]/g, "");
            -1 == g.indexOf(" ") ? d.push(g) : d.push("'" + g + "'")
        }
        d = d.join(",");
        f = "normal";
        "o" === b.H ? f = "oblique" : "i" === b.H && (f = "italic");
        c.style.cssText = "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + d + ";" + ("font-style:" + f + ";font-weight:" + (b.N + "00") + ";")
    }

    function H(a) {
        s(a.a, "body", a.j)
    }

    E.prototype.remove = function () {
        var a = this.j;
        a.parentNode && a.parentNode.removeChild(a)
    };

    function I(a, b, c, d, f, e, g) {
        this.O = a;
        this.ba = b;
        this.a = c;
        this.g = d;
        this.q = g || "BESbswy";
        this.s = {};
        this.M = f || 3E3;
        this.T = e || null;
        this.C = this.B = this.w = this.v = null;
        this.v = new E(this.a, this.q);
        this.w = new E(this.a, this.q);
        this.B = new E(this.a, this.q);
        this.C = new E(this.a, this.q);
        G(this.v, new A(this.g.getName() + ",serif", B(this.g)));
        G(this.w, new A(this.g.getName() + ",sans-serif", B(this.g)));
        G(this.B, new A("serif", B(this.g)));
        G(this.C, new A("sans-serif", B(this.g)));
        H(this.v);
        H(this.w);
        H(this.B);
        H(this.C)
    }

    var J = {ga: "serif", fa: "sans-serif"}, K = null;

    function L() {
        if (null === K) {
            var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
            K = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10))
        }
        return K
    }

    I.prototype.start = function () {
        this.s.serif = this.B.j.offsetWidth;
        this.s["sans-serif"] = this.C.j.offsetWidth;
        this.ea = p();
        M(this)
    };

    function N(a, b, c) {
        for (var d in J) if (J.hasOwnProperty(d) && b === a.s[J[d]] && c === a.s[J[d]]) return !0;
        return !1
    }

    function M(a) {
        var b = a.v.j.offsetWidth, c = a.w.j.offsetWidth, d;
        (d = b === a.s.serif && c === a.s["sans-serif"]) || (d = L() && N(a, b, c));
        d ? p() - a.ea >= a.M ? L() && N(a, b, c) && (null === a.T || a.T.hasOwnProperty(a.g.getName())) ? O(a, a.O) : O(a, a.ba) : ha(a) : O(a, a.O)
    }

    function ha(a) {
        setTimeout(n(function () {
            M(this)
        }, a), 50)
    }

    function O(a, b) {
        setTimeout(n(function () {
            this.v.remove();
            this.w.remove();
            this.B.remove();
            this.C.remove();
            b(this.g)
        }, a), 0)
    };

    function P(a, b, c) {
        this.a = a;
        this.o = b;
        this.K = 0;
        this.X = this.S = !1;
        this.M = c
    }

    P.prototype.$ = function (a) {
        var b = this.o;
        b.u && t(b.h, [b.e.d(b.f, a.getName(), B(a).toString(), "active")], [b.e.d(b.f, a.getName(), B(a).toString(), "loading"), b.e.d(b.f, a.getName(), B(a).toString(), "inactive")]);
        C(b, "fontactive", a);
        this.X = !0;
        Q(this)
    };
    P.prototype.aa = function (a) {
        var b = this.o;
        if (b.u) {
            var c = u(b.h, b.e.d(b.f, a.getName(), B(a).toString(), "active")), d = [],
                f = [b.e.d(b.f, a.getName(), B(a).toString(), "loading")];
            c || d.push(b.e.d(b.f, a.getName(), B(a).toString(), "inactive"));
            t(b.h, d, f)
        }
        C(b, "fontinactive", a);
        Q(this)
    };

    function Q(a) {
        0 == --a.K && a.S && (a.X ? (a = a.o, a.u && t(a.h, [a.e.d(a.f, "active")], [a.e.d(a.f, "loading"), a.e.d(a.f, "inactive")]), C(a, "active")) : D(a.o))
    };

    function R(a) {
        this.D = a;
        this.p = new fa;
        this.U = 0;
        this.P = this.Q = !0
    }

    R.prototype.load = function (a) {
        this.a = new r(this.D, a.context || this.D);
        this.Q = !1 !== a.events;
        this.P = !1 !== a.classes;
        ia(this, new da(this.a, a), a)
    };

    function ja(a, b, c, d, f) {
        var e = 0 == --a.U;
        (a.P || a.Q) && setTimeout(function () {
            var a = f || null, l = d || null || {};
            if (0 === c.length && e) D(b.o); else {
                b.K += c.length;
                e && (b.S = e);
                var h, k = [];
                for (h = 0; h < c.length; h++) {
                    var m = c[h], z = l[m.getName()], q = b.o, F = m;
                    q.u && t(q.h, [q.e.d(q.f, F.getName(), B(F).toString(), "loading")]);
                    C(q, "fontloading", F);
                    q = null;
                    q = new I(n(b.$, b), n(b.aa, b), b.a, m, b.M, a, z);
                    k.push(q)
                }
                for (h = 0; h < k.length; h++) k[h].start()
            }
        }, 0)
    }

    function ia(a, b, c) {
        var d = [], f = c.timeout;
        ea(b);
        var d = ga(a.p, c, a.a), e = new P(a.a, b, f);
        a.U = d.length;
        b = 0;
        for (c = d.length; b < c; b++) d[b].load(function (b, c, d) {
            ja(a, e, b, c, d)
        })
    };

    function S(a, b, c) {
        this.I = a ? a : b + ka;
        this.k = [];
        this.L = [];
        this.Y = c || ""
    }

    var ka = "//fonts.googleapis.com/css";
    S.prototype.d = function () {
        if (0 == this.k.length) throw Error("No fonts to load!");
        if (-1 != this.I.indexOf("kit=")) return this.I;
        for (var a = this.k.length, b = [], c = 0; c < a; c++) b.push(this.k[c].replace(/ /g, "+"));
        a = this.I + "?family=" + b.join("%7C");
        0 < this.L.length && (a += "&subset=" + this.L.join(","));
        0 < this.Y.length && (a += "&text=" + encodeURIComponent(this.Y));
        return a
    };

    function T(a) {
        this.k = a;
        this.W = [];
        this.G = {}
    }

    var U = {
            latin: "BESbswy",
            cyrillic: "&#1081;&#1103;&#1046;",
            greek: "&#945;&#946;&#931;",
            khmer: "&#x1780;&#x1781;&#x1782;",
            Hanuman: "&#x1780;&#x1781;&#x1782;"
        }, la = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        }, ma = {i: "i", italic: "i", n: "n", normal: "n"},
        na = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
    T.prototype.parse = function () {
        for (var a = this.k.length, b = 0; b < a; b++) {
            var c = this.k[b].split(":"), d = c[0].replace(/\+/g, " "), f = ["n4"];
            if (2 <= c.length) {
                var e;
                var g = c[1];
                e = [];
                if (g) for (var g = g.split(","), l = g.length, h = 0; h < l; h++) {
                    var k;
                    k = g[h];
                    if (k.match(/^[\w-]+$/)) if (k = na.exec(k.toLowerCase()), null == k) k = ""; else {
                        var m;
                        m = k[1];
                        if (null == m || "" == m) m = "4"; else {
                            var z = la[m];
                            m = z ? z : isNaN(m) ? "4" : m.substr(0, 1)
                        }
                        k = k[2];
                        k = [null == k || "" == k ? "n" : ma[k], m].join("")
                    } else k = "";
                    k && e.push(k)
                }
                0 < e.length && (f = e);
                3 == c.length && (c = c[2], e = [],
                    c = c ? c.split(",") : e, 0 < c.length && (c = U[c[0]]) && (this.G[d] = c))
            }
            this.G[d] || (c = U[d]) && (this.G[d] = c);
            for (c = 0; c < f.length; c += 1) this.W.push(new A(d, f[c]))
        }
    };

    function V(a, b) {
        this.a = a;
        this.c = b
    }

    var oa = {Arimo: !0, Cousine: !0, Tinos: !0};
    V.prototype.load = function (a) {
        for (var b = this.a, c = new S(this.c.api, v(b), this.c.text), d = this.c.families, f = d.length, e = 0; e < f; e++) {
            var g = d[e].split(":");
            3 == g.length && c.L.push(g.pop());
            var l = "";
            2 == g.length && "" != g[1] && (l = ":");
            c.k.push(g.join(l))
        }
        d = new T(d);
        d.parse();
        w(b, c.d());
        a(d.W, d.G, oa)
    };

    function W(a, b) {
        this.a = a;
        this.c = b;
        this.R = []
    }

    W.prototype.A = function (a) {
        var b = this.a;
        return v(this.a) + (this.c.api || "//f.fontdeck.com/s/css/js/") + (b.m.location.hostname || b.D.location.hostname) + "/" + a + ".js"
    };
    W.prototype.load = function (a) {
        var b = this.c.id, c = this.a.m, d = this;
        b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {
            for (var g = 0, l = c.fonts.length; g < l; ++g) {
                var h = c.fonts[g];
                d.R.push(new A(h.name, ca("font-weight:" + h.weight + ";font-style:" + h.style)))
            }
            a(d.R)
        }, x(this.a, this.A(b), function (b) {
            b && a([])
        })) : a([])
    };

    function X(a, b) {
        this.a = a;
        this.c = b
    }

    X.prototype.A = function (a) {
        return (this.c.api || "https://use.typekit.net") + "/" + a + ".js"
    };
    X.prototype.load = function (a) {
        var b = this.c.id, c = this.a.m;
        b ? x(this.a, this.A(b), function (b) {
            if (b) a([]); else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
                b = c.Typekit.config.fn;
                for (var f = [], e = 0; e < b.length; e += 2) for (var g = b[e], l = b[e + 1], h = 0; h < l.length; h++) f.push(new A(g, l[h]));
                try {
                    c.Typekit.load({events: !1, classes: !1, async: !0})
                } catch (k) {
                }
                a(f)
            }
        }, 2E3) : a([])
    };

    function Y(a, b) {
        this.a = a;
        this.c = b
    }

    Y.prototype.A = function (a, b) {
        var c = v(this.a), d = (this.c.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return c + "//" + d + "/" + a + ".js" + (b ? "?v=" + b : "")
    };
    Y.prototype.load = function (a) {
        var b = this.c.projectId, c = this.c.version;
        if (b) {
            var d = this.a.m;
            x(this.a, this.A(b, c), function (c) {
                if (c) a([]); else if (d["__mti_fntLst" + b]) {
                    c = d["__mti_fntLst" + b]();
                    var e = [];
                    if (c) for (var g = 0; g < c.length; g++) e.push(new A(c[g].fontfamily));
                    a(e)
                } else a([])
            }).id = "__MonotypeAPIScript__" + b
        } else a([])
    };

    function pa(a, b) {
        this.a = a;
        this.c = b
    }

    pa.prototype.load = function (a) {
        var b, c, d = this.c.urls || [], f = this.c.families || [], e = this.c.testStrings || {};
        b = 0;
        for (c = d.length; b < c; b++) w(this.a, d[b]);
        d = [];
        b = 0;
        for (c = f.length; b < c; b++) {
            var g = f[b].split(":");
            if (g[1]) for (var l = g[1].split(","), h = 0; h < l.length; h += 1) d.push(new A(g[0], l[h])); else d.push(new A(g[0]))
        }
        a(d, e)
    };
    var Z = new R(window);
    Z.p.t.custom = function (a, b) {
        return new pa(b, a)
    };
    Z.p.t.fontdeck = function (a, b) {
        return new W(b, a)
    };
    Z.p.t.monotype = function (a, b) {
        return new Y(b, a)
    };
    Z.p.t.typekit = function (a, b) {
        return new X(b, a)
    };
    Z.p.t.google = function (a, b) {
        return new V(b, a)
    };
    var $ = {load: n(Z.load, Z)};
     true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return $
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}());




/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Snap.svg 0.5.0
//
// Copyright (c) 2013 – 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// build: 2017-02-06

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ┌────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.5.0 - JavaScript Events Library                      │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
// └────────────────────────────────────────────────────────────┘ \\


var eve = (function (glob) {

    var version = "0.5.0",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        comaseparator = /\s*,\s*/,
        wildcard = "*",
        fun = function () {
        },
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},
        firstDefined = function () {
            for (var i = 0, ii = this.length; i < ii; i++) {
                if (typeof this[i] != "undefined") {
                    return this[i];
                }
            }
        },
        lastDefined = function () {
            var i = this.length;
            while (--i) {
                if (typeof this[i] != "undefined") {
                    return this[i];
                }
            }
        },
        objtos = Object.prototype.toString,
        Str = String,
        isArray = Array.isArray || function (ar) {
            return ar instanceof Array || objtos.call(ar) == "[object Array]";
        };
    /*\
     * eve
     [ method ]

     * Fires event with given `name`, given scope and other parameters.

     > Arguments

     - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
     - scope (object) context for the event handlers
     - varargs (...) the rest of arguments will be sent to event handlers

     = (object) array of returned values from the listeners. Array has two methods `.firstDefined()` and `.lastDefined()` to get first or last not `undefined` value.
    \*/
    eve = function (name, scope) {
        var e = events,
            oldstop = stop,
            args = Array.prototype.slice.call(arguments, 2),
            listeners = eve.listeners(name),
            z = 0,
            f = false,
            l,
            indexed = [],
            queue = {},
            out = [],
            ce = current_event,
            errors = [];
        out.firstDefined = firstDefined;
        out.lastDefined = lastDefined;
        current_event = name;
        stop = 0;
        for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
            indexed.push(listeners[i].zIndex);
            if (listeners[i].zIndex < 0) {
                queue[listeners[i].zIndex] = listeners[i];
            }
        }
        indexed.sort(numsort);
        while (indexed[z] < 0) {
            l = queue[indexed[z++]];
            out.push(l.apply(scope, args));
            if (stop) {
                stop = oldstop;
                return out;
            }
        }
        for (i = 0; i < ii; i++) {
            l = listeners[i];
            if ("zIndex" in l) {
                if (l.zIndex == indexed[z]) {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                    do {
                        z++;
                        l = queue[indexed[z]];
                        l && out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                    } while (l)
                } else {
                    queue[l.zIndex] = l;
                }
            } else {
                out.push(l.apply(scope, args));
                if (stop) {
                    break;
                }
            }
        }
        stop = oldstop;
        current_event = ce;
        return out;
    };
    // Undocumented. Debug only.
    eve._events = events;
    /*\
     * eve.listeners
     [ method ]

     * Internal method which gives you array of all event handlers that will be triggered by the given `name`.

     > Arguments

     - name (string) name of the event, dot (`.`) or slash (`/`) separated

     = (array) array of event handlers
    \*/
    eve.listeners = function (name) {
        var names = isArray(name) ? name : name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    /*\
     * eve.separator
     [ method ]

     * If for some reasons you don’t like default separators (`.` or `/`) you can specify yours
     * here. Be aware that if you pass a string longer than one character it will be treated as
     * a list of characters.

     - separator (string) new separator. Empty string resets to default: `.` or `/`.
    \*/
    eve.separator = function (sep) {
        if (sep) {
            sep = Str(sep).replace(/(?=[\.\^\]\[\-])/g, "\\");
            sep = "[" + sep + "]";
            separator = new RegExp(sep);
        } else {
            separator = /[\.\/]/;
        }
    };
    /*\
     * eve.on
     [ method ]
     **
     * Binds given event handler with a given name. You can use wildcards “`*`” for the names:
     | eve.on("*.under.*", f);
     | eve("mouse.under.floor"); // triggers f
     * Use @eve to trigger the listener.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     - name (array) if you don’t want to use separators, you can use array of strings
     - f (function) event handler function
     **
     = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment.
     > Example:
     | eve.on("mouse", eatIt)(2);
     | eve.on("mouse", scream);
     | eve.on("mouse", catchIt)(1);
     * This will ensure that `catchIt` function will be called before `eatIt`.
     *
     * If you want to put your handler before non-indexed handlers, specify a negative value.
     * Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.
    \*/
    eve.on = function (name, f) {
        if (typeof f != "function") {
            return function () {
            };
        }
        var names = isArray(name) ? (isArray(name[0]) ? name : [name]) : Str(name).split(comaseparator);
        for (var i = 0, ii = names.length; i < ii; i++) {
            (function (name) {
                var names = isArray(name) ? name : Str(name).split(separator),
                    e = events,
                    exist;
                for (var i = 0, ii = names.length; i < ii; i++) {
                    e = e.n;
                    e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {n: {}});
                }
                e.f = e.f || [];
                for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
                    exist = true;
                    break;
                }
                !exist && e.f.push(f);
            }(names[i]));
        }
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    /*\
     * eve.f
     [ method ]
     **
     * Returns function that will fire given event with optional arguments.
     * Arguments that will be passed to the result function will be also
     * concated to the list of final arguments.
     | el.onclick = eve.f("click", 1, 2);
     | eve.on("click", function (a, b, c) {
     |     console.log(a, b, c); // 1, 2, [event object]
     | });
     > Arguments
     - event (string) event name
     - varargs (…) and any other arguments
     = (function) possible event handler function
    \*/
    eve.f = function (event) {
        var attrs = [].slice.call(arguments, 1);
        return function () {
            eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)));
        };
    };
    /*\
     * eve.stop
     [ method ]
     **
     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
    \*/
    eve.stop = function () {
        stop = 1;
    };
    /*\
     * eve.nt
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     > Arguments
     **
     - subname (string) #optional subname of the event
     **
     = (string) name of the event, if `subname` is not specified
     * or
     = (boolean) `true`, if current event’s name contains `subname`
    \*/
    eve.nt = function (subname) {
        var cur = isArray(current_event) ? current_event.join(".") : current_event;
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(cur);
        }
        return cur;
    };
    /*\
     * eve.nts
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     **
     = (array) names of the event
    \*/
    eve.nts = function () {
        return isArray(current_event) ? current_event : current_event.split(separator);
    };
    /*\
     * eve.off
     [ method ]
     **
     * Removes given function from the list of event listeners assigned to given name.
     * If no arguments specified all the events will be cleared.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
    \*/
    /*\
     * eve.unbind
     [ method ]
     **
     * See @eve.off
    \*/
    eve.off = eve.unbind = function (name, f) {
        if (!name) {
            eve._events = events = {n: {}};
            return;
        }
        var names = isArray(name) ? (isArray(name[0]) ? name : [name]) : Str(name).split(comaseparator);
        if (names.length > 1) {
            for (var i = 0, ii = names.length; i < ii; i++) {
                eve.off(names[i], f);
            }
            return;
        }
        names = isArray(name) ? name : Str(name).split(separator);
        var e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events],
            inodes = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                        inodes.unshift({
                            n: e,
                            name: names[i]
                        });
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                        inodes.unshift({
                            n: e,
                            name: key
                        });
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
        // prune inner nodes in path
        prune: for (i = 0, ii = inodes.length; i < ii; i++) {
            e = inodes[i];
            for (key in e.n[e.name].f) {
                // not empty (has listeners)
                continue prune;
            }
            for (key in e.n[e.name].n) {
                // not empty (has children)
                continue prune;
            }
            // is empty
            delete e.n[e.name];
        }
    };
    /*\
     * eve.once
     [ method ]
     **
     * Binds given event handler with a given name to only run once then unbind itself.
     | eve.once("login", f);
     | eve("login"); // triggers f
     | eve("login"); // no listeners
     * Use @eve to trigger the listener.
     **
     > Arguments
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) same return function as @eve.on
    \*/
    eve.once = function (name, f) {
        var f2 = function () {
            eve.off(name, f2);
            return f.apply(this, arguments);
        };
        return eve.on(name, f2);
    };
    /*\
     * eve.version
     [ property (string) ]
     **
     * Current version of the library.
    \*/
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };

    return eve;
})(this);

// var eve = this.eve;

(function (glob, factory) {

    module.exports = factory(glob, eve);

    // AMD support
    // if (typeof define == "function" && define.amd) {
    //     // Define as an anonymous module
    //     define(["eve"], function (eve) {
    //         return factory(glob, eve);
    //     });
    // } else if (typeof exports != "undefined") {
    //     // Next for Node.js or CommonJS
    //     // var eve = require("eve");
    //
    //     module.exports = factory(glob, eve);
    // } else {
    //     // Browser globals (glob is window)
    //     // Snap adds itself to window
    //     factory(glob, eve);
    // }
}(window || this, function (window, eve) {

// Copyright (c) 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    var mina = (function (eve) {
        var animations = {},
            requestAnimFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    setTimeout(callback, 16, new Date().getTime());
                    return true;
                },
            requestID,
            isArray = Array.isArray || function (a) {
                return a instanceof Array ||
                    Object.prototype.toString.call(a) == "[object Array]";
            },
            idgen = 0,
            idprefix = "M" + (+new Date).toString(36),
            ID = function () {
                return idprefix + (idgen++).toString(36);
            },
            diff = function (a, b, A, B) {
                if (isArray(a)) {
                    res = [];
                    for (var i = 0, ii = a.length; i < ii; i++) {
                        res[i] = diff(a[i], b, A[i], B);
                    }
                    return res;
                }
                var dif = (A - a) / (B - b);
                return function (bb) {
                    return a + dif * (bb - b);
                };
            },
            timer = Date.now || function () {
                return +new Date;
            },
            sta = function (val) {
                var a = this;
                if (val == null) {
                    return a.s;
                }
                var ds = a.s - val;
                a.b += a.dur * ds;
                a.B += a.dur * ds;
                a.s = val;
            },
            speed = function (val) {
                var a = this;
                if (val == null) {
                    return a.spd;
                }
                a.spd = val;
            },
            duration = function (val) {
                var a = this;
                if (val == null) {
                    return a.dur;
                }
                a.s = a.s * val / a.dur;
                a.dur = val;
            },
            stopit = function () {
                var a = this;
                delete animations[a.id];
                a.update();
                eve("mina.stop." + a.id, a);
            },
            pause = function () {
                var a = this;
                if (a.pdif) {
                    return;
                }
                delete animations[a.id];
                a.update();
                a.pdif = a.get() - a.b;
            },
            resume = function () {
                var a = this;
                if (!a.pdif) {
                    return;
                }
                a.b = a.get() - a.pdif;
                delete a.pdif;
                animations[a.id] = a;
                frame();
            },
            update = function () {
                var a = this,
                    res;
                if (isArray(a.start)) {
                    res = [];
                    for (var j = 0, jj = a.start.length; j < jj; j++) {
                        res[j] = +a.start[j] +
                            (a.end[j] - a.start[j]) * a.easing(a.s);
                    }
                } else {
                    res = +a.start + (a.end - a.start) * a.easing(a.s);
                }
                a.set(res);
            },
            frame = function (timeStamp) {
                // Manual invokation?
                if (!timeStamp) {
                    // Frame loop stopped?
                    if (!requestID) {
                        // Start frame loop...
                        requestID = requestAnimFrame(frame);
                    }
                    return;
                }
                var len = 0;
                for (var i in animations) if (animations.hasOwnProperty(i)) {
                    var a = animations[i],
                        b = a.get(),
                        res;
                    len++;
                    a.s = (b - a.b) / (a.dur / a.spd);
                    if (a.s >= 1) {
                        delete animations[i];
                        a.s = 1;
                        len--;
                        (function (a) {
                            setTimeout(function () {
                                eve("mina.finish." + a.id, a);
                            });
                        }(a));
                    }
                    a.update();
                }
                requestID = len ? requestAnimFrame(frame) : false;
            },
            /*\
     * mina
     [ method ]
     **
     * Generic animation of numbers
     **
     - a (number) start _slave_ number
     - A (number) end _slave_ number
     - b (number) start _master_ number (start time in general case)
     - B (number) end _master_ number (end time in general case)
     - get (function) getter of _master_ number (see @mina.time)
     - set (function) setter of _slave_ number
     - easing (function) #optional easing function, default is @mina.linear
     = (object) animation descriptor
     o {
     o         id (string) animation id,
     o         start (number) start _slave_ number,
     o         end (number) end _slave_ number,
     o         b (number) start _master_ number,
     o         s (number) animation status (0..1),
     o         dur (number) animation duration,
     o         spd (number) animation speed,
     o         get (function) getter of _master_ number (see @mina.time),
     o         set (function) setter of _slave_ number,
     o         easing (function) easing function, default is @mina.linear,
     o         status (function) status getter/setter,
     o         speed (function) speed getter/setter,
     o         duration (function) duration getter/setter,
     o         stop (function) animation stopper
     o         pause (function) pauses the animation
     o         resume (function) resumes the animation
     o         update (function) calles setter with the right value of the animation
     o }
    \*/
            mina = function (a, A, b, B, get, set, easing) {
                var anim = {
                    id: ID(),
                    start: a,
                    end: A,
                    b: b,
                    s: 0,
                    dur: B - b,
                    spd: 1,
                    get: get,
                    set: set,
                    easing: easing || mina.linear,
                    status: sta,
                    speed: speed,
                    duration: duration,
                    stop: stopit,
                    pause: pause,
                    resume: resume,
                    update: update
                };
                animations[anim.id] = anim;
                var len = 0, i;
                for (i in animations) if (animations.hasOwnProperty(i)) {
                    len++;
                    if (len == 2) {
                        break;
                    }
                }
                len == 1 && frame();
                return anim;
            };
        /*\
     * mina.time
     [ method ]
     **
     * Returns the current time. Equivalent to:
     | function () {
     |     return (new Date).getTime();
     | }
    \*/
        mina.time = timer;
        /*\
     * mina.getById
     [ method ]
     **
     * Returns an animation by its id
     - id (string) animation's id
     = (object) See @mina
    \*/
        mina.getById = function (id) {
            return animations[id] || null;
        };

        /*\
     * mina.linear
     [ method ]
     **
     * Default linear easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.linear = function (n) {
            return n;
        };
        /*\
     * mina.easeout
     [ method ]
     **
     * Easeout easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.easeout = function (n) {
            return Math.pow(n, 1.7);
        };
        /*\
     * mina.easein
     [ method ]
     **
     * Easein easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.easein = function (n) {
            return Math.pow(n, .48);
        };
        /*\
     * mina.easeinout
     [ method ]
     **
     * Easeinout easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.easeinout = function (n) {
            if (n == 1) {
                return 1;
            }
            if (n == 0) {
                return 0;
            }
            var q = .48 - n / 1.04,
                Q = Math.sqrt(.1734 + q * q),
                x = Q - q,
                X = Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = Math.pow(Math.abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        };
        /*\
     * mina.backin
     [ method ]
     **
     * Backin easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.backin = function (n) {
            if (n == 1) {
                return 1;
            }
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        };
        /*\
     * mina.backout
     [ method ]
     **
     * Backout easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.backout = function (n) {
            if (n == 0) {
                return 0;
            }
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        };
        /*\
     * mina.elastic
     [ method ]
     **
     * Elastic easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.elastic = function (n) {
            if (n == !!n) {
                return n;
            }
            return Math.pow(2, -10 * n) * Math.sin((n - .075) *
                (2 * Math.PI) / .3) + 1;
        };
        /*\
     * mina.bounce
     [ method ]
     **
     * Bounce easing
     - n (number) input 0..1
     = (number) output 0..1
    \*/
        mina.bounce = function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < 1 / p) {
                l = s * n * n;
            } else {
                if (n < 2 / p) {
                    n -= 1.5 / p;
                    l = s * n * n + .75;
                } else {
                    if (n < 2.5 / p) {
                        n -= 2.25 / p;
                        l = s * n * n + .9375;
                    } else {
                        n -= 2.625 / p;
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        };
        window.mina = mina;
        return mina;
    })(typeof eve == "undefined" ? function () {
    } : eve);

// Copyright (c) 2013 - 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

    var Snap = (function (root) {
        Snap.version = "0.5.1";

        /*\
 * Snap
 [ method ]
 **
 * Creates a drawing surface or wraps existing SVG element.
 **
 - width (number|string) width of surface
 - height (number|string) height of surface
 * or
 - DOM (SVGElement) element to be wrapped into Snap structure
 * or
 - array (array) array of elements (will return set of elements)
 * or
 - query (string) CSS query selector
 = (object) @Element
\*/
        function Snap(w, h) {
            if (w) {
                if (w.nodeType) {
                    return wrap(w);
                }
                if (is(w, "array") && Snap.set) {
                    return Snap.set.apply(Snap, w);
                }
                if (w instanceof Element) {
                    return w;
                }
                if (h == null) {
                    // try {
                    w = glob.doc.querySelector(String(w));
                    return wrap(w);
                    // } catch (e) {
                    // return null;
                    // }
                }
            }
            w = w == null ? "100%" : w;
            h = h == null ? "100%" : h;
            return new Paper(w, h);
        }

        Snap.toString = function () {
            return "Snap v" + this.version;
        };
        Snap._ = {};
        var glob = {
            win: root.window,
            doc: root.window.document
        };
        Snap._.glob = glob;
        var has = "hasOwnProperty",
            Str = String,
            toFloat = parseFloat,
            toInt = parseInt,
            math = Math,
            mmax = math.max,
            mmin = math.min,
            abs = math.abs,
            pow = math.pow,
            PI = math.PI,
            round = math.round,
            E = "",
            S = " ",
            objectToString = Object.prototype.toString,
            ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
            colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
            bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
            separator = Snap._.separator = /[,\s]+/,
            whitespace = /[\s]/g,
            commaSpaces = /[\s]*,[\s]*/,
            hsrg = {hs: 1, rg: 1},
            pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
            tCommand = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
            pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/ig,
            idgen = 0,
            idprefix = "S" + (+new Date).toString(36),
            ID = function (el) {
                return (el && el.type ? el.type : E) + idprefix + (idgen++).toString(36);
            },
            xlink = "http://www.w3.org/1999/xlink",
            xmlns = "http://www.w3.org/2000/svg",
            hub = {},
            /*\
     * Snap.url
     [ method ]
     **
     * Wraps path into `"url('<path>')"`.
     - value (string) path
     = (string) wrapped path
    \*/
            URL = Snap.url = function (url) {
                return "url('#" + url + "')";
            };

        function $(el, attr) {
            if (attr) {
                if (el == "#text") {
                    el = glob.doc.createTextNode(attr.text || attr["#text"] || "");
                }
                if (el == "#comment") {
                    el = glob.doc.createComment(attr.text || attr["#text"] || "");
                }
                if (typeof el == "string") {
                    el = $(el);
                }
                if (typeof attr == "string") {
                    if (el.nodeType == 1) {
                        if (attr.substring(0, 6) == "xlink:") {
                            return el.getAttributeNS(xlink, attr.substring(6));
                        }
                        if (attr.substring(0, 4) == "xml:") {
                            return el.getAttributeNS(xmlns, attr.substring(4));
                        }
                        return el.getAttribute(attr);
                    } else if (attr == "text") {
                        return el.nodeValue;
                    } else {
                        return null;
                    }
                }
                if (el.nodeType == 1) {
                    for (var key in attr) if (attr[has](key)) {
                        var val = Str(attr[key]);
                        if (val) {
                            if (key.substring(0, 6) == "xlink:") {
                                el.setAttributeNS(xlink, key.substring(6), val);
                            } else if (key.substring(0, 4) == "xml:") {
                                el.setAttributeNS(xmlns, key.substring(4), val);
                            } else {
                                el.setAttribute(key, val);
                            }
                        } else {
                            el.removeAttribute(key);
                        }
                    }
                } else if ("text" in attr) {
                    el.nodeValue = attr.text;
                }
            } else {
                el = glob.doc.createElementNS(xmlns, el);
            }
            return el;
        }

        Snap._.$ = $;
        Snap._.id = ID;

        function getAttrs(el) {
            var attrs = el.attributes,
                name,
                out = {};
            for (var i = 0; i < attrs.length; i++) {
                if (attrs[i].namespaceURI == xlink) {
                    name = "xlink:";
                } else {
                    name = "";
                }
                name += attrs[i].name;
                out[name] = attrs[i].textContent;
            }
            return out;
        }

        function is(o, type) {
            type = Str.prototype.toLowerCase.call(type);
            if (type == "finite") {
                return isFinite(o);
            }
            if (type == "array" &&
                (o instanceof Array || Array.isArray && Array.isArray(o))) {
                return true;
            }
            return type == "null" && o === null ||
                type == typeof o && o !== null ||
                type == "object" && o === Object(o) ||
                objectToString.call(o).slice(8, -1).toLowerCase() == type;
        }

        /*\
 * Snap.format
 [ method ]
 **
 * Replaces construction of type `{<name>}` to the corresponding argument
 **
 - token (string) string to format
 - json (object) object which properties are used as a replacement
 = (string) formatted string
 > Usage
 | // this draws a rectangular shape equivalent to "M10,20h40v50h-40z"
 | paper.path(Snap.format("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
 |     x: 10,
 |     y: 20,
 |     dim: {
 |         width: 40,
 |         height: 50,
 |         "negative width": -40
 |     }
 | }));
\*/
        Snap.format = (function () {
            var tokenRegex = /\{([^\}]+)\}/g,
                objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
                replacer = function (all, key, obj) {
                    var res = obj;
                    key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                        name = name || quotedName;
                        if (res) {
                            if (name in res) {
                                res = res[name];
                            }
                            typeof res == "function" && isFunc && (res = res());
                        }
                    });
                    res = (res == null || res == obj ? all : res) + "";
                    return res;
                };
            return function (str, obj) {
                return Str(str).replace(tokenRegex, function (all, key) {
                    return replacer(all, key, obj);
                });
            };
        })();

        function clone(obj) {
            if (typeof obj == "function" || Object(obj) !== obj) {
                return obj;
            }
            var res = new obj.constructor;
            for (var key in obj) if (obj[has](key)) {
                res[key] = clone(obj[key]);
            }
            return res;
        }

        Snap._.clone = clone;

        function repush(array, item) {
            for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
                return array.push(array.splice(i, 1)[0]);
            }
        }

        function cacher(f, scope, postprocessor) {
            function newf() {
                var arg = Array.prototype.slice.call(arguments, 0),
                    args = arg.join("\u2400"),
                    cache = newf.cache = newf.cache || {},
                    count = newf.count = newf.count || [];
                if (cache[has](args)) {
                    repush(count, args);
                    return postprocessor ? postprocessor(cache[args]) : cache[args];
                }
                count.length >= 1e3 && delete cache[count.shift()];
                count.push(args);
                cache[args] = f.apply(scope, arg);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }

            return newf;
        }

        Snap._.cacher = cacher;

        function angle(x1, y1, x2, y2, x3, y3) {
            if (x3 == null) {
                var x = x1 - x2,
                    y = y1 - y2;
                if (!x && !y) {
                    return 0;
                }
                return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
            } else {
                return angle(x1, y1, x3, y3) - angle(x2, y2, x3, y3);
            }
        }

        function rad(deg) {
            return deg % 360 * PI / 180;
        }

        function deg(rad) {
            return rad * 180 / PI % 360;
        }

        function x_y() {
            return this.x + S + this.y;
        }

        function x_y_w_h() {
            return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
        }

        /*\
 * Snap.rad
 [ method ]
 **
 * Transform angle to radians
 - deg (number) angle in degrees
 = (number) angle in radians
\*/
        Snap.rad = rad;
        /*\
 * Snap.deg
 [ method ]
 **
 * Transform angle to degrees
 - rad (number) angle in radians
 = (number) angle in degrees
\*/
        Snap.deg = deg;
        /*\
 * Snap.sin
 [ method ]
 **
 * Equivalent to `Math.sin()` only works with degrees, not radians.
 - angle (number) angle in degrees
 = (number) sin
\*/
        Snap.sin = function (angle) {
            return math.sin(Snap.rad(angle));
        };
        /*\
 * Snap.tan
 [ method ]
 **
 * Equivalent to `Math.tan()` only works with degrees, not radians.
 - angle (number) angle in degrees
 = (number) tan
\*/
        Snap.tan = function (angle) {
            return math.tan(Snap.rad(angle));
        };
        /*\
 * Snap.cos
 [ method ]
 **
 * Equivalent to `Math.cos()` only works with degrees, not radians.
 - angle (number) angle in degrees
 = (number) cos
\*/
        Snap.cos = function (angle) {
            return math.cos(Snap.rad(angle));
        };
        /*\
 * Snap.asin
 [ method ]
 **
 * Equivalent to `Math.asin()` only works with degrees, not radians.
 - num (number) value
 = (number) asin in degrees
\*/
        Snap.asin = function (num) {
            return Snap.deg(math.asin(num));
        };
        /*\
 * Snap.acos
 [ method ]
 **
 * Equivalent to `Math.acos()` only works with degrees, not radians.
 - num (number) value
 = (number) acos in degrees
\*/
        Snap.acos = function (num) {
            return Snap.deg(math.acos(num));
        };
        /*\
 * Snap.atan
 [ method ]
 **
 * Equivalent to `Math.atan()` only works with degrees, not radians.
 - num (number) value
 = (number) atan in degrees
\*/
        Snap.atan = function (num) {
            return Snap.deg(math.atan(num));
        };
        /*\
 * Snap.atan2
 [ method ]
 **
 * Equivalent to `Math.atan2()` only works with degrees, not radians.
 - num (number) value
 = (number) atan2 in degrees
\*/
        Snap.atan2 = function (num) {
            return Snap.deg(math.atan2(num));
        };
        /*\
 * Snap.angle
 [ method ]
 **
 * Returns an angle between two or three points
 - x1 (number) x coord of first point
 - y1 (number) y coord of first point
 - x2 (number) x coord of second point
 - y2 (number) y coord of second point
 - x3 (number) #optional x coord of third point
 - y3 (number) #optional y coord of third point
 = (number) angle in degrees
\*/
        Snap.angle = angle;
        /*\
 * Snap.len
 [ method ]
 **
 * Returns distance between two points
 - x1 (number) x coord of first point
 - y1 (number) y coord of first point
 - x2 (number) x coord of second point
 - y2 (number) y coord of second point
 = (number) distance
\*/
        Snap.len = function (x1, y1, x2, y2) {
            return Math.sqrt(Snap.len2(x1, y1, x2, y2));
        };
        /*\
 * Snap.len2
 [ method ]
 **
 * Returns squared distance between two points
 - x1 (number) x coord of first point
 - y1 (number) y coord of first point
 - x2 (number) x coord of second point
 - y2 (number) y coord of second point
 = (number) distance
\*/
        Snap.len2 = function (x1, y1, x2, y2) {
            return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        };
        /*\
 * Snap.closestPoint
 [ method ]
 **
 * Returns closest point to a given one on a given path.
 - path (Element) path element
 - x (number) x coord of a point
 - y (number) y coord of a point
 = (object) in format
 {
    x (number) x coord of the point on the path
    y (number) y coord of the point on the path
    length (number) length of the path to the point
    distance (number) distance from the given point to the path
 }
\*/
// Copied from http://bl.ocks.org/mbostock/8027637
        Snap.closestPoint = function (path, x, y) {
            function distance2(p) {
                var dx = p.x - x,
                    dy = p.y - y;
                return dx * dx + dy * dy;
            }

            var pathNode = path.node,
                pathLength = pathNode.getTotalLength(),
                precision = pathLength / pathNode.pathSegList.numberOfItems * .125,
                best,
                bestLength,
                bestDistance = Infinity;

            // linear scan for coarse approximation
            for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
                if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                    best = scan;
                    bestLength = scanLength;
                    bestDistance = scanDistance;
                }
            }

            // binary search for precise estimate
            precision *= .5;
            while (precision > .5) {
                var before,
                    after,
                    beforeLength,
                    afterLength,
                    beforeDistance,
                    afterDistance;
                if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                    best = before;
                    bestLength = beforeLength;
                    bestDistance = beforeDistance;
                } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                    best = after;
                    bestLength = afterLength;
                    bestDistance = afterDistance;
                } else {
                    precision *= .5;
                }
            }

            best = {
                x: best.x,
                y: best.y,
                length: bestLength,
                distance: Math.sqrt(bestDistance)
            };
            return best;
        }
        /*\
 * Snap.is
 [ method ]
 **
 * Handy replacement for the `typeof` operator
 - o (…) any object or primitive
 - type (string) name of the type, e.g., `string`, `function`, `number`, etc.
 = (boolean) `true` if given value is of given type
\*/
        Snap.is = is;
        /*\
 * Snap.snapTo
 [ method ]
 **
 * Snaps given value to given grid
 - values (array|number) given array of values or step of the grid
 - value (number) value to adjust
 - tolerance (number) #optional maximum distance to the target value that would trigger the snap. Default is `10`.
 = (number) adjusted value
\*/
        Snap.snapTo = function (values, value, tolerance) {
            tolerance = is(tolerance, "finite") ? tolerance : 10;
            if (is(values, "array")) {
                var i = values.length;
                while (i--) if (abs(values[i] - value) <= tolerance) {
                    return values[i];
                }
            } else {
                values = +values;
                var rem = value % values;
                if (rem < tolerance) {
                    return value - rem;
                }
                if (rem > values - tolerance) {
                    return value - rem + values;
                }
            }
            return value;
        };
// Colour
        /*\
 * Snap.getRGB
 [ method ]
 **
 * Parses color string as RGB object
 - color (string) color string in one of the following formats:
 # <ul>
 #     <li>Color name (<code>red</code>, <code>green</code>, <code>cornflowerblue</code>, etc)</li>
 #     <li>#••• — shortened HTML color: (<code>#000</code>, <code>#fc0</code>, etc.)</li>
 #     <li>#•••••• — full length HTML color: (<code>#000000</code>, <code>#bd2300</code>)</li>
 #     <li>rgb(•••, •••, •••) — red, green and blue channels values: (<code>rgb(200,&nbsp;100,&nbsp;0)</code>)</li>
 #     <li>rgba(•••, •••, •••, •••) — also with opacity</li>
 #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>)</li>
 #     <li>rgba(•••%, •••%, •••%, •••%) — also with opacity</li>
 #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>)</li>
 #     <li>hsba(•••, •••, •••, •••) — also with opacity</li>
 #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
 #     <li>hsba(•••%, •••%, •••%, •••%) — also with opacity</li>
 #     <li>hsl(•••, •••, •••) — hue, saturation and luminosity values: (<code>hsb(0.5,&nbsp;0.25,&nbsp;0.5)</code>)</li>
 #     <li>hsla(•••, •••, •••, •••) — also with opacity</li>
 #     <li>hsl(•••%, •••%, •••%) — same as above, but in %</li>
 #     <li>hsla(•••%, •••%, •••%, •••%) — also with opacity</li>
 # </ul>
 * Note that `%` can be used any time: `rgb(20%, 255, 50%)`.
 = (object) RGB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••,
 o     error (boolean) true if string can't be parsed
 o }
\*/
        Snap.getRGB = cacher(function (colour) {
            if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
                return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: rgbtoString};
            }
            if (colour == "none") {
                return {r: -1, g: -1, b: -1, hex: "none", toString: rgbtoString};
            }
            !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
            if (!colour) {
                return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: rgbtoString};
            }
            var res,
                red,
                green,
                blue,
                opacity,
                t,
                values,
                rgb = colour.match(colourRegExp);
            if (rgb) {
                if (rgb[2]) {
                    blue = toInt(rgb[2].substring(5), 16);
                    green = toInt(rgb[2].substring(3, 5), 16);
                    red = toInt(rgb[2].substring(1, 3), 16);
                }
                if (rgb[3]) {
                    blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                    green = toInt((t = rgb[3].charAt(2)) + t, 16);
                    red = toInt((t = rgb[3].charAt(1)) + t, 16);
                }
                if (rgb[4]) {
                    values = rgb[4].split(commaSpaces);
                    red = toFloat(values[0]);
                    values[0].slice(-1) == "%" && (red *= 2.55);
                    green = toFloat(values[1]);
                    values[1].slice(-1) == "%" && (green *= 2.55);
                    blue = toFloat(values[2]);
                    values[2].slice(-1) == "%" && (blue *= 2.55);
                    rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                    values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                }
                if (rgb[5]) {
                    values = rgb[5].split(commaSpaces);
                    red = toFloat(values[0]);
                    values[0].slice(-1) == "%" && (red /= 100);
                    green = toFloat(values[1]);
                    values[1].slice(-1) == "%" && (green /= 100);
                    blue = toFloat(values[2]);
                    values[2].slice(-1) == "%" && (blue /= 100);
                    (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                    rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                    values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                    return Snap.hsb2rgb(red, green, blue, opacity);
                }
                if (rgb[6]) {
                    values = rgb[6].split(commaSpaces);
                    red = toFloat(values[0]);
                    values[0].slice(-1) == "%" && (red /= 100);
                    green = toFloat(values[1]);
                    values[1].slice(-1) == "%" && (green /= 100);
                    blue = toFloat(values[2]);
                    values[2].slice(-1) == "%" && (blue /= 100);
                    (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                    rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                    values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                    return Snap.hsl2rgb(red, green, blue, opacity);
                }
                red = mmin(math.round(red), 255);
                green = mmin(math.round(green), 255);
                blue = mmin(math.round(blue), 255);
                opacity = mmin(mmax(opacity, 0), 1);
                rgb = {r: red, g: green, b: blue, toString: rgbtoString};
                rgb.hex = "#" + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
                rgb.opacity = is(opacity, "finite") ? opacity : 1;
                return rgb;
            }
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: rgbtoString};
        }, Snap);
        /*\
 * Snap.hsb
 [ method ]
 **
 * Converts HSB values to a hex representation of the color
 - h (number) hue
 - s (number) saturation
 - b (number) value or brightness
 = (string) hex representation of the color
\*/
        Snap.hsb = cacher(function (h, s, b) {
            return Snap.hsb2rgb(h, s, b).hex;
        });
        /*\
 * Snap.hsl
 [ method ]
 **
 * Converts HSL values to a hex representation of the color
 - h (number) hue
 - s (number) saturation
 - l (number) luminosity
 = (string) hex representation of the color
\*/
        Snap.hsl = cacher(function (h, s, l) {
            return Snap.hsl2rgb(h, s, l).hex;
        });
        /*\
 * Snap.rgb
 [ method ]
 **
 * Converts RGB values to a hex representation of the color
 - r (number) red
 - g (number) green
 - b (number) blue
 = (string) hex representation of the color
\*/
        Snap.rgb = cacher(function (r, g, b, o) {
            if (is(o, "finite")) {
                var round = math.round;
                return "rgba(" + [round(r), round(g), round(b), +o.toFixed(2)] + ")";
            }
            return "#" + (16777216 | b | g << 8 | r << 16).toString(16).slice(1);
        });
        var toHex = function (color) {
                var i = glob.doc.getElementsByTagName("head")[0] || glob.doc.getElementsByTagName("svg")[0],
                    red = "rgb(255, 0, 0)";
                toHex = cacher(function (color) {
                    if (color.toLowerCase() == "red") {
                        return red;
                    }
                    i.style.color = red;
                    i.style.color = color;
                    var out = glob.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
                    return out == red ? null : out;
                });
                return toHex(color);
            },
            hsbtoString = function () {
                return "hsb(" + [this.h, this.s, this.b] + ")";
            },
            hsltoString = function () {
                return "hsl(" + [this.h, this.s, this.l] + ")";
            },
            rgbtoString = function () {
                return this.opacity == 1 || this.opacity == null ?
                    this.hex :
                    "rgba(" + [this.r, this.g, this.b, this.opacity] + ")";
            },
            prepareRGB = function (r, g, b) {
                if (g == null && is(r, "object") && "r" in r && "g" in r && "b" in r) {
                    b = r.b;
                    g = r.g;
                    r = r.r;
                }
                if (g == null && is(r, string)) {
                    var clr = Snap.getRGB(r);
                    r = clr.r;
                    g = clr.g;
                    b = clr.b;
                }
                if (r > 1 || g > 1 || b > 1) {
                    r /= 255;
                    g /= 255;
                    b /= 255;
                }

                return [r, g, b];
            },
            packageRGB = function (r, g, b, o) {
                r = math.round(r * 255);
                g = math.round(g * 255);
                b = math.round(b * 255);
                var rgb = {
                    r: r,
                    g: g,
                    b: b,
                    opacity: is(o, "finite") ? o : 1,
                    hex: Snap.rgb(r, g, b),
                    toString: rgbtoString
                };
                is(o, "finite") && (rgb.opacity = o);
                return rgb;
            };
        /*\
 * Snap.color
 [ method ]
 **
 * Parses the color string and returns an object featuring the color's component values
 - clr (string) color string in one of the supported formats (see @Snap.getRGB)
 = (object) Combined RGB/HSB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••,
 o     error (boolean) `true` if string can't be parsed,
 o     h (number) hue,
 o     s (number) saturation,
 o     v (number) value (brightness),
 o     l (number) lightness
 o }
\*/
        Snap.color = function (clr) {
            var rgb;
            if (is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
                rgb = Snap.hsb2rgb(clr);
                clr.r = rgb.r;
                clr.g = rgb.g;
                clr.b = rgb.b;
                clr.opacity = 1;
                clr.hex = rgb.hex;
            } else if (is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
                rgb = Snap.hsl2rgb(clr);
                clr.r = rgb.r;
                clr.g = rgb.g;
                clr.b = rgb.b;
                clr.opacity = 1;
                clr.hex = rgb.hex;
            } else {
                if (is(clr, "string")) {
                    clr = Snap.getRGB(clr);
                }
                if (is(clr, "object") && "r" in clr && "g" in clr && "b" in clr && !("error" in clr)) {
                    rgb = Snap.rgb2hsl(clr);
                    clr.h = rgb.h;
                    clr.s = rgb.s;
                    clr.l = rgb.l;
                    rgb = Snap.rgb2hsb(clr);
                    clr.v = rgb.b;
                } else {
                    clr = {hex: "none"};
                    clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
                    clr.error = 1;
                }
            }
            clr.toString = rgbtoString;
            return clr;
        };
        /*\
 * Snap.hsb2rgb
 [ method ]
 **
 * Converts HSB values to an RGB object
 - h (number) hue
 - s (number) saturation
 - v (number) value or brightness
 = (object) RGB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••
 o }
\*/
        Snap.hsb2rgb = function (h, s, v, o) {
            if (is(h, "object") && "h" in h && "s" in h && "b" in h) {
                v = h.b;
                s = h.s;
                o = h.o;
                h = h.h;
            }
            h *= 360;
            var R, G, B, X, C;
            h = h % 360 / 60;
            C = v * s;
            X = C * (1 - abs(h % 2 - 1));
            R = G = B = v - C;

            h = ~~h;
            R += [C, X, 0, 0, X, C][h];
            G += [X, C, C, X, 0, 0][h];
            B += [0, 0, X, C, C, X][h];
            return packageRGB(R, G, B, o);
        };
        /*\
 * Snap.hsl2rgb
 [ method ]
 **
 * Converts HSL values to an RGB object
 - h (number) hue
 - s (number) saturation
 - l (number) luminosity
 = (object) RGB object in the following format:
 o {
 o     r (number) red,
 o     g (number) green,
 o     b (number) blue,
 o     hex (string) color in HTML/CSS format: #••••••
 o }
\*/
        Snap.hsl2rgb = function (h, s, l, o) {
            if (is(h, "object") && "h" in h && "s" in h && "l" in h) {
                l = h.l;
                s = h.s;
                h = h.h;
            }
            if (h > 1 || s > 1 || l > 1) {
                h /= 360;
                s /= 100;
                l /= 100;
            }
            h *= 360;
            var R, G, B, X, C;
            h = h % 360 / 60;
            C = 2 * s * (l < .5 ? l : 1 - l);
            X = C * (1 - abs(h % 2 - 1));
            R = G = B = l - C / 2;

            h = ~~h;
            R += [C, X, 0, 0, X, C][h];
            G += [X, C, C, X, 0, 0][h];
            B += [0, 0, X, C, C, X][h];
            return packageRGB(R, G, B, o);
        };
        /*\
 * Snap.rgb2hsb
 [ method ]
 **
 * Converts RGB values to an HSB object
 - r (number) red
 - g (number) green
 - b (number) blue
 = (object) HSB object in the following format:
 o {
 o     h (number) hue,
 o     s (number) saturation,
 o     b (number) brightness
 o }
\*/
        Snap.rgb2hsb = function (r, g, b) {
            b = prepareRGB(r, g, b);
            r = b[0];
            g = b[1];
            b = b[2];

            var H, S, V, C;
            V = mmax(r, g, b);
            C = V - mmin(r, g, b);
            H = C == 0 ? null :
                V == r ? (g - b) / C :
                    V == g ? (b - r) / C + 2 :
                        (r - g) / C + 4;
            H = (H + 360) % 6 * 60 / 360;
            S = C == 0 ? 0 : C / V;
            return {h: H, s: S, b: V, toString: hsbtoString};
        };
        /*\
 * Snap.rgb2hsl
 [ method ]
 **
 * Converts RGB values to an HSL object
 - r (number) red
 - g (number) green
 - b (number) blue
 = (object) HSL object in the following format:
 o {
 o     h (number) hue,
 o     s (number) saturation,
 o     l (number) luminosity
 o }
\*/
        Snap.rgb2hsl = function (r, g, b) {
            b = prepareRGB(r, g, b);
            r = b[0];
            g = b[1];
            b = b[2];

            var H, S, L, M, m, C;
            M = mmax(r, g, b);
            m = mmin(r, g, b);
            C = M - m;
            H = C == 0 ? null :
                M == r ? (g - b) / C :
                    M == g ? (b - r) / C + 2 :
                        (r - g) / C + 4;
            H = (H + 360) % 6 * 60 / 360;
            L = (M + m) / 2;
            S = C == 0 ? 0 :
                L < .5 ? C / (2 * L) :
                    C / (2 - 2 * L);
            return {h: H, s: S, l: L, toString: hsltoString};
        };

// Transformations
        /*\
 * Snap.parsePathString
 [ method ]
 **
 * Utility method
 **
 * Parses given path string into an array of arrays of path segments
 - pathString (string|array) path string or array of segments (in the last case it is returned straight away)
 = (array) array of segments
\*/
        Snap.parsePathString = function (pathString) {
            if (!pathString) {
                return null;
            }
            var pth = Snap.path(pathString);
            if (pth.arr) {
                return Snap.path.clone(pth.arr);
            }

            var paramCounts = {a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0},
                data = [];
            if (is(pathString, "array") && is(pathString[0], "array")) { // rough assumption
                data = Snap.path.clone(pathString);
            }
            if (!data.length) {
                Str(pathString).replace(pathCommand, function (a, b, c) {
                    var params = [],
                        name = b.toLowerCase();
                    c.replace(pathValues, function (a, b) {
                        b && params.push(+b);
                    });
                    if (name == "m" && params.length > 2) {
                        data.push([b].concat(params.splice(0, 2)));
                        name = "l";
                        b = b == "m" ? "l" : "L";
                    }
                    if (name == "o" && params.length == 1) {
                        data.push([b, params[0]]);
                    }
                    if (name == "r") {
                        data.push([b].concat(params));
                    } else while (params.length >= paramCounts[name]) {
                        data.push([b].concat(params.splice(0, paramCounts[name])));
                        if (!paramCounts[name]) {
                            break;
                        }
                    }
                });
            }
            data.toString = Snap.path.toString;
            pth.arr = Snap.path.clone(data);
            return data;
        };
        /*\
 * Snap.parseTransformString
 [ method ]
 **
 * Utility method
 **
 * Parses given transform string into an array of transformations
 - TString (string|array) transform string or array of transformations (in the last case it is returned straight away)
 = (array) array of transformations
\*/
        var parseTransformString = Snap.parseTransformString = function (TString) {
            if (!TString) {
                return null;
            }
            var paramCounts = {r: 3, s: 4, t: 2, m: 6},
                data = [];
            if (is(TString, "array") && is(TString[0], "array")) { // rough assumption
                data = Snap.path.clone(TString);
            }
            if (!data.length) {
                Str(TString).replace(tCommand, function (a, b, c) {
                    var params = [],
                        name = b.toLowerCase();
                    c.replace(pathValues, function (a, b) {
                        b && params.push(+b);
                    });
                    data.push([b].concat(params));
                });
            }
            data.toString = Snap.path.toString;
            return data;
        };

        function svgTransform2string(tstr) {
            var res = [];
            tstr = tstr.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (all, name, params) {
                params = params.split(/\s*,\s*|\s+/);
                if (name == "rotate" && params.length == 1) {
                    params.push(0, 0);
                }
                if (name == "scale") {
                    if (params.length > 2) {
                        params = params.slice(0, 2);
                    } else if (params.length == 2) {
                        params.push(0, 0);
                    }
                    if (params.length == 1) {
                        params.push(params[0], 0, 0);
                    }
                }
                if (name == "skewX") {
                    res.push(["m", 1, 0, math.tan(rad(params[0])), 1, 0, 0]);
                } else if (name == "skewY") {
                    res.push(["m", 1, math.tan(rad(params[0])), 0, 1, 0, 0]);
                } else {
                    res.push([name.charAt(0)].concat(params));
                }
                return all;
            });
            return res;
        }

        Snap._.svgTransform2string = svgTransform2string;
        Snap._.rgTransform = /^[a-z][\s]*-?\.?\d/i;

        function transform2matrix(tstr, bbox) {
            var tdata = parseTransformString(tstr),
                m = new Snap.Matrix;
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 2) {
                        m.translate(t[1], 0);
                    } else if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || bbox;
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || bbox;
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.scale(t[1], t[1], x2, y2);
                            } else {
                                m.scale(t[1], t[1], t[2], t[3]);
                            }
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                }
            }
            return m;
        }

        Snap._.transform2matrix = transform2matrix;
        Snap._unit2px = unit2px;
        var contains = glob.doc.contains || glob.doc.compareDocumentPosition ?
            function (a, b) {
                var adown = a.nodeType == 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a == bup || !!(bup && bup.nodeType == 1 && (
                    adown.contains ?
                        adown.contains(bup) :
                        a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                ));
            } :
            function (a, b) {
                if (b) {
                    while (b) {
                        b = b.parentNode;
                        if (b == a) {
                            return true;
                        }
                    }
                }
                return false;
            };

        function getSomeDefs(el) {
            var p = el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) ||
                el.node.parentNode && wrap(el.node.parentNode) ||
                Snap.select("svg") ||
                Snap(0, 0),
                pdefs = p.select("defs"),
                defs = pdefs == null ? false : pdefs.node;
            if (!defs) {
                defs = make("defs", p.node).node;
            }
            return defs;
        }

        function getSomeSVG(el) {
            return el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) || Snap.select("svg");
        }

        Snap._.getSomeDefs = getSomeDefs;
        Snap._.getSomeSVG = getSomeSVG;

        function unit2px(el, name, value) {
            var svg = getSomeSVG(el).node,
                out = {},
                mgr = svg.querySelector(".svg---mgr");
            if (!mgr) {
                mgr = $("rect");
                $(mgr, {x: -9e9, y: -9e9, width: 10, height: 10, "class": "svg---mgr", fill: "none"});
                svg.appendChild(mgr);
            }

            function getW(val) {
                if (val == null) {
                    return E;
                }
                if (val == +val) {
                    return val;
                }
                $(mgr, {width: val});
                try {
                    return mgr.getBBox().width;
                } catch (e) {
                    return 0;
                }
            }

            function getH(val) {
                if (val == null) {
                    return E;
                }
                if (val == +val) {
                    return val;
                }
                $(mgr, {height: val});
                try {
                    return mgr.getBBox().height;
                } catch (e) {
                    return 0;
                }
            }

            function set(nam, f) {
                if (name == null) {
                    out[nam] = f(el.attr(nam) || 0);
                } else if (nam == name) {
                    out = f(value == null ? el.attr(nam) || 0 : value);
                }
            }

            switch (el.type) {
                case "rect":
                    set("rx", getW);
                    set("ry", getH);
                case "image":
                    set("width", getW);
                    set("height", getH);
                case "text":
                    set("x", getW);
                    set("y", getH);
                    break;
                case "circle":
                    set("cx", getW);
                    set("cy", getH);
                    set("r", getW);
                    break;
                case "ellipse":
                    set("cx", getW);
                    set("cy", getH);
                    set("rx", getW);
                    set("ry", getH);
                    break;
                case "line":
                    set("x1", getW);
                    set("x2", getW);
                    set("y1", getH);
                    set("y2", getH);
                    break;
                case "marker":
                    set("refX", getW);
                    set("markerWidth", getW);
                    set("refY", getH);
                    set("markerHeight", getH);
                    break;
                case "radialGradient":
                    set("fx", getW);
                    set("fy", getH);
                    break;
                case "tspan":
                    set("dx", getW);
                    set("dy", getH);
                    break;
                default:
                    set(name, getW);
            }
            svg.removeChild(mgr);
            return out;
        }

        /*\
 * Snap.select
 [ method ]
 **
 * Wraps a DOM element specified by CSS selector as @Element
 - query (string) CSS selector of the element
 = (Element) the current element
\*/
        Snap.select = function (query) {
            query = Str(query).replace(/([^\\]):/g, "$1\\:");
            return wrap(glob.doc.querySelector(query));
        };
        /*\
 * Snap.selectAll
 [ method ]
 **
 * Wraps DOM elements specified by CSS selector as set or array of @Element
 - query (string) CSS selector of the element
 = (Element) the current element
\*/
        Snap.selectAll = function (query) {
            var nodelist = glob.doc.querySelectorAll(query),
                set = (Snap.set || Array)();
            for (var i = 0; i < nodelist.length; i++) {
                set.push(wrap(nodelist[i]));
            }
            return set;
        };

        function add2group(list) {
            if (!is(list, "array")) {
                list = Array.prototype.slice.call(arguments, 0);
            }
            var i = 0,
                j = 0,
                node = this.node;
            while (this[i]) delete this[i++];
            for (i = 0; i < list.length; i++) {
                if (list[i].type == "set") {
                    list[i].forEach(function (el) {
                        node.appendChild(el.node);
                    });
                } else {
                    node.appendChild(list[i].node);
                }
            }
            var children = node.childNodes;
            for (i = 0; i < children.length; i++) {
                this[j++] = wrap(children[i]);
            }
            return this;
        }

// Hub garbage collector every 10s
        setInterval(function () {
            for (var key in hub) if (hub[has](key)) {
                var el = hub[key],
                    node = el.node;
                if (el.type != "svg" && !node.ownerSVGElement || el.type == "svg" && (!node.parentNode || "ownerSVGElement" in node.parentNode && !node.ownerSVGElement)) {
                    delete hub[key];
                }
            }
        }, 1e4);

        function Element(el) {
            if (el.snap in hub) {
                return hub[el.snap];
            }
            var svg;
            try {
                svg = el.ownerSVGElement;
            } catch (e) {
            }
            /*\
     * Element.node
     [ property (object) ]
     **
     * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
     > Usage
     | // draw a circle at coordinate 10,10 with radius of 10
     | var c = paper.circle(10, 10, 10);
     | c.node.onclick = function () {
     |     c.attr("fill", "red");
     | };
    \*/
            this.node = el;
            if (svg) {
                this.paper = new Paper(svg);
            }
            /*\
     * Element.type
     [ property (string) ]
     **
     * SVG tag name of the given element.
    \*/
            this.type = el.tagName || el.nodeName;
            var id = this.id = ID(this);
            this.anims = {};
            this._ = {
                transform: []
            };
            el.snap = id;
            hub[id] = this;
            if (this.type == "g") {
                this.add = add2group;
            }
            if (this.type in {g: 1, mask: 1, pattern: 1, symbol: 1}) {
                for (var method in Paper.prototype) if (Paper.prototype[has](method)) {
                    this[method] = Paper.prototype[method];
                }
            }
        }

        /*\
     * Element.attr
     [ method ]
     **
     * Gets or sets given attributes of the element.
     **
     - params (object) contains key-value pairs of attributes you want to set
     * or
     - param (string) name of the attribute
     = (Element) the current element
     * or
     = (string) value of attribute
     > Usage
     | el.attr({
     |     fill: "#fc0",
     |     stroke: "#000",
     |     strokeWidth: 2, // CamelCase...
     |     "fill-opacity": 0.5, // or dash-separated names
     |     width: "*=2" // prefixed values
     | });
     | console.log(el.attr("fill")); // #fc0
     * Prefixed values in format `"+=10"` supported. All four operations
     * (`+`, `-`, `*` and `/`) could be used. Optionally you can use units for `+`
     * and `-`: `"+=2em"`.
    \*/
        Element.prototype.attr = function (params, value) {
            var el = this,
                node = el.node;
            if (!params) {
                if (node.nodeType != 1) {
                    return {
                        text: node.nodeValue
                    };
                }
                var attr = node.attributes,
                    out = {};
                for (var i = 0, ii = attr.length; i < ii; i++) {
                    out[attr[i].nodeName] = attr[i].nodeValue;
                }
                return out;
            }
            if (is(params, "string")) {
                if (arguments.length > 1) {
                    var json = {};
                    json[params] = value;
                    params = json;
                } else {
                    return eve("snap.util.getattr." + params, el).firstDefined();
                }
            }
            for (var att in params) {
                if (params[has](att)) {
                    eve("snap.util.attr." + att, el, params[att]);
                }
            }
            return el;
        };
        /*\
 * Snap.parse
 [ method ]
 **
 * Parses SVG fragment and converts it into a @Fragment
 **
 - svg (string) SVG string
 = (Fragment) the @Fragment
\*/
        Snap.parse = function (svg) {
            var f = glob.doc.createDocumentFragment(),
                full = true,
                div = glob.doc.createElement("div");
            svg = Str(svg);
            if (!svg.match(/^\s*<\s*svg(?:\s|>)/)) {
                svg = "<svg>" + svg + "</svg>";
                full = false;
            }
            div.innerHTML = svg;
            svg = div.getElementsByTagName("svg")[0];
            if (svg) {
                if (full) {
                    f = svg;
                } else {
                    while (svg.firstChild) {
                        f.appendChild(svg.firstChild);
                    }
                }
            }
            return new Fragment(f);
        };

        function Fragment(frag) {
            this.node = frag;
        }

        /*\
 * Snap.fragment
 [ method ]
 **
 * Creates a DOM fragment from a given list of elements or strings
 **
 - varargs (…) SVG string
 = (Fragment) the @Fragment
\*/
        Snap.fragment = function () {
            var args = Array.prototype.slice.call(arguments, 0),
                f = glob.doc.createDocumentFragment();
            for (var i = 0, ii = args.length; i < ii; i++) {
                var item = args[i];
                if (item.node && item.node.nodeType) {
                    f.appendChild(item.node);
                }
                if (item.nodeType) {
                    f.appendChild(item);
                }
                if (typeof item == "string") {
                    f.appendChild(Snap.parse(item).node);
                }
            }
            return new Fragment(f);
        };

        function make(name, parent) {
            var res = $(name);
            parent.appendChild(res);
            var el = wrap(res);
            return el;
        }

        function Paper(w, h) {
            var res,
                desc,
                defs,
                proto = Paper.prototype;
            if (w && w.tagName && w.tagName.toLowerCase() == "svg") {
                if (w.snap in hub) {
                    return hub[w.snap];
                }
                var doc = w.ownerDocument;
                res = new Element(w);
                desc = w.getElementsByTagName("desc")[0];
                defs = w.getElementsByTagName("defs")[0];
                if (!desc) {
                    desc = $("desc");
                    desc.appendChild(doc.createTextNode("Created with Snap"));
                    res.node.appendChild(desc);
                }
                if (!defs) {
                    defs = $("defs");
                    res.node.appendChild(defs);
                }
                res.defs = defs;
                for (var key in proto) if (proto[has](key)) {
                    res[key] = proto[key];
                }
                res.paper = res.root = res;
            } else {
                res = make("svg", glob.doc.body);
                $(res.node, {
                    height: h,
                    version: 1.1,
                    width: w,
                    xmlns: xmlns
                });
            }
            return res;
        }

        function wrap(dom) {
            if (!dom) {
                return dom;
            }
            if (dom instanceof Element || dom instanceof Fragment) {
                return dom;
            }
            if (dom.tagName && dom.tagName.toLowerCase() == "svg") {
                return new Paper(dom);
            }
            if (dom.tagName && dom.tagName.toLowerCase() == "object" && dom.type == "image/svg+xml") {
                return new Paper(dom.contentDocument.getElementsByTagName("svg")[0]);
            }
            return new Element(dom);
        }

        Snap._.make = make;
        Snap._.wrap = wrap;
        /*\
 * Paper.el
 [ method ]
 **
 * Creates an element on paper with a given name and no attributes
 **
 - name (string) tag name
 - attr (object) attributes
 = (Element) the current element
 > Usage
 | var c = paper.circle(10, 10, 10); // is the same as...
 | var c = paper.el("circle").attr({
 |     cx: 10,
 |     cy: 10,
 |     r: 10
 | });
 | // and the same as
 | var c = paper.el("circle", {
 |     cx: 10,
 |     cy: 10,
 |     r: 10
 | });
\*/
        Paper.prototype.el = function (name, attr) {
            var el = make(name, this.node);
            attr && el.attr(attr);
            return el;
        };
        /*\
 * Element.children
 [ method ]
 **
 * Returns array of all the children of the element.
 = (array) array of Elements
\*/
        Element.prototype.children = function () {
            var out = [],
                ch = this.node.childNodes;
            for (var i = 0, ii = ch.length; i < ii; i++) {
                out[i] = Snap(ch[i]);
            }
            return out;
        };

        function jsonFiller(root, o) {
            for (var i = 0, ii = root.length; i < ii; i++) {
                var item = {
                        type: root[i].type,
                        attr: root[i].attr()
                    },
                    children = root[i].children();
                o.push(item);
                if (children.length) {
                    jsonFiller(children, item.childNodes = []);
                }
            }
        }

        /*\
 * Element.toJSON
 [ method ]
 **
 * Returns object representation of the given element and all its children.
 = (object) in format
 o {
 o     type (string) this.type,
 o     attr (object) attributes map,
 o     childNodes (array) optional array of children in the same format
 o }
\*/
        Element.prototype.toJSON = function () {
            var out = [];
            jsonFiller([this], out);
            return out[0];
        };
// default
        eve.on("snap.util.getattr", function () {
            var att = eve.nt();
            att = att.substring(att.lastIndexOf(".") + 1);
            var css = att.replace(/[A-Z]/g, function (letter) {
                return "-" + letter.toLowerCase();
            });
            if (cssAttr[has](css)) {
                return this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(css);
            } else {
                return $(this.node, att);
            }
        });
        var cssAttr = {
            "alignment-baseline": 0,
            "baseline-shift": 0,
            "clip": 0,
            "clip-path": 0,
            "clip-rule": 0,
            "color": 0,
            "color-interpolation": 0,
            "color-interpolation-filters": 0,
            "color-profile": 0,
            "color-rendering": 0,
            "cursor": 0,
            "direction": 0,
            "display": 0,
            "dominant-baseline": 0,
            "enable-background": 0,
            "fill": 0,
            "fill-opacity": 0,
            "fill-rule": 0,
            "filter": 0,
            "flood-color": 0,
            "flood-opacity": 0,
            "font": 0,
            "font-family": 0,
            "font-size": 0,
            "font-size-adjust": 0,
            "font-stretch": 0,
            "font-style": 0,
            "font-variant": 0,
            "font-weight": 0,
            "glyph-orientation-horizontal": 0,
            "glyph-orientation-vertical": 0,
            "image-rendering": 0,
            "kerning": 0,
            "letter-spacing": 0,
            "lighting-color": 0,
            "marker": 0,
            "marker-end": 0,
            "marker-mid": 0,
            "marker-start": 0,
            "mask": 0,
            "opacity": 0,
            "overflow": 0,
            "pointer-events": 0,
            "shape-rendering": 0,
            "stop-color": 0,
            "stop-opacity": 0,
            "stroke": 0,
            "stroke-dasharray": 0,
            "stroke-dashoffset": 0,
            "stroke-linecap": 0,
            "stroke-linejoin": 0,
            "stroke-miterlimit": 0,
            "stroke-opacity": 0,
            "stroke-width": 0,
            "text-anchor": 0,
            "text-decoration": 0,
            "text-rendering": 0,
            "unicode-bidi": 0,
            "visibility": 0,
            "word-spacing": 0,
            "writing-mode": 0
        };

        eve.on("snap.util.attr", function (value) {
            var att = eve.nt(),
                attr = {};
            att = att.substring(att.lastIndexOf(".") + 1);
            attr[att] = value;
            var style = att.replace(/-(\w)/gi, function (all, letter) {
                    return letter.toUpperCase();
                }),
                css = att.replace(/[A-Z]/g, function (letter) {
                    return "-" + letter.toLowerCase();
                });
            if (cssAttr[has](css)) {
                this.node.style[style] = value == null ? E : value;
            } else {
                $(this.node, attr);
            }
        });
        (function (proto) {
        }(Paper.prototype));

// simple ajax
        /*\
 * Snap.ajax
 [ method ]
 **
 * Simple implementation of Ajax
 **
 - url (string) URL
 - postData (object|string) data for post request
 - callback (function) callback
 - scope (object) #optional scope of callback
 * or
 - url (string) URL
 - callback (function) callback
 - scope (object) #optional scope of callback
 = (XMLHttpRequest) the XMLHttpRequest object, just in case
\*/
        Snap.ajax = function (url, postData, callback, scope) {
            var req = new XMLHttpRequest,
                id = ID();
            if (req) {
                if (is(postData, "function")) {
                    scope = callback;
                    callback = postData;
                    postData = null;
                } else if (is(postData, "object")) {
                    var pd = [];
                    for (var key in postData) if (postData.hasOwnProperty(key)) {
                        pd.push(encodeURIComponent(key) + "=" + encodeURIComponent(postData[key]));
                    }
                    postData = pd.join("&");
                }
                req.open(postData ? "POST" : "GET", url, true);
                if (postData) {
                    req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
                if (callback) {
                    eve.once("snap.ajax." + id + ".0", callback);
                    eve.once("snap.ajax." + id + ".200", callback);
                    eve.once("snap.ajax." + id + ".304", callback);
                }
                req.onreadystatechange = function () {
                    if (req.readyState != 4) return;
                    eve("snap.ajax." + id + "." + req.status, scope, req);
                };
                if (req.readyState == 4) {
                    return req;
                }
                req.send(postData);
                return req;
            }
        };
        /*\
 * Snap.load
 [ method ]
 **
 * Loads external SVG file as a @Fragment (see @Snap.ajax for more advanced AJAX)
 **
 - url (string) URL
 - callback (function) callback
 - scope (object) #optional scope of callback
\*/
        Snap.load = function (url, callback, scope) {
            Snap.ajax(url, function (req) {
                var f = Snap.parse(req.responseText);
                scope ? callback.call(scope, f) : callback(f);
            });
        };
        var getOffset = function (elem) {
            var box = elem.getBoundingClientRect(),
                doc = elem.ownerDocument,
                body = doc.body,
                docElem = doc.documentElement,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
                left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
            return {
                y: top,
                x: left
            };
        };
        /*\
 * Snap.getElementByPoint
 [ method ]
 **
 * Returns you topmost element under given point.
 **
 = (object) Snap element object
 - x (number) x coordinate from the top left corner of the window
 - y (number) y coordinate from the top left corner of the window
 > Usage
 | Snap.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
\*/
        Snap.getElementByPoint = function (x, y) {
            var paper = this,
                svg = paper.canvas,
                target = glob.doc.elementFromPoint(x, y);
            if (glob.win.opera && target.tagName == "svg") {
                var so = getOffset(target),
                    sr = target.createSVGRect();
                sr.x = x - so.x;
                sr.y = y - so.y;
                sr.width = sr.height = 1;
                var hits = target.getIntersectionList(sr, null);
                if (hits.length) {
                    target = hits[hits.length - 1];
                }
            }
            if (!target) {
                return null;
            }
            return wrap(target);
        };
        /*\
 * Snap.plugin
 [ method ]
 **
 * Let you write plugins. You pass in a function with five arguments, like this:
 | Snap.plugin(function (Snap, Element, Paper, global, Fragment) {
 |     Snap.newmethod = function () {};
 |     Element.prototype.newmethod = function () {};
 |     Paper.prototype.newmethod = function () {};
 | });
 * Inside the function you have access to all main objects (and their
 * prototypes). This allow you to extend anything you want.
 **
 - f (function) your plugin body
\*/
        Snap.plugin = function (f) {
            f(Snap, Element, Paper, glob, Fragment);
        };
        glob.win.Snap = Snap;
        return Snap;
    }(window || this));

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var elproto = Element.prototype,
            is = Snap.is,
            Str = String,
            unit2px = Snap._unit2px,
            $ = Snap._.$,
            make = Snap._.make,
            getSomeDefs = Snap._.getSomeDefs,
            has = "hasOwnProperty",
            wrap = Snap._.wrap;
        /*\
     * Element.getBBox
     [ method ]
     **
     * Returns the bounding box descriptor for the given element
     **
     = (object) bounding box descriptor:
     o {
     o     cx: (number) x of the center,
     o     cy: (number) x of the center,
     o     h: (number) height,
     o     height: (number) height,
     o     path: (string) path command for the box,
     o     r0: (number) radius of a circle that fully encloses the box,
     o     r1: (number) radius of the smallest circle that can be enclosed,
     o     r2: (number) radius of the largest circle that can be enclosed,
     o     vb: (string) box as a viewbox command,
     o     w: (number) width,
     o     width: (number) width,
     o     x2: (number) x of the right side,
     o     x: (number) x of the left side,
     o     y2: (number) y of the bottom edge,
     o     y: (number) y of the top edge
     o }
    \*/
        elproto.getBBox = function (isWithoutTransform) {
            if (this.type == "tspan") {
                return Snap._.box(this.node.getClientRects().item(0));
            }
            if (!Snap.Matrix || !Snap.path) {
                return this.node.getBBox();
            }
            var el = this,
                m = new Snap.Matrix;
            if (el.removed) {
                return Snap._.box();
            }
            while (el.type == "use") {
                if (!isWithoutTransform) {
                    m = m.add(el.transform().localMatrix.translate(el.attr("x") || 0, el.attr("y") || 0));
                }
                if (el.original) {
                    el = el.original;
                } else {
                    var href = el.attr("xlink:href");
                    el = el.original = el.node.ownerDocument.getElementById(href.substring(href.indexOf("#") + 1));
                }
            }
            var _ = el._,
                pathfinder = Snap.path.get[el.type] || Snap.path.get.deflt;
            try {
                if (isWithoutTransform) {
                    _.bboxwt = pathfinder ? Snap.path.getBBox(el.realPath = pathfinder(el)) : Snap._.box(el.node.getBBox());
                    return Snap._.box(_.bboxwt);
                } else {
                    el.realPath = pathfinder(el);
                    el.matrix = el.transform().localMatrix;
                    _.bbox = Snap.path.getBBox(Snap.path.map(el.realPath, m.add(el.matrix)));
                    return Snap._.box(_.bbox);
                }
            } catch (e) {
                // Firefox doesn’t give you bbox of hidden element
                return Snap._.box();
            }
        };
        var propString = function () {
            return this.string;
        };

        function extractTransform(el, tstr) {
            if (tstr == null) {
                var doReturn = true;
                if (el.type == "linearGradient" || el.type == "radialGradient") {
                    tstr = el.node.getAttribute("gradientTransform");
                } else if (el.type == "pattern") {
                    tstr = el.node.getAttribute("patternTransform");
                } else {
                    tstr = el.node.getAttribute("transform");
                }
                if (!tstr) {
                    return new Snap.Matrix;
                }
                tstr = Snap._.svgTransform2string(tstr);
            } else {
                if (!Snap._.rgTransform.test(tstr)) {
                    tstr = Snap._.svgTransform2string(tstr);
                } else {
                    tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || "");
                }
                if (is(tstr, "array")) {
                    tstr = Snap.path ? Snap.path.toString.call(tstr) : Str(tstr);
                }
                el._.transform = tstr;
            }
            var m = Snap._.transform2matrix(tstr, el.getBBox(1));
            if (doReturn) {
                return m;
            } else {
                el.matrix = m;
            }
        }

        /*\
     * Element.transform
     [ method ]
     **
     * Gets or sets transformation of the element
     **
     - tstr (string) transform string in Snap or SVG format
     = (Element) the current element
     * or
     = (object) transformation descriptor:
     o {
     o     string (string) transform string,
     o     globalMatrix (Matrix) matrix of all transformations applied to element or its parents,
     o     localMatrix (Matrix) matrix of transformations applied only to the element,
     o     diffMatrix (Matrix) matrix of difference between global and local transformations,
     o     global (string) global transformation as string,
     o     local (string) local transformation as string,
     o     toString (function) returns `string` property
     o }
    \*/
        elproto.transform = function (tstr) {
            var _ = this._;
            if (tstr == null) {
                var papa = this,
                    global = new Snap.Matrix(this.node.getCTM()),
                    local = extractTransform(this),
                    ms = [local],
                    m = new Snap.Matrix,
                    i,
                    localString = local.toTransformString(),
                    string = Str(local) == Str(this.matrix) ?
                        Str(_.transform) : localString;
                while (papa.type != "svg" && (papa = papa.parent())) {
                    ms.push(extractTransform(papa));
                }
                i = ms.length;
                while (i--) {
                    m.add(ms[i]);
                }
                return {
                    string: string,
                    globalMatrix: global,
                    totalMatrix: m,
                    localMatrix: local,
                    diffMatrix: global.clone().add(local.invert()),
                    global: global.toTransformString(),
                    total: m.toTransformString(),
                    local: localString,
                    toString: propString
                };
            }
            if (tstr instanceof Snap.Matrix) {
                this.matrix = tstr;
                this._.transform = tstr.toTransformString();
            } else {
                extractTransform(this, tstr);
            }

            if (this.node) {
                if (this.type == "linearGradient" || this.type == "radialGradient") {
                    $(this.node, {gradientTransform: this.matrix});
                } else if (this.type == "pattern") {
                    $(this.node, {patternTransform: this.matrix});
                } else {
                    $(this.node, {transform: this.matrix});
                }
            }

            return this;
        };
        /*\
     * Element.parent
     [ method ]
     **
     * Returns the element's parent
     **
     = (Element) the parent element
    \*/
        elproto.parent = function () {
            return wrap(this.node.parentNode);
        };
        /*\
     * Element.append
     [ method ]
     **
     * Appends the given element to current one
     **
     - el (Element|Set) element to append
     = (Element) the parent element
    \*/
        /*\
     * Element.add
     [ method ]
     **
     * See @Element.append
    \*/
        elproto.append = elproto.add = function (el) {
            if (el) {
                if (el.type == "set") {
                    var it = this;
                    el.forEach(function (el) {
                        it.add(el);
                    });
                    return this;
                }
                el = wrap(el);
                this.node.appendChild(el.node);
                el.paper = this.paper;
            }
            return this;
        };
        /*\
     * Element.appendTo
     [ method ]
     **
     * Appends the current element to the given one
     **
     - el (Element) parent element to append to
     = (Element) the child element
    \*/
        elproto.appendTo = function (el) {
            if (el) {
                el = wrap(el);
                el.append(this);
            }
            return this;
        };
        /*\
     * Element.prepend
     [ method ]
     **
     * Prepends the given element to the current one
     **
     - el (Element) element to prepend
     = (Element) the parent element
    \*/
        elproto.prepend = function (el) {
            if (el) {
                if (el.type == "set") {
                    var it = this,
                        first;
                    el.forEach(function (el) {
                        if (first) {
                            first.after(el);
                        } else {
                            it.prepend(el);
                        }
                        first = el;
                    });
                    return this;
                }
                el = wrap(el);
                var parent = el.parent();
                this.node.insertBefore(el.node, this.node.firstChild);
                this.add && this.add();
                el.paper = this.paper;
                this.parent() && this.parent().add();
                parent && parent.add();
            }
            return this;
        };
        /*\
     * Element.prependTo
     [ method ]
     **
     * Prepends the current element to the given one
     **
     - el (Element) parent element to prepend to
     = (Element) the child element
    \*/
        elproto.prependTo = function (el) {
            el = wrap(el);
            el.prepend(this);
            return this;
        };
        /*\
     * Element.before
     [ method ]
     **
     * Inserts given element before the current one
     **
     - el (Element) element to insert
     = (Element) the parent element
    \*/
        elproto.before = function (el) {
            if (el.type == "set") {
                var it = this;
                el.forEach(function (el) {
                    var parent = el.parent();
                    it.node.parentNode.insertBefore(el.node, it.node);
                    parent && parent.add();
                });
                this.parent().add();
                return this;
            }
            el = wrap(el);
            var parent = el.parent();
            this.node.parentNode.insertBefore(el.node, this.node);
            this.parent() && this.parent().add();
            parent && parent.add();
            el.paper = this.paper;
            return this;
        };
        /*\
     * Element.after
     [ method ]
     **
     * Inserts given element after the current one
     **
     - el (Element) element to insert
     = (Element) the parent element
    \*/
        elproto.after = function (el) {
            el = wrap(el);
            var parent = el.parent();
            if (this.node.nextSibling) {
                this.node.parentNode.insertBefore(el.node, this.node.nextSibling);
            } else {
                this.node.parentNode.appendChild(el.node);
            }
            this.parent() && this.parent().add();
            parent && parent.add();
            el.paper = this.paper;
            return this;
        };
        /*\
     * Element.insertBefore
     [ method ]
     **
     * Inserts the element after the given one
     **
     - el (Element) element next to whom insert to
     = (Element) the parent element
    \*/
        elproto.insertBefore = function (el) {
            el = wrap(el);
            var parent = this.parent();
            el.node.parentNode.insertBefore(this.node, el.node);
            this.paper = el.paper;
            parent && parent.add();
            el.parent() && el.parent().add();
            return this;
        };
        /*\
     * Element.insertAfter
     [ method ]
     **
     * Inserts the element after the given one
     **
     - el (Element) element next to whom insert to
     = (Element) the parent element
    \*/
        elproto.insertAfter = function (el) {
            el = wrap(el);
            var parent = this.parent();
            el.node.parentNode.insertBefore(this.node, el.node.nextSibling);
            this.paper = el.paper;
            parent && parent.add();
            el.parent() && el.parent().add();
            return this;
        };
        /*\
     * Element.remove
     [ method ]
     **
     * Removes element from the DOM
     = (Element) the detached element
    \*/
        elproto.remove = function () {
            var parent = this.parent();
            this.node.parentNode && this.node.parentNode.removeChild(this.node);
            delete this.paper;
            this.removed = true;
            parent && parent.add();
            return this;
        };
        /*\
     * Element.select
     [ method ]
     **
     * Gathers the nested @Element matching the given set of CSS selectors
     **
     - query (string) CSS selector
     = (Element) result of query selection
    \*/
        elproto.select = function (query) {
            return wrap(this.node.querySelector(query));
        };
        /*\
     * Element.selectAll
     [ method ]
     **
     * Gathers nested @Element objects matching the given set of CSS selectors
     **
     - query (string) CSS selector
     = (Set|array) result of query selection
    \*/
        elproto.selectAll = function (query) {
            var nodelist = this.node.querySelectorAll(query),
                set = (Snap.set || Array)();
            for (var i = 0; i < nodelist.length; i++) {
                set.push(wrap(nodelist[i]));
            }
            return set;
        };
        /*\
     * Element.asPX
     [ method ]
     **
     * Returns given attribute of the element as a `px` value (not %, em, etc.)
     **
     - attr (string) attribute name
     - value (string) #optional attribute value
     = (Element) result of query selection
    \*/
        elproto.asPX = function (attr, value) {
            if (value == null) {
                value = this.attr(attr);
            }
            return +unit2px(this, attr, value);
        };
        // SIERRA Element.use(): I suggest adding a note about how to access the original element the returned <use> instantiates. It's a part of SVG with which ordinary web developers may be least familiar.
        /*\
     * Element.use
     [ method ]
     **
     * Creates a `<use>` element linked to the current element
     **
     = (Element) the `<use>` element
    \*/
        elproto.use = function () {
            var use,
                id = this.node.id;
            if (!id) {
                id = this.id;
                $(this.node, {
                    id: id
                });
            }
            if (this.type == "linearGradient" || this.type == "radialGradient" ||
                this.type == "pattern") {
                use = make(this.type, this.node.parentNode);
            } else {
                use = make("use", this.node.parentNode);
            }
            $(use.node, {
                "xlink:href": "#" + id
            });
            use.original = this;
            return use;
        };

        function fixids(el) {
            var els = el.selectAll("*"),
                it,
                url = /^\s*url\(("|'|)(.*)\1\)\s*$/,
                ids = [],
                uses = {};

            function urltest(it, name) {
                var val = $(it.node, name);
                val = val && val.match(url);
                val = val && val[2];
                if (val && val.charAt() == "#") {
                    val = val.substring(1);
                } else {
                    return;
                }
                if (val) {
                    uses[val] = (uses[val] || []).concat(function (id) {
                        var attr = {};
                        attr[name] = Snap.url(id);
                        $(it.node, attr);
                    });
                }
            }

            function linktest(it) {
                var val = $(it.node, "xlink:href");
                if (val && val.charAt() == "#") {
                    val = val.substring(1);
                } else {
                    return;
                }
                if (val) {
                    uses[val] = (uses[val] || []).concat(function (id) {
                        it.attr("xlink:href", "#" + id);
                    });
                }
            }

            for (var i = 0, ii = els.length; i < ii; i++) {
                it = els[i];
                urltest(it, "fill");
                urltest(it, "stroke");
                urltest(it, "filter");
                urltest(it, "mask");
                urltest(it, "clip-path");
                linktest(it);
                var oldid = $(it.node, "id");
                if (oldid) {
                    $(it.node, {id: it.id});
                    ids.push({
                        old: oldid,
                        id: it.id
                    });
                }
            }
            for (i = 0, ii = ids.length; i < ii; i++) {
                var fs = uses[ids[i].old];
                if (fs) {
                    for (var j = 0, jj = fs.length; j < jj; j++) {
                        fs[j](ids[i].id);
                    }
                }
            }
        }

        /*\
     * Element.clone
     [ method ]
     **
     * Creates a clone of the element and inserts it after the element
     **
     = (Element) the clone
    \*/
        elproto.clone = function () {
            var clone = wrap(this.node.cloneNode(true));
            if ($(clone.node, "id")) {
                $(clone.node, {id: clone.id});
            }
            fixids(clone);
            clone.insertAfter(this);
            return clone;
        };
        /*\
     * Element.toDefs
     [ method ]
     **
     * Moves element to the shared `<defs>` area
     **
     = (Element) the element
    \*/
        elproto.toDefs = function () {
            var defs = getSomeDefs(this);
            defs.appendChild(this.node);
            return this;
        };
        /*\
     * Element.toPattern
     [ method ]
     **
     * Creates a `<pattern>` element from the current element
     **
     * To create a pattern you have to specify the pattern rect:
     - x (string|number)
     - y (string|number)
     - width (string|number)
     - height (string|number)
     = (Element) the `<pattern>` element
     * You can use pattern later on as an argument for `fill` attribute:
     | var p = paper.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
     |         fill: "none",
     |         stroke: "#bada55",
     |         strokeWidth: 5
     |     }).pattern(0, 0, 10, 10),
     |     c = paper.circle(200, 200, 100);
     | c.attr({
     |     fill: p
     | });
    \*/
        elproto.pattern = elproto.toPattern = function (x, y, width, height) {
            var p = make("pattern", getSomeDefs(this));
            if (x == null) {
                x = this.getBBox();
            }
            if (is(x, "object") && "x" in x) {
                y = x.y;
                width = x.width;
                height = x.height;
                x = x.x;
            }
            $(p.node, {
                x: x,
                y: y,
                width: width,
                height: height,
                patternUnits: "userSpaceOnUse",
                id: p.id,
                viewBox: [x, y, width, height].join(" ")
            });
            p.node.appendChild(this.node);
            return p;
        };
// SIERRA Element.marker(): clarify what a reference point is. E.g., helps you offset the object from its edge such as when centering it over a path.
// SIERRA Element.marker(): I suggest the method should accept default reference point values.  Perhaps centered with (refX = width/2) and (refY = height/2)? Also, couldn't it assume the element's current _width_ and _height_? And please specify what _x_ and _y_ mean: offsets? If so, from where?  Couldn't they also be assigned default values?
        /*\
     * Element.marker
     [ method ]
     **
     * Creates a `<marker>` element from the current element
     **
     * To create a marker you have to specify the bounding rect and reference point:
     - x (number)
     - y (number)
     - width (number)
     - height (number)
     - refX (number)
     - refY (number)
     = (Element) the `<marker>` element
     * You can specify the marker later as an argument for `marker-start`, `marker-end`, `marker-mid`, and `marker` attributes. The `marker` attribute places the marker at every point along the path, and `marker-mid` places them at every point except the start and end.
    \*/
        // TODO add usage for markers
        elproto.marker = function (x, y, width, height, refX, refY) {
            var p = make("marker", getSomeDefs(this));
            if (x == null) {
                x = this.getBBox();
            }
            if (is(x, "object") && "x" in x) {
                y = x.y;
                width = x.width;
                height = x.height;
                refX = x.refX || x.cx;
                refY = x.refY || x.cy;
                x = x.x;
            }
            $(p.node, {
                viewBox: [x, y, width, height].join(" "),
                markerWidth: width,
                markerHeight: height,
                orient: "auto",
                refX: refX || 0,
                refY: refY || 0,
                id: p.id
            });
            p.node.appendChild(this.node);
            return p;
        };
        var eldata = {};
        /*\
     * Element.data
     [ method ]
     **
     * Adds or retrieves given value associated with given key. (Don’t confuse
     * with `data-` attributes)
     *
     * See also @Element.removeData
     - key (string) key to store data
     - value (any) #optional value to store
     = (object) @Element
     * or, if value is not specified:
     = (any) value
     > Usage
     | for (var i = 0, i < 5, i++) {
     |     paper.circle(10 + 15 * i, 10, 10)
     |          .attr({fill: "#000"})
     |          .data("i", i)
     |          .click(function () {
     |             alert(this.data("i"));
     |          });
     | }
    \*/
        elproto.data = function (key, value) {
            var data = eldata[this.id] = eldata[this.id] || {};
            if (arguments.length == 0) {
                eve("snap.data.get." + this.id, this, data, null);
                return data;
            }
            if (arguments.length == 1) {
                if (Snap.is(key, "object")) {
                    for (var i in key) if (key[has](i)) {
                        this.data(i, key[i]);
                    }
                    return this;
                }
                eve("snap.data.get." + this.id, this, data[key], key);
                return data[key];
            }
            data[key] = value;
            eve("snap.data.set." + this.id, this, value, key);
            return this;
        };
        /*\
     * Element.removeData
     [ method ]
     **
     * Removes value associated with an element by given key.
     * If key is not provided, removes all the data of the element.
     - key (string) #optional key
     = (object) @Element
    \*/
        elproto.removeData = function (key) {
            if (key == null) {
                eldata[this.id] = {};
            } else {
                eldata[this.id] && delete eldata[this.id][key];
            }
            return this;
        };
        /*\
     * Element.outerSVG
     [ method ]
     **
     * Returns SVG code for the element, equivalent to HTML's `outerHTML`.
     *
     * See also @Element.innerSVG
     = (string) SVG code for the element
    \*/
        /*\
     * Element.toString
     [ method ]
     **
     * See @Element.outerSVG
    \*/
        elproto.outerSVG = elproto.toString = toString(1);
        /*\
     * Element.innerSVG
     [ method ]
     **
     * Returns SVG code for the element's contents, equivalent to HTML's `innerHTML`
     = (string) SVG code for the element
    \*/
        elproto.innerSVG = toString();

        function toString(type) {
            return function () {
                var res = type ? "<" + this.type : "",
                    attr = this.node.attributes,
                    chld = this.node.childNodes;
                if (type) {
                    for (var i = 0, ii = attr.length; i < ii; i++) {
                        res += " " + attr[i].name + '="' +
                            attr[i].value.replace(/"/g, '\\"') + '"';
                    }
                }
                if (chld.length) {
                    type && (res += ">");
                    for (i = 0, ii = chld.length; i < ii; i++) {
                        if (chld[i].nodeType == 3) {
                            res += chld[i].nodeValue;
                        } else if (chld[i].nodeType == 1) {
                            res += wrap(chld[i]).toString();
                        }
                    }
                    type && (res += "</" + this.type + ">");
                } else {
                    type && (res += "/>");
                }
                return res;
            };
        }

        elproto.toDataURL = function () {
            if (window && window.btoa) {
                var bb = this.getBBox(),
                    svg = Snap.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                        x: +bb.x.toFixed(3),
                        y: +bb.y.toFixed(3),
                        width: +bb.width.toFixed(3),
                        height: +bb.height.toFixed(3),
                        contents: this.outerSVG()
                    });
                return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
            }
        };
        /*\
     * Fragment.select
     [ method ]
     **
     * See @Element.select
    \*/
        Fragment.prototype.select = elproto.select;
        /*\
     * Fragment.selectAll
     [ method ]
     **
     * See @Element.selectAll
    \*/
        Fragment.prototype.selectAll = elproto.selectAll;
    });

// Copyright (c) 2016 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var elproto = Element.prototype,
            is = Snap.is,
            Str = String,
            has = "hasOwnProperty";

        function slice(from, to, f) {
            return function (arr) {
                var res = arr.slice(from, to);
                if (res.length == 1) {
                    res = res[0];
                }
                return f ? f(res) : res;
            };
        }

        var Animation = function (attr, ms, easing, callback) {
            if (typeof easing == "function" && !easing.length) {
                callback = easing;
                easing = mina.linear;
            }
            this.attr = attr;
            this.dur = ms;
            easing && (this.easing = easing);
            callback && (this.callback = callback);
        };
        Snap._.Animation = Animation;
        /*\
     * Snap.animation
     [ method ]
     **
     * Creates an animation object
     **
     - attr (object) attributes of final destination
     - duration (number) duration of the animation, in milliseconds
     - easing (function) #optional one of easing functions of @mina or custom one
     - callback (function) #optional callback function that fires when animation ends
     = (object) animation object
    \*/
        Snap.animation = function (attr, ms, easing, callback) {
            return new Animation(attr, ms, easing, callback);
        };
        /*\
     * Element.inAnim
     [ method ]
     **
     * Returns a set of animations that may be able to manipulate the current element
     **
     = (object) in format:
     o {
     o     anim (object) animation object,
     o     mina (object) @mina object,
     o     curStatus (number) 0..1 — status of the animation: 0 — just started, 1 — just finished,
     o     status (function) gets or sets the status of the animation,
     o     stop (function) stops the animation
     o }
    \*/
        elproto.inAnim = function () {
            var el = this,
                res = [];
            for (var id in el.anims) if (el.anims[has](id)) {
                (function (a) {
                    res.push({
                        anim: new Animation(a._attrs, a.dur, a.easing, a._callback),
                        mina: a,
                        curStatus: a.status(),
                        status: function (val) {
                            return a.status(val);
                        },
                        stop: function () {
                            a.stop();
                        }
                    });
                }(el.anims[id]));
            }
            return res;
        };
        /*\
     * Snap.animate
     [ method ]
     **
     * Runs generic animation of one number into another with a caring function
     **
     - from (number|array) number or array of numbers
     - to (number|array) number or array of numbers
     - setter (function) caring function that accepts one number argument
     - duration (number) duration, in milliseconds
     - easing (function) #optional easing function from @mina or custom
     - callback (function) #optional callback function to execute when animation ends
     = (object) animation object in @mina format
     o {
     o     id (string) animation id, consider it read-only,
     o     duration (function) gets or sets the duration of the animation,
     o     easing (function) easing,
     o     speed (function) gets or sets the speed of the animation,
     o     status (function) gets or sets the status of the animation,
     o     stop (function) stops the animation
     o }
     | var rect = Snap().rect(0, 0, 10, 10);
     | Snap.animate(0, 10, function (val) {
     |     rect.attr({
     |         x: val
     |     });
     | }, 1000);
     | // in given context is equivalent to
     | rect.animate({x: 10}, 1000);
    \*/
        Snap.animate = function (from, to, setter, ms, easing, callback) {
            if (typeof easing == "function" && !easing.length) {
                callback = easing;
                easing = mina.linear;
            }
            var now = mina.time(),
                anim = mina(from, to, now, now + ms, mina.time, setter, easing);
            callback && eve.once("mina.finish." + anim.id, callback);
            return anim;
        };
        /*\
     * Element.stop
     [ method ]
     **
     * Stops all the animations for the current element
     **
     = (Element) the current element
    \*/
        elproto.stop = function () {
            var anims = this.inAnim();
            for (var i = 0, ii = anims.length; i < ii; i++) {
                anims[i].stop();
            }
            return this;
        };
        /*\
     * Element.animate
     [ method ]
     **
     * Animates the given attributes of the element
     **
     - attrs (object) key-value pairs of destination attributes
     - duration (number) duration of the animation in milliseconds
     - easing (function) #optional easing function from @mina or custom
     - callback (function) #optional callback function that executes when the animation ends
     = (Element) the current element
    \*/
        elproto.animate = function (attrs, ms, easing, callback) {
            if (typeof easing == "function" && !easing.length) {
                callback = easing;
                easing = mina.linear;
            }
            if (attrs instanceof Animation) {
                callback = attrs.callback;
                easing = attrs.easing;
                ms = attrs.dur;
                attrs = attrs.attr;
            }
            var fkeys = [], tkeys = [], keys = {}, from, to, f, eq,
                el = this;
            for (var key in attrs) if (attrs[has](key)) {
                if (el.equal) {
                    eq = el.equal(key, Str(attrs[key]));
                    from = eq.from;
                    to = eq.to;
                    f = eq.f;
                } else {
                    from = +el.attr(key);
                    to = +attrs[key];
                }
                var len = is(from, "array") ? from.length : 1;
                keys[key] = slice(fkeys.length, fkeys.length + len, f);
                fkeys = fkeys.concat(from);
                tkeys = tkeys.concat(to);
            }
            var now = mina.time(),
                anim = mina(fkeys, tkeys, now, now + ms, mina.time, function (val) {
                    var attr = {};
                    for (var key in keys) if (keys[has](key)) {
                        attr[key] = keys[key](val);
                    }
                    el.attr(attr);
                }, easing);
            el.anims[anim.id] = anim;
            anim._attrs = attrs;
            anim._callback = callback;
            eve("snap.animcreated." + el.id, anim);
            eve.once("mina.finish." + anim.id, function () {
                eve.off("mina.*." + anim.id);
                delete el.anims[anim.id];
                callback && callback.call(el);
            });
            eve.once("mina.stop." + anim.id, function () {
                eve.off("mina.*." + anim.id);
                delete el.anims[anim.id];
            });
            return el;
        };
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var objectToString = Object.prototype.toString,
            Str = String,
            math = Math,
            E = "";

        function Matrix(a, b, c, d, e, f) {
            if (b == null && objectToString.call(a) == "[object SVGMatrix]") {
                this.a = a.a;
                this.b = a.b;
                this.c = a.c;
                this.d = a.d;
                this.e = a.e;
                this.f = a.f;
                return;
            }
            if (a != null) {
                this.a = +a;
                this.b = +b;
                this.c = +c;
                this.d = +d;
                this.e = +e;
                this.f = +f;
            } else {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.e = 0;
                this.f = 0;
            }
        }

        (function (matrixproto) {
            /*\
         * Matrix.add
         [ method ]
         **
         * Adds the given matrix to existing one
         - a (number)
         - b (number)
         - c (number)
         - d (number)
         - e (number)
         - f (number)
         * or
         - matrix (object) @Matrix
        \*/
            matrixproto.add = function (a, b, c, d, e, f) {
                if (a && a instanceof Matrix) {
                    return this.add(a.a, a.b, a.c, a.d, a.e, a.f);
                }
                var aNew = a * this.a + b * this.c,
                    bNew = a * this.b + b * this.d;
                this.e += e * this.a + f * this.c;
                this.f += e * this.b + f * this.d;
                this.c = c * this.a + d * this.c;
                this.d = c * this.b + d * this.d;

                this.a = aNew;
                this.b = bNew;
                return this;
            };
            /*\
         * Matrix.multLeft
         [ method ]
         **
         * Multiplies a passed affine transform to the left: M * this.
         - a (number)
         - b (number)
         - c (number)
         - d (number)
         - e (number)
         - f (number)
         * or
         - matrix (object) @Matrix
        \*/
            Matrix.prototype.multLeft = function (a, b, c, d, e, f) {
                if (a && a instanceof Matrix) {
                    return this.multLeft(a.a, a.b, a.c, a.d, a.e, a.f);
                }
                var aNew = a * this.a + c * this.b,
                    cNew = a * this.c + c * this.d,
                    eNew = a * this.e + c * this.f + e;
                this.b = b * this.a + d * this.b;
                this.d = b * this.c + d * this.d;
                this.f = b * this.e + d * this.f + f;

                this.a = aNew;
                this.c = cNew;
                this.e = eNew;
                return this;
            };
            /*\
         * Matrix.invert
         [ method ]
         **
         * Returns an inverted version of the matrix
         = (object) @Matrix
        \*/
            matrixproto.invert = function () {
                var me = this,
                    x = me.a * me.d - me.b * me.c;
                return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
            };
            /*\
         * Matrix.clone
         [ method ]
         **
         * Returns a copy of the matrix
         = (object) @Matrix
        \*/
            matrixproto.clone = function () {
                return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
            };
            /*\
         * Matrix.translate
         [ method ]
         **
         * Translate the matrix
         - x (number) horizontal offset distance
         - y (number) vertical offset distance
        \*/
            matrixproto.translate = function (x, y) {
                this.e += x * this.a + y * this.c;
                this.f += x * this.b + y * this.d;
                return this;
            };
            /*\
         * Matrix.scale
         [ method ]
         **
         * Scales the matrix
         - x (number) amount to be scaled, with `1` resulting in no change
         - y (number) #optional amount to scale along the vertical axis. (Otherwise `x` applies to both axes.)
         - cx (number) #optional horizontal origin point from which to scale
         - cy (number) #optional vertical origin point from which to scale
         * Default cx, cy is the middle point of the element.
        \*/
            matrixproto.scale = function (x, y, cx, cy) {
                y == null && (y = x);
                (cx || cy) && this.translate(cx, cy);
                this.a *= x;
                this.b *= x;
                this.c *= y;
                this.d *= y;
                (cx || cy) && this.translate(-cx, -cy);
                return this;
            };
            /*\
         * Matrix.rotate
         [ method ]
         **
         * Rotates the matrix
         - a (number) angle of rotation, in degrees
         - x (number) horizontal origin point from which to rotate
         - y (number) vertical origin point from which to rotate
        \*/
            matrixproto.rotate = function (a, x, y) {
                a = Snap.rad(a);
                x = x || 0;
                y = y || 0;
                var cos = +math.cos(a).toFixed(9),
                    sin = +math.sin(a).toFixed(9);
                this.add(cos, sin, -sin, cos, x, y);
                return this.add(1, 0, 0, 1, -x, -y);
            };
            /*\
         * Matrix.skewX
         [ method ]
         **
         * Skews the matrix along the x-axis
         - x (number) Angle to skew along the x-axis (in degrees).
        \*/
            matrixproto.skewX = function (x) {
                return this.skew(x, 0);
            };
            /*\
         * Matrix.skewY
         [ method ]
         **
         * Skews the matrix along the y-axis
         - y (number) Angle to skew along the y-axis (in degrees).
        \*/
            matrixproto.skewY = function (y) {
                return this.skew(0, y);
            };
            /*\
         * Matrix.skew
         [ method ]
         **
         * Skews the matrix
         - y (number) Angle to skew along the y-axis (in degrees).
         - x (number) Angle to skew along the x-axis (in degrees).
        \*/
            matrixproto.skew = function (x, y) {
                x = x || 0;
                y = y || 0;
                x = Snap.rad(x);
                y = Snap.rad(y);
                var c = math.tan(x).toFixed(9);
                var b = math.tan(y).toFixed(9);
                return this.add(1, b, c, 1, 0, 0);
            };
            /*\
         * Matrix.x
         [ method ]
         **
         * Returns x coordinate for given point after transformation described by the matrix. See also @Matrix.y
         - x (number)
         - y (number)
         = (number) x
        \*/
            matrixproto.x = function (x, y) {
                return x * this.a + y * this.c + this.e;
            };
            /*\
         * Matrix.y
         [ method ]
         **
         * Returns y coordinate for given point after transformation described by the matrix. See also @Matrix.x
         - x (number)
         - y (number)
         = (number) y
        \*/
            matrixproto.y = function (x, y) {
                return x * this.b + y * this.d + this.f;
            };
            matrixproto.get = function (i) {
                return +this[Str.fromCharCode(97 + i)].toFixed(4);
            };
            matrixproto.toString = function () {
                return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")";
            };
            matrixproto.offset = function () {
                return [this.e.toFixed(4), this.f.toFixed(4)];
            };

            function norm(a) {
                return a[0] * a[0] + a[1] * a[1];
            }

            function normalize(a) {
                var mag = math.sqrt(norm(a));
                a[0] && (a[0] /= mag);
                a[1] && (a[1] /= mag);
            }

            /*\
         * Matrix.determinant
         [ method ]
         **
         * Finds determinant of the given matrix.
         = (number) determinant
        \*/
            matrixproto.determinant = function () {
                return this.a * this.d - this.b * this.c;
            };
            /*\
         * Matrix.split
         [ method ]
         **
         * Splits matrix into primitive transformations
         = (object) in format:
         o dx (number) translation by x
         o dy (number) translation by y
         o scalex (number) scale by x
         o scaley (number) scale by y
         o shear (number) shear
         o rotate (number) rotation in deg
         o isSimple (boolean) could it be represented via simple transformations
        \*/
            matrixproto.split = function () {
                var out = {};
                // translation
                out.dx = this.e;
                out.dy = this.f;

                // scale and shear
                var row = [[this.a, this.b], [this.c, this.d]];
                out.scalex = math.sqrt(norm(row[0]));
                normalize(row[0]);

                out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
                row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

                out.scaley = math.sqrt(norm(row[1]));
                normalize(row[1]);
                out.shear /= out.scaley;

                if (this.determinant() < 0) {
                    out.scalex = -out.scalex;
                }

                // rotation
                var sin = row[0][1],
                    cos = row[1][1];
                if (cos < 0) {
                    out.rotate = Snap.deg(math.acos(cos));
                    if (sin < 0) {
                        out.rotate = 360 - out.rotate;
                    }
                } else {
                    out.rotate = Snap.deg(math.asin(sin));
                }

                out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
                out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
                out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
                return out;
            };
            /*\
         * Matrix.toTransformString
         [ method ]
         **
         * Returns transform string that represents given matrix
         = (string) transform string
        \*/
            matrixproto.toTransformString = function (shorter) {
                var s = shorter || this.split();
                if (!+s.shear.toFixed(9)) {
                    s.scalex = +s.scalex.toFixed(4);
                    s.scaley = +s.scaley.toFixed(4);
                    s.rotate = +s.rotate.toFixed(4);
                    return (s.dx || s.dy ? "t" + [+s.dx.toFixed(4), +s.dy.toFixed(4)] : E) +
                        (s.rotate ? "r" + [+s.rotate.toFixed(4), 0, 0] : E) +
                        (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E);
                } else {
                    return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
                }
            };
        })(Matrix.prototype);
        /*\
     * Snap.Matrix
     [ method ]
     **
     * Matrix constructor, extend on your own risk.
     * To create matrices use @Snap.matrix.
    \*/
        Snap.Matrix = Matrix;
        /*\
     * Snap.matrix
     [ method ]
     **
     * Utility method
     **
     * Returns a matrix based on the given parameters
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     * or
     - svgMatrix (SVGMatrix)
     = (object) @Matrix
    \*/
        Snap.matrix = function (a, b, c, d, e, f) {
            return new Matrix(a, b, c, d, e, f);
        };
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var has = "hasOwnProperty",
            make = Snap._.make,
            wrap = Snap._.wrap,
            is = Snap.is,
            getSomeDefs = Snap._.getSomeDefs,
            reURLValue = /^url\((['"]?)([^)]+)\1\)$/,
            $ = Snap._.$,
            URL = Snap.url,
            Str = String,
            separator = Snap._.separator,
            E = "";
        /*\
     * Snap.deurl
     [ method ]
     **
     * Unwraps path from `"url(<path>)"`.
     - value (string) url path
     = (string) unwrapped path
    \*/
        Snap.deurl = function (value) {
            var res = String(value).match(reURLValue);
            return res ? res[2] : value;
        }
        // Attributes event handlers
        eve.on("snap.util.attr.mask", function (value) {
            if (value instanceof Element || value instanceof Fragment) {
                eve.stop();
                if (value instanceof Fragment && value.node.childNodes.length == 1) {
                    value = value.node.firstChild;
                    getSomeDefs(this).appendChild(value);
                    value = wrap(value);
                }
                if (value.type == "mask") {
                    var mask = value;
                } else {
                    mask = make("mask", getSomeDefs(this));
                    mask.node.appendChild(value.node);
                }
                !mask.node.id && $(mask.node, {
                    id: mask.id
                });
                $(this.node, {
                    mask: URL(mask.id)
                });
            }
        });
        (function (clipIt) {
            eve.on("snap.util.attr.clip", clipIt);
            eve.on("snap.util.attr.clip-path", clipIt);
            eve.on("snap.util.attr.clipPath", clipIt);
        }(function (value) {
            if (value instanceof Element || value instanceof Fragment) {
                eve.stop();
                var clip,
                    node = value.node;
                while (node) {
                    if (node.nodeName === "clipPath") {
                        clip = new Element(node);
                        break;
                    }
                    if (node.nodeName === "svg") {
                        clip = undefined;
                        break;
                    }
                    node = node.parentNode;
                }
                if (!clip) {
                    clip = make("clipPath", getSomeDefs(this));
                    clip.node.appendChild(value.node);
                    !clip.node.id && $(clip.node, {
                        id: clip.id
                    });
                }
                $(this.node, {
                    "clip-path": URL(clip.node.id || clip.id)
                });
            }
        }));

        function fillStroke(name) {
            return function (value) {
                eve.stop();
                if (value instanceof Fragment && value.node.childNodes.length == 1 &&
                    (value.node.firstChild.tagName == "radialGradient" ||
                        value.node.firstChild.tagName == "linearGradient" ||
                        value.node.firstChild.tagName == "pattern")) {
                    value = value.node.firstChild;
                    getSomeDefs(this).appendChild(value);
                    value = wrap(value);
                }
                if (value instanceof Element) {
                    if (value.type == "radialGradient" || value.type == "linearGradient"
                        || value.type == "pattern") {
                        if (!value.node.id) {
                            $(value.node, {
                                id: value.id
                            });
                        }
                        var fill = URL(value.node.id);
                    } else {
                        fill = value.attr(name);
                    }
                } else {
                    fill = Snap.color(value);
                    if (fill.error) {
                        var grad = Snap(getSomeDefs(this).ownerSVGElement).gradient(value);
                        if (grad) {
                            if (!grad.node.id) {
                                $(grad.node, {
                                    id: grad.id
                                });
                            }
                            fill = URL(grad.node.id);
                        } else {
                            fill = value;
                        }
                    } else {
                        fill = Str(fill);
                    }
                }
                var attrs = {};
                attrs[name] = fill;
                $(this.node, attrs);
                this.node.style[name] = E;
            };
        }

        eve.on("snap.util.attr.fill", fillStroke("fill"));
        eve.on("snap.util.attr.stroke", fillStroke("stroke"));
        var gradrg = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
        eve.on("snap.util.grad.parse", function parseGrad(string) {
            string = Str(string);
            var tokens = string.match(gradrg);
            if (!tokens) {
                return null;
            }
            var type = tokens[1],
                params = tokens[2],
                stops = tokens[3];
            params = params.split(/\s*,\s*/).map(function (el) {
                return +el == el ? +el : el;
            });
            if (params.length == 1 && params[0] == 0) {
                params = [];
            }
            stops = stops.split("-");
            stops = stops.map(function (el) {
                el = el.split(":");
                var out = {
                    color: el[0]
                };
                if (el[1]) {
                    out.offset = parseFloat(el[1]);
                }
                return out;
            });
            var len = stops.length,
                start = 0,
                j = 0;

            function seed(i, end) {
                var step = (end - start) / (i - j);
                for (var k = j; k < i; k++) {
                    stops[k].offset = +(+start + step * (k - j)).toFixed(2);
                }
                j = i;
                start = end;
            }

            len--;
            for (var i = 0; i < len; i++) if ("offset" in stops[i]) {
                seed(i, stops[i].offset);
            }
            stops[len].offset = stops[len].offset || 100;
            seed(len, stops[len].offset);
            return {
                type: type,
                params: params,
                stops: stops
            };
        });

        eve.on("snap.util.attr.d", function (value) {
            eve.stop();
            if (is(value, "array") && is(value[0], "array")) {
                value = Snap.path.toString.call(value);
            }
            value = Str(value);
            if (value.match(/[ruo]/i)) {
                value = Snap.path.toAbsolute(value);
            }
            $(this.node, {d: value});
        })(-1);
        eve.on("snap.util.attr.#text", function (value) {
            eve.stop();
            value = Str(value);
            var txt = glob.doc.createTextNode(value);
            while (this.node.firstChild) {
                this.node.removeChild(this.node.firstChild);
            }
            this.node.appendChild(txt);
        })(-1);
        eve.on("snap.util.attr.path", function (value) {
            eve.stop();
            this.attr({d: value});
        })(-1);
        eve.on("snap.util.attr.class", function (value) {
            eve.stop();
            this.node.className.baseVal = value;
        })(-1);
        eve.on("snap.util.attr.viewBox", function (value) {
            var vb;
            if (is(value, "object") && "x" in value) {
                vb = [value.x, value.y, value.width, value.height].join(" ");
            } else if (is(value, "array")) {
                vb = value.join(" ");
            } else {
                vb = value;
            }
            $(this.node, {
                viewBox: vb
            });
            eve.stop();
        })(-1);
        eve.on("snap.util.attr.transform", function (value) {
            this.transform(value);
            eve.stop();
        })(-1);
        eve.on("snap.util.attr.r", function (value) {
            if (this.type == "rect") {
                eve.stop();
                $(this.node, {
                    rx: value,
                    ry: value
                });
            }
        })(-1);
        eve.on("snap.util.attr.textpath", function (value) {
            eve.stop();
            if (this.type == "text") {
                var id, tp, node;
                if (!value && this.textPath) {
                    tp = this.textPath;
                    while (tp.node.firstChild) {
                        this.node.appendChild(tp.node.firstChild);
                    }
                    tp.remove();
                    delete this.textPath;
                    return;
                }
                if (is(value, "string")) {
                    var defs = getSomeDefs(this),
                        path = wrap(defs.parentNode).path(value);
                    defs.appendChild(path.node);
                    id = path.id;
                    path.attr({id: id});
                } else {
                    value = wrap(value);
                    if (value instanceof Element) {
                        id = value.attr("id");
                        if (!id) {
                            id = value.id;
                            value.attr({id: id});
                        }
                    }
                }
                if (id) {
                    tp = this.textPath;
                    node = this.node;
                    if (tp) {
                        tp.attr({"xlink:href": "#" + id});
                    } else {
                        tp = $("textPath", {
                            "xlink:href": "#" + id
                        });
                        while (node.firstChild) {
                            tp.appendChild(node.firstChild);
                        }
                        node.appendChild(tp);
                        this.textPath = wrap(tp);
                    }
                }
            }
        })(-1);
        eve.on("snap.util.attr.text", function (value) {
            if (this.type == "text") {
                var i = 0,
                    node = this.node,
                    tuner = function (chunk) {
                        var out = $("tspan");
                        if (is(chunk, "array")) {
                            for (var i = 0; i < chunk.length; i++) {
                                out.appendChild(tuner(chunk[i]));
                            }
                        } else {
                            out.appendChild(glob.doc.createTextNode(chunk));
                        }
                        out.normalize && out.normalize();
                        return out;
                    };
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                var tuned = tuner(value);
                while (tuned.firstChild) {
                    node.appendChild(tuned.firstChild);
                }
            }
            eve.stop();
        })(-1);

        function setFontSize(value) {
            eve.stop();
            if (value == +value) {
                value += "px";
            }
            this.node.style.fontSize = value;
        }

        eve.on("snap.util.attr.fontSize", setFontSize)(-1);
        eve.on("snap.util.attr.font-size", setFontSize)(-1);


        eve.on("snap.util.getattr.transform", function () {
            eve.stop();
            return this.transform();
        })(-1);
        eve.on("snap.util.getattr.textpath", function () {
            eve.stop();
            return this.textPath;
        })(-1);
        // Markers
        (function () {
            function getter(end) {
                return function () {
                    eve.stop();
                    var style = glob.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + end);
                    if (style == "none") {
                        return style;
                    } else {
                        return Snap(glob.doc.getElementById(style.match(reURLValue)[1]));
                    }
                };
            }

            function setter(end) {
                return function (value) {
                    eve.stop();
                    var name = "marker" + end.charAt(0).toUpperCase() + end.substring(1);
                    if (value == "" || !value) {
                        this.node.style[name] = "none";
                        return;
                    }
                    if (value.type == "marker") {
                        var id = value.node.id;
                        if (!id) {
                            $(value.node, {id: value.id});
                        }
                        this.node.style[name] = URL(id);
                        return;
                    }
                };
            }

            eve.on("snap.util.getattr.marker-end", getter("end"))(-1);
            eve.on("snap.util.getattr.markerEnd", getter("end"))(-1);
            eve.on("snap.util.getattr.marker-start", getter("start"))(-1);
            eve.on("snap.util.getattr.markerStart", getter("start"))(-1);
            eve.on("snap.util.getattr.marker-mid", getter("mid"))(-1);
            eve.on("snap.util.getattr.markerMid", getter("mid"))(-1);
            eve.on("snap.util.attr.marker-end", setter("end"))(-1);
            eve.on("snap.util.attr.markerEnd", setter("end"))(-1);
            eve.on("snap.util.attr.marker-start", setter("start"))(-1);
            eve.on("snap.util.attr.markerStart", setter("start"))(-1);
            eve.on("snap.util.attr.marker-mid", setter("mid"))(-1);
            eve.on("snap.util.attr.markerMid", setter("mid"))(-1);
        }());
        eve.on("snap.util.getattr.r", function () {
            if (this.type == "rect" && $(this.node, "rx") == $(this.node, "ry")) {
                eve.stop();
                return $(this.node, "rx");
            }
        })(-1);

        function textExtract(node) {
            var out = [];
            var children = node.childNodes;
            for (var i = 0, ii = children.length; i < ii; i++) {
                var chi = children[i];
                if (chi.nodeType == 3) {
                    out.push(chi.nodeValue);
                }
                if (chi.tagName == "tspan") {
                    if (chi.childNodes.length == 1 && chi.firstChild.nodeType == 3) {
                        out.push(chi.firstChild.nodeValue);
                    } else {
                        out.push(textExtract(chi));
                    }
                }
            }
            return out;
        }

        eve.on("snap.util.getattr.text", function () {
            if (this.type == "text" || this.type == "tspan") {
                eve.stop();
                var out = textExtract(this.node);
                return out.length == 1 ? out[0] : out;
            }
        })(-1);
        eve.on("snap.util.getattr.#text", function () {
            return this.node.textContent;
        })(-1);
        eve.on("snap.util.getattr.fill", function (internal) {
            if (internal) {
                return;
            }
            eve.stop();
            var value = eve("snap.util.getattr.fill", this, true).firstDefined();
            return Snap(Snap.deurl(value)) || value;
        })(-1);
        eve.on("snap.util.getattr.stroke", function (internal) {
            if (internal) {
                return;
            }
            eve.stop();
            var value = eve("snap.util.getattr.stroke", this, true).firstDefined();
            return Snap(Snap.deurl(value)) || value;
        })(-1);
        eve.on("snap.util.getattr.viewBox", function () {
            eve.stop();
            var vb = $(this.node, "viewBox");
            if (vb) {
                vb = vb.split(separator);
                return Snap._.box(+vb[0], +vb[1], +vb[2], +vb[3]);
            } else {
                return;
            }
        })(-1);
        eve.on("snap.util.getattr.points", function () {
            var p = $(this.node, "points");
            eve.stop();
            if (p) {
                return p.split(separator);
            } else {
                return;
            }
        })(-1);
        eve.on("snap.util.getattr.path", function () {
            var p = $(this.node, "d");
            eve.stop();
            return p;
        })(-1);
        eve.on("snap.util.getattr.class", function () {
            return this.node.className.baseVal;
        })(-1);

        function getFontSize() {
            eve.stop();
            return this.node.style.fontSize;
        }

        eve.on("snap.util.getattr.fontSize", getFontSize)(-1);
        eve.on("snap.util.getattr.font-size", getFontSize)(-1);
    });

// Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var rgNotSpace = /\S+/g,
            rgBadSpace = /[\t\r\n\f]/g,
            rgTrim = /(^\s+|\s+$)/g,
            Str = String,
            elproto = Element.prototype;
        /*\
     * Element.addClass
     [ method ]
     **
     * Adds given class name or list of class names to the element.
     - value (string) class name or space separated list of class names
     **
     = (Element) original element.
    \*/
        elproto.addClass = function (value) {
            var classes = Str(value || "").match(rgNotSpace) || [],
                elem = this.node,
                className = elem.className.baseVal,
                curClasses = className.match(rgNotSpace) || [],
                j,
                pos,
                clazz,
                finalValue;

            if (classes.length) {
                j = 0;
                while (clazz = classes[j++]) {
                    pos = curClasses.indexOf(clazz);
                    if (!~pos) {
                        curClasses.push(clazz);
                    }
                }

                finalValue = curClasses.join(" ");
                if (className != finalValue) {
                    elem.className.baseVal = finalValue;
                }
            }
            return this;
        };
        /*\
     * Element.removeClass
     [ method ]
     **
     * Removes given class name or list of class names from the element.
     - value (string) class name or space separated list of class names
     **
     = (Element) original element.
    \*/
        elproto.removeClass = function (value) {
            var classes = Str(value || "").match(rgNotSpace) || [],
                elem = this.node,
                className = elem.className.baseVal,
                curClasses = className.match(rgNotSpace) || [],
                j,
                pos,
                clazz,
                finalValue;
            if (curClasses.length) {
                j = 0;
                while (clazz = classes[j++]) {
                    pos = curClasses.indexOf(clazz);
                    if (~pos) {
                        curClasses.splice(pos, 1);
                    }
                }

                finalValue = curClasses.join(" ");
                if (className != finalValue) {
                    elem.className.baseVal = finalValue;
                }
            }
            return this;
        };
        /*\
     * Element.hasClass
     [ method ]
     **
     * Checks if the element has a given class name in the list of class names applied to it.
     - value (string) class name
     **
     = (boolean) `true` if the element has given class
    \*/
        elproto.hasClass = function (value) {
            var elem = this.node,
                className = elem.className.baseVal,
                curClasses = className.match(rgNotSpace) || [];
            return !!~curClasses.indexOf(value);
        };
        /*\
     * Element.toggleClass
     [ method ]
     **
     * Add or remove one or more classes from the element, depending on either
     * the class’s presence or the value of the `flag` argument.
     - value (string) class name or space separated list of class names
     - flag (boolean) value to determine whether the class should be added or removed
     **
     = (Element) original element.
    \*/
        elproto.toggleClass = function (value, flag) {
            if (flag != null) {
                if (flag) {
                    return this.addClass(value);
                } else {
                    return this.removeClass(value);
                }
            }
            var classes = (value || "").match(rgNotSpace) || [],
                elem = this.node,
                className = elem.className.baseVal,
                curClasses = className.match(rgNotSpace) || [],
                j,
                pos,
                clazz,
                finalValue;
            j = 0;
            while (clazz = classes[j++]) {
                pos = curClasses.indexOf(clazz);
                if (~pos) {
                    curClasses.splice(pos, 1);
                } else {
                    curClasses.push(clazz);
                }
            }

            finalValue = curClasses.join(" ");
            if (className != finalValue) {
                elem.className.baseVal = finalValue;
            }
            return this;
        };
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var operators = {
                "+": function (x, y) {
                    return x + y;
                },
                "-": function (x, y) {
                    return x - y;
                },
                "/": function (x, y) {
                    return x / y;
                },
                "*": function (x, y) {
                    return x * y;
                }
            },
            Str = String,
            reUnit = /[a-z]+$/i,
            reAddon = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;

        function getNumber(val) {
            return val;
        }

        function getUnit(unit) {
            return function (val) {
                return +val.toFixed(3) + unit;
            };
        }

        eve.on("snap.util.attr", function (val) {
            var plus = Str(val).match(reAddon);
            if (plus) {
                var evnt = eve.nt(),
                    name = evnt.substring(evnt.lastIndexOf(".") + 1),
                    a = this.attr(name),
                    atr = {};
                eve.stop();
                var unit = plus[3] || "",
                    aUnit = a.match(reUnit),
                    op = operators[plus[1]];
                if (aUnit && aUnit == unit) {
                    val = op(parseFloat(a), +plus[2]);
                } else {
                    a = this.asPX(name);
                    val = op(this.asPX(name), this.asPX(name, plus[2] + unit));
                }
                if (isNaN(a) || isNaN(val)) {
                    return;
                }
                atr[name] = val;
                this.attr(atr);
            }
        })(-10);
        eve.on("snap.util.equal", function (name, b) {
            var A, B, a = Str(this.attr(name) || ""),
                el = this,
                bplus = Str(b).match(reAddon);
            if (bplus) {
                eve.stop();
                var unit = bplus[3] || "",
                    aUnit = a.match(reUnit),
                    op = operators[bplus[1]];
                if (aUnit && aUnit == unit) {
                    return {
                        from: parseFloat(a),
                        to: op(parseFloat(a), +bplus[2]),
                        f: getUnit(aUnit)
                    };
                } else {
                    a = this.asPX(name);
                    return {
                        from: a,
                        to: op(a, this.asPX(name, bplus[2] + unit)),
                        f: getNumber
                    };
                }
            }
        })(-10);
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var proto = Paper.prototype,
            is = Snap.is;
        /*\
     * Paper.rect
     [ method ]
     *
     * Draws a rectangle
     **
     - x (number) x coordinate of the top left corner
     - y (number) y coordinate of the top left corner
     - width (number) width
     - height (number) height
     - rx (number) #optional horizontal radius for rounded corners, default is 0
     - ry (number) #optional vertical radius for rounded corners, default is rx or 0
     = (object) the `rect` element
     **
     > Usage
     | // regular rectangle
     | var c = paper.rect(10, 10, 50, 50);
     | // rectangle with rounded corners
     | var c = paper.rect(40, 40, 50, 50, 10);
    \*/
        proto.rect = function (x, y, w, h, rx, ry) {
            var attr;
            if (ry == null) {
                ry = rx;
            }
            if (is(x, "object") && x == "[object Object]") {
                attr = x;
            } else if (x != null) {
                attr = {
                    x: x,
                    y: y,
                    width: w,
                    height: h
                };
                if (rx != null) {
                    attr.rx = rx;
                    attr.ry = ry;
                }
            }
            return this.el("rect", attr);
        };
        /*\
     * Paper.circle
     [ method ]
     **
     * Draws a circle
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - r (number) radius
     = (object) the `circle` element
     **
     > Usage
     | var c = paper.circle(50, 50, 40);
    \*/
        proto.circle = function (cx, cy, r) {
            var attr;
            if (is(cx, "object") && cx == "[object Object]") {
                attr = cx;
            } else if (cx != null) {
                attr = {
                    cx: cx,
                    cy: cy,
                    r: r
                };
            }
            return this.el("circle", attr);
        };

        var preload = (function () {
            function onerror() {
                this.parentNode.removeChild(this);
            }

            return function (src, f) {
                var img = glob.doc.createElement("img"),
                    body = glob.doc.body;
                img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                img.onload = function () {
                    f.call(img);
                    img.onload = img.onerror = null;
                    body.removeChild(img);
                };
                img.onerror = onerror;
                body.appendChild(img);
                img.src = src;
            };
        }());

        /*\
     * Paper.image
     [ method ]
     **
     * Places an image on the surface
     **
     - src (string) URI of the source image
     - x (number) x offset position
     - y (number) y offset position
     - width (number) width of the image
     - height (number) height of the image
     = (object) the `image` element
     * or
     = (object) Snap element object with type `image`
     **
     > Usage
     | var c = paper.image("apple.png", 10, 10, 80, 80);
    \*/
        proto.image = function (src, x, y, width, height) {
            var el = this.el("image");
            if (is(src, "object") && "src" in src) {
                el.attr(src);
            } else if (src != null) {
                var set = {
                    "xlink:href": src,
                    preserveAspectRatio: "none"
                };
                if (x != null && y != null) {
                    set.x = x;
                    set.y = y;
                }
                if (width != null && height != null) {
                    set.width = width;
                    set.height = height;
                } else {
                    preload(src, function () {
                        Snap._.$(el.node, {
                            width: this.offsetWidth,
                            height: this.offsetHeight
                        });
                    });
                }
                Snap._.$(el.node, set);
            }
            return el;
        };
        /*\
     * Paper.ellipse
     [ method ]
     **
     * Draws an ellipse
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - rx (number) horizontal radius
     - ry (number) vertical radius
     = (object) the `ellipse` element
     **
     > Usage
     | var c = paper.ellipse(50, 50, 40, 20);
    \*/
        proto.ellipse = function (cx, cy, rx, ry) {
            var attr;
            if (is(cx, "object") && cx == "[object Object]") {
                attr = cx;
            } else if (cx != null) {
                attr = {
                    cx: cx,
                    cy: cy,
                    rx: rx,
                    ry: ry
                };
            }
            return this.el("ellipse", attr);
        };
        // SIERRA Paper.path(): Unclear from the link what a Catmull-Rom curveto is, and why it would make life any easier.
        /*\
     * Paper.path
     [ method ]
     **
     * Creates a `<path>` element using the given string as the path's definition
     - pathString (string) #optional path string in SVG format
     * Path string consists of one-letter commands, followed by comma seprarated arguments in numerical form. Example:
     | "M10,20L30,40"
     * This example features two commands: `M`, with arguments `(10, 20)` and `L` with arguments `(30, 40)`. Uppercase letter commands express coordinates in absolute terms, while lowercase commands express them in relative terms from the most recently declared coordinates.
     *
     # <p>Here is short list of commands available, for more details see <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path's data attribute's format are described in the SVG specification.">SVG path string format</a> or <a href="https://developer.mozilla.org/en/SVG/Tutorial/Paths">article about path strings at MDN</a>.</p>
     # <table><thead><tr><th>Command</th><th>Name</th><th>Parameters</th></tr></thead><tbody>
     # <tr><td>M</td><td>moveto</td><td>(x y)+</td></tr>
     # <tr><td>Z</td><td>closepath</td><td>(none)</td></tr>
     # <tr><td>L</td><td>lineto</td><td>(x y)+</td></tr>
     # <tr><td>H</td><td>horizontal lineto</td><td>x+</td></tr>
     # <tr><td>V</td><td>vertical lineto</td><td>y+</td></tr>
     # <tr><td>C</td><td>curveto</td><td>(x1 y1 x2 y2 x y)+</td></tr>
     # <tr><td>S</td><td>smooth curveto</td><td>(x2 y2 x y)+</td></tr>
     # <tr><td>Q</td><td>quadratic Bézier curveto</td><td>(x1 y1 x y)+</td></tr>
     # <tr><td>T</td><td>smooth quadratic Bézier curveto</td><td>(x y)+</td></tr>
     # <tr><td>A</td><td>elliptical arc</td><td>(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+</td></tr>
     # <tr><td>R</td><td><a href="http://en.wikipedia.org/wiki/Catmull–Rom_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom curveto</a>*</td><td>x1 y1 (x y)+</td></tr></tbody></table>
     * * _Catmull-Rom curveto_ is a not standard SVG command and added to make life easier.
     * Note: there is a special case when a path consists of only three commands: `M10,10R…z`. In this case the path connects back to its starting point.
     > Usage
     | var c = paper.path("M10 10L90 90");
     | // draw a diagonal line:
     | // move to 10,10, line to 90,90
    \*/
        proto.path = function (d) {
            var attr;
            if (is(d, "object") && !is(d, "array")) {
                attr = d;
            } else if (d) {
                attr = {d: d};
            }
            return this.el("path", attr);
        };
        /*\
     * Paper.g
     [ method ]
     **
     * Creates a group element
     **
     - varargs (…) #optional elements to nest within the group
     = (object) the `g` element
     **
     > Usage
     | var c1 = paper.circle(),
     |     c2 = paper.rect(),
     |     g = paper.g(c2, c1); // note that the order of elements is different
     * or
     | var c1 = paper.circle(),
     |     c2 = paper.rect(),
     |     g = paper.g();
     | g.add(c2, c1);
    \*/
        /*\
     * Paper.group
     [ method ]
     **
     * See @Paper.g
    \*/
        proto.group = proto.g = function (first) {
            var attr,
                el = this.el("g");
            if (arguments.length == 1 && first && !first.type) {
                el.attr(first);
            } else if (arguments.length) {
                el.add(Array.prototype.slice.call(arguments, 0));
            }
            return el;
        };
        /*\
     * Paper.svg
     [ method ]
     **
     * Creates a nested SVG element.
     - x (number) @optional X of the element
     - y (number) @optional Y of the element
     - width (number) @optional width of the element
     - height (number) @optional height of the element
     - vbx (number) @optional viewbox X
     - vby (number) @optional viewbox Y
     - vbw (number) @optional viewbox width
     - vbh (number) @optional viewbox height
     **
     = (object) the `svg` element
     **
    \*/
        proto.svg = function (x, y, width, height, vbx, vby, vbw, vbh) {
            var attrs = {};
            if (is(x, "object") && y == null) {
                attrs = x;
            } else {
                if (x != null) {
                    attrs.x = x;
                }
                if (y != null) {
                    attrs.y = y;
                }
                if (width != null) {
                    attrs.width = width;
                }
                if (height != null) {
                    attrs.height = height;
                }
                if (vbx != null && vby != null && vbw != null && vbh != null) {
                    attrs.viewBox = [vbx, vby, vbw, vbh];
                }
            }
            return this.el("svg", attrs);
        };
        /*\
     * Paper.mask
     [ method ]
     **
     * Equivalent in behaviour to @Paper.g, except it’s a mask.
     **
     = (object) the `mask` element
     **
    \*/
        proto.mask = function (first) {
            var attr,
                el = this.el("mask");
            if (arguments.length == 1 && first && !first.type) {
                el.attr(first);
            } else if (arguments.length) {
                el.add(Array.prototype.slice.call(arguments, 0));
            }
            return el;
        };
        /*\
     * Paper.ptrn
     [ method ]
     **
     * Equivalent in behaviour to @Paper.g, except it’s a pattern.
     - x (number) @optional X of the element
     - y (number) @optional Y of the element
     - width (number) @optional width of the element
     - height (number) @optional height of the element
     - vbx (number) @optional viewbox X
     - vby (number) @optional viewbox Y
     - vbw (number) @optional viewbox width
     - vbh (number) @optional viewbox height
     **
     = (object) the `pattern` element
     **
    \*/
        proto.ptrn = function (x, y, width, height, vx, vy, vw, vh) {
            if (is(x, "object")) {
                var attr = x;
            } else {
                attr = {patternUnits: "userSpaceOnUse"};
                if (x) {
                    attr.x = x;
                }
                if (y) {
                    attr.y = y;
                }
                if (width != null) {
                    attr.width = width;
                }
                if (height != null) {
                    attr.height = height;
                }
                if (vx != null && vy != null && vw != null && vh != null) {
                    attr.viewBox = [vx, vy, vw, vh];
                } else {
                    attr.viewBox = [x || 0, y || 0, width || 0, height || 0];
                }
            }
            return this.el("pattern", attr);
        };
        /*\
     * Paper.use
     [ method ]
     **
     * Creates a <use> element.
     - id (string) @optional id of element to link
     * or
     - id (Element) @optional element to link
     **
     = (object) the `use` element
     **
    \*/
        proto.use = function (id) {
            if (id != null) {
                if (id instanceof Element) {
                    if (!id.attr("id")) {
                        id.attr({id: Snap._.id(id)});
                    }
                    id = id.attr("id");
                }
                if (String(id).charAt() == "#") {
                    id = id.substring(1);
                }
                return this.el("use", {"xlink:href": "#" + id});
            } else {
                return Element.prototype.use.call(this);
            }
        };
        /*\
     * Paper.symbol
     [ method ]
     **
     * Creates a <symbol> element.
     - vbx (number) @optional viewbox X
     - vby (number) @optional viewbox Y
     - vbw (number) @optional viewbox width
     - vbh (number) @optional viewbox height
     = (object) the `symbol` element
     **
    \*/
        proto.symbol = function (vx, vy, vw, vh) {
            var attr = {};
            if (vx != null && vy != null && vw != null && vh != null) {
                attr.viewBox = [vx, vy, vw, vh];
            }

            return this.el("symbol", attr);
        };
        /*\
     * Paper.text
     [ method ]
     **
     * Draws a text string
     **
     - x (number) x coordinate position
     - y (number) y coordinate position
     - text (string|array) The text string to draw or array of strings to nest within separate `<tspan>` elements
     = (object) the `text` element
     **
     > Usage
     | var t1 = paper.text(50, 50, "Snap");
     | var t2 = paper.text(50, 50, ["S","n","a","p"]);
     | // Text path usage
     | t1.attr({textpath: "M10,10L100,100"});
     | // or
     | var pth = paper.path("M10,10L100,100");
     | t1.attr({textpath: pth});
    \*/
        proto.text = function (x, y, text) {
            var attr = {};
            if (is(x, "object")) {
                attr = x;
            } else if (x != null) {
                attr = {
                    x: x,
                    y: y,
                    text: text || ""
                };
            }
            return this.el("text", attr);
        };
        /*\
     * Paper.line
     [ method ]
     **
     * Draws a line
     **
     - x1 (number) x coordinate position of the start
     - y1 (number) y coordinate position of the start
     - x2 (number) x coordinate position of the end
     - y2 (number) y coordinate position of the end
     = (object) the `line` element
     **
     > Usage
     | var t1 = paper.line(50, 50, 100, 100);
    \*/
        proto.line = function (x1, y1, x2, y2) {
            var attr = {};
            if (is(x1, "object")) {
                attr = x1;
            } else if (x1 != null) {
                attr = {
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
                };
            }
            return this.el("line", attr);
        };
        /*\
     * Paper.polyline
     [ method ]
     **
     * Draws a polyline
     **
     - points (array) array of points
     * or
     - varargs (…) points
     = (object) the `polyline` element
     **
     > Usage
     | var p1 = paper.polyline([10, 10, 100, 100]);
     | var p2 = paper.polyline(10, 10, 100, 100);
    \*/
        proto.polyline = function (points) {
            if (arguments.length > 1) {
                points = Array.prototype.slice.call(arguments, 0);
            }
            var attr = {};
            if (is(points, "object") && !is(points, "array")) {
                attr = points;
            } else if (points != null) {
                attr = {points: points};
            }
            return this.el("polyline", attr);
        };
        /*\
     * Paper.polygon
     [ method ]
     **
     * Draws a polygon. See @Paper.polyline
    \*/
        proto.polygon = function (points) {
            if (arguments.length > 1) {
                points = Array.prototype.slice.call(arguments, 0);
            }
            var attr = {};
            if (is(points, "object") && !is(points, "array")) {
                attr = points;
            } else if (points != null) {
                attr = {points: points};
            }
            return this.el("polygon", attr);
        };
        // gradients
        (function () {
            var $ = Snap._.$;
            // gradients' helpers
            /*\
         * Element.stops
         [ method ]
         **
         * Only for gradients!
         * Returns array of gradient stops elements.
         = (array) the stops array.
        \*/
            function Gstops() {
                return this.selectAll("stop");
            }

            /*\
         * Element.addStop
         [ method ]
         **
         * Only for gradients!
         * Adds another stop to the gradient.
         - color (string) stops color
         - offset (number) stops offset 0..100
         = (object) gradient element
        \*/
            function GaddStop(color, offset) {
                var stop = $("stop"),
                    attr = {
                        offset: +offset + "%"
                    };
                color = Snap.color(color);
                attr["stop-color"] = color.hex;
                if (color.opacity < 1) {
                    attr["stop-opacity"] = color.opacity;
                }
                $(stop, attr);
                var stops = this.stops(),
                    inserted;
                for (var i = 0; i < stops.length; i++) {
                    var stopOffset = parseFloat(stops[i].attr("offset"));
                    if (stopOffset > offset) {
                        this.node.insertBefore(stop, stops[i].node);
                        inserted = true;
                        break;
                    }
                }
                if (!inserted) {
                    this.node.appendChild(stop);
                }
                return this;
            }

            function GgetBBox() {
                if (this.type == "linearGradient") {
                    var x1 = $(this.node, "x1") || 0,
                        x2 = $(this.node, "x2") || 1,
                        y1 = $(this.node, "y1") || 0,
                        y2 = $(this.node, "y2") || 0;
                    return Snap._.box(x1, y1, math.abs(x2 - x1), math.abs(y2 - y1));
                } else {
                    var cx = this.node.cx || .5,
                        cy = this.node.cy || .5,
                        r = this.node.r || 0;
                    return Snap._.box(cx - r, cy - r, r * 2, r * 2);
                }
            }

            /*\
         * Element.setStops
         [ method ]
         **
         * Only for gradients!
         * Updates stops of the gradient based on passed gradient descriptor. See @Ppaer.gradient
         - str (string) gradient descriptor part after `()`.
         = (object) gradient element
         | var g = paper.gradient("l(0, 0, 1, 1)#000-#f00-#fff");
         | g.setStops("#fff-#000-#f00-#fc0");
        \*/
            function GsetStops(str) {
                var grad = str,
                    stops = this.stops();
                if (typeof str == "string") {
                    grad = eve("snap.util.grad.parse", null, "l(0,0,0,1)" + str).firstDefined().stops;
                }
                if (!Snap.is(grad, "array")) {
                    return;
                }
                for (var i = 0; i < stops.length; i++) {
                    if (grad[i]) {
                        var color = Snap.color(grad[i].color),
                            attr = {"offset": grad[i].offset + "%"};
                        attr["stop-color"] = color.hex;
                        if (color.opacity < 1) {
                            attr["stop-opacity"] = color.opacity;
                        }
                        stops[i].attr(attr);
                    } else {
                        stops[i].remove();
                    }
                }
                for (i = stops.length; i < grad.length; i++) {
                    this.addStop(grad[i].color, grad[i].offset);
                }
                return this;
            }

            function gradient(defs, str) {
                var grad = eve("snap.util.grad.parse", null, str).firstDefined(),
                    el;
                if (!grad) {
                    return null;
                }
                grad.params.unshift(defs);
                if (grad.type.toLowerCase() == "l") {
                    el = gradientLinear.apply(0, grad.params);
                } else {
                    el = gradientRadial.apply(0, grad.params);
                }
                if (grad.type != grad.type.toLowerCase()) {
                    $(el.node, {
                        gradientUnits: "userSpaceOnUse"
                    });
                }
                var stops = grad.stops,
                    len = stops.length;
                for (var i = 0; i < len; i++) {
                    var stop = stops[i];
                    el.addStop(stop.color, stop.offset);
                }
                return el;
            }

            function gradientLinear(defs, x1, y1, x2, y2) {
                var el = Snap._.make("linearGradient", defs);
                el.stops = Gstops;
                el.addStop = GaddStop;
                el.getBBox = GgetBBox;
                el.setStops = GsetStops;
                if (x1 != null) {
                    $(el.node, {
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    });
                }
                return el;
            }

            function gradientRadial(defs, cx, cy, r, fx, fy) {
                var el = Snap._.make("radialGradient", defs);
                el.stops = Gstops;
                el.addStop = GaddStop;
                el.getBBox = GgetBBox;
                if (cx != null) {
                    $(el.node, {
                        cx: cx,
                        cy: cy,
                        r: r
                    });
                }
                if (fx != null && fy != null) {
                    $(el.node, {
                        fx: fx,
                        fy: fy
                    });
                }
                return el;
            }

            /*\
         * Paper.gradient
         [ method ]
         **
         * Creates a gradient element
         **
         - gradient (string) gradient descriptor
         > Gradient Descriptor
         * The gradient descriptor is an expression formatted as
         * follows: `<type>(<coords>)<colors>`.  The `<type>` can be
         * either linear or radial.  The uppercase `L` or `R` letters
         * indicate absolute coordinates offset from the SVG surface.
         * Lowercase `l` or `r` letters indicate coordinates
         * calculated relative to the element to which the gradient is
         * applied.  Coordinates specify a linear gradient vector as
         * `x1`, `y1`, `x2`, `y2`, or a radial gradient as `cx`, `cy`,
         * `r` and optional `fx`, `fy` specifying a focal point away
         * from the center of the circle. Specify `<colors>` as a list
         * of dash-separated CSS color values.  Each color may be
         * followed by a custom offset value, separated with a colon
         * character.
         > Examples
         * Linear gradient, relative from top-left corner to bottom-right
         * corner, from black through red to white:
         | var g = paper.gradient("l(0, 0, 1, 1)#000-#f00-#fff");
         * Linear gradient, absolute from (0, 0) to (100, 100), from black
         * through red at 25% to white:
         | var g = paper.gradient("L(0, 0, 100, 100)#000-#f00:25-#fff");
         * Radial gradient, relative from the center of the element with radius
         * half the width, from black to white:
         | var g = paper.gradient("r(0.5, 0.5, 0.5)#000-#fff");
         * To apply the gradient:
         | paper.circle(50, 50, 40).attr({
         |     fill: g
         | });
         = (object) the `gradient` element
        \*/
            proto.gradient = function (str) {
                return gradient(this.defs, str);
            };
            proto.gradientLinear = function (x1, y1, x2, y2) {
                return gradientLinear(this.defs, x1, y1, x2, y2);
            };
            proto.gradientRadial = function (cx, cy, r, fx, fy) {
                return gradientRadial(this.defs, cx, cy, r, fx, fy);
            };
            /*\
         * Paper.toString
         [ method ]
         **
         * Returns SVG code for the @Paper
         = (string) SVG code for the @Paper
        \*/
            proto.toString = function () {
                var doc = this.node.ownerDocument,
                    f = doc.createDocumentFragment(),
                    d = doc.createElement("div"),
                    svg = this.node.cloneNode(true),
                    res;
                f.appendChild(d);
                d.appendChild(svg);
                Snap._.$(svg, {xmlns: "http://www.w3.org/2000/svg"});
                res = d.innerHTML;
                f.removeChild(f.firstChild);
                return res;
            };
            /*\
         * Paper.toDataURL
         [ method ]
         **
         * Returns SVG code for the @Paper as Data URI string.
         = (string) Data URI string
        \*/
            proto.toDataURL = function () {
                if (window && window.btoa) {
                    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this)));
                }
            };
            /*\
         * Paper.clear
         [ method ]
         **
         * Removes all child nodes of the paper, except <defs>.
        \*/
            proto.clear = function () {
                var node = this.node.firstChild,
                    next;
                while (node) {
                    next = node.nextSibling;
                    if (node.tagName != "defs") {
                        node.parentNode.removeChild(node);
                    } else {
                        proto.clear.call({node: node});
                    }
                    node = next;
                }
            };
        }());
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob) {
        var elproto = Element.prototype,
            is = Snap.is,
            clone = Snap._.clone,
            has = "hasOwnProperty",
            p2s = /,?([a-z]),?/gi,
            toFloat = parseFloat,
            math = Math,
            PI = math.PI,
            mmin = math.min,
            mmax = math.max,
            pow = math.pow,
            abs = math.abs;

        function paths(ps) {
            var p = paths.ps = paths.ps || {};
            if (p[ps]) {
                p[ps].sleep = 100;
            } else {
                p[ps] = {
                    sleep: 100
                };
            }
            setTimeout(function () {
                for (var key in p) if (p[has](key) && key != ps) {
                    p[key].sleep--;
                    !p[key].sleep && delete p[key];
                }
            });
            return p[ps];
        }

        function box(x, y, width, height) {
            if (x == null) {
                x = y = width = height = 0;
            }
            if (y == null) {
                y = x.y;
                width = x.width;
                height = x.height;
                x = x.x;
            }
            return {
                x: x,
                y: y,
                width: width,
                w: width,
                height: height,
                h: height,
                x2: x + width,
                y2: y + height,
                cx: x + width / 2,
                cy: y + height / 2,
                r1: math.min(width, height) / 2,
                r2: math.max(width, height) / 2,
                r0: math.sqrt(width * width + height * height) / 2,
                path: rectPath(x, y, width, height),
                vb: [x, y, width, height].join(" ")
            };
        }

        function toString() {
            return this.join(",").replace(p2s, "$1");
        }

        function pathClone(pathArray) {
            var res = clone(pathArray);
            res.toString = toString;
            return res;
        }

        function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
            if (length == null) {
                return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
            } else {
                return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y,
                    getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
            }
        }

        function getLengthFactory(istotal, subpath) {
            function O(val) {
                return +(+val).toFixed(3);
            }

            return Snap._.cacher(function (path, length, onlystart) {
                if (path instanceof Element) {
                    path = path.attr("d");
                }
                path = path2curve(path);
                var x, y, p, l, sp = "", subpaths = {}, point,
                    len = 0;
                for (var i = 0, ii = path.length; i < ii; i++) {
                    p = path[i];
                    if (p[0] == "M") {
                        x = +p[1];
                        y = +p[2];
                    } else {
                        l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                        if (len + l > length) {
                            if (subpath && !subpaths.start) {
                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                sp += [
                                    "C" + O(point.start.x),
                                    O(point.start.y),
                                    O(point.m.x),
                                    O(point.m.y),
                                    O(point.x),
                                    O(point.y)
                                ];
                                if (onlystart) {
                                    return sp;
                                }
                                subpaths.start = sp;
                                sp = [
                                    "M" + O(point.x),
                                    O(point.y) + "C" + O(point.n.x),
                                    O(point.n.y),
                                    O(point.end.x),
                                    O(point.end.y),
                                    O(p[5]),
                                    O(p[6])
                                ].join();
                                len += l;
                                x = +p[5];
                                y = +p[6];
                                continue;
                            }
                            if (!istotal && !subpath) {
                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                return point;
                            }
                        }
                        len += l;
                        x = +p[5];
                        y = +p[6];
                    }
                    sp += p.shift() + p;
                }
                subpaths.end = sp;
                point = istotal ? len : subpath ? subpaths : findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                return point;
            }, null, Snap._.clone);
        }

        var getTotalLength = getLengthFactory(1),
            getPointAtLength = getLengthFactory(),
            getSubpathsAtLength = getLengthFactory(0, 1);

        function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t,
                t13 = pow(t1, 3),
                t12 = pow(t1, 2),
                t2 = t * t,
                t3 = t2 * t,
                x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
                y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
                mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
                my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
                nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
                ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
                ax = t1 * p1x + t * c1x,
                ay = t1 * p1y + t * c1y,
                cx = t1 * c2x + t * p2x,
                cy = t1 * c2y + t * p2y,
                alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
            // (mx > nx || my < ny) && (alpha += 180);
            return {
                x: x,
                y: y,
                m: {x: mx, y: my},
                n: {x: nx, y: ny},
                start: {x: ax, y: ay},
                end: {x: cx, y: cy},
                alpha: alpha
            };
        }

        function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            if (!Snap.is(p1x, "array")) {
                p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
            }
            var bbox = curveDim.apply(null, p1x);
            return box(
                bbox.min.x,
                bbox.min.y,
                bbox.max.x - bbox.min.x,
                bbox.max.y - bbox.min.y
            );
        }

        function isPointInsideBBox(bbox, x, y) {
            return x >= bbox.x &&
                x <= bbox.x + bbox.width &&
                y >= bbox.y &&
                y <= bbox.y + bbox.height;
        }

        function isBBoxIntersect(bbox1, bbox2) {
            bbox1 = box(bbox1);
            bbox2 = box(bbox2);
            return isPointInsideBBox(bbox2, bbox1.x, bbox1.y)
                || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y)
                || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2)
                || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2)
                || isPointInsideBBox(bbox1, bbox2.x, bbox2.y)
                || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y)
                || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2)
                || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2)
                || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x
                    || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
                && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y
                    || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
        }

        function base3(t, p1, p2, p3, p4) {
            var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
                t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
            return t * t2 - 3 * p1 + 3 * p2;
        }

        function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
            if (z == null) {
                z = 1;
            }
            z = z > 1 ? 1 : z < 0 ? 0 : z;
            var z2 = z / 2,
                n = 12,
                Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
                Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
                sum = 0;
            for (var i = 0; i < n; i++) {
                var ct = z2 * Tvalues[i] + z2,
                    xbase = base3(ct, x1, x2, x3, x4),
                    ybase = base3(ct, y1, y2, y3, y4),
                    comb = xbase * xbase + ybase * ybase;
                sum += Cvalues[i] * math.sqrt(comb);
            }
            return z2 * sum;
        }

        function getTotLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
            if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
                return;
            }
            var t = 1,
                step = t / 2,
                t2 = t - step,
                l,
                e = .01;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
            while (abs(l - ll) > e) {
                step /= 2;
                t2 += (l < ll ? 1 : -1) * step;
                l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
            }
            return t2;
        }

        function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
            if (
                mmax(x1, x2) < mmin(x3, x4) ||
                mmin(x1, x2) > mmax(x3, x4) ||
                mmax(y1, y2) < mmin(y3, y4) ||
                mmin(y1, y2) > mmax(y3, y4)
            ) {
                return;
            }
            var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
                ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
                denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

            if (!denominator) {
                return;
            }
            var px = nx / denominator,
                py = ny / denominator,
                px2 = +px.toFixed(2),
                py2 = +py.toFixed(2);
            if (
                px2 < +mmin(x1, x2).toFixed(2) ||
                px2 > +mmax(x1, x2).toFixed(2) ||
                px2 < +mmin(x3, x4).toFixed(2) ||
                px2 > +mmax(x3, x4).toFixed(2) ||
                py2 < +mmin(y1, y2).toFixed(2) ||
                py2 > +mmax(y1, y2).toFixed(2) ||
                py2 < +mmin(y3, y4).toFixed(2) ||
                py2 > +mmax(y3, y4).toFixed(2)
            ) {
                return;
            }
            return {x: px, y: py};
        }

        function inter(bez1, bez2) {
            return interHelper(bez1, bez2);
        }

        function interCount(bez1, bez2) {
            return interHelper(bez1, bez2, 1);
        }

        function interHelper(bez1, bez2, justCount) {
            var bbox1 = bezierBBox(bez1),
                bbox2 = bezierBBox(bez2);
            if (!isBBoxIntersect(bbox1, bbox2)) {
                return justCount ? 0 : [];
            }
            var l1 = bezlen.apply(0, bez1),
                l2 = bezlen.apply(0, bez2),
                n1 = ~~(l1 / 8),
                n2 = ~~(l2 / 8),
                dots1 = [],
                dots2 = [],
                xy = {},
                res = justCount ? 0 : [];
            for (var i = 0; i < n1 + 1; i++) {
                var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
                dots1.push({x: p.x, y: p.y, t: i / n1});
            }
            for (i = 0; i < n2 + 1; i++) {
                p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
                dots2.push({x: p.x, y: p.y, t: i / n2});
            }
            for (i = 0; i < n1; i++) {
                for (var j = 0; j < n2; j++) {
                    var di = dots1[i],
                        di1 = dots1[i + 1],
                        dj = dots2[j],
                        dj1 = dots2[j + 1],
                        ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                        cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                        is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                    if (is) {
                        if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                            continue;
                        }
                        xy[is.x.toFixed(4)] = is.y.toFixed(4);
                        var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                            t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                        if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                            if (justCount) {
                                res++;
                            } else {
                                res.push({
                                    x: is.x,
                                    y: is.y,
                                    t1: t1,
                                    t2: t2
                                });
                            }
                        }
                    }
                }
            }
            return res;
        }

        function pathIntersection(path1, path2) {
            return interPathHelper(path1, path2);
        }

        function pathIntersectionNumber(path1, path2) {
            return interPathHelper(path1, path2, 1);
        }

        function interPathHelper(path1, path2, justCount) {
            path1 = path2curve(path1);
            path2 = path2curve(path2);
            var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
                res = justCount ? 0 : [];
            for (var i = 0, ii = path1.length; i < ii; i++) {
                var pi = path1[i];
                if (pi[0] == "M") {
                    x1 = x1m = pi[1];
                    y1 = y1m = pi[2];
                } else {
                    if (pi[0] == "C") {
                        bez1 = [x1, y1].concat(pi.slice(1));
                        x1 = bez1[6];
                        y1 = bez1[7];
                    } else {
                        bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                        x1 = x1m;
                        y1 = y1m;
                    }
                    for (var j = 0, jj = path2.length; j < jj; j++) {
                        var pj = path2[j];
                        if (pj[0] == "M") {
                            x2 = x2m = pj[1];
                            y2 = y2m = pj[2];
                        } else {
                            if (pj[0] == "C") {
                                bez2 = [x2, y2].concat(pj.slice(1));
                                x2 = bez2[6];
                                y2 = bez2[7];
                            } else {
                                bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                                x2 = x2m;
                                y2 = y2m;
                            }
                            var intr = interHelper(bez1, bez2, justCount);
                            if (justCount) {
                                res += intr;
                            } else {
                                for (var k = 0, kk = intr.length; k < kk; k++) {
                                    intr[k].segment1 = i;
                                    intr[k].segment2 = j;
                                    intr[k].bez1 = bez1;
                                    intr[k].bez2 = bez2;
                                }
                                res = res.concat(intr);
                            }
                        }
                    }
                }
            }
            return res;
        }

        function isPointInsidePath(path, x, y) {
            var bbox = pathBBox(path);
            return isPointInsideBBox(bbox, x, y) &&
                interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
        }

        function pathBBox(path) {
            var pth = paths(path);
            if (pth.bbox) {
                return clone(pth.bbox);
            }
            if (!path) {
                return box();
            }
            path = path2curve(path);
            var x = 0,
                y = 0,
                X = [],
                Y = [],
                p;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = p[1];
                    y = p[2];
                    X.push(x);
                    Y.push(y);
                } else {
                    var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    X = X.concat(dim.min.x, dim.max.x);
                    Y = Y.concat(dim.min.y, dim.max.y);
                    x = p[5];
                    y = p[6];
                }
            }
            var xmin = mmin.apply(0, X),
                ymin = mmin.apply(0, Y),
                xmax = mmax.apply(0, X),
                ymax = mmax.apply(0, Y),
                bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
            pth.bbox = clone(bb);
            return bb;
        }

        function rectPath(x, y, w, h, r) {
            if (r) {
                return [
                    ["M", +x + +r, y],
                    ["l", w - r * 2, 0],
                    ["a", r, r, 0, 0, 1, r, r],
                    ["l", 0, h - r * 2],
                    ["a", r, r, 0, 0, 1, -r, r],
                    ["l", r * 2 - w, 0],
                    ["a", r, r, 0, 0, 1, -r, -r],
                    ["l", 0, r * 2 - h],
                    ["a", r, r, 0, 0, 1, r, -r],
                    ["z"]
                ];
            }
            var res = [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
            res.toString = toString;
            return res;
        }

        function ellipsePath(x, y, rx, ry, a) {
            if (a == null && ry == null) {
                ry = rx;
            }
            x = +x;
            y = +y;
            rx = +rx;
            ry = +ry;
            if (a != null) {
                var rad = Math.PI / 180,
                    x1 = x + rx * Math.cos(-ry * rad),
                    x2 = x + rx * Math.cos(-a * rad),
                    y1 = y + rx * Math.sin(-ry * rad),
                    y2 = y + rx * Math.sin(-a * rad),
                    res = [["M", x1, y1], ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
            } else {
                res = [
                    ["M", x, y],
                    ["m", 0, -ry],
                    ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
                    ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
                    ["z"]
                ];
            }
            res.toString = toString;
            return res;
        }

        var unit2px = Snap._unit2px,
            getPath = {
                path: function (el) {
                    return el.attr("path");
                },
                circle: function (el) {
                    var attr = unit2px(el);
                    return ellipsePath(attr.cx, attr.cy, attr.r);
                },
                ellipse: function (el) {
                    var attr = unit2px(el);
                    return ellipsePath(attr.cx || 0, attr.cy || 0, attr.rx, attr.ry);
                },
                rect: function (el) {
                    var attr = unit2px(el);
                    return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height, attr.rx, attr.ry);
                },
                image: function (el) {
                    var attr = unit2px(el);
                    return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height);
                },
                line: function (el) {
                    return "M" + [el.attr("x1") || 0, el.attr("y1") || 0, el.attr("x2"), el.attr("y2")];
                },
                polyline: function (el) {
                    return "M" + el.attr("points");
                },
                polygon: function (el) {
                    return "M" + el.attr("points") + "z";
                },
                deflt: function (el) {
                    var bbox = el.node.getBBox();
                    return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
                }
            };

        function pathToRelative(pathArray) {
            var pth = paths(pathArray),
                lowerCase = String.prototype.toLowerCase;
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!Snap.is(pathArray, "array") || !Snap.is(pathArray && pathArray[0], "array")) {
                pathArray = Snap.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = toString;
            pth.rel = pathClone(res);
            return res;
        }

        function pathToAbsolute(pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!is(pathArray, "array") || !is(pathArray && pathArray[0], "array")) { // rough assumption
                pathArray = Snap.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [["M", 0, 0]];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0,
                pa0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 &&
                pathArray[0][0] == "M" &&
                pathArray[1][0].toUpperCase() == "R" &&
                pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                pa0 = pa[0];
                if (pa0 != pa0.toUpperCase()) {
                    r[0] = pa0.toUpperCase();
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +pa[6] + x;
                            r[7] = +pa[7] + y;
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y].concat(pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res.concat(catmullRom2bezier(dots, crz));
                            break;
                        case "O":
                            res.pop();
                            dots = ellipsePath(x, y, pa[1], pa[2]);
                            dots.push(dots[0]);
                            res = res.concat(dots);
                            break;
                        case "U":
                            res.pop();
                            res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
                            r = ["U"].concat(res[res.length - 1].slice(-2));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + (j % 2 ? x : y);
                            }
                    }
                } else if (pa0 == "R") {
                    dots = [x, y].concat(pa.slice(1));
                    res.pop();
                    res = res.concat(catmullRom2bezier(dots, crz));
                    r = ["R"].concat(pa.slice(-2));
                } else if (pa0 == "O") {
                    res.pop();
                    dots = ellipsePath(x, y, pa[1], pa[2]);
                    dots.push(dots[0]);
                    res = res.concat(dots);
                } else if (pa0 == "U") {
                    res.pop();
                    res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
                    r = ["U"].concat(res[res.length - 1].slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                pa0 = pa0.toUpperCase();
                if (pa0 != "O") {
                    switch (r[0]) {
                        case "Z":
                            x = +mx;
                            y = +my;
                            break;
                        case "H":
                            x = r[1];
                            break;
                        case "V":
                            y = r[1];
                            break;
                        case "M":
                            mx = r[r.length - 2];
                            my = r[r.length - 1];
                        default:
                            x = r[r.length - 2];
                            y = r[r.length - 1];
                    }
                }
            }
            res.toString = toString;
            pth.abs = pathClone(res);
            return res;
        }

        function l2c(x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        }

        function q2c(x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
        }

        function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = Snap._.cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!rx || !ry) {
                return [x1, y1, x2, y2, x2, y2];
            }
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = x * x / (rx * rx) + y * y / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4].concat(res);
            } else {
                res = [m2, m3, m4].concat(res).join().split(",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        }

        function findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        }

        // Returns bounding box of cubic bezier curve.
        // Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        // Original version: NISHIO Hirokazu
        // Modifications: https://github.com/timo22345
        function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
            var tvalues = [],
                bounds = [[], []],
                a, b, c, t, t1, t2, b2ac, sqrtb2ac;
            for (var i = 0; i < 2; ++i) {
                if (i == 0) {
                    b = 6 * x0 - 12 * x1 + 6 * x2;
                    a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
                    c = 3 * x1 - 3 * x0;
                } else {
                    b = 6 * y0 - 12 * y1 + 6 * y2;
                    a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
                    c = 3 * y1 - 3 * y0;
                }
                if (abs(a) < 1e-12) {
                    if (abs(b) < 1e-12) {
                        continue;
                    }
                    t = -c / b;
                    if (0 < t && t < 1) {
                        tvalues.push(t);
                    }
                    continue;
                }
                b2ac = b * b - 4 * c * a;
                sqrtb2ac = math.sqrt(b2ac);
                if (b2ac < 0) {
                    continue;
                }
                t1 = (-b + sqrtb2ac) / (2 * a);
                if (0 < t1 && t1 < 1) {
                    tvalues.push(t1);
                }
                t2 = (-b - sqrtb2ac) / (2 * a);
                if (0 < t2 && t2 < 1) {
                    tvalues.push(t2);
                }
            }

            var x, y, j = tvalues.length,
                jlen = j,
                mt;
            while (j--) {
                t = tvalues[j];
                mt = 1 - t;
                bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
                bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
            }

            bounds[0][jlen] = x0;
            bounds[1][jlen] = y0;
            bounds[0][jlen + 1] = x3;
            bounds[1][jlen + 1] = y3;
            bounds[0].length = bounds[1].length = jlen + 2;


            return {
                min: {x: mmin.apply(0, bounds[0]), y: mmin.apply(0, bounds[1])},
                max: {x: mmax.apply(0, bounds[0]), y: mmax.apply(0, bounds[1])}
            };
        }

        function path2curve(path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d, pcom) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T: 1, Q: 1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
                            break;
                        case "S":
                            if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
                                nx = d.x * 2 - d.bx;          // And reflect the previous
                                ny = d.y * 2 - d.by;          // command's control point relative to the current point.
                            }
                            else {                            // or some else or nothing
                                nx = d.x;
                                ny = d.y;
                            }
                            path = ["C", nx, ny].concat(path.slice(1));
                            break;
                        case "T":
                            if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
                                d.qx = d.x * 2 - d.qx;        // And make a reflection similar
                                d.qy = d.y * 2 - d.qy;        // to case "S".
                            }
                            else {                            // or something else or nothing
                                d.qx = d.x;
                                d.qy = d.y;
                            }
                            path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
                            p2 && (pcoms2[i] = "A"); // the same as above
                            pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                pcoms1 = [], // path commands of original path p
                pcoms2 = [], // path commands of original path p2
                pfirst = "", // temporary holder for original path command
                pcom = ""; // holder for previous path command of original path
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] && (pfirst = p[i][0]); // save current path command

                if (pfirst != "C") // C is not saved yet, because it may be result of conversion
                {
                    pcoms1[i] = pfirst; // Save current path command
                    i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
                }
                p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

                if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
                // which may produce multiple C:s
                // so we have to make sure that C is also C in original path

                fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

                if (p2) { // the same procedures is done to p2
                    p2[i] && (pfirst = p2[i][0]);
                    if (pfirst != "C") {
                        pcoms2[i] = pfirst;
                        i && (pcom = pcoms2[i - 1]);
                    }
                    p2[i] = processPath(p2[i], attrs2, pcom);

                    if (pcoms2[i] != "A" && pfirst == "C") {
                        pcoms2[i] = "C";
                    }

                    fixArc(p2, i);
                }
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }

        function mapPath(path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        }

        // http://schepers.cc/getting-to-the-point
        function catmullRom2bezier(crp, z) {
            var d = [];
            for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
                var p = [
                    {x: +crp[i - 2], y: +crp[i - 1]},
                    {x: +crp[i], y: +crp[i + 1]},
                    {x: +crp[i + 2], y: +crp[i + 3]},
                    {x: +crp[i + 4], y: +crp[i + 5]}
                ];
                if (z) {
                    if (!i) {
                        p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                    } else if (iLen - 4 == i) {
                        p[3] = {x: +crp[0], y: +crp[1]};
                    } else if (iLen - 2 == i) {
                        p[2] = {x: +crp[0], y: +crp[1]};
                        p[3] = {x: +crp[2], y: +crp[3]};
                    }
                } else {
                    if (iLen - 4 == i) {
                        p[3] = p[2];
                    } else if (!i) {
                        p[0] = {x: +crp[i], y: +crp[i + 1]};
                    }
                }
                d.push(["C",
                    (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                    (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                    (p[1].x + 6 * p[2].x - p[3].x) / 6,
                    (p[1].y + 6 * p[2].y - p[3].y) / 6,
                    p[2].x,
                    p[2].y
                ]);
            }

            return d;
        }

        // export
        Snap.path = paths;

        /*\
     * Snap.path.getTotalLength
     [ method ]
     **
     * Returns the length of the given path in pixels
     **
     - path (string) SVG path string
     **
     = (number) length
    \*/
        Snap.path.getTotalLength = getTotalLength;
        /*\
     * Snap.path.getPointAtLength
     [ method ]
     **
     * Returns the coordinates of the point located at the given length along the given path
     **
     - path (string) SVG path string
     - length (number) length, in pixels, from the start of the path, excluding non-rendering jumps
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate,
     o     y: (number) y coordinate,
     o     alpha: (number) angle of derivative
     o }
    \*/
        Snap.path.getPointAtLength = getPointAtLength;
        /*\
     * Snap.path.getSubpath
     [ method ]
     **
     * Returns the subpath of a given path between given start and end lengths
     **
     - path (string) SVG path string
     - from (number) length, in pixels, from the start of the path to the start of the segment
     - to (number) length, in pixels, from the start of the path to the end of the segment
     **
     = (string) path string definition for the segment
    \*/
        Snap.path.getSubpath = function (path, from, to) {
            if (this.getTotalLength(path) - to < 1e-6) {
                return getSubpathsAtLength(path, from).end;
            }
            var a = getSubpathsAtLength(path, to, 1);
            return from ? getSubpathsAtLength(a, from).end : a;
        };
        /*\
     * Element.getTotalLength
     [ method ]
     **
     * Returns the length of the path in pixels (only works for `path` elements)
     = (number) length
    \*/
        elproto.getTotalLength = function () {
            if (this.node.getTotalLength) {
                return this.node.getTotalLength();
            }
        };
        // SIERRA Element.getPointAtLength()/Element.getTotalLength(): If a <path> is broken into different segments, is the jump distance to the new coordinates set by the _M_ or _m_ commands calculated as part of the path's total length?
        /*\
     * Element.getPointAtLength
     [ method ]
     **
     * Returns coordinates of the point located at the given length on the given path (only works for `path` elements)
     **
     - length (number) length, in pixels, from the start of the path, excluding non-rendering jumps
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate,
     o     y: (number) y coordinate,
     o     alpha: (number) angle of derivative
     o }
    \*/
        elproto.getPointAtLength = function (length) {
            return getPointAtLength(this.attr("d"), length);
        };
        // SIERRA Element.getSubpath(): Similar to the problem for Element.getPointAtLength(). Unclear how this would work for a segmented path. Overall, the concept of _subpath_ and what I'm calling a _segment_ (series of non-_M_ or _Z_ commands) is unclear.
        /*\
     * Element.getSubpath
     [ method ]
     **
     * Returns subpath of a given element from given start and end lengths (only works for `path` elements)
     **
     - from (number) length, in pixels, from the start of the path to the start of the segment
     - to (number) length, in pixels, from the start of the path to the end of the segment
     **
     = (string) path string definition for the segment
    \*/
        elproto.getSubpath = function (from, to) {
            return Snap.path.getSubpath(this.attr("d"), from, to);
        };
        Snap._.box = box;
        /*\
     * Snap.path.findDotsAtSegment
     [ method ]
     **
     * Utility method
     **
     * Finds dot coordinates on the given cubic beziér curve at the given t
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     - t (number) position on the curve (0..1)
     = (object) point information in format:
     o {
     o     x: (number) x coordinate of the point,
     o     y: (number) y coordinate of the point,
     o     m: {
     o         x: (number) x coordinate of the left anchor,
     o         y: (number) y coordinate of the left anchor
     o     },
     o     n: {
     o         x: (number) x coordinate of the right anchor,
     o         y: (number) y coordinate of the right anchor
     o     },
     o     start: {
     o         x: (number) x coordinate of the start of the curve,
     o         y: (number) y coordinate of the start of the curve
     o     },
     o     end: {
     o         x: (number) x coordinate of the end of the curve,
     o         y: (number) y coordinate of the end of the curve
     o     },
     o     alpha: (number) angle of the curve derivative at the point
     o }
    \*/
        Snap.path.findDotsAtSegment = findDotsAtSegment;
        /*\
     * Snap.path.bezierBBox
     [ method ]
     **
     * Utility method
     **
     * Returns the bounding box of a given cubic beziér curve
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     * or
     - bez (array) array of six points for beziér curve
     = (object) bounding box
     o {
     o     x: (number) x coordinate of the left top point of the box,
     o     y: (number) y coordinate of the left top point of the box,
     o     x2: (number) x coordinate of the right bottom point of the box,
     o     y2: (number) y coordinate of the right bottom point of the box,
     o     width: (number) width of the box,
     o     height: (number) height of the box
     o }
    \*/
        Snap.path.bezierBBox = bezierBBox;
        /*\
     * Snap.path.isPointInsideBBox
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if given point is inside bounding box
     - bbox (string) bounding box
     - x (string) x coordinate of the point
     - y (string) y coordinate of the point
     = (boolean) `true` if point is inside
    \*/
        Snap.path.isPointInsideBBox = isPointInsideBBox;
        Snap.closest = function (x, y, X, Y) {
            var r = 100,
                b = box(x - r / 2, y - r / 2, r, r),
                inside = [],
                getter = X[0].hasOwnProperty("x") ? function (i) {
                    return {
                        x: X[i].x,
                        y: X[i].y
                    };
                } : function (i) {
                    return {
                        x: X[i],
                        y: Y[i]
                    };
                },
                found = 0;
            while (r <= 1e6 && !found) {
                for (var i = 0, ii = X.length; i < ii; i++) {
                    var xy = getter(i);
                    if (isPointInsideBBox(b, xy.x, xy.y)) {
                        found++;
                        inside.push(xy);
                        break;
                    }
                }
                if (!found) {
                    r *= 2;
                    b = box(x - r / 2, y - r / 2, r, r)
                }
            }
            if (r == 1e6) {
                return;
            }
            var len = Infinity,
                res;
            for (i = 0, ii = inside.length; i < ii; i++) {
                var l = Snap.len(x, y, inside[i].x, inside[i].y);
                if (len > l) {
                    len = l;
                    inside[i].len = l;
                    res = inside[i];
                }
            }
            return res;
        };
        /*\
     * Snap.path.isBBoxIntersect
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if two bounding boxes intersect
     - bbox1 (string) first bounding box
     - bbox2 (string) second bounding box
     = (boolean) `true` if bounding boxes intersect
    \*/
        Snap.path.isBBoxIntersect = isBBoxIntersect;
        /*\
     * Snap.path.intersection
     [ method ]
     **
     * Utility method
     **
     * Finds intersections of two paths
     - path1 (string) path string
     - path2 (string) path string
     = (array) dots of intersection
     o [
     o     {
     o         x: (number) x coordinate of the point,
     o         y: (number) y coordinate of the point,
     o         t1: (number) t value for segment of path1,
     o         t2: (number) t value for segment of path2,
     o         segment1: (number) order number for segment of path1,
     o         segment2: (number) order number for segment of path2,
     o         bez1: (array) eight coordinates representing beziér curve for the segment of path1,
     o         bez2: (array) eight coordinates representing beziér curve for the segment of path2
     o     }
     o ]
    \*/
        Snap.path.intersection = pathIntersection;
        Snap.path.intersectionNumber = pathIntersectionNumber;
        /*\
     * Snap.path.isPointInside
     [ method ]
     **
     * Utility method
     **
     * Returns `true` if given point is inside a given closed path.
     *
     * Note: fill mode doesn’t affect the result of this method.
     - path (string) path string
     - x (number) x of the point
     - y (number) y of the point
     = (boolean) `true` if point is inside the path
    \*/
        Snap.path.isPointInside = isPointInsidePath;
        /*\
     * Snap.path.getBBox
     [ method ]
     **
     * Utility method
     **
     * Returns the bounding box of a given path
     - path (string) path string
     = (object) bounding box
     o {
     o     x: (number) x coordinate of the left top point of the box,
     o     y: (number) y coordinate of the left top point of the box,
     o     x2: (number) x coordinate of the right bottom point of the box,
     o     y2: (number) y coordinate of the right bottom point of the box,
     o     width: (number) width of the box,
     o     height: (number) height of the box
     o }
    \*/
        Snap.path.getBBox = pathBBox;
        Snap.path.get = getPath;
        /*\
     * Snap.path.toRelative
     [ method ]
     **
     * Utility method
     **
     * Converts path coordinates into relative values
     - path (string) path string
     = (array) path string
    \*/
        Snap.path.toRelative = pathToRelative;
        /*\
     * Snap.path.toAbsolute
     [ method ]
     **
     * Utility method
     **
     * Converts path coordinates into absolute values
     - path (string) path string
     = (array) path string
    \*/
        Snap.path.toAbsolute = pathToAbsolute;
        /*\
     * Snap.path.toCubic
     [ method ]
     **
     * Utility method
     **
     * Converts path to a new path where all segments are cubic beziér curves
     - pathString (string|array) path string or array of segments
     = (array) array of segments
    \*/
        Snap.path.toCubic = path2curve;
        /*\
     * Snap.path.map
     [ method ]
     **
     * Transform the path string with the given matrix
     - path (string) path string
     - matrix (object) see @Matrix
     = (string) transformed path string
    \*/
        Snap.path.map = mapPath;
        Snap.path.toString = toString;
        Snap.path.clone = pathClone;
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob) {
        var mmax = Math.max,
            mmin = Math.min;

        // Set
        var Set = function (items) {
                this.items = [];
                this.bindings = {};
                this.length = 0;
                this.type = "set";
                if (items) {
                    for (var i = 0, ii = items.length; i < ii; i++) {
                        if (items[i]) {
                            this[this.items.length] = this.items[this.items.length] = items[i];
                            this.length++;
                        }
                    }
                }
            },
            setproto = Set.prototype;
        /*\
     * Set.push
     [ method ]
     **
     * Adds each argument to the current set
     = (object) original element
    \*/
        setproto.push = function () {
            var item,
                len;
            for (var i = 0, ii = arguments.length; i < ii; i++) {
                item = arguments[i];
                if (item) {
                    len = this.items.length;
                    this[len] = this.items[len] = item;
                    this.length++;
                }
            }
            return this;
        };
        /*\
     * Set.pop
     [ method ]
     **
     * Removes last element and returns it
     = (object) element
    \*/
        setproto.pop = function () {
            this.length && delete this[this.length--];
            return this.items.pop();
        };
        /*\
     * Set.forEach
     [ method ]
     **
     * Executes given function for each element in the set
     *
     * If the function returns `false`, the loop stops running.
     **
     - callback (function) function to run
     - thisArg (object) context object for the callback
     = (object) Set object
    \*/
        setproto.forEach = function (callback, thisArg) {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                if (callback.call(thisArg, this.items[i], i) === false) {
                    return this;
                }
            }
            return this;
        };
        /*\
     * Set.animate
     [ method ]
     **
     * Animates each element in set in sync.
     *
     **
     - attrs (object) key-value pairs of destination attributes
     - duration (number) duration of the animation in milliseconds
     - easing (function) #optional easing function from @mina or custom
     - callback (function) #optional callback function that executes when the animation ends
     * or
     - animation (array) array of animation parameter for each element in set in format `[attrs, duration, easing, callback]`
     > Usage
     | // animate all elements in set to radius 10
     | set.animate({r: 10}, 500, mina.easein);
     | // or
     | // animate first element to radius 10, but second to radius 20 and in different time
     | set.animate([{r: 10}, 500, mina.easein], [{r: 20}, 1500, mina.easein]);
     = (Element) the current element
    \*/
        setproto.animate = function (attrs, ms, easing, callback) {
            if (typeof easing == "function" && !easing.length) {
                callback = easing;
                easing = mina.linear;
            }
            if (attrs instanceof Snap._.Animation) {
                callback = attrs.callback;
                easing = attrs.easing;
                ms = easing.dur;
                attrs = attrs.attr;
            }
            var args = arguments;
            if (Snap.is(attrs, "array") && Snap.is(args[args.length - 1], "array")) {
                var each = true;
            }
            var begin,
                handler = function () {
                    if (begin) {
                        this.b = begin;
                    } else {
                        begin = this.b;
                    }
                },
                cb = 0,
                set = this,
                callbacker = callback && function () {
                    if (++cb == set.length) {
                        callback.call(this);
                    }
                };
            return this.forEach(function (el, i) {
                eve.once("snap.animcreated." + el.id, handler);
                if (each) {
                    args[i] && el.animate.apply(el, args[i]);
                } else {
                    el.animate(attrs, ms, easing, callbacker);
                }
            });
        };
        /*\
     * Set.remove
     [ method ]
     **
     * Removes all children of the set.
     *
     = (object) Set object
    \*/
        setproto.remove = function () {
            while (this.length) {
                this.pop().remove();
            }
            return this;
        };
        /*\
     * Set.bind
     [ method ]
     **
     * Specifies how to handle a specific attribute when applied
     * to a set.
     *
     **
     - attr (string) attribute name
     - callback (function) function to run
     * or
     - attr (string) attribute name
     - element (Element) specific element in the set to apply the attribute to
     * or
     - attr (string) attribute name
     - element (Element) specific element in the set to apply the attribute to
     - eattr (string) attribute on the element to bind the attribute to
     = (object) Set object
    \*/
        setproto.bind = function (attr, a, b) {
            var data = {};
            if (typeof a == "function") {
                this.bindings[attr] = a;
            } else {
                var aname = b || attr;
                this.bindings[attr] = function (v) {
                    data[aname] = v;
                    a.attr(data);
                };
            }
            return this;
        };
        /*\
     * Set.attr
     [ method ]
     **
     * Equivalent of @Element.attr.
     = (object) Set object
    \*/
        setproto.attr = function (value) {
            var unbound = {};
            for (var k in value) {
                if (this.bindings[k]) {
                    this.bindings[k](value[k]);
                } else {
                    unbound[k] = value[k];
                }
            }
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(unbound);
            }
            return this;
        };
        /*\
     * Set.clear
     [ method ]
     **
     * Removes all elements from the set
    \*/
        setproto.clear = function () {
            while (this.length) {
                this.pop();
            }
        };
        /*\
     * Set.splice
     [ method ]
     **
     * Removes range of elements from the set
     **
     - index (number) position of the deletion
     - count (number) number of element to remove
     - insertion… (object) #optional elements to insert
     = (object) set elements that were deleted
    \*/
        setproto.splice = function (index, count, insertion) {
            index = index < 0 ? mmax(this.length + index, 0) : index;
            count = mmax(0, mmin(this.length - index, count));
            var tail = [],
                todel = [],
                args = [],
                i;
            for (i = 2; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            for (i = 0; i < count; i++) {
                todel.push(this[index + i]);
            }
            for (; i < this.length - index; i++) {
                tail.push(this[index + i]);
            }
            var arglen = args.length;
            for (i = 0; i < arglen + tail.length; i++) {
                this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
            }
            i = this.items.length = this.length -= count - arglen;
            while (this[i]) {
                delete this[i++];
            }
            return new Set(todel);
        };
        /*\
     * Set.exclude
     [ method ]
     **
     * Removes given element from the set
     **
     - element (object) element to remove
     = (boolean) `true` if object was found and removed from the set
    \*/
        setproto.exclude = function (el) {
            for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
                this.splice(i, 1);
                return true;
            }
            return false;
        };
        /*\
     * Set.insertAfter
     [ method ]
     **
     * Inserts set elements after given element.
     **
     - element (object) set will be inserted after this element
     = (object) Set object
    \*/
        setproto.insertAfter = function (el) {
            var i = this.items.length;
            while (i--) {
                this.items[i].insertAfter(el);
            }
            return this;
        };
        /*\
     * Set.getBBox
     [ method ]
     **
     * Union of all bboxes of the set. See @Element.getBBox.
     = (object) bounding box descriptor. See @Element.getBBox.
    \*/
        setproto.getBBox = function () {
            var x = [],
                y = [],
                x2 = [],
                y2 = [];
            for (var i = this.items.length; i--;) if (!this.items[i].removed) {
                var box = this.items[i].getBBox();
                x.push(box.x);
                y.push(box.y);
                x2.push(box.x + box.width);
                y2.push(box.y + box.height);
            }
            x = mmin.apply(0, x);
            y = mmin.apply(0, y);
            x2 = mmax.apply(0, x2);
            y2 = mmax.apply(0, y2);
            return {
                x: x,
                y: y,
                x2: x2,
                y2: y2,
                width: x2 - x,
                height: y2 - y,
                cx: x + (x2 - x) / 2,
                cy: y + (y2 - y) / 2
            };
        };
        /*\
     * Set.insertAfter
     [ method ]
     **
     * Creates a clone of the set.
     **
     = (object) New Set object
    \*/
        setproto.clone = function (s) {
            s = new Set;
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                s.push(this.items[i].clone());
            }
            return s;
        };
        setproto.toString = function () {
            return "Snap\u2018s set";
        };
        setproto.type = "set";
        // export
        /*\
     * Snap.Set
     [ property ]
     **
     * Set constructor.
    \*/
        Snap.Set = Set;
        /*\
     * Snap.set
     [ method ]
     **
     * Creates a set and fills it with list of arguments.
     **
     = (object) New Set object
     | var r = paper.rect(0, 0, 10, 10),
     |     s1 = Snap.set(), // empty set
     |     s2 = Snap.set(r, paper.circle(100, 100, 20)); // prefilled set
    \*/
        Snap.set = function () {
            var set = new Set;
            if (arguments.length) {
                set.push.apply(set, Array.prototype.slice.call(arguments, 0));
            }
            return set;
        };
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob) {
        var names = {},
            reUnit = /[%a-z]+$/i,
            Str = String;
        names.stroke = names.fill = "colour";

        function getEmpty(item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t":
                    return [l, 0, 0];
                case "m":
                    return [l, 1, 0, 0, 1, 0, 0];
                case "r":
                    if (item.length == 4) {
                        return [l, 0, item[2], item[3]];
                    } else {
                        return [l, 0];
                    }
                case "s":
                    if (item.length == 5) {
                        return [l, 1, 1, item[3], item[4]];
                    } else if (item.length == 3) {
                        return [l, 1, 1];
                    } else {
                        return [l, 1];
                    }
            }
        }

        function equaliseTransform(t1, t2, getBBox) {
            t1 = t1 || new Snap.Matrix;
            t2 = t2 || new Snap.Matrix;
            t1 = Snap.parseTransformString(t1.toTransformString()) || [];
            t2 = Snap.parseTransformString(t2.toTransformString()) || [];
            var maxlength = Math.max(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if (tt1[0] != tt2[0] ||
                    tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) ||
                    tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4])
                ) {
                    t1 = Snap._.transform2matrix(t1, getBBox());
                    t2 = Snap._.transform2matrix(t2, getBBox());
                    from = [["m", t1.a, t1.b, t1.c, t1.d, t1.e, t1.f]];
                    to = [["m", t2.a, t2.b, t2.c, t2.d, t2.e, t2.f]];
                    break;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = Math.max(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: path2array(from),
                to: path2array(to),
                f: getPath(from)
            };
        }

        function getNumber(val) {
            return val;
        }

        function getUnit(unit) {
            return function (val) {
                return +val.toFixed(3) + unit;
            };
        }

        function getViewBox(val) {
            return val.join(" ");
        }

        function getColour(clr) {
            return Snap.rgb(clr[0], clr[1], clr[2], clr[3]);
        }

        function getPath(path) {
            var k = 0, i, ii, j, jj, out, a, b = [];
            for (i = 0, ii = path.length; i < ii; i++) {
                out = "[";
                a = ['"' + path[i][0] + '"'];
                for (j = 1, jj = path[i].length; j < jj; j++) {
                    a[j] = "val[" + k++ + "]";
                }
                out += a + "]";
                b[i] = out;
            }
            return Function("val", "return Snap.path.toString.call([" + b + "])");
        }

        function path2array(path) {
            var out = [];
            for (var i = 0, ii = path.length; i < ii; i++) {
                for (var j = 1, jj = path[i].length; j < jj; j++) {
                    out.push(path[i][j]);
                }
            }
            return out;
        }

        function isNumeric(obj) {
            return isFinite(obj);
        }

        function arrayEqual(arr1, arr2) {
            if (!Snap.is(arr1, "array") || !Snap.is(arr2, "array")) {
                return false;
            }
            return arr1.toString() == arr2.toString();
        }

        Element.prototype.equal = function (name, b) {
            return eve("snap.util.equal", this, name, b).firstDefined();
        };
        eve.on("snap.util.equal", function (name, b) {
            var A, B, a = Str(this.attr(name) || ""),
                el = this;
            if (names[name] == "colour") {
                A = Snap.color(a);
                B = Snap.color(b);
                return {
                    from: [A.r, A.g, A.b, A.opacity],
                    to: [B.r, B.g, B.b, B.opacity],
                    f: getColour
                };
            }
            if (name == "viewBox") {
                A = this.attr(name).vb.split(" ").map(Number);
                B = b.split(" ").map(Number);
                return {
                    from: A,
                    to: B,
                    f: getViewBox
                };
            }
            if (name == "transform" || name == "gradientTransform" || name == "patternTransform") {
                if (typeof b == "string") {
                    b = Str(b).replace(/\.{3}|\u2026/g, a);
                }
                a = this.matrix;
                if (!Snap._.rgTransform.test(b)) {
                    b = Snap._.transform2matrix(Snap._.svgTransform2string(b), this.getBBox());
                } else {
                    b = Snap._.transform2matrix(b, this.getBBox());
                }
                return equaliseTransform(a, b, function () {
                    return el.getBBox(1);
                });
            }
            if (name == "d" || name == "path") {
                A = Snap.path.toCubic(a, b);
                return {
                    from: path2array(A[0]),
                    to: path2array(A[1]),
                    f: getPath(A[0])
                };
            }
            if (name == "points") {
                A = Str(a).split(Snap._.separator);
                B = Str(b).split(Snap._.separator);
                return {
                    from: A,
                    to: B,
                    f: function (val) {
                        return val;
                    }
                };
            }
            if (isNumeric(a) && isNumeric(b)) {
                return {
                    from: parseFloat(a),
                    to: parseFloat(b),
                    f: getNumber
                };
            }
            var aUnit = a.match(reUnit),
                bUnit = Str(b).match(reUnit);
            if (aUnit && arrayEqual(aUnit, bUnit)) {
                return {
                    from: parseFloat(a),
                    to: parseFloat(b),
                    f: getUnit(aUnit)
                };
            } else {
                return {
                    from: this.asPX(name),
                    to: this.asPX(name, b),
                    f: getNumber
                };
            }
        });
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob) {
        var elproto = Element.prototype,
            has = "hasOwnProperty",
            supportsTouch = "createTouch" in glob.doc,
            events = [
                "click", "dblclick", "mousedown", "mousemove", "mouseout",
                "mouseover", "mouseup", "touchstart", "touchmove", "touchend",
                "touchcancel"
            ],
            touchMap = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            },
            getScroll = function (xy, el) {
                var name = xy == "y" ? "scrollTop" : "scrollLeft",
                    doc = el && el.node ? el.node.ownerDocument : glob.doc;
                return doc[name in doc.documentElement ? "documentElement" : "body"][name];
            },
            preventDefault = function () {
                this.returnValue = false;
            },
            preventTouch = function () {
                return this.originalEvent.preventDefault();
            },
            stopPropagation = function () {
                this.cancelBubble = true;
            },
            stopTouch = function () {
                return this.originalEvent.stopPropagation();
            },
            addEvent = function (obj, type, fn, element) {
                var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
                    f = function (e) {
                        var scrollY = getScroll("y", element),
                            scrollX = getScroll("x", element);
                        if (supportsTouch && touchMap[has](type)) {
                            for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                                if (e.targetTouches[i].target == obj || obj.contains(e.targetTouches[i].target)) {
                                    var olde = e;
                                    e = e.targetTouches[i];
                                    e.originalEvent = olde;
                                    e.preventDefault = preventTouch;
                                    e.stopPropagation = stopTouch;
                                    break;
                                }
                            }
                        }
                        var x = e.clientX + scrollX,
                            y = e.clientY + scrollY;
                        return fn.call(element, e, x, y);
                    };

                if (type !== realName) {
                    obj.addEventListener(type, f, false);
                }

                obj.addEventListener(realName, f, false);

                return function () {
                    if (type !== realName) {
                        obj.removeEventListener(type, f, false);
                    }

                    obj.removeEventListener(realName, f, false);
                    return true;
                };
            },
            drag = [],
            dragMove = function (e) {
                var x = e.clientX,
                    y = e.clientY,
                    scrollY = getScroll("y"),
                    scrollX = getScroll("x"),
                    dragi,
                    j = drag.length;
                while (j--) {
                    dragi = drag[j];
                    if (supportsTouch) {
                        var i = e.touches && e.touches.length,
                            touch;
                        while (i--) {
                            touch = e.touches[i];
                            if (touch.identifier == dragi.el._drag.id || dragi.el.node.contains(touch.target)) {
                                x = touch.clientX;
                                y = touch.clientY;
                                (e.originalEvent ? e.originalEvent : e).preventDefault();
                                break;
                            }
                        }
                    } else {
                        e.preventDefault();
                    }
                    var node = dragi.el.node,
                        o,
                        next = node.nextSibling,
                        parent = node.parentNode,
                        display = node.style.display;
                    // glob.win.opera && parent.removeChild(node);
                    // node.style.display = "none";
                    // o = dragi.el.paper.getElementByPoint(x, y);
                    // node.style.display = display;
                    // glob.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
                    // o && eve("snap.drag.over." + dragi.el.id, dragi.el, o);
                    x += scrollX;
                    y += scrollY;
                    eve("snap.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
                }
            },
            dragUp = function (e) {
                Snap.unmousemove(dragMove).unmouseup(dragUp);
                var i = drag.length,
                    dragi;
                while (i--) {
                    dragi = drag[i];
                    dragi.el._drag = {};
                    eve("snap.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
                    eve.off("snap.drag.*." + dragi.el.id);
                }
                drag = [];
            };
        /*\
     * Element.click
     [ method ]
     **
     * Adds a click event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.unclick
     [ method ]
     **
     * Removes a click event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.dblclick
     [ method ]
     **
     * Adds a double click event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.undblclick
     [ method ]
     **
     * Removes a double click event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.mousedown
     [ method ]
     **
     * Adds a mousedown event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.unmousedown
     [ method ]
     **
     * Removes a mousedown event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.mousemove
     [ method ]
     **
     * Adds a mousemove event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.unmousemove
     [ method ]
     **
     * Removes a mousemove event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.mouseout
     [ method ]
     **
     * Adds a mouseout event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.unmouseout
     [ method ]
     **
     * Removes a mouseout event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.mouseover
     [ method ]
     **
     * Adds a mouseover event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.unmouseover
     [ method ]
     **
     * Removes a mouseover event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.mouseup
     [ method ]
     **
     * Adds a mouseup event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.unmouseup
     [ method ]
     **
     * Removes a mouseup event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.touchstart
     [ method ]
     **
     * Adds a touchstart event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.untouchstart
     [ method ]
     **
     * Removes a touchstart event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.touchmove
     [ method ]
     **
     * Adds a touchmove event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.untouchmove
     [ method ]
     **
     * Removes a touchmove event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.touchend
     [ method ]
     **
     * Adds a touchend event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.untouchend
     [ method ]
     **
     * Removes a touchend event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/

        /*\
     * Element.touchcancel
     [ method ]
     **
     * Adds a touchcancel event handler to the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        /*\
     * Element.untouchcancel
     [ method ]
     **
     * Removes a touchcancel event handler from the element
     - handler (function) handler for the event
     = (object) @Element
    \*/
        for (var i = events.length; i--;) {
            (function (eventName) {
                Snap[eventName] = elproto[eventName] = function (fn, scope) {
                    if (Snap.is(fn, "function")) {
                        this.events = this.events || [];
                        this.events.push({
                            name: eventName,
                            f: fn,
                            unbind: addEvent(this.node || document, eventName, fn, scope || this)
                        });
                    } else {
                        for (var i = 0, ii = this.events.length; i < ii; i++) if (this.events[i].name == eventName) {
                            try {
                                this.events[i].f.call(this);
                            } catch (e) {
                            }
                        }
                    }
                    return this;
                };
                Snap["un" + eventName] =
                    elproto["un" + eventName] = function (fn) {
                        var events = this.events || [],
                            l = events.length;
                        while (l--) if (events[l].name == eventName &&
                            (events[l].f == fn || !fn)) {
                            events[l].unbind();
                            events.splice(l, 1);
                            !events.length && delete this.events;
                            return this;
                        }
                        return this;
                    };
            })(events[i]);
        }
        /*\
     * Element.hover
     [ method ]
     **
     * Adds hover event handlers to the element
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     - icontext (object) #optional context for hover in handler
     - ocontext (object) #optional context for hover out handler
     = (object) @Element
    \*/
        elproto.hover = function (f_in, f_out, scope_in, scope_out) {
            return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
        };
        /*\
     * Element.unhover
     [ method ]
     **
     * Removes hover event handlers from the element
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     = (object) @Element
    \*/
        elproto.unhover = function (f_in, f_out) {
            return this.unmouseover(f_in).unmouseout(f_out);
        };
        var draggable = [];
        // SIERRA unclear what _context_ refers to for starting, ending, moving the drag gesture.
        // SIERRA Element.drag(): _x position of the mouse_: Where are the x/y values offset from?
        // SIERRA Element.drag(): much of this member's doc appears to be duplicated for some reason.
        // SIERRA Unclear about this sentence: _Additionally following drag events will be triggered: drag.start.<id> on start, drag.end.<id> on end and drag.move.<id> on every move._ Is there a global _drag_ object to which you can assign handlers keyed by an element's ID?
        /*\
     * Element.drag
     [ method ]
     **
     * Adds event handlers for an element's drag gesture
     **
     - onmove (function) handler for moving
     - onstart (function) handler for drag start
     - onend (function) handler for drag end
     - mcontext (object) #optional context for moving handler
     - scontext (object) #optional context for drag start handler
     - econtext (object) #optional context for drag end handler
     * Additionaly following `drag` events are triggered: `drag.start.<id>` on start,
     * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element is dragged over another element
     * `drag.over.<id>` fires as well.
     *
     * Start event and start handler are called in specified context or in context of the element with following parameters:
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * Move event and move handler are called in specified context or in context of the element with following parameters:
     o dx (number) shift by x from the start point
     o dy (number) shift by y from the start point
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * End event and end handler are called in specified context or in context of the element with following parameters:
     o event (object) DOM event object
     = (object) @Element
    \*/
        elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
            var el = this;
            if (!arguments.length) {
                var origTransform;
                return el.drag(function (dx, dy) {
                    this.attr({
                        transform: origTransform + (origTransform ? "T" : "t") + [dx, dy]
                    });
                }, function () {
                    origTransform = this.transform().local;
                });
            }

            function start(e, x, y) {
                (e.originalEvent || e).preventDefault();
                el._drag.x = x;
                el._drag.y = y;
                el._drag.id = e.identifier;
                !drag.length && Snap.mousemove(dragMove).mouseup(dragUp);
                drag.push({el: el, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
                onstart && eve.on("snap.drag.start." + el.id, onstart);
                onmove && eve.on("snap.drag.move." + el.id, onmove);
                onend && eve.on("snap.drag.end." + el.id, onend);
                eve("snap.drag.start." + el.id, start_scope || move_scope || el, x, y, e);
            }

            function init(e, x, y) {
                eve("snap.draginit." + el.id, el, e, x, y);
            }

            eve.on("snap.draginit." + el.id, start);
            el._drag = {};
            draggable.push({el: el, start: start, init: init});
            el.mousedown(init);
            return el;
        };
        /*
     * Element.onDragOver
     [ method ]
     **
     * Shortcut to assign event handler for `drag.over.<id>` event, where `id` is the element's `id` (see @Element.id)
     - f (function) handler for event, first argument would be the element you are dragging over
    \*/
        // elproto.onDragOver = function (f) {
        //     f ? eve.on("snap.drag.over." + this.id, f) : eve.unbind("snap.drag.over." + this.id);
        // };
        /*\
     * Element.undrag
     [ method ]
     **
     * Removes all drag event handlers from the given element
    \*/
        elproto.undrag = function () {
            var i = draggable.length;
            while (i--) if (draggable[i].el == this) {
                this.unmousedown(draggable[i].init);
                draggable.splice(i, 1);
                eve.unbind("snap.drag.*." + this.id);
                eve.unbind("snap.draginit." + this.id);
            }
            !draggable.length && Snap.unmousemove(dragMove).unmouseup(dragUp);
            return this;
        };
    });

// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob) {
        var elproto = Element.prototype,
            pproto = Paper.prototype,
            rgurl = /^\s*url\((.+)\)/,
            Str = String,
            $ = Snap._.$;
        Snap.filter = {};
        /*\
     * Paper.filter
     [ method ]
     **
     * Creates a `<filter>` element
     **
     - filstr (string) SVG fragment of filter provided as a string
     = (object) @Element
     * Note: It is recommended to use filters embedded into the page inside an empty SVG element.
     > Usage
     | var f = paper.filter('<feGaussianBlur stdDeviation="2"/>'),
     |     c = paper.circle(10, 10, 10).attr({
     |         filter: f
     |     });
    \*/
        pproto.filter = function (filstr) {
            var paper = this;
            if (paper.type != "svg") {
                paper = paper.paper;
            }
            var f = Snap.parse(Str(filstr)),
                id = Snap._.id(),
                width = paper.node.offsetWidth,
                height = paper.node.offsetHeight,
                filter = $("filter");
            $(filter, {
                id: id,
                filterUnits: "userSpaceOnUse"
            });
            filter.appendChild(f.node);
            paper.defs.appendChild(filter);
            return new Element(filter);
        };

        eve.on("snap.util.getattr.filter", function () {
            eve.stop();
            var p = $(this.node, "filter");
            if (p) {
                var match = Str(p).match(rgurl);
                return match && Snap.select(match[1]);
            }
        });
        eve.on("snap.util.attr.filter", function (value) {
            if (value instanceof Element && value.type == "filter") {
                eve.stop();
                var id = value.node.id;
                if (!id) {
                    $(value.node, {id: value.id});
                    id = value.id;
                }
                $(this.node, {
                    filter: Snap.url(id)
                });
            }
            if (!value || value == "none") {
                eve.stop();
                this.node.removeAttribute("filter");
            }
        });
        /*\
     * Snap.filter.blur
     [ method ]
     **
     * Returns an SVG markup string for the blur filter
     **
     - x (number) amount of horizontal blur, in pixels
     - y (number) #optional amount of vertical blur, in pixels
     = (string) filter representation
     > Usage
     | var f = paper.filter(Snap.filter.blur(5, 10)),
     |     c = paper.circle(10, 10, 10).attr({
     |         filter: f
     |     });
    \*/
        Snap.filter.blur = function (x, y) {
            if (x == null) {
                x = 2;
            }
            var def = y == null ? x : [x, y];
            return Snap.format('\<feGaussianBlur stdDeviation="{def}"/>', {
                def: def
            });
        };
        Snap.filter.blur.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.shadow
     [ method ]
     **
     * Returns an SVG markup string for the shadow filter
     **
     - dx (number) #optional horizontal shift of the shadow, in pixels
     - dy (number) #optional vertical shift of the shadow, in pixels
     - blur (number) #optional amount of blur
     - color (string) #optional color of the shadow
     - opacity (number) #optional `0..1` opacity of the shadow
     * or
     - dx (number) #optional horizontal shift of the shadow, in pixels
     - dy (number) #optional vertical shift of the shadow, in pixels
     - color (string) #optional color of the shadow
     - opacity (number) #optional `0..1` opacity of the shadow
     * which makes blur default to `4`. Or
     - dx (number) #optional horizontal shift of the shadow, in pixels
     - dy (number) #optional vertical shift of the shadow, in pixels
     - opacity (number) #optional `0..1` opacity of the shadow
     = (string) filter representation
     > Usage
     | var f = paper.filter(Snap.filter.shadow(0, 2, .3)),
     |     c = paper.circle(10, 10, 10).attr({
     |         filter: f
     |     });
    \*/
        Snap.filter.shadow = function (dx, dy, blur, color, opacity) {
            if (opacity == null) {
                if (color == null) {
                    opacity = blur;
                    blur = 4;
                    color = "#000";
                } else {
                    opacity = color;
                    color = blur;
                    blur = 4;
                }
            }
            if (blur == null) {
                blur = 4;
            }
            if (opacity == null) {
                opacity = 1;
            }
            if (dx == null) {
                dx = 0;
                dy = 2;
            }
            if (dy == null) {
                dy = dx;
            }
            color = Snap.color(color);
            return Snap.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                color: color,
                dx: dx,
                dy: dy,
                blur: blur,
                opacity: opacity
            });
        };
        Snap.filter.shadow.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.grayscale
     [ method ]
     **
     * Returns an SVG markup string for the grayscale filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
        Snap.filter.grayscale = function (amount) {
            if (amount == null) {
                amount = 1;
            }
            return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                a: 0.2126 + 0.7874 * (1 - amount),
                b: 0.7152 - 0.7152 * (1 - amount),
                c: 0.0722 - 0.0722 * (1 - amount),
                d: 0.2126 - 0.2126 * (1 - amount),
                e: 0.7152 + 0.2848 * (1 - amount),
                f: 0.0722 - 0.0722 * (1 - amount),
                g: 0.2126 - 0.2126 * (1 - amount),
                h: 0.0722 + 0.9278 * (1 - amount)
            });
        };
        Snap.filter.grayscale.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.sepia
     [ method ]
     **
     * Returns an SVG markup string for the sepia filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
        Snap.filter.sepia = function (amount) {
            if (amount == null) {
                amount = 1;
            }
            return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                a: 0.393 + 0.607 * (1 - amount),
                b: 0.769 - 0.769 * (1 - amount),
                c: 0.189 - 0.189 * (1 - amount),
                d: 0.349 - 0.349 * (1 - amount),
                e: 0.686 + 0.314 * (1 - amount),
                f: 0.168 - 0.168 * (1 - amount),
                g: 0.272 - 0.272 * (1 - amount),
                h: 0.534 - 0.534 * (1 - amount),
                i: 0.131 + 0.869 * (1 - amount)
            });
        };
        Snap.filter.sepia.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.saturate
     [ method ]
     **
     * Returns an SVG markup string for the saturate filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
        Snap.filter.saturate = function (amount) {
            if (amount == null) {
                amount = 1;
            }
            return Snap.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                amount: 1 - amount
            });
        };
        Snap.filter.saturate.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.hueRotate
     [ method ]
     **
     * Returns an SVG markup string for the hue-rotate filter
     **
     - angle (number) angle of rotation
     = (string) filter representation
    \*/
        Snap.filter.hueRotate = function (angle) {
            angle = angle || 0;
            return Snap.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                angle: angle
            });
        };
        Snap.filter.hueRotate.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.invert
     [ method ]
     **
     * Returns an SVG markup string for the invert filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
        Snap.filter.invert = function (amount) {
            if (amount == null) {
                amount = 1;
            }
//        <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" color-interpolation-filters="sRGB"/>
            return Snap.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                amount: amount,
                amount2: 1 - amount
            });
        };
        Snap.filter.invert.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.brightness
     [ method ]
     **
     * Returns an SVG markup string for the brightness filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
        Snap.filter.brightness = function (amount) {
            if (amount == null) {
                amount = 1;
            }
            return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                amount: amount
            });
        };
        Snap.filter.brightness.toString = function () {
            return this();
        };
        /*\
     * Snap.filter.contrast
     [ method ]
     **
     * Returns an SVG markup string for the contrast filter
     **
     - amount (number) amount of filter (`0..1`)
     = (string) filter representation
    \*/
        Snap.filter.contrast = function (amount) {
            if (amount == null) {
                amount = 1;
            }
            return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                amount: amount,
                amount2: .5 - amount / 2
            });
        };
        Snap.filter.contrast.toString = function () {
            return this();
        };
    });

// Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
        var box = Snap._.box,
            is = Snap.is,
            firstLetter = /^[^a-z]*([tbmlrc])/i,
            toString = function () {
                return "T" + this.dx + "," + this.dy;
            };
        /*\
     * Element.getAlign
     [ method ]
     **
     * Returns shift needed to align the element relatively to given element.
     * If no elements specified, parent `<svg>` container will be used.
     - el (object) @optional alignment element
     - way (string) one of six values: `"top"`, `"middle"`, `"bottom"`, `"left"`, `"center"`, `"right"`
     = (object|string) Object in format `{dx: , dy: }` also has a string representation as a transformation string
     > Usage
     | el.transform(el.getAlign(el2, "top"));
     * or
     | var dy = el.getAlign(el2, "top").dy;
    \*/
        Element.prototype.getAlign = function (el, way) {
            if (way == null && is(el, "string")) {
                way = el;
                el = null;
            }
            el = el || this.paper;
            var bx = el.getBBox ? el.getBBox() : box(el),
                bb = this.getBBox(),
                out = {};
            way = way && way.match(firstLetter);
            way = way ? way[1].toLowerCase() : "c";
            switch (way) {
                case "t":
                    out.dx = 0;
                    out.dy = bx.y - bb.y;
                    break;
                case "b":
                    out.dx = 0;
                    out.dy = bx.y2 - bb.y2;
                    break;
                case "m":
                    out.dx = 0;
                    out.dy = bx.cy - bb.cy;
                    break;
                case "l":
                    out.dx = bx.x - bb.x;
                    out.dy = 0;
                    break;
                case "r":
                    out.dx = bx.x2 - bb.x2;
                    out.dy = 0;
                    break;
                default:
                    out.dx = bx.cx - bb.cx;
                    out.dy = 0;
                    break;
            }
            out.toString = toString;
            return out;
        };
        /*\
     * Element.align
     [ method ]
     **
     * Aligns the element relatively to given one via transformation.
     * If no elements specified, parent `<svg>` container will be used.
     - el (object) @optional alignment element
     - way (string) one of six values: `"top"`, `"middle"`, `"bottom"`, `"left"`, `"center"`, `"right"`
     = (object) this element
     > Usage
     | el.align(el2, "top");
     * or
     | el.align("middle");
    \*/
        Element.prototype.align = function (el, way) {
            return this.transform("..." + this.getAlign(el, way));
        };
    });

// Copyright (c) 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
    Snap.plugin(function (Snap, Element, Paper, glob) {
        // Colours are from https://www.materialui.co
        var red = "#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000",
            pink = "#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162",
            purple = "#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF",
            deeppurple = "#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA",
            indigo = "#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE",
            blue = "#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF",
            lightblue = "#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA",
            cyan = "#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4",
            teal = "#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5",
            green = "#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853",
            lightgreen = "#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17",
            lime = "#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00",
            yellow = "#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600",
            amber = "#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00",
            orange = "#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00",
            deeporange = "#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00",
            brown = "#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723",
            grey = "#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121",
            bluegrey = "#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238";
        /*\
     * Snap.mui
     [ property ]
     **
     * Contain Material UI colours.
     | Snap().rect(0, 0, 10, 10).attr({fill: Snap.mui.deeppurple, stroke: Snap.mui.amber[600]});
     # For colour reference: <a href="https://www.materialui.co">https://www.materialui.co</a>.
    \*/
        Snap.mui = {};
        /*\
     * Snap.flat
     [ property ]
     **
     * Contain Flat UI colours.
     | Snap().rect(0, 0, 10, 10).attr({fill: Snap.flat.carrot, stroke: Snap.flat.wetasphalt});
     # For colour reference: <a href="https://www.materialui.co">https://www.materialui.co</a>.
    \*/
        Snap.flat = {};

        function saveColor(colors) {
            colors = colors.split(/(?=#)/);
            var color = new String(colors[5]);
            color[50] = colors[0];
            color[100] = colors[1];
            color[200] = colors[2];
            color[300] = colors[3];
            color[400] = colors[4];
            color[500] = colors[5];
            color[600] = colors[6];
            color[700] = colors[7];
            color[800] = colors[8];
            color[900] = colors[9];
            if (colors[10]) {
                color.A100 = colors[10];
                color.A200 = colors[11];
                color.A400 = colors[12];
                color.A700 = colors[13];
            }
            return color;
        }

        Snap.mui.red = saveColor(red);
        Snap.mui.pink = saveColor(pink);
        Snap.mui.purple = saveColor(purple);
        Snap.mui.deeppurple = saveColor(deeppurple);
        Snap.mui.indigo = saveColor(indigo);
        Snap.mui.blue = saveColor(blue);
        Snap.mui.lightblue = saveColor(lightblue);
        Snap.mui.cyan = saveColor(cyan);
        Snap.mui.teal = saveColor(teal);
        Snap.mui.green = saveColor(green);
        Snap.mui.lightgreen = saveColor(lightgreen);
        Snap.mui.lime = saveColor(lime);
        Snap.mui.yellow = saveColor(yellow);
        Snap.mui.amber = saveColor(amber);
        Snap.mui.orange = saveColor(orange);
        Snap.mui.deeporange = saveColor(deeporange);
        Snap.mui.brown = saveColor(brown);
        Snap.mui.grey = saveColor(grey);
        Snap.mui.bluegrey = saveColor(bluegrey);
        Snap.flat.turquoise = "#1abc9c";
        Snap.flat.greensea = "#16a085";
        Snap.flat.sunflower = "#f1c40f";
        Snap.flat.orange = "#f39c12";
        Snap.flat.emerland = "#2ecc71";
        Snap.flat.nephritis = "#27ae60";
        Snap.flat.carrot = "#e67e22";
        Snap.flat.pumpkin = "#d35400";
        Snap.flat.peterriver = "#3498db";
        Snap.flat.belizehole = "#2980b9";
        Snap.flat.alizarin = "#e74c3c";
        Snap.flat.pomegranate = "#c0392b";
        Snap.flat.amethyst = "#9b59b6";
        Snap.flat.wisteria = "#8e44ad";
        Snap.flat.clouds = "#ecf0f1";
        Snap.flat.silver = "#bdc3c7";
        Snap.flat.wetasphalt = "#34495e";
        Snap.flat.midnightblue = "#2c3e50";
        Snap.flat.concrete = "#95a5a6";
        Snap.flat.asbestos = "#7f8c8d";
        /*\
     * Snap.importMUIColors
     [ method ]
     **
     * Imports Material UI colours into global object.
     | Snap.importMUIColors();
     | Snap().rect(0, 0, 10, 10).attr({fill: deeppurple, stroke: amber[600]});
     # For colour reference: <a href="https://www.materialui.co">https://www.materialui.co</a>.
    \*/
        Snap.importMUIColors = function () {
            for (var color in Snap.mui) {
                if (Snap.mui.hasOwnProperty(color)) {
                    window[color] = Snap.mui[color];
                }
            }
        };
    });

    return Snap;
}));




/***/ })
/******/ ]);