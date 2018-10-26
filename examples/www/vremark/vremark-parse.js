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

const createProcessor = __webpack_require__(1);
const data = __webpack_require__(150);

async function parse(markdown, option) {

    const processor = createProcessor(option);

    const mdast = processor.parse(markdown);

    const hast = await processor.run(mdast);

    data(hast, option);

    const plugins = mdast.plugins || {};

    return {mdast, hast, plugins};
}

module.exports = parse;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const unified = __webpack_require__(2);

//remark
const parse = __webpack_require__(17);
const breaks = __webpack_require__(89);
const math = __webpack_require__(90);
const hash = __webpack_require__(93);

// plugins
const mathComponent = __webpack_require__(95);
const flowchart = __webpack_require__(96);
const sequence = __webpack_require__(97);
const mermaid = __webpack_require__(98);
const g2 = __webpack_require__(99);
const chart = __webpack_require__(100);
const highlight = __webpack_require__(101);


//rehype
const remark2rehype = __webpack_require__(103);

const stringify = __webpack_require__(143);

const defaultOptions = __webpack_require__(149);

function createProcessor(_options) {
    const options = Object.assign({}, defaultOptions, _options);

    const plugins = [];

    if(options.breaks) {
        plugins.push([
            breaks, {
            }
        ]);
    }

    if(options.math) {
        plugins.push([
            math, {
            }
        ]);

        plugins.push([
            mathComponent, {
            }
        ]);
    }


    if(options.flowchart) {
        plugins.push([
            flowchart, {
            }
        ]);
    }

    if(options.sequence) {
        plugins.push([
            sequence, {
            }
        ]);
    }

    if(options.mermaid) {
        plugins.push([
            mermaid, {
            }
        ]);
    }

    if(options.chart) {
        plugins.push([
            chart, {
            }
        ]);
    }

    if(options.g2) {
        plugins.push([
            g2, {
            }
        ]);
    }

    if(options.highlight) {
        plugins.push([
            highlight, {
            }
        ]);
    }

    if(options.hash) {
        plugins.push([
            hash, {
            }
        ]);
    }

    const processor = unified()
        .use(parse, {
            footnotes: true,
            pedantic: true
        })
        .use({
            plugins: plugins,
            settings: {}
        })
        .use(remark2rehype, {
            allowDangerousHTML: options.allowDangerousHTML
        })
        .use(stringify, {
            mode: 'vue',
            h: options.h
        });

    return processor;
}

module.exports = createProcessor;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Dependencies. */
var extend = __webpack_require__(3)
var bail = __webpack_require__(4)
var vfile = __webpack_require__(5)
var trough = __webpack_require__(13)
var string = __webpack_require__(15)
var plain = __webpack_require__(16)

/* Expose a frozen processor. */
module.exports = unified().freeze()

var slice = [].slice
var own = {}.hasOwnProperty

/* Process pipeline. */
var pipeline = trough()
  .use(pipelineParse)
  .use(pipelineRun)
  .use(pipelineStringify)

function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file)
}

function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done)

  function done(err, tree, file) {
    if (err) {
      next(err)
    } else {
      ctx.tree = tree
      ctx.file = file
      next()
    }
  }
}

function pipelineStringify(p, ctx) {
  ctx.file.contents = p.stringify(ctx.tree, ctx.file)
}

/* Function to create the first processor. */
function unified() {
  var attachers = []
  var transformers = trough()
  var namespace = {}
  var frozen = false
  var freezeIndex = -1

  /* Data management. */
  processor.data = data

  /* Lock. */
  processor.freeze = freeze

  /* Plug-ins. */
  processor.attachers = attachers
  processor.use = use

  /* API. */
  processor.parse = parse
  processor.stringify = stringify
  processor.run = run
  processor.runSync = runSync
  processor.process = process
  processor.processSync = processSync

  /* Expose. */
  return processor

  /* Create a new processor based on the processor
   * in the current scope. */
  function processor() {
    var destination = unified()
    var length = attachers.length
    var index = -1

    while (++index < length) {
      destination.use.apply(null, attachers[index])
    }

    destination.data(extend(true, {}, namespace))

    return destination
  }

  /* Freeze: used to signal a processor that has finished
   * configuration.
   *
   * For example, take unified itself.  It’s frozen.
   * Plug-ins should not be added to it.  Rather, it should
   * be extended, by invoking it, before modifying it.
   *
   * In essence, always invoke this when exporting a
   * processor. */
  function freeze() {
    var values
    var plugin
    var options
    var transformer

    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex]
      plugin = values[0]
      options = values[1]
      transformer = null

      if (options === false) {
        continue
      }

      if (options === true) {
        values[1] = undefined
      }

      transformer = plugin.apply(processor, values.slice(1))

      if (typeof transformer === 'function') {
        transformers.use(transformer)
      }
    }

    frozen = true
    freezeIndex = Infinity

    return processor
  }

  /* Data management.
   * Getter / setter for processor-specific informtion. */
  function data(key, value) {
    if (string(key)) {
      /* Set `key`. */
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen)

        namespace[key] = value

        return processor
      }

      /* Get `key`. */
      return (own.call(namespace, key) && namespace[key]) || null
    }

    /* Set space. */
    if (key) {
      assertUnfrozen('data', frozen)
      namespace = key
      return processor
    }

    /* Get space. */
    return namespace
  }

  /* Plug-in management.
   *
   * Pass it:
   * *   an attacher and options,
   * *   a preset,
   * *   a list of presets, attachers, and arguments (list
   *     of attachers and options). */
  function use(value) {
    var settings

    assertUnfrozen('use', frozen)

    if (value === null || value === undefined) {
      /* Empty */
    } else if (typeof value === 'function') {
      addPlugin.apply(null, arguments)
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value)
      } else {
        addPreset(value)
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = extend(namespace.settings || {}, settings)
    }

    return processor

    function addPreset(result) {
      addList(result.plugins)

      if (result.settings) {
        settings = extend(settings || {}, result.settings)
      }
    }

    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value)
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value)
        } else {
          addPreset(value)
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`')
      }
    }

    function addList(plugins) {
      var length
      var index

      if (plugins === null || plugins === undefined) {
        /* Empty */
      } else if (typeof plugins === 'object' && 'length' in plugins) {
        length = plugins.length
        index = -1

        while (++index < length) {
          add(plugins[index])
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    function addPlugin(plugin, value) {
      var entry = find(plugin)

      if (entry) {
        if (plain(entry[1]) && plain(value)) {
          value = extend(entry[1], value)
        }

        entry[1] = value
      } else {
        attachers.push(slice.call(arguments))
      }
    }
  }

  function find(plugin) {
    var length = attachers.length
    var index = -1
    var entry

    while (++index < length) {
      entry = attachers[index]

      if (entry[0] === plugin) {
        return entry
      }
    }
  }

  /* Parse a file (in string or VFile representation)
   * into a Unist node using the `Parser` on the
   * processor. */
  function parse(doc) {
    var file = vfile(doc)
    var Parser

    freeze()
    Parser = processor.Parser
    assertParser('parse', Parser)

    if (newable(Parser)) {
      return new Parser(String(file), file).parse()
    }

    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  /* Run transforms on a Unist node representation of a file
   * (in string or VFile representation), async. */
  function run(node, file, cb) {
    assertNode(node)
    freeze()

    if (!cb && typeof file === 'function') {
      cb = file
      file = null
    }

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb)

    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done)

      function done(err, tree, file) {
        tree = tree || node
        if (err) {
          reject(err)
        } else if (resolve) {
          resolve(tree)
        } else {
          cb(null, tree, file)
        }
      }
    }
  }

  /* Run transforms on a Unist node representation of a file
   * (in string or VFile representation), sync. */
  function runSync(node, file) {
    var complete = false
    var result

    run(node, file, done)

    assertDone('runSync', 'run', complete)

    return result

    function done(err, tree) {
      complete = true
      bail(err)
      result = tree
    }
  }

  /* Stringify a Unist node representation of a file
   * (in string or VFile representation) into a string
   * using the `Compiler` on the processor. */
  function stringify(node, doc) {
    var file = vfile(doc)
    var Compiler

    freeze()
    Compiler = processor.Compiler
    assertCompiler('stringify', Compiler)
    assertNode(node)

    if (newable(Compiler)) {
      return new Compiler(node, file).compile()
    }

    return Compiler(node, file) // eslint-disable-line new-cap
  }

  /* Parse a file (in string or VFile representation)
   * into a Unist node using the `Parser` on the processor,
   * then run transforms on that node, and compile the
   * resulting node using the `Compiler` on the processor,
   * and store that result on the VFile. */
  function process(doc, cb) {
    freeze()
    assertParser('process', processor.Parser)
    assertCompiler('process', processor.Compiler)

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb)

    function executor(resolve, reject) {
      var file = vfile(doc)

      pipeline.run(processor, {file: file}, done)

      function done(err) {
        if (err) {
          reject(err)
        } else if (resolve) {
          resolve(file)
        } else {
          cb(null, file)
        }
      }
    }
  }

  /* Process the given document (in string or VFile
   * representation), sync. */
  function processSync(doc) {
    var complete = false
    var file

    freeze()
    assertParser('processSync', processor.Parser)
    assertCompiler('processSync', processor.Compiler)
    file = vfile(doc)

    process(file, done)

    assertDone('processSync', 'process', complete)

    return file

    function done(err) {
      complete = true
      bail(err)
    }
  }
}

/* Check if `func` is a constructor. */
function newable(value) {
  return typeof value === 'function' && keys(value.prototype)
}

/* Check if `value` is an object with keys. */
function keys(value) {
  var key
  for (key in value) {
    return true
  }
  return false
}

/* Assert a parser is available. */
function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`')
  }
}

/* Assert a compiler is available. */
function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`')
  }
}

/* Assert the processor is not frozen. */
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      [
        'Cannot invoke `' + name + '` on a frozen processor.\nCreate a new ',
        'processor first, by invoking it: use `processor()` instead of ',
        '`processor`.'
      ].join('')
    )
  }
}

/* Assert `node` is a Unist node. */
function assertNode(node) {
  if (!node || !string(node.type)) {
    throw new Error('Expected node, got `' + node + '`')
  }
}

/* Assert that `complete` is `true`. */
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = bail

function bail(err) {
  if (err) {
    throw err
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VMessage = __webpack_require__(6);
var VFile = __webpack_require__(8);

module.exports = VFile;

var proto = VFile.prototype;

proto.message = message;
proto.info = info;
proto.fail = fail;

/* Slight backwards compatibility.  Remove in the future. */
proto.warn = message;

/* Create a message with `reason` at `position`.
 * When an error is passed in as `reason`, copies the stack. */
function message(reason, position, origin) {
  var filePath = this.path;
  var message = new VMessage(reason, position, origin);

  if (filePath) {
    message.name = filePath + ':' + message.name;
    message.file = filePath;
  }

  message.fatal = false;

  this.messages.push(message);

  return message;
}

/* Fail. Creates a vmessage, associates it with the file,
 * and throws it. */
function fail() {
  var message = this.message.apply(this, arguments);

  message.fatal = true;

  throw message;
}

/* Info. Creates a vmessage, associates it with the file,
 * and marks the fatality as null. */
function info() {
  var message = this.message.apply(this, arguments);

  message.fatal = null;

  return message;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(7)

module.exports = VMessage

/* Inherit from `Error#`. */
function VMessagePrototype() {}
VMessagePrototype.prototype = Error.prototype
VMessage.prototype = new VMessagePrototype()

/* Message properties. */
var proto = VMessage.prototype

proto.file = ''
proto.name = ''
proto.reason = ''
proto.message = ''
proto.stack = ''
proto.fatal = null
proto.column = null
proto.line = null

/* Construct a new VMessage.
 *
 * Note: We cannot invoke `Error` on the created context,
 * as that adds readonly `line` and `column` attributes on
 * Safari 9, thus throwing and failing the data. */
function VMessage(reason, position, origin) {
  var parts
  var range
  var location

  if (typeof position === 'string') {
    origin = position
    position = null
  }

  parts = parseOrigin(origin)
  range = stringify(position) || '1:1'

  location = {
    start: {line: null, column: null},
    end: {line: null, column: null}
  }

  /* Node. */
  if (position && position.position) {
    position = position.position
  }

  if (position) {
    /* Position. */
    if (position.start) {
      location = position
      position = position.start
    } else {
      /* Point. */
      location.start = position
    }
  }

  if (reason.stack) {
    this.stack = reason.stack
    reason = reason.message
  }

  this.message = reason
  this.name = range
  this.reason = reason
  this.line = position ? position.line : null
  this.column = position ? position.column : null
  this.location = location
  this.source = parts[0]
  this.ruleId = parts[1]
}

function parseOrigin(origin) {
  var result = [null, null]
  var index

  if (typeof origin === 'string') {
    index = origin.indexOf(':')

    if (index === -1) {
      result[1] = origin
    } else {
      result[0] = origin.slice(0, index)
      result[1] = origin.slice(index + 1)
    }
  }

  return result
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var own = {}.hasOwnProperty

module.exports = stringify

function stringify(value) {
  /* Nothing. */
  if (!value || typeof value !== 'object') {
    return null
  }

  /* Node. */
  if (own.call(value, 'position') || own.call(value, 'type')) {
    return position(value.position)
  }

  /* Position. */
  if (own.call(value, 'start') || own.call(value, 'end')) {
    return position(value)
  }

  /* Point. */
  if (own.call(value, 'line') || own.call(value, 'column')) {
    return point(value)
  }

  /* ? */
  return null
}

function point(point) {
  if (!point || typeof point !== 'object') {
    point = {}
  }

  return index(point.line) + ':' + index(point.column)
}

function position(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {}
  }

  return point(pos.start) + '-' + point(pos.end)
}

function index(value) {
  return value && typeof value === 'number' ? value : 1
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var path = __webpack_require__(10);
var replace = __webpack_require__(11);
var buffer = __webpack_require__(12);

module.exports = VFile;

var own = {}.hasOwnProperty;
var proto = VFile.prototype;

proto.toString = toString;

/* Order of setting (least specific to most), we need this because
 * otherwise `{stem: 'a', path: '~/b.js'}` would throw, as a path
 * is needed before a stem can be set. */
var order = [
  'history',
  'path',
  'basename',
  'stem',
  'extname',
  'dirname'
];

/* Construct a new file. */
function VFile(options) {
  var prop;
  var index;
  var length;

  if (!options) {
    options = {};
  } else if (typeof options === 'string' || buffer(options)) {
    options = {contents: options};
  } else if ('message' in options && 'messages' in options) {
    return options;
  }

  if (!(this instanceof VFile)) {
    return new VFile(options);
  }

  this.data = {};
  this.messages = [];
  this.history = [];
  this.cwd = process.cwd();

  /* Set path related properties in the correct order. */
  index = -1;
  length = order.length;

  while (++index < length) {
    prop = order[index];

    if (own.call(options, prop)) {
      this[prop] = options[prop];
    }
  }

  /* Set non-path related properties. */
  for (prop in options) {
    if (order.indexOf(prop) === -1) {
      this[prop] = options[prop];
    }
  }
}

/* Access full path (`~/index.min.js`). */
Object.defineProperty(proto, 'path', {
  get: function () {
    return this.history[this.history.length - 1];
  },
  set: function (path) {
    assertNonEmpty(path, 'path');

    if (path !== this.path) {
      this.history.push(path);
    }
  }
});

/* Access parent path (`~`). */
Object.defineProperty(proto, 'dirname', {
  get: function () {
    return typeof this.path === 'string' ? path.dirname(this.path) : undefined;
  },
  set: function (dirname) {
    assertPath(this.path, 'dirname');
    this.path = path.join(dirname || '', this.basename);
  }
});

/* Access basename (`index.min.js`). */
Object.defineProperty(proto, 'basename', {
  get: function () {
    return typeof this.path === 'string' ? path.basename(this.path) : undefined;
  },
  set: function (basename) {
    assertNonEmpty(basename, 'basename');
    assertPart(basename, 'basename');
    this.path = path.join(this.dirname || '', basename);
  }
});

/* Access extname (`.js`). */
Object.defineProperty(proto, 'extname', {
  get: function () {
    return typeof this.path === 'string' ? path.extname(this.path) : undefined;
  },
  set: function (extname) {
    var ext = extname || '';

    assertPart(ext, 'extname');
    assertPath(this.path, 'extname');

    if (ext) {
      if (ext.charAt(0) !== '.') {
        throw new Error('`extname` must start with `.`');
      }

      if (ext.indexOf('.', 1) !== -1) {
        throw new Error('`extname` cannot contain multiple dots');
      }
    }

    this.path = replace(this.path, ext);
  }
});

/* Access stem (`index.min`). */
Object.defineProperty(proto, 'stem', {
  get: function () {
    return typeof this.path === 'string' ? path.basename(this.path, this.extname) : undefined;
  },
  set: function (stem) {
    assertNonEmpty(stem, 'stem');
    assertPart(stem, 'stem');
    this.path = path.join(this.dirname || '', stem + (this.extname || ''));
  }
});

/* Get the value of the file. */
function toString(encoding) {
  var value = this.contents || '';
  return buffer(value) ? value.toString(encoding) : String(value);
}

/* Assert that `part` is not a path (i.e., does
 * not contain `path.sep`). */
function assertPart(part, name) {
  if (part.indexOf(path.sep) !== -1) {
    throw new Error('`' + name + '` cannot be a path: did not expect `' + path.sep + '`');
  }
}

/* Assert that `part` is not empty. */
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty');
  }
}

/* Assert `path` exists. */
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too');
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9)))

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(10);

function replaceExt(npath, ext) {
  if (typeof npath !== 'string') {
    return npath;
  }

  if (npath.length === 0) {
    return npath;
  }

  var nFileName = path.basename(npath, path.extname(npath)) + ext;
  return path.join(path.dirname(npath), nFileName);
}

module.exports = replaceExt;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrap = __webpack_require__(14)

module.exports = trough

trough.wrap = wrap

var slice = [].slice

/* Create new middleware. */
function trough() {
  var fns = []
  var middleware = {}

  middleware.run = run
  middleware.use = use

  return middleware

  /* Run `fns`.  Last argument must be
   * a completion handler. */
  function run() {
    var index = -1
    var input = slice.call(arguments, 0, -1)
    var done = arguments[arguments.length - 1]

    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done)
    }

    next.apply(null, [null].concat(input))

    /* Run the next `fn`, if any. */
    function next(err) {
      var fn = fns[++index]
      var params = slice.call(arguments, 0)
      var values = params.slice(1)
      var length = input.length
      var pos = -1

      if (err) {
        done(err)
        return
      }

      /* Copy non-nully input into values. */
      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos]
        }
      }

      input = values

      /* Next or done. */
      if (fn) {
        wrap(fn, next).apply(null, input)
      } else {
        done.apply(null, [null].concat(input))
      }
    }
  }

  /* Add `fn` to the list. */
  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn)
    }

    fns.push(fn)

    return middleware
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = [].slice

module.exports = wrap

/* Wrap `fn`.  Can be sync or async; return a promise,
 * receive a completion handler, return new values and
 * errors. */
function wrap(fn, callback) {
  var invoked

  return wrapped

  function wrapped() {
    var params = slice.call(arguments, 0)
    var callback = fn.length > params.length
    var result

    if (callback) {
      params.push(done)
    }

    try {
      result = fn.apply(null, params)
    } catch (err) {
      /* Well, this is quite the pickle.  `fn` received
       * a callback and invoked it (thus continuing the
       * pipeline), but later also threw an error.
       * We’re not about to restart the pipeline again,
       * so the only thing left to do is to throw the
       * thing instea. */
      if (callback && invoked) {
        throw err
      }

      return done(err)
    }

    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done)
      } else if (result instanceof Error) {
        done(result)
      } else {
        then(result)
      }
    }
  }

  /* Invoke `next`, only once. */
  function done() {
    if (!invoked) {
      invoked = true

      callback.apply(null, arguments)
    }
  }

  /* Invoke `done` with one value.
   * Tracks if an error is passed, too. */
  function then(value) {
    done(null, value)
  }
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = Object.prototype.toString

module.exports = isString

function isString(obj) {
    return toString.call(obj) === "[object String]"
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var unherit = __webpack_require__(18);
var xtend = __webpack_require__(19);
var Parser = __webpack_require__(21);

module.exports = parse;
parse.Parser = Parser;

function parse(options) {
    var Local = unherit(Parser);
    Local.prototype.options = xtend(Local.prototype.options, this.data('settings'), options);
    this.Parser = Local;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(19)
var inherits = __webpack_require__(20)

module.exports = unherit

/* Create a custom constructor which can be modified
 * without affecting the original class. */
function unherit(Super) {
  var result
  var key
  var value

  inherits(Of, Super)
  inherits(From, Of)

  /* Clone values. */
  result = Of.prototype

  for (key in result) {
    value = result[key]

    if (value && typeof value === 'object') {
      result[key] = 'concat' in value ? value.concat() : xtend(value)
    }
  }

  return Of

  /* Constructor accepting a single argument,
   * which itself is an `arguments` object. */
  function From(parameters) {
    return Super.apply(this, parameters)
  }

  /* Constructor accepting variadic arguments. */
  function Of() {
    if (!(this instanceof Of)) {
      return new From(arguments)
    }

    return Super.apply(this, arguments)
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(19);
var toggle = __webpack_require__(22);
var vfileLocation = __webpack_require__(23);
var unescape = __webpack_require__(24);
var decode = __webpack_require__(25);
var tokenizer = __webpack_require__(34);

module.exports = Parser;

function Parser(doc, file) {
    this.file = file;
    this.offset = {};
    this.options = xtend(this.options);
    this.setOptions({});

    this.inList = false;
    this.inBlock = false;
    this.inLink = false;
    this.atStart = true;

    this.toOffset = vfileLocation(file).toOffset;
    this.unescape = unescape(this, 'escape');
    this.decode = decode(this);
}

var proto = Parser.prototype;

/* Expose core. */
proto.setOptions = __webpack_require__(35);
proto.parse = __webpack_require__(39);

/* Expose `defaults`. */
proto.options = __webpack_require__(37);

/* Enter and exit helpers. */
proto.exitStart = toggle('atStart', true);
proto.enterList = toggle('inList', false);
proto.enterLink = toggle('inLink', false);
proto.enterBlock = toggle('inBlock', false);

/* Nodes that can interupt a paragraph:
 *
 * ```markdown
 * A paragraph, followed by a thematic break.
 * ___
 * ```
 *
 * In the above example, the thematic break “interupts”
 * the paragraph. */
proto.interruptParagraph = [
    ['thematicBreak'],
    ['atxHeading'],
    ['fencedCode'],
    ['blockquote'],
    ['html'],
    ['setextHeading', {commonmark: false}],
    ['definition', {commonmark: false}],
    ['footnote', {commonmark: false}]
];

/* Nodes that can interupt a list:
 *
 * ```markdown
 * - One
 * ___
 * ```
 *
 * In the above example, the thematic break “interupts”
 * the list. */
proto.interruptList = [
    ['atxHeading', {pedantic: false}],
    ['fencedCode', {pedantic: false}],
    ['thematicBreak', {pedantic: false}],
    ['definition', {commonmark: false}],
    ['footnote', {commonmark: false}]
];

/* Nodes that can interupt a blockquote:
 *
 * ```markdown
 * > A paragraph.
 * ___
 * ```
 *
 * In the above example, the thematic break “interupts”
 * the blockquote. */
proto.interruptBlockquote = [
    ['indentedCode', {commonmark: true}],
    ['fencedCode', {commonmark: true}],
    ['atxHeading', {commonmark: true}],
    ['setextHeading', {commonmark: true}],
    ['thematicBreak', {commonmark: true}],
    ['html', {commonmark: true}],
    ['list', {commonmark: true}],
    ['definition', {commonmark: false}],
    ['footnote', {commonmark: false}]
];

/* Handlers. */
proto.blockTokenizers = {
    newline: __webpack_require__(44),
    indentedCode: __webpack_require__(46),
    fencedCode: __webpack_require__(49),
    blockquote: __webpack_require__(50),
    atxHeading: __webpack_require__(53),
    thematicBreak: __webpack_require__(54),
    list: __webpack_require__(55),
    setextHeading: __webpack_require__(58),
    html: __webpack_require__(59),
    footnote: __webpack_require__(61),
    definition: __webpack_require__(64),
    table: __webpack_require__(65),
    paragraph: __webpack_require__(66)
};

proto.inlineTokenizers = {
    escape: __webpack_require__(67),
    autoLink: __webpack_require__(69),
    url: __webpack_require__(71),
    html: __webpack_require__(73),
    link: __webpack_require__(74),
    reference: __webpack_require__(76),
    strong: __webpack_require__(77),
    emphasis: __webpack_require__(79),
    deletion: __webpack_require__(82),
    code: __webpack_require__(84),
    break: __webpack_require__(86),
    text: __webpack_require__(88)
};

/* Expose precedence. */
proto.blockMethods = keys(proto.blockTokenizers);
proto.inlineMethods = keys(proto.inlineTokenizers);

/* Tokenizers. */
proto.tokenizeBlock = tokenizer('block');
proto.tokenizeInline = tokenizer('inline');
proto.tokenizeFactory = tokenizer;

/* Get all keys in `value`. */
function keys(value) {
    var result = [];
    var key;

    for (key in value) {
        result.push(key);
    }

    return result;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory

/* Construct a state `toggler`: a function which inverses
 * `property` in context based on its current value.
 * The by `toggler` returned function restores that value. */
function factory(key, state, ctx) {
  return enter

  function enter() {
    var context = ctx || this
    var current = context[key]

    context[key] = !state

    return exit

    function exit() {
      context[key] = current
    }
  }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Expose. */
module.exports = factory

/* Factory. */
function factory(file) {
  var contents = indices(String(file))

  return {
    toPosition: offsetToPositionFactory(contents),
    toOffset: positionToOffsetFactory(contents)
  }
}

/* Factory to get the line and column-based `position` for
 * `offset` in the bound indices. */
function offsetToPositionFactory(indices) {
  return offsetToPosition

  /* Get the line and column-based `position` for
   * `offset` in the bound indices. */
  function offsetToPosition(offset) {
    var index = -1
    var length = indices.length

    if (offset < 0) {
      return {}
    }

    while (++index < length) {
      if (indices[index] > offset) {
        return {
          line: index + 1,
          column: offset - (indices[index - 1] || 0) + 1,
          offset: offset
        }
      }
    }

    return {}
  }
}

/* Factory to get the `offset` for a line and column-based
 * `position` in the bound indices. */
function positionToOffsetFactory(indices) {
  return positionToOffset

  /* Get the `offset` for a line and column-based
   * `position` in the bound indices. */
  function positionToOffset(position) {
    var line = position && position.line
    var column = position && position.column

    if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
      return (indices[line - 2] || 0) + column - 1 || 0
    }

    return -1
  }
}

/* Get indices of line-breaks in `value`. */
function indices(value) {
  var result = []
  var index = value.indexOf('\n')

  while (index !== -1) {
    result.push(index + 1)
    index = value.indexOf('\n', index + 1)
  }

  result.push(value.length + 1)

  return result
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory;

/* Factory to de-escape a value, based on a list at `key`
 * in `ctx`. */
function factory(ctx, key) {
    return unescape;

    /* De-escape a string using the expression at `key`
     * in `ctx`. */
    function unescape(value) {
        var prev = 0;
        var index = value.indexOf('\\');
        var escape = ctx[key];
        var queue = [];
        var character;

        while (index !== -1) {
            queue.push(value.slice(prev, index));
            prev = index + 1;
            character = value.charAt(prev);

            /* If the following character is not a valid escape,
             * add the slash. */
            if (!character || escape.indexOf(character) === -1) {
                queue.push('\\');
            }

            index = value.indexOf('\\', prev);
        }

        queue.push(value.slice(prev));

        return queue.join('');
    }
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(19);
var entities = __webpack_require__(26);

module.exports = factory;

/* Factory to create an entity decoder. */
function factory(ctx) {
    decoder.raw = decodeRaw;

    return decoder;

    /* Normalize `position` to add an `indent`. */
    function normalize(position) {
        var offsets = ctx.offset;
        var line = position.line;
        var result = [];

        while (++line) {
            if (!(line in offsets)) {
                break;
            }

            result.push((offsets[line] || 0) + 1);
        }

        return {
            start: position,
            indent: result
        };
    }

    /* Handle a warning.
     * See https://github.com/wooorm/parse-entities
     * for the warnings. */
    function handleWarning(reason, position, code) {
        if (code === 3) {
            return;
        }

        ctx.file.message(reason, position);
    }

    /* Decode `value` (at `position`) into text-nodes. */
    function decoder(value, position, handler) {
        entities(value, {
            position: normalize(position),
            warning: handleWarning,
            text: handler,
            reference: handler,
            textContext: ctx,
            referenceContext: ctx
        });
    }

    /* Decode `value` (at `position`) into a string. */
    function decodeRaw(value, position, options) {
        return entities(value, xtend(options, {
            position: normalize(position),
            warning: handleWarning
        }));
    }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var characterEntities = __webpack_require__(27)
var legacy = __webpack_require__(28)
var invalid = __webpack_require__(29)
var decimal = __webpack_require__(30)
var hexadecimal = __webpack_require__(31)
var alphanumerical = __webpack_require__(32)

module.exports = parseEntities

var own = {}.hasOwnProperty
var fromCharCode = String.fromCharCode
var noop = Function.prototype

/* Default settings. */
var defaults = {
  warning: null,
  reference: null,
  text: null,
  warningContext: null,
  referenceContext: null,
  textContext: null,
  position: {},
  additional: null,
  attribute: false,
  nonTerminated: true
}

/* Reference types. */
var NAMED = 'named'
var HEXADECIMAL = 'hexadecimal'
var DECIMAL = 'decimal'

/* Map of bases. */
var BASE = {}

BASE[HEXADECIMAL] = 16
BASE[DECIMAL] = 10

/* Map of types to tests. Each type of character reference
 * accepts different characters. This test is used to
 * detect whether a reference has ended (as the semicolon
 * is not strictly needed). */
var TESTS = {}

TESTS[NAMED] = alphanumerical
TESTS[DECIMAL] = decimal
TESTS[HEXADECIMAL] = hexadecimal

/* Warning messages. */
var NAMED_NOT_TERMINATED = 1
var NUMERIC_NOT_TERMINATED = 2
var NAMED_EMPTY = 3
var NUMERIC_EMPTY = 4
var NAMED_UNKNOWN = 5
var NUMERIC_DISALLOWED = 6
var NUMERIC_PROHIBITED = 7

var MESSAGES = {}

MESSAGES[NAMED_NOT_TERMINATED] =
  'Named character references must be terminated by a semicolon'
MESSAGES[NUMERIC_NOT_TERMINATED] =
  'Numeric character references must be terminated by a semicolon'
MESSAGES[NAMED_EMPTY] = 'Named character references cannot be empty'
MESSAGES[NUMERIC_EMPTY] = 'Numeric character references cannot be empty'
MESSAGES[NAMED_UNKNOWN] = 'Named character references must be known'
MESSAGES[NUMERIC_DISALLOWED] =
  'Numeric character references cannot be disallowed'
MESSAGES[NUMERIC_PROHIBITED] =
  'Numeric character references cannot be outside the permissible Unicode range'

/* Wrap to ensure clean parameters are given to `parse`. */
function parseEntities(value, options) {
  var settings = {}
  var option
  var key

  if (!options) {
    options = {}
  }

  for (key in defaults) {
    option = options[key]
    settings[key] =
      option === null || option === undefined ? defaults[key] : option
  }

  if (settings.position.indent || settings.position.start) {
    settings.indent = settings.position.indent || []
    settings.position = settings.position.start
  }

  return parse(value, settings)
}

/* Parse entities. */
function parse(value, settings) {
  var additional = settings.additional
  var nonTerminated = settings.nonTerminated
  var handleText = settings.text
  var handleReference = settings.reference
  var handleWarning = settings.warning
  var textContext = settings.textContext
  var referenceContext = settings.referenceContext
  var warningContext = settings.warningContext
  var pos = settings.position
  var indent = settings.indent || []
  var length = value.length
  var index = 0
  var lines = -1
  var column = pos.column || 1
  var line = pos.line || 1
  var queue = ''
  var result = []
  var entityCharacters
  var terminated
  var characters
  var character
  var reference
  var following
  var warning
  var reason
  var output
  var entity
  var begin
  var start
  var type
  var test
  var prev
  var next
  var diff
  var end

  /* Cache the current point. */
  prev = now()

  /* Wrap `handleWarning`. */
  warning = handleWarning ? parseError : noop

  /* Ensure the algorithm walks over the first character
   * and the end (inclusive). */
  index--
  length++

  while (++index < length) {
    /* If the previous character was a newline. */
    if (character === '\n') {
      column = indent[lines] || 1
    }

    character = at(index)

    /* Handle anything other than an ampersand,
     * including newlines and EOF. */
    if (character !== '&') {
      if (character === '\n') {
        line++
        lines++
        column = 0
      }

      if (character) {
        queue += character
        column++
      } else {
        flush()
      }
    } else {
      following = at(index + 1)

      /* The behaviour depends on the identity of the next
       * character. */
      if (
        following === '\t' /* Tab */ ||
        following === '\n' /* Newline */ ||
        following === '\f' /* Form feed */ ||
        following === ' ' /* Space */ ||
        following === '<' /* Less-than */ ||
        following === '&' /* Ampersand */ ||
        following === '' ||
        (additional && following === additional)
      ) {
        /* Not a character reference. No characters
         * are consumed, and nothing is returned.
         * This is not an error, either. */
        queue += character
        column++

        continue
      }

      start = index + 1
      begin = start
      end = start

      /* Numerical entity. */
      if (following !== '#') {
        type = NAMED
      } else {
        end = ++begin

        /* The behaviour further depends on the
         * character after the U+0023 NUMBER SIGN. */
        following = at(end)

        if (following === 'x' || following === 'X') {
          /* ASCII hex digits. */
          type = HEXADECIMAL
          end = ++begin
        } else {
          /* ASCII digits. */
          type = DECIMAL
        }
      }

      entityCharacters = ''
      entity = ''
      characters = ''
      test = TESTS[type]
      end--

      while (++end < length) {
        following = at(end)

        if (!test(following)) {
          break
        }

        characters += following

        /* Check if we can match a legacy named
         * reference.  If so, we cache that as the
         * last viable named reference.  This
         * ensures we do not need to walk backwards
         * later. */
        if (type === NAMED && own.call(legacy, characters)) {
          entityCharacters = characters
          entity = legacy[characters]
        }
      }

      terminated = at(end) === ';'

      if (terminated) {
        end++

        if (type === NAMED && own.call(characterEntities, characters)) {
          entityCharacters = characters
          entity = characterEntities[characters]
        }
      }

      diff = 1 + end - start

      if (!terminated && !nonTerminated) {
        /* Empty. */
      } else if (!characters) {
        /* An empty (possible) entity is valid, unless
         * its numeric (thus an ampersand followed by
         * an octothorp). */
        if (type !== NAMED) {
          warning(NUMERIC_EMPTY, diff)
        }
      } else if (type === NAMED) {
        /* An ampersand followed by anything
         * unknown, and not terminated, is invalid. */
        if (terminated && !entity) {
          warning(NAMED_UNKNOWN, 1)
        } else {
          /* If theres something after an entity
           * name which is not known, cap the
           * reference. */
          if (entityCharacters !== characters) {
            end = begin + entityCharacters.length
            diff = 1 + end - begin
            terminated = false
          }

          /* If the reference is not terminated,
           * warn. */
          if (!terminated) {
            reason = entityCharacters ? NAMED_NOT_TERMINATED : NAMED_EMPTY

            if (!settings.attribute) {
              warning(reason, diff)
            } else {
              following = at(end)

              if (following === '=') {
                warning(reason, diff)
                entity = null
              } else if (alphanumerical(following)) {
                entity = null
              } else {
                warning(reason, diff)
              }
            }
          }
        }

        reference = entity
      } else {
        if (!terminated) {
          /* All non-terminated numeric entities are
           * not rendered, and trigger a warning. */
          warning(NUMERIC_NOT_TERMINATED, diff)
        }

        /* When terminated and number, parse as
         * either hexadecimal or decimal. */
        reference = parseInt(characters, BASE[type])

        /* Trigger a warning when the parsed number
         * is prohibited, and replace with
         * replacement character. */
        if (prohibited(reference)) {
          warning(NUMERIC_PROHIBITED, diff)
          reference = '\uFFFD'
        } else if (reference in invalid) {
          /* Trigger a warning when the parsed number
           * is disallowed, and replace by an
           * alternative. */
          warning(NUMERIC_DISALLOWED, diff)
          reference = invalid[reference]
        } else {
          /* Parse the number. */
          output = ''

          /* Trigger a warning when the parsed
           * number should not be used. */
          if (disallowed(reference)) {
            warning(NUMERIC_DISALLOWED, diff)
          }

          /* Stringify the number. */
          if (reference > 0xffff) {
            reference -= 0x10000
            output += fromCharCode((reference >>> (10 & 0x3ff)) | 0xd800)
            reference = 0xdc00 | (reference & 0x3ff)
          }

          reference = output + fromCharCode(reference)
        }
      }

      /* If we could not find a reference, queue the
       * checked characters (as normal characters),
       * and move the pointer to their end. This is
       * possible because we can be certain neither
       * newlines nor ampersands are included. */
      if (!reference) {
        characters = value.slice(start - 1, end)
        queue += characters
        column += characters.length
        index = end - 1
      } else {
        /* Found it! First eat the queued
         * characters as normal text, then eat
         * an entity. */
        flush()

        prev = now()
        index = end - 1
        column += end - start + 1
        result.push(reference)
        next = now()
        next.offset++

        if (handleReference) {
          handleReference.call(
            referenceContext,
            reference,
            {start: prev, end: next},
            value.slice(start - 1, end)
          )
        }

        prev = next
      }
    }
  }

  /* Return the reduced nodes, and any possible warnings. */
  return result.join('')

  /* Get current position. */
  function now() {
    return {
      line: line,
      column: column,
      offset: index + (pos.offset || 0)
    }
  }

  /* “Throw” a parse-error: a warning. */
  function parseError(code, offset) {
    var position = now()

    position.column += offset
    position.offset += offset

    handleWarning.call(warningContext, MESSAGES[code], position, code)
  }

  /* Get character at position. */
  function at(position) {
    return value.charAt(position)
  }

  /* Flush `queue` (normal text). Macro invoked before
   * each entity and at the end of `value`.
   * Does nothing when `queue` is empty. */
  function flush() {
    if (queue) {
      result.push(queue)

      if (handleText) {
        handleText.call(textContext, queue, {start: prev, end: now()})
      }

      queue = ''
    }
  }
}

/* Check if `character` is outside the permissible unicode range. */
function prohibited(code) {
  return (code >= 0xd800 && code <= 0xdfff) || code > 0x10ffff
}

/* Check if `character` is disallowed. */
function disallowed(code) {
  return (
    (code >= 0x0001 && code <= 0x0008) ||
    code === 0x000b ||
    (code >= 0x000d && code <= 0x001f) ||
    (code >= 0x007f && code <= 0x009f) ||
    (code >= 0xfdd0 && code <= 0xfdef) ||
    (code & 0xffff) === 0xffff ||
    (code & 0xffff) === 0xfffe
  )
}


/***/ }),
/* 27 */
/***/ (function(module) {

module.exports = {"AEli":"Æ","AElig":"Æ","AM":"&","AMP":"&","Aacut":"Á","Aacute":"Á","Abreve":"Ă","Acir":"Â","Acirc":"Â","Acy":"А","Afr":"𝔄","Agrav":"À","Agrave":"À","Alpha":"Α","Amacr":"Ā","And":"⩓","Aogon":"Ą","Aopf":"𝔸","ApplyFunction":"⁡","Arin":"Å","Aring":"Å","Ascr":"𝒜","Assign":"≔","Atild":"Ã","Atilde":"Ã","Aum":"Ä","Auml":"Ä","Backslash":"∖","Barv":"⫧","Barwed":"⌆","Bcy":"Б","Because":"∵","Bernoullis":"ℬ","Beta":"Β","Bfr":"𝔅","Bopf":"𝔹","Breve":"˘","Bscr":"ℬ","Bumpeq":"≎","CHcy":"Ч","COP":"©","COPY":"©","Cacute":"Ć","Cap":"⋒","CapitalDifferentialD":"ⅅ","Cayleys":"ℭ","Ccaron":"Č","Ccedi":"Ç","Ccedil":"Ç","Ccirc":"Ĉ","Cconint":"∰","Cdot":"Ċ","Cedilla":"¸","CenterDot":"·","Cfr":"ℭ","Chi":"Χ","CircleDot":"⊙","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","Colon":"∷","Colone":"⩴","Congruent":"≡","Conint":"∯","ContourIntegral":"∮","Copf":"ℂ","Coproduct":"∐","CounterClockwiseContourIntegral":"∳","Cross":"⨯","Cscr":"𝒞","Cup":"⋓","CupCap":"≍","DD":"ⅅ","DDotrahd":"⤑","DJcy":"Ђ","DScy":"Ѕ","DZcy":"Џ","Dagger":"‡","Darr":"↡","Dashv":"⫤","Dcaron":"Ď","Dcy":"Д","Del":"∇","Delta":"Δ","Dfr":"𝔇","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","Diamond":"⋄","DifferentialD":"ⅆ","Dopf":"𝔻","Dot":"¨","DotDot":"⃜","DotEqual":"≐","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrow":"↓","DownArrowBar":"⤓","DownArrowUpArrow":"⇵","DownBreve":"̑","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVector":"↽","DownLeftVectorBar":"⥖","DownRightTeeVector":"⥟","DownRightVector":"⇁","DownRightVectorBar":"⥗","DownTee":"⊤","DownTeeArrow":"↧","Downarrow":"⇓","Dscr":"𝒟","Dstrok":"Đ","ENG":"Ŋ","ET":"Ð","ETH":"Ð","Eacut":"É","Eacute":"É","Ecaron":"Ě","Ecir":"Ê","Ecirc":"Ê","Ecy":"Э","Edot":"Ė","Efr":"𝔈","Egrav":"È","Egrave":"È","Element":"∈","Emacr":"Ē","EmptySmallSquare":"◻","EmptyVerySmallSquare":"▫","Eogon":"Ę","Eopf":"𝔼","Epsilon":"Ε","Equal":"⩵","EqualTilde":"≂","Equilibrium":"⇌","Escr":"ℰ","Esim":"⩳","Eta":"Η","Eum":"Ë","Euml":"Ë","Exists":"∃","ExponentialE":"ⅇ","Fcy":"Ф","Ffr":"𝔉","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","Fopf":"𝔽","ForAll":"∀","Fouriertrf":"ℱ","Fscr":"ℱ","GJcy":"Ѓ","G":">","GT":">","Gamma":"Γ","Gammad":"Ϝ","Gbreve":"Ğ","Gcedil":"Ģ","Gcirc":"Ĝ","Gcy":"Г","Gdot":"Ġ","Gfr":"𝔊","Gg":"⋙","Gopf":"𝔾","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","Gt":"≫","HARDcy":"Ъ","Hacek":"ˇ","Hat":"^","Hcirc":"Ĥ","Hfr":"ℌ","HilbertSpace":"ℋ","Hopf":"ℍ","HorizontalLine":"─","Hscr":"ℋ","Hstrok":"Ħ","HumpDownHump":"≎","HumpEqual":"≏","IEcy":"Е","IJlig":"Ĳ","IOcy":"Ё","Iacut":"Í","Iacute":"Í","Icir":"Î","Icirc":"Î","Icy":"И","Idot":"İ","Ifr":"ℑ","Igrav":"Ì","Igrave":"Ì","Im":"ℑ","Imacr":"Ī","ImaginaryI":"ⅈ","Implies":"⇒","Int":"∬","Integral":"∫","Intersection":"⋂","InvisibleComma":"⁣","InvisibleTimes":"⁢","Iogon":"Į","Iopf":"𝕀","Iota":"Ι","Iscr":"ℐ","Itilde":"Ĩ","Iukcy":"І","Ium":"Ï","Iuml":"Ï","Jcirc":"Ĵ","Jcy":"Й","Jfr":"𝔍","Jopf":"𝕁","Jscr":"𝒥","Jsercy":"Ј","Jukcy":"Є","KHcy":"Х","KJcy":"Ќ","Kappa":"Κ","Kcedil":"Ķ","Kcy":"К","Kfr":"𝔎","Kopf":"𝕂","Kscr":"𝒦","LJcy":"Љ","L":"<","LT":"<","Lacute":"Ĺ","Lambda":"Λ","Lang":"⟪","Laplacetrf":"ℒ","Larr":"↞","Lcaron":"Ľ","Lcedil":"Ļ","Lcy":"Л","LeftAngleBracket":"⟨","LeftArrow":"←","LeftArrowBar":"⇤","LeftArrowRightArrow":"⇆","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVector":"⇃","LeftDownVectorBar":"⥙","LeftFloor":"⌊","LeftRightArrow":"↔","LeftRightVector":"⥎","LeftTee":"⊣","LeftTeeArrow":"↤","LeftTeeVector":"⥚","LeftTriangle":"⊲","LeftTriangleBar":"⧏","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVector":"↿","LeftUpVectorBar":"⥘","LeftVector":"↼","LeftVectorBar":"⥒","Leftarrow":"⇐","Leftrightarrow":"⇔","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","LessLess":"⪡","LessSlantEqual":"⩽","LessTilde":"≲","Lfr":"𝔏","Ll":"⋘","Lleftarrow":"⇚","Lmidot":"Ŀ","LongLeftArrow":"⟵","LongLeftRightArrow":"⟷","LongRightArrow":"⟶","Longleftarrow":"⟸","Longleftrightarrow":"⟺","Longrightarrow":"⟹","Lopf":"𝕃","LowerLeftArrow":"↙","LowerRightArrow":"↘","Lscr":"ℒ","Lsh":"↰","Lstrok":"Ł","Lt":"≪","Map":"⤅","Mcy":"М","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","MinusPlus":"∓","Mopf":"𝕄","Mscr":"ℳ","Mu":"Μ","NJcy":"Њ","Nacute":"Ń","Ncaron":"Ň","Ncedil":"Ņ","Ncy":"Н","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","Nfr":"𝔑","NoBreak":"⁠","NonBreakingSpace":" ","Nopf":"ℕ","Not":"⫬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","NotLeftTriangle":"⋪","NotLeftTriangleBar":"⧏̸","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangle":"⋫","NotRightTriangleBar":"⧐̸","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","Nscr":"𝒩","Ntild":"Ñ","Ntilde":"Ñ","Nu":"Ν","OElig":"Œ","Oacut":"Ó","Oacute":"Ó","Ocir":"Ô","Ocirc":"Ô","Ocy":"О","Odblac":"Ő","Ofr":"𝔒","Ograv":"Ò","Ograve":"Ò","Omacr":"Ō","Omega":"Ω","Omicron":"Ο","Oopf":"𝕆","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","Or":"⩔","Oscr":"𝒪","Oslas":"Ø","Oslash":"Ø","Otild":"Õ","Otilde":"Õ","Otimes":"⨷","Oum":"Ö","Ouml":"Ö","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","PartialD":"∂","Pcy":"П","Pfr":"𝔓","Phi":"Φ","Pi":"Π","PlusMinus":"±","Poincareplane":"ℌ","Popf":"ℙ","Pr":"⪻","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","Prime":"″","Product":"∏","Proportion":"∷","Proportional":"∝","Pscr":"𝒫","Psi":"Ψ","QUO":"\"","QUOT":"\"","Qfr":"𝔔","Qopf":"ℚ","Qscr":"𝒬","RBarr":"⤐","RE":"®","REG":"®","Racute":"Ŕ","Rang":"⟫","Rarr":"↠","Rarrtl":"⤖","Rcaron":"Ř","Rcedil":"Ŗ","Rcy":"Р","Re":"ℜ","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","Rfr":"ℜ","Rho":"Ρ","RightAngleBracket":"⟩","RightArrow":"→","RightArrowBar":"⇥","RightArrowLeftArrow":"⇄","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVector":"⇂","RightDownVectorBar":"⥕","RightFloor":"⌋","RightTee":"⊢","RightTeeArrow":"↦","RightTeeVector":"⥛","RightTriangle":"⊳","RightTriangleBar":"⧐","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVector":"↾","RightUpVectorBar":"⥔","RightVector":"⇀","RightVectorBar":"⥓","Rightarrow":"⇒","Ropf":"ℝ","RoundImplies":"⥰","Rrightarrow":"⇛","Rscr":"ℛ","Rsh":"↱","RuleDelayed":"⧴","SHCHcy":"Щ","SHcy":"Ш","SOFTcy":"Ь","Sacute":"Ś","Sc":"⪼","Scaron":"Š","Scedil":"Ş","Scirc":"Ŝ","Scy":"С","Sfr":"𝔖","ShortDownArrow":"↓","ShortLeftArrow":"←","ShortRightArrow":"→","ShortUpArrow":"↑","Sigma":"Σ","SmallCircle":"∘","Sopf":"𝕊","Sqrt":"√","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","Sscr":"𝒮","Star":"⋆","Sub":"⋐","Subset":"⋐","SubsetEqual":"⊆","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","SuchThat":"∋","Sum":"∑","Sup":"⋑","Superset":"⊃","SupersetEqual":"⊇","Supset":"⋑","THOR":"Þ","THORN":"Þ","TRADE":"™","TSHcy":"Ћ","TScy":"Ц","Tab":"\t","Tau":"Τ","Tcaron":"Ť","Tcedil":"Ţ","Tcy":"Т","Tfr":"𝔗","Therefore":"∴","Theta":"Θ","ThickSpace":"  ","ThinSpace":" ","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","Topf":"𝕋","TripleDot":"⃛","Tscr":"𝒯","Tstrok":"Ŧ","Uacut":"Ú","Uacute":"Ú","Uarr":"↟","Uarrocir":"⥉","Ubrcy":"Ў","Ubreve":"Ŭ","Ucir":"Û","Ucirc":"Û","Ucy":"У","Udblac":"Ű","Ufr":"𝔘","Ugrav":"Ù","Ugrave":"Ù","Umacr":"Ū","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","Uopf":"𝕌","UpArrow":"↑","UpArrowBar":"⤒","UpArrowDownArrow":"⇅","UpDownArrow":"↕","UpEquilibrium":"⥮","UpTee":"⊥","UpTeeArrow":"↥","Uparrow":"⇑","Updownarrow":"⇕","UpperLeftArrow":"↖","UpperRightArrow":"↗","Upsi":"ϒ","Upsilon":"Υ","Uring":"Ů","Uscr":"𝒰","Utilde":"Ũ","Uum":"Ü","Uuml":"Ü","VDash":"⊫","Vbar":"⫫","Vcy":"В","Vdash":"⊩","Vdashl":"⫦","Vee":"⋁","Verbar":"‖","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","Vopf":"𝕍","Vscr":"𝒱","Vvdash":"⊪","Wcirc":"Ŵ","Wedge":"⋀","Wfr":"𝔚","Wopf":"𝕎","Wscr":"𝒲","Xfr":"𝔛","Xi":"Ξ","Xopf":"𝕏","Xscr":"𝒳","YAcy":"Я","YIcy":"Ї","YUcy":"Ю","Yacut":"Ý","Yacute":"Ý","Ycirc":"Ŷ","Ycy":"Ы","Yfr":"𝔜","Yopf":"𝕐","Yscr":"𝒴","Yuml":"Ÿ","ZHcy":"Ж","Zacute":"Ź","Zcaron":"Ž","Zcy":"З","Zdot":"Ż","ZeroWidthSpace":"​","Zeta":"Ζ","Zfr":"ℨ","Zopf":"ℤ","Zscr":"𝒵","aacut":"á","aacute":"á","abreve":"ă","ac":"∾","acE":"∾̳","acd":"∿","acir":"â","acirc":"â","acut":"´","acute":"´","acy":"а","aeli":"æ","aelig":"æ","af":"⁡","afr":"𝔞","agrav":"à","agrave":"à","alefsym":"ℵ","aleph":"ℵ","alpha":"α","amacr":"ā","amalg":"⨿","am":"&","amp":"&","and":"∧","andand":"⩕","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsd":"∡","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","aogon":"ą","aopf":"𝕒","ap":"≈","apE":"⩰","apacir":"⩯","ape":"≊","apid":"≋","apos":"'","approx":"≈","approxeq":"≊","arin":"å","aring":"å","ascr":"𝒶","ast":"*","asymp":"≈","asympeq":"≍","atild":"ã","atilde":"ã","aum":"ä","auml":"ä","awconint":"∳","awint":"⨑","bNot":"⫭","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","barvee":"⊽","barwed":"⌅","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","beta":"β","beth":"ℶ","between":"≬","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bnot":"⌐","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxDL":"╗","boxDR":"╔","boxDl":"╖","boxDr":"╓","boxH":"═","boxHD":"╦","boxHU":"╩","boxHd":"╤","boxHu":"╧","boxUL":"╝","boxUR":"╚","boxUl":"╜","boxUr":"╙","boxV":"║","boxVH":"╬","boxVL":"╣","boxVR":"╠","boxVh":"╫","boxVl":"╢","boxVr":"╟","boxbox":"⧉","boxdL":"╕","boxdR":"╒","boxdl":"┐","boxdr":"┌","boxh":"─","boxhD":"╥","boxhU":"╨","boxhd":"┬","boxhu":"┴","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxuL":"╛","boxuR":"╘","boxul":"┘","boxur":"└","boxv":"│","boxvH":"╪","boxvL":"╡","boxvR":"╞","boxvh":"┼","boxvl":"┤","boxvr":"├","bprime":"‵","breve":"˘","brvba":"¦","brvbar":"¦","bscr":"𝒷","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsol":"\\","bsolb":"⧅","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","bumpeq":"≏","cacute":"ć","cap":"∩","capand":"⩄","capbrcup":"⩉","capcap":"⩋","capcup":"⩇","capdot":"⩀","caps":"∩︀","caret":"⁁","caron":"ˇ","ccaps":"⩍","ccaron":"č","ccedi":"ç","ccedil":"ç","ccirc":"ĉ","ccups":"⩌","ccupssm":"⩐","cdot":"ċ","cedi":"¸","cedil":"¸","cemptyv":"⦲","cen":"¢","cent":"¢","centerdot":"·","cfr":"𝔠","chcy":"ч","check":"✓","checkmark":"✓","chi":"χ","cir":"○","cirE":"⧃","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledR":"®","circledS":"Ⓢ","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","clubs":"♣","clubsuit":"♣","colon":":","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","conint":"∮","copf":"𝕔","coprod":"∐","cop":"©","copy":"©","copysr":"℗","crarr":"↵","cross":"✗","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cup":"∪","cupbrcap":"⩈","cupcap":"⩆","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curre":"¤","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dArr":"⇓","dHar":"⥥","dagger":"†","daleth":"ℸ","darr":"↓","dash":"‐","dashv":"⊣","dbkarow":"⤏","dblac":"˝","dcaron":"ď","dcy":"д","dd":"ⅆ","ddagger":"‡","ddarr":"⇊","ddotseq":"⩷","de":"°","deg":"°","delta":"δ","demptyv":"⦱","dfisht":"⥿","dfr":"𝔡","dharl":"⇃","dharr":"⇂","diam":"⋄","diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","digamma":"ϝ","disin":"⋲","div":"÷","divid":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","dopf":"𝕕","dot":"˙","doteq":"≐","doteqdot":"≑","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","downarrow":"↓","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","dscr":"𝒹","dscy":"ѕ","dsol":"⧶","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","dzcy":"џ","dzigrarr":"⟿","eDDot":"⩷","eDot":"≑","eacut":"é","eacute":"é","easter":"⩮","ecaron":"ě","ecir":"ê","ecirc":"ê","ecolon":"≕","ecy":"э","edot":"ė","ee":"ⅇ","efDot":"≒","efr":"𝔢","eg":"⪚","egrav":"è","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","emacr":"ē","empty":"∅","emptyset":"∅","emptyv":"∅","emsp13":" ","emsp14":" ","emsp":" ","eng":"ŋ","ensp":" ","eogon":"ę","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","equals":"=","equest":"≟","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erDot":"≓","erarr":"⥱","escr":"ℯ","esdot":"≐","esim":"≂","eta":"η","et":"ð","eth":"ð","eum":"ë","euml":"ë","euro":"€","excl":"!","exist":"∃","expectation":"ℰ","exponentiale":"ⅇ","fallingdotseq":"≒","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","ffr":"𝔣","filig":"ﬁ","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","fopf":"𝕗","forall":"∀","fork":"⋔","forkv":"⫙","fpartint":"⨍","frac1":"¼","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac3":"¾","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","gE":"≧","gEl":"⪌","gacute":"ǵ","gamma":"γ","gammad":"ϝ","gap":"⪆","gbreve":"ğ","gcirc":"ĝ","gcy":"г","gdot":"ġ","ge":"≥","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","ges":"⩾","gescc":"⪩","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","gfr":"𝔤","gg":"≫","ggg":"⋙","gimel":"ℷ","gjcy":"ѓ","gl":"≷","glE":"⪒","gla":"⪥","glj":"⪤","gnE":"≩","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gneq":"⪈","gneqq":"≩","gnsim":"⋧","gopf":"𝕘","grave":"`","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","g":">","gt":">","gtcc":"⪧","gtcir":"⩺","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","hArr":"⇔","hairsp":" ","half":"½","hamilt":"ℋ","hardcy":"ъ","harr":"↔","harrcir":"⥈","harrw":"↭","hbar":"ℏ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","horbar":"―","hscr":"𝒽","hslash":"ℏ","hstrok":"ħ","hybull":"⁃","hyphen":"‐","iacut":"í","iacute":"í","ic":"⁣","icir":"î","icirc":"î","icy":"и","iecy":"е","iexc":"¡","iexcl":"¡","iff":"⇔","ifr":"𝔦","igrav":"ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","ijlig":"ĳ","imacr":"ī","image":"ℑ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","imof":"⊷","imped":"Ƶ","in":"∈","incare":"℅","infin":"∞","infintie":"⧝","inodot":"ı","int":"∫","intcal":"⊺","integers":"ℤ","intercal":"⊺","intlarhk":"⨗","intprod":"⨼","iocy":"ё","iogon":"į","iopf":"𝕚","iota":"ι","iprod":"⨼","iques":"¿","iquest":"¿","iscr":"𝒾","isin":"∈","isinE":"⋹","isindot":"⋵","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","itilde":"ĩ","iukcy":"і","ium":"ï","iuml":"ï","jcirc":"ĵ","jcy":"й","jfr":"𝔧","jmath":"ȷ","jopf":"𝕛","jscr":"𝒿","jsercy":"ј","jukcy":"є","kappa":"κ","kappav":"ϰ","kcedil":"ķ","kcy":"к","kfr":"𝔨","kgreen":"ĸ","khcy":"х","kjcy":"ќ","kopf":"𝕜","kscr":"𝓀","lAarr":"⇚","lArr":"⇐","lAtail":"⤛","lBarr":"⤎","lE":"≦","lEg":"⪋","lHar":"⥢","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","lambda":"λ","lang":"⟨","langd":"⦑","langle":"⟨","lap":"⪅","laqu":"«","laquo":"«","larr":"←","larrb":"⇤","larrbfs":"⤟","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","lat":"⪫","latail":"⤙","late":"⪭","lates":"⪭︀","lbarr":"⤌","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","lcaron":"ľ","lcedil":"ļ","lceil":"⌈","lcub":"{","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","leftarrow":"←","leftarrowtail":"↢","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","leftthreetimes":"⋋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","les":"⩽","lescc":"⪨","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","lessgtr":"≶","lesssim":"≲","lfisht":"⥼","lfloor":"⌊","lfr":"𝔩","lg":"≶","lgE":"⪑","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","ljcy":"љ","ll":"≪","llarr":"⇇","llcorner":"⌞","llhard":"⥫","lltri":"◺","lmidot":"ŀ","lmoust":"⎰","lmoustache":"⎰","lnE":"≨","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","longleftrightarrow":"⟷","longmapsto":"⟼","longrightarrow":"⟶","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","lstrok":"ł","l":"<","lt":"<","ltcc":"⪦","ltcir":"⩹","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltrPar":"⦖","ltri":"◃","ltrie":"⊴","ltrif":"◂","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","mDDot":"∺","mac":"¯","macr":"¯","male":"♂","malt":"✠","maltese":"✠","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","mcy":"м","mdash":"—","measuredangle":"∡","mfr":"𝔪","mho":"℧","micr":"µ","micro":"µ","mid":"∣","midast":"*","midcir":"⫰","middo":"·","middot":"·","minus":"−","minusb":"⊟","minusd":"∸","minusdu":"⨪","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","mopf":"𝕞","mp":"∓","mscr":"𝓂","mstpos":"∾","mu":"μ","multimap":"⊸","mumap":"⊸","nGg":"⋙̸","nGt":"≫⃒","nGtv":"≫̸","nLeftarrow":"⇍","nLeftrightarrow":"⇎","nLl":"⋘̸","nLt":"≪⃒","nLtv":"≪̸","nRightarrow":"⇏","nVDash":"⊯","nVdash":"⊮","nabla":"∇","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natur":"♮","natural":"♮","naturals":"ℕ","nbs":" ","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","ncaron":"ň","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","ncy":"н","ndash":"–","ne":"≠","neArr":"⇗","nearhk":"⤤","nearr":"↗","nearrow":"↗","nedot":"≐̸","nequiv":"≢","nesear":"⤨","nesim":"≂̸","nexist":"∄","nexists":"∄","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","ngsim":"≵","ngt":"≯","ngtr":"≯","nhArr":"⇎","nharr":"↮","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","njcy":"њ","nlArr":"⇍","nlE":"≦̸","nlarr":"↚","nldr":"‥","nle":"≰","nleftarrow":"↚","nleftrightarrow":"↮","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nlsim":"≴","nlt":"≮","nltri":"⋪","nltrie":"⋬","nmid":"∤","nopf":"𝕟","no":"¬","not":"¬","notin":"∉","notinE":"⋹̸","notindot":"⋵̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","npar":"∦","nparallel":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","npre":"⪯̸","nprec":"⊀","npreceq":"⪯̸","nrArr":"⇏","nrarr":"↛","nrarrc":"⤳̸","nrarrw":"↝̸","nrightarrow":"↛","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","ntild":"ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","nu":"ν","num":"#","numero":"№","numsp":" ","nvDash":"⊭","nvHarr":"⤄","nvap":"≍⃒","nvdash":"⊬","nvge":"≥⃒","nvgt":">⃒","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwArr":"⇖","nwarhk":"⤣","nwarr":"↖","nwarrow":"↖","nwnear":"⤧","oS":"Ⓢ","oacut":"ó","oacute":"ó","oast":"⊛","ocir":"ô","ocirc":"ô","ocy":"о","odash":"⊝","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","oelig":"œ","ofcir":"⦿","ofr":"𝔬","ogon":"˛","ograv":"ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","omacr":"ō","omega":"ω","omicron":"ο","omid":"⦶","ominus":"⊖","oopf":"𝕠","opar":"⦷","operp":"⦹","oplus":"⊕","or":"∨","orarr":"↻","ord":"º","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oscr":"ℴ","oslas":"ø","oslash":"ø","osol":"⊘","otild":"õ","otilde":"õ","otimes":"⊗","otimesas":"⨶","oum":"ö","ouml":"ö","ovbar":"⌽","par":"¶","para":"¶","parallel":"∥","parsim":"⫳","parsl":"⫽","part":"∂","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","pfr":"𝔭","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plus":"+","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plusdo":"∔","plusdu":"⨥","pluse":"⩲","plusm":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","pointint":"⨕","popf":"𝕡","poun":"£","pound":"£","pr":"≺","prE":"⪳","prap":"⪷","prcue":"≼","pre":"⪯","prec":"≺","precapprox":"⪷","preccurlyeq":"≼","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","precsim":"≾","prime":"′","primes":"ℙ","prnE":"⪵","prnap":"⪹","prnsim":"⋨","prod":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","propto":"∝","prsim":"≾","prurel":"⊰","pscr":"𝓅","psi":"ψ","puncsp":" ","qfr":"𝔮","qint":"⨌","qopf":"𝕢","qprime":"⁗","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quo":"\"","quot":"\"","rAarr":"⇛","rArr":"⇒","rAtail":"⤜","rBarr":"⤏","rHar":"⥤","race":"∽̱","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","rangd":"⦒","range":"⦥","rangle":"⟩","raqu":"»","raquo":"»","rarr":"→","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","rarrtl":"↣","rarrw":"↝","ratail":"⤚","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","rcaron":"ř","rcedil":"ŗ","rceil":"⌉","rcub":"}","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","rect":"▭","re":"®","reg":"®","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","rhard":"⇁","rharu":"⇀","rharul":"⥬","rho":"ρ","rhov":"ϱ","rightarrow":"→","rightarrowtail":"↣","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","rightthreetimes":"⋌","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoust":"⎱","rmoustache":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","roplus":"⨮","rotimes":"⨵","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","rsaquo":"›","rscr":"𝓇","rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","ruluhar":"⥨","rx":"℞","sacute":"ś","sbquo":"‚","sc":"≻","scE":"⪴","scap":"⪸","scaron":"š","sccue":"≽","sce":"⪰","scedil":"ş","scirc":"ŝ","scnE":"⪶","scnap":"⪺","scnsim":"⋩","scpolint":"⨓","scsim":"≿","scy":"с","sdot":"⋅","sdotb":"⊡","sdote":"⩦","seArr":"⇘","searhk":"⤥","searr":"↘","searrow":"↘","sec":"§","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","sfr":"𝔰","sfrown":"⌢","sharp":"♯","shchcy":"щ","shcy":"ш","shortmid":"∣","shortparallel":"∥","sh":"­","shy":"­","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","softcy":"ь","sol":"/","solb":"⧄","solbar":"⌿","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","squ":"□","square":"□","squarf":"▪","squf":"▪","srarr":"→","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","subE":"⫅","subdot":"⪽","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","subseteq":"⊆","subseteqq":"⫅","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succ":"≻","succapprox":"⪸","succcurlyeq":"≽","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","sum":"∑","sung":"♪","sup":"⊃","sup1":"¹","sup2":"²","sup3":"³","supE":"⫆","supdot":"⪾","supdsub":"⫘","supe":"⊇","supedot":"⫄","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swArr":"⇙","swarhk":"⤦","swarr":"↙","swarrow":"↙","swnwar":"⤪","szli":"ß","szlig":"ß","target":"⌖","tau":"τ","tbrk":"⎴","tcaron":"ť","tcedil":"ţ","tcy":"т","tdot":"⃛","telrec":"⌕","tfr":"𝔱","there4":"∴","therefore":"∴","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","thinsp":" ","thkap":"≈","thksim":"∼","thor":"þ","thorn":"þ","tilde":"˜","time":"×","times":"×","timesb":"⊠","timesbar":"⨱","timesd":"⨰","tint":"∭","toea":"⤨","top":"⊤","topbot":"⌶","topcir":"⫱","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","tscr":"𝓉","tscy":"ц","tshcy":"ћ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","uArr":"⇑","uHar":"⥣","uacut":"ú","uacute":"ú","uarr":"↑","ubrcy":"ў","ubreve":"ŭ","ucir":"û","ucirc":"û","ucy":"у","udarr":"⇅","udblac":"ű","udhar":"⥮","ufisht":"⥾","ufr":"𝔲","ugrav":"ù","ugrave":"ù","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","umacr":"ū","um":"¨","uml":"¨","uogon":"ų","uopf":"𝕦","uparrow":"↑","updownarrow":"↕","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","upsi":"υ","upsih":"ϒ","upsilon":"υ","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","uring":"ů","urtri":"◹","uscr":"𝓊","utdot":"⋰","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","uum":"ü","uuml":"ü","uwangle":"⦧","vArr":"⇕","vBar":"⫨","vBarv":"⫩","vDash":"⊨","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vcy":"в","vdash":"⊢","vee":"∨","veebar":"⊻","veeeq":"≚","vellip":"⋮","verbar":"|","vert":"|","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","vopf":"𝕧","vprop":"∝","vrtri":"⊳","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","vzigzag":"⦚","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","wedgeq":"≙","weierp":"℘","wfr":"𝔴","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","xfr":"𝔵","xhArr":"⟺","xharr":"⟷","xi":"ξ","xlArr":"⟸","xlarr":"⟵","xmap":"⟼","xnis":"⋻","xodot":"⨀","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrArr":"⟹","xrarr":"⟶","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","yacut":"ý","yacute":"ý","yacy":"я","ycirc":"ŷ","ycy":"ы","ye":"¥","yen":"¥","yfr":"𝔶","yicy":"ї","yopf":"𝕪","yscr":"𝓎","yucy":"ю","yum":"ÿ","yuml":"ÿ","zacute":"ź","zcaron":"ž","zcy":"з","zdot":"ż","zeetrf":"ℨ","zeta":"ζ","zfr":"𝔷","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","zscr":"𝓏","zwj":"‍","zwnj":"‌"};

/***/ }),
/* 28 */
/***/ (function(module) {

module.exports = {"AElig":"Æ","AMP":"&","Aacute":"Á","Acirc":"Â","Agrave":"À","Aring":"Å","Atilde":"Ã","Auml":"Ä","COPY":"©","Ccedil":"Ç","ETH":"Ð","Eacute":"É","Ecirc":"Ê","Egrave":"È","Euml":"Ë","GT":">","Iacute":"Í","Icirc":"Î","Igrave":"Ì","Iuml":"Ï","LT":"<","Ntilde":"Ñ","Oacute":"Ó","Ocirc":"Ô","Ograve":"Ò","Oslash":"Ø","Otilde":"Õ","Ouml":"Ö","QUOT":"\"","REG":"®","THORN":"Þ","Uacute":"Ú","Ucirc":"Û","Ugrave":"Ù","Uuml":"Ü","Yacute":"Ý","aacute":"á","acirc":"â","acute":"´","aelig":"æ","agrave":"à","amp":"&","aring":"å","atilde":"ã","auml":"ä","brvbar":"¦","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","curren":"¤","deg":"°","divide":"÷","eacute":"é","ecirc":"ê","egrave":"è","eth":"ð","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","iacute":"í","icirc":"î","iexcl":"¡","igrave":"ì","iquest":"¿","iuml":"ï","laquo":"«","lt":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","ntilde":"ñ","oacute":"ó","ocirc":"ô","ograve":"ò","ordf":"ª","ordm":"º","oslash":"ø","otilde":"õ","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","raquo":"»","reg":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","thorn":"þ","times":"×","uacute":"ú","ucirc":"û","ugrave":"ù","uml":"¨","uuml":"ü","yacute":"ý","yen":"¥","yuml":"ÿ"};

/***/ }),
/* 29 */
/***/ (function(module) {

module.exports = {"0":"�","128":"€","130":"‚","131":"ƒ","132":"„","133":"…","134":"†","135":"‡","136":"ˆ","137":"‰","138":"Š","139":"‹","140":"Œ","142":"Ž","145":"‘","146":"’","147":"“","148":"”","149":"•","150":"–","151":"—","152":"˜","153":"™","154":"š","155":"›","156":"œ","158":"ž","159":"Ÿ"};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = decimal

/* Check if the given character code, or the character
 * code at the first character, is decimal. */
function decimal(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character

  return code >= 48 && code <= 57 /* 0-9 */
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = hexadecimal

/* Check if the given character code, or the character
 * code at the first character, is hexadecimal. */
function hexadecimal(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character

  return (
    (code >= 97 /* a */ && code <= 102) /* z */ ||
    (code >= 65 /* A */ && code <= 70) /* Z */ ||
    (code >= 48 /* A */ && code <= 57) /* Z */
  )
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabetical = __webpack_require__(33)
var decimal = __webpack_require__(30)

module.exports = alphanumerical

/* Check if the given character code, or the character
 * code at the first character, is alphanumerical. */
function alphanumerical(character) {
  return alphabetical(character) || decimal(character)
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = alphabetical

/* Check if the given character code, or the character
 * code at the first character, is alphabetical. */
function alphabetical(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character

  return (
    (code >= 97 && code <= 122) /* a-z */ ||
    (code >= 65 && code <= 90) /* A-Z */
  )
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory;

var MERGEABLE_NODES = {
    text: mergeText,
    blockquote: mergeBlockquote
};

/* Check whether a node is mergeable with adjacent nodes. */
function mergeable(node) {
    var start;
    var end;

    if (node.type !== 'text' || !node.position) {
        return true;
    }

    start = node.position.start;
    end = node.position.end;

    /* Only merge nodes which occupy the same size as their
     * `value`. */
    return start.line !== end.line ||
        end.column - start.column === node.value.length;
}

/* Merge two text nodes: `node` into `prev`. */
function mergeText(prev, node) {
    prev.value += node.value;

    return prev;
}

/* Merge two blockquotes: `node` into `prev`, unless in
 * CommonMark mode. */
function mergeBlockquote(prev, node) {
    if (this.options.commonmark) {
        return node;
    }

    prev.children = prev.children.concat(node.children);

    return prev;
}

/* Construct a tokenizer.  This creates both
 * `tokenizeInline` and `tokenizeBlock`. */
function factory(type) {
    return tokenize;

    /* Tokenizer for a bound `type`. */
    function tokenize(value, location) {
        var self = this;
        var offset = self.offset;
        var tokens = [];
        var methods = self[type + 'Methods'];
        var tokenizers = self[type + 'Tokenizers'];
        var line = location.line;
        var column = location.column;
        var index;
        var length;
        var method;
        var name;
        var matched;
        var valueLength;

        /* Trim white space only lines. */
        if (!value) {
            return tokens;
        }

        /* Expose on `eat`. */
        eat.now = now;
        eat.file = self.file;

        /* Sync initial offset. */
        updatePosition('');

        /* Iterate over `value`, and iterate over all
         * tokenizers.  When one eats something, re-iterate
         * with the remaining value.  If no tokenizer eats,
         * something failed (should not happen) and an
         * exception is thrown. */
        while (value) {//console.log(value);
            index = -1;
            length = methods.length;
            matched = false;

            while (++index < length) {
                name = methods[index];
                method = tokenizers[name];

                if (
                    method &&
                    /* istanbul ignore next */ (!method.onlyAtStart || self.atStart) &&
                    (!method.notInList || !self.inList) &&
                    (!method.notInBlock || !self.inBlock) &&
                    (!method.notInLink || !self.inLink)
                ) {
                    valueLength = value.length;

                    method.apply(self, [eat, value]);

                    matched = valueLength !== value.length;

                    if (matched) {
                        break;
                    }
                }
            }

            /* istanbul ignore if */
            if (!matched) {
                self.file.fail(new Error('Infinite loop'), eat.now());
            }
        }

        self.eof = now();

        return tokens;

        /* Update line, column, and offset based on
         * `value`. */
        function updatePosition(subvalue) {
            var lastIndex = -1;
            var index = subvalue.indexOf('\n');

            while (index !== -1) {
                line++;
                lastIndex = index;
                index = subvalue.indexOf('\n', index + 1);
            }

            if (lastIndex === -1) {
                column += subvalue.length;
            } else {
                column = subvalue.length - lastIndex;
            }

            if (line in offset) {
                if (lastIndex !== -1) {
                    column += offset[line];
                } else if (column <= offset[line]) {
                    column = offset[line] + 1;
                }
            }
        }

        /* Get offset.  Called before the first character is
         * eaten to retrieve the range's offsets. */
        function getOffset() {
            var indentation = [];
            var pos = line + 1;

            /* Done.  Called when the last character is
             * eaten to retrieve the range’s offsets. */
            return function () {
                var last = line + 1;

                while (pos < last) {
                    indentation.push((offset[pos] || 0) + 1);

                    pos++;
                }

                return indentation;
            };
        }

        /* Get the current position. */
        function now() {
            var pos = {line: line, column: column};

            pos.offset = self.toOffset(pos);

            return pos;
        }

        /* Store position information for a node. */
        function Position(start) {
            this.start = start;
            this.end = now();
        }

        /* Throw when a value is incorrectly eaten.
         * This shouldn’t happen but will throw on new,
         * incorrect rules. */
        function validateEat(subvalue) {
            /* istanbul ignore if */
            if (value.substring(0, subvalue.length) !== subvalue) {
                /* Capture stack-trace. */
                self.file.fail(
                    new Error(
                        'Incorrectly eaten value: please report this ' +
                        'warning on http://git.io/vg5Ft'
                    ),
                    now()
                );
            }
        }

        /* Mark position and patch `node.position`. */
        function position() {
            var before = now();

            return update;

            /* Add the position to a node. */
            function update(node, indent) {
                var prev = node.position;
                var start = prev ? prev.start : before;
                var combined = [];
                var n = prev && prev.end.line;
                var l = before.line;

                node.position = new Position(start);

                /* If there was already a `position`, this
                 * node was merged.  Fixing `start` wasn’t
                 * hard, but the indent is different.
                 * Especially because some information, the
                 * indent between `n` and `l` wasn’t
                 * tracked.  Luckily, that space is
                 * (should be?) empty, so we can safely
                 * check for it now. */
                if (prev && indent && prev.indent) {
                    combined = prev.indent;

                    if (n < l) {
                        while (++n < l) {
                            combined.push((offset[n] || 0) + 1);
                        }

                        combined.push(before.column);
                    }

                    indent = combined.concat(indent);
                }

                node.position.indent = indent || [];

                return node;
            }
        }

        /* Add `node` to `parent`s children or to `tokens`.
         * Performs merges where possible. */
        function add(node, parent) {
            var children = parent ? parent.children : tokens;
            var prev = children[children.length - 1];

            if (
                prev &&
                node.type === prev.type &&
                node.type in MERGEABLE_NODES &&
                mergeable(prev) &&
                mergeable(node)
            ) {
                node = MERGEABLE_NODES[node.type].call(self, prev, node);
            }

            if (node !== prev) {
                children.push(node);
            }

            if (self.atStart && tokens.length !== 0) {
                self.exitStart();
            }

            return node;
        }

        /* Remove `subvalue` from `value`.
         * `subvalue` must be at the start of `value`. */
        function eat(subvalue) {
            var indent = getOffset();
            var pos = position();
            var current = now();

            validateEat(subvalue);

            apply.reset = reset;
            reset.test = test;
            apply.test = test;

            value = value.substring(subvalue.length);

            updatePosition(subvalue);

            indent = indent();

            return apply;

            /* Add the given arguments, add `position` to
             * the returned node, and return the node. */
            function apply(node, parent) {
                return pos(add(pos(node), parent), indent);
            }

            /* Functions just like apply, but resets the
             * content:  the line and column are reversed,
             * and the eaten value is re-added.
             * This is useful for nodes with a single
             * type of content, such as lists and tables.
             * See `apply` above for what parameters are
             * expected. */
            function reset() {
                var node = apply.apply(null, arguments);

                line = current.line;
                column = current.column;
                value = subvalue + value;

                return node;
            }

            /* Test the position, after eating, and reverse
             * to a not-eaten state. */
            function test() {
                var result = pos({});

                line = current.line;
                column = current.column;
                value = subvalue + value;

                return result.position;
            }
        }
    }
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(19);
var escapes = __webpack_require__(36);
var defaults = __webpack_require__(37);

module.exports = setOptions;

function setOptions(options) {
    var self = this;
    var current = self.options;
    var key;
    var value;

    if (options == null) {
        options = {};
    } else if (typeof options === 'object') {
        options = xtend(options);
    } else {
        throw new Error(
            'Invalid value `' + options + '` ' +
            'for setting `options`'
        );
    }

    for (key in defaults) {
        value = options[key];

        if (value == null) {
            value = current[key];
        }

        if (
            (key !== 'blocks' && typeof value !== 'boolean') ||
            (key === 'blocks' && typeof value !== 'object')
        ) {
            throw new Error('Invalid value `' + value + '` for setting `options.' + key + '`');
        }

        options[key] = value;
    }

    self.options = options;
    self.escape = escapes(options);

    return self;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = escapes

var defaults = [
  '\\',
  '`',
  '*',
  '{',
  '}',
  '[',
  ']',
  '(',
  ')',
  '#',
  '+',
  '-',
  '.',
  '!',
  '_',
  '>'
]

var gfm = defaults.concat(['~', '|'])

var commonmark = gfm.concat([
  '\n',
  '"',
  '$',
  '%',
  '&',
  "'",
  ',',
  '/',
  ':',
  ';',
  '<',
  '=',
  '?',
  '@',
  '^'
])

escapes.default = defaults
escapes.gfm = gfm
escapes.commonmark = commonmark

/* Get markdown escapes. */
function escapes(options) {
  var settings = options || {}

  if (settings.commonmark) {
    return commonmark
  }

  return settings.gfm ? gfm : defaults
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    position: true,
    gfm: true,
    commonmark: false,
    footnotes: false,
    pedantic: false,
    blocks: __webpack_require__(38)
};


/***/ }),
/* 38 */
/***/ (function(module) {

module.exports = ["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","pre","section","source","title","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(19);
var removePosition = __webpack_require__(40);

module.exports = parse;

var C_NEWLINE = '\n';
var EXPRESSION_LINE_BREAKS = /\r\n|\r/g;

/* Parse the bound file. */
function parse() {
    var self = this;
    var value = String(self.file);
    var start = {line: 1, column: 1, offset: 0};
    var content = xtend(start);
    var node;

    /* Clean non-unix newlines: `\r\n` and `\r` are all
     * changed to `\n`.  This should not affect positional
     * information. */
    value = value.replace(EXPRESSION_LINE_BREAKS, C_NEWLINE);

    if (value.charCodeAt(0) === 0xFEFF) {
        value = value.slice(1);

        content.column++;
        content.offset++;
    }

    node = {
        type: 'root',
        children: self.tokenizeBlock(value, content),
        position: {
            start: start,
            end: self.eof || xtend(start)
        }
    };

    if (!self.options.position) {
        removePosition(node, true);
    }

    return node;
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var visit = __webpack_require__(41)

module.exports = removePosition

/* Remove `position`s from `tree`. */
function removePosition(node, force) {
  visit(node, force ? hard : soft)
  return node
}

function hard(node) {
  delete node.position
}

function soft(node) {
  node.position = undefined
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visit

var visitParents = __webpack_require__(42)

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visitParents

var is = __webpack_require__(43)

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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);

module.exports = newline;

/* Tokenise newline. */
function newline(eat, value, silent) {
    var character = value.charAt(0);
    var length;
    var subvalue;
    var queue;
    var index;

    if (character !== '\n') {
        return;
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    index = 1;
    length = value.length;
    subvalue = character;
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (!whitespace(character)) {
            break;
        }

        queue += character;

        if (character === '\n') {
            subvalue += queue;
            queue = '';
        }

        index++;
    }

    eat(subvalue);
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = whitespace

var fromCode = String.fromCharCode
var re = /\s/

/* Check if the given character code, or the character
 * code at the first character, is a whitespace character. */
function whitespace(character) {
  return re.test(
    typeof character === 'number' ? fromCode(character) : character.charAt(0)
  )
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var repeat = __webpack_require__(47);
var trim = __webpack_require__(48);

module.exports = indentedCode;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';

var CODE_INDENT_COUNT = 4;
var CODE_INDENT = repeat(C_SPACE, CODE_INDENT_COUNT);

/* Tokenise indented code. */
function indentedCode(eat, value, silent) {
    var index = -1;
    var length = value.length;
    var subvalue = '';
    var content = '';
    var subvalueQueue = '';
    var contentQueue = '';
    var character;
    var blankQueue;
    var indent;

    while (++index < length) {
        character = value.charAt(index);

        if (indent) {
            indent = false;

            subvalue += subvalueQueue;
            content += contentQueue;
            subvalueQueue = '';
            contentQueue = '';

            if (character === C_NEWLINE) {
                subvalueQueue = character;
                contentQueue = character;
            } else {
                subvalue += character;
                content += character;

                while (++index < length) {
                    character = value.charAt(index);

                    if (!character || character === C_NEWLINE) {
                        contentQueue = character;
                        subvalueQueue = character;
                        break;
                    }

                    subvalue += character;
                    content += character;
                }
            }
        } else if (
            character === C_SPACE &&
            value.charAt(index + 1) === character &&
            value.charAt(index + 2) === character &&
            value.charAt(index + 3) === character
        ) {
            subvalueQueue += CODE_INDENT;
            index += 3;
            indent = true;
        } else if (character === C_TAB) {
            subvalueQueue += character;
            indent = true;
        } else {
            blankQueue = '';

            while (character === C_TAB || character === C_SPACE) {
                blankQueue += character;
                character = value.charAt(++index);
            }

            if (character !== C_NEWLINE) {
                break;
            }

            subvalueQueue += blankQueue + character;
            contentQueue += character;
        }
    }

    if (content) {
        if (silent) {
            return true;
        }

        return eat(subvalue)({
            type: 'code',
            lang: null,
            value: trim(content)
        });
    }
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = trimTrailingLines

var line = '\n'

/* Remove final newline characters from `value`. */
function trimTrailingLines(value) {
  var val = String(value)
  var index = val.length

  while (val.charAt(--index) === line) {
    /* Empty */
  }

  return val.slice(0, index + 1)
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(48);

module.exports = fencedCode;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_TILDE = '~';
var C_TICK = '`';

var MIN_FENCE_COUNT = 3;
var CODE_INDENT_COUNT = 4;

function fencedCode(eat, value, silent) {
    var self = this;
    var settings = self.options;
    var length = value.length + 1;
    var index = 0;
    var subvalue = '';
    var fenceCount;
    var marker;
    var character;
    var flag;
    var queue;
    var content;
    var exdentedContent;
    var closing;
    var exdentedClosing;
    var indent;
    var now;

    if (!settings.gfm) {
        return;
    }

    /* Eat initial spacing. */
    while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE && character !== C_TAB) {
            break;
        }

        subvalue += character;
        index++;
    }

    indent = index;

    /* Eat the fence. */
    character = value.charAt(index);

    if (character !== C_TILDE && character !== C_TICK) {
        return;
    }

    index++;
    marker = character;
    fenceCount = 1;
    subvalue += character;

    while (index < length) {
        character = value.charAt(index);

        if (character !== marker) {
            break;
        }

        subvalue += character;
        fenceCount++;
        index++;
    }

    if (fenceCount < MIN_FENCE_COUNT) {
        return;
    }

    /* Eat spacing before flag. */
    while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE && character !== C_TAB) {
            break;
        }

        subvalue += character;
        index++;
    }

    /* Eat flag. */
    flag = '';
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (
            character === C_NEWLINE ||
            character === C_TILDE ||
            character === C_TICK
        ) {
            break;
        }

        if (character === C_SPACE || character === C_TAB) {
            queue += character;
        } else {
            flag += queue + character;
            queue = '';
        }

        index++;
    }

    character = value.charAt(index);

    if (character && character !== C_NEWLINE) {
        return;
    }

    if (silent) {
        return true;
    }

    now = eat.now();
    now.column += subvalue.length;
    now.offset += subvalue.length;

    subvalue += flag;
    flag = self.decode.raw(self.unescape(flag), now);

    if (queue) {
        subvalue += queue;
    }

    queue = '';
    closing = '';
    exdentedClosing = '';
    content = '';
    exdentedContent = '';

    /* Eat content. */
    while (index < length) {
        character = value.charAt(index);
        content += closing;
        exdentedContent += exdentedClosing;
        closing = '';
        exdentedClosing = '';

        if (character !== C_NEWLINE) {
            content += character;
            exdentedClosing += character;
            index++;
            continue;
        }

        /* Add the newline to `subvalue` if its the first
         * character.  Otherwise, add it to the `closing`
         * queue. */
        if (content) {
            closing += character;
            exdentedClosing += character;
        } else {
            subvalue += character;
        }

        queue = '';
        index++;

        while (index < length) {
            character = value.charAt(index);

            if (character !== C_SPACE) {
                break;
            }

            queue += character;
            index++;
        }

        closing += queue;
        exdentedClosing += queue.slice(indent);

        if (queue.length >= CODE_INDENT_COUNT) {
            continue;
        }

        queue = '';

        while (index < length) {
            character = value.charAt(index);

            if (character !== marker) {
                break;
            }

            queue += character;
            index++;
        }

        closing += queue;
        exdentedClosing += queue;

        if (queue.length < fenceCount) {
            continue;
        }

        queue = '';

        while (index < length) {
            character = value.charAt(index);

            if (character !== C_SPACE && character !== C_TAB) {
                break;
            }

            closing += character;
            exdentedClosing += character;
            index++;
        }

        if (!character || character === C_NEWLINE) {
            break;
        }
    }

    subvalue += content + closing;

    return eat(subvalue)({
        type: 'code',
        lang: flag || null,
        value: trim(exdentedContent)
    });
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(51);
var interrupt = __webpack_require__(52);

module.exports = blockquote;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_GT = '>';

/* Tokenise a blockquote. */
function blockquote(eat, value, silent) {
    var self = this;
    var offsets = self.offset;
    var tokenizers = self.blockTokenizers;
    var interruptors = self.interruptBlockquote;
    var now = eat.now();
    var currentLine = now.line;
    var length = value.length;
    var values = [];
    var contents = [];
    var indents = [];
    var add;
    var index = 0;
    var character;
    var rest;
    var nextIndex;
    var content;
    var line;
    var startIndex;
    var prefixed;
    var exit;

    while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE && character !== C_TAB) {
            break;
        }

        index++;
    }

    if (value.charAt(index) !== C_GT) {
        return;
    }

    if (silent) {
        return true;
    }

    index = 0;

    while (index < length) {
        nextIndex = value.indexOf(C_NEWLINE, index);
        startIndex = index;
        prefixed = false;

        if (nextIndex === -1) {
            nextIndex = length;
        }

        while (index < length) {
            character = value.charAt(index);

            if (character !== C_SPACE && character !== C_TAB) {
                break;
            }

            index++;
        }

        if (value.charAt(index) === C_GT) {
            index++;
            prefixed = true;

            if (value.charAt(index) === C_SPACE) {
                index++;
            }
        } else {
            index = startIndex;
        }

        content = value.slice(index, nextIndex);

        if (!prefixed && !trim(content)) {
            index = startIndex;
            break;
        }

        if (!prefixed) {
            rest = value.slice(index);

            /* Check if the following code contains a possible
             * block. */
            if (interrupt(interruptors, tokenizers, self, [eat, rest, true])) {
                break;
            }
        }

        line = startIndex === index ? content : value.slice(startIndex, nextIndex);

        indents.push(index - startIndex);
        values.push(line);
        contents.push(content);

        index = nextIndex + 1;
    }

    index = -1;
    length = indents.length;
    add = eat(values.join(C_NEWLINE));

    while (++index < length) {
        offsets[currentLine] = (offsets[currentLine] || 0) + indents[index];
        currentLine++;
    }

    exit = self.enterBlock();
    contents = self.tokenizeBlock(contents.join(C_NEWLINE), now);
    exit();

    return add({
        type: 'blockquote',
        children: contents
    });
}


/***/ }),
/* 51 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = interrupt;

function interrupt(interruptors, tokenizers, ctx, params) {
    var bools = ['pedantic', 'commonmark'];
    var count = bools.length;
    var length = interruptors.length;
    var index = -1;
    var interruptor;
    var config;
    var fn;
    var offset;
    var bool;
    var ignore;

    while (++index < length) {
        interruptor = interruptors[index];
        config = interruptor[1] || {};
        fn = interruptor[0];
        offset = -1;
        ignore = false;

        while (++offset < count) {
            bool = bools[offset];

            if (config[bool] !== undefined && config[bool] !== ctx.options[bool]) {
                ignore = true;
                break;
            }
        }

        if (ignore) {
            continue;
        }

        if (tokenizers[fn].apply(ctx, params)) {
            return true;
        }
    }

    return false;
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = atxHeading;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_HASH = '#';

var MAX_ATX_COUNT = 6;

function atxHeading(eat, value, silent) {
    var self = this;
    var settings = self.options;
    var length = value.length + 1;
    var index = -1;
    var now = eat.now();
    var subvalue = '';
    var content = '';
    var character;
    var queue;
    var depth;

    /* Eat initial spacing. */
    while (++index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE && character !== C_TAB) {
            index--;
            break;
        }

        subvalue += character;
    }

    /* Eat hashes. */
    depth = 0;

    while (++index <= length) {
        character = value.charAt(index);

        if (character !== C_HASH) {
            index--;
            break;
        }

        subvalue += character;
        depth++;
    }

    if (depth > MAX_ATX_COUNT) {
        return;
    }

    if (
        !depth ||
        (!settings.pedantic && value.charAt(index + 1) === C_HASH)
    ) {
        return;
    }

    length = value.length + 1;

    /* Eat intermediate white-space. */
    queue = '';

    while (++index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE && character !== C_TAB) {
            index--;
            break;
        }

        queue += character;
    }

    /* Exit when not in pedantic mode without spacing. */
    if (
        !settings.pedantic &&
        queue.length === 0 &&
        character &&
        character !== C_NEWLINE
    ) {
        return;
    }

    if (silent) {
        return true;
    }

    /* Eat content. */
    subvalue += queue;
    queue = '';
    content = '';

    while (++index < length) {
        character = value.charAt(index);

        if (!character || character === C_NEWLINE) {
            break;
        }

        if (
            character !== C_SPACE &&
            character !== C_TAB &&
            character !== C_HASH
        ) {
            content += queue + character;
            queue = '';
            continue;
        }

        while (character === C_SPACE || character === C_TAB) {
            queue += character;
            character = value.charAt(++index);
        }

        while (character === C_HASH) {
            queue += character;
            character = value.charAt(++index);
        }

        while (character === C_SPACE || character === C_TAB) {
            queue += character;
            character = value.charAt(++index);
        }

        index--;
    }

    now.column += subvalue.length;
    now.offset += subvalue.length;
    subvalue += content + queue;

    return eat(subvalue)({
        type: 'heading',
        depth: depth,
        children: self.tokenizeInline(content, now)
    });
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = thematicBreak;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_ASTERISK = '*';
var C_UNDERSCORE = '_';
var C_DASH = '-';

var THEMATIC_BREAK_MARKER_COUNT = 3;

function thematicBreak(eat, value, silent) {
    var index = -1;
    var length = value.length + 1;
    var subvalue = '';
    var character;
    var marker;
    var markerCount;
    var queue;

    while (++index < length) {
        character = value.charAt(index);

        if (character !== C_TAB && character !== C_SPACE) {
            break;
        }

        subvalue += character;
    }

    if (
        character !== C_ASTERISK &&
        character !== C_DASH &&
        character !== C_UNDERSCORE
    ) {
        return;
    }

    marker = character;
    subvalue += character;
    markerCount = 1;
    queue = '';

    while (++index < length) {
        character = value.charAt(index);

        if (character === marker) {
            markerCount++;
            subvalue += queue + marker;
            queue = '';
        } else if (character === C_SPACE) {
            queue += character;
        } else if (
            markerCount >= THEMATIC_BREAK_MARKER_COUNT &&
            (!character || character === C_NEWLINE)
        ) {
            subvalue += queue;

            if (silent) {
                return true;
            }

            return eat(subvalue)({type: 'thematicBreak'});
        } else {
            return;
        }
    }
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable max-params */

var trim = __webpack_require__(51);
var repeat = __webpack_require__(47);
var decimal = __webpack_require__(30);
var getIndent = __webpack_require__(56);
var removeIndent = __webpack_require__(57);
var interrupt = __webpack_require__(52);

module.exports = list;

var C_ASTERISK = '*';
var C_UNDERSCORE = '_';
var C_PLUS = '+';
var C_DASH = '-';
var C_DOT = '.';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_PAREN_CLOSE = ')';
var C_X_LOWER = 'x';

var TAB_SIZE = 4;
var EXPRESSION_LOOSE_LIST_ITEM = /\n\n(?!\s*$)/;
var EXPRESSION_TASK_ITEM = /^\[([ \t]|x|X)][ \t]/;
var EXPRESSION_BULLET = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/;
var EXPRESSION_PEDANTIC_BULLET = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/;
var EXPRESSION_INITIAL_INDENT = /^( {1,4}|\t)?/gm;

/* Map of characters which can be used to mark
 * list-items. */
var LIST_UNORDERED_MARKERS = {};

LIST_UNORDERED_MARKERS[C_ASTERISK] = true;
LIST_UNORDERED_MARKERS[C_PLUS] = true;
LIST_UNORDERED_MARKERS[C_DASH] = true;

/* Map of characters which can be used to mark
 * list-items after a digit. */
var LIST_ORDERED_MARKERS = {};

LIST_ORDERED_MARKERS[C_DOT] = true;

/* Map of characters which can be used to mark
 * list-items after a digit. */
var LIST_ORDERED_COMMONMARK_MARKERS = {};

LIST_ORDERED_COMMONMARK_MARKERS[C_DOT] = true;
LIST_ORDERED_COMMONMARK_MARKERS[C_PAREN_CLOSE] = true;

function list(eat, value, silent) {
    var self = this;
    var commonmark = self.options.commonmark;
    var pedantic = self.options.pedantic;
    var tokenizers = self.blockTokenizers;
    var interuptors = self.interruptList;
    var markers;
    var index = 0;
    var length = value.length;
    var start = null;
    var size = 0;
    var queue;
    var ordered;
    var character;
    var marker;
    var nextIndex;
    var startIndex;
    var prefixed;
    var currentMarker;
    var content;
    var line;
    var prevEmpty;
    var empty;
    var items;
    var allLines;
    var emptyLines;
    var item;
    var enterTop;
    var exitBlockquote;
    var isLoose;
    var node;
    var now;
    var end;
    var indented;

    while (index < length) {
        character = value.charAt(index);

        if (character === C_TAB) {
            size += TAB_SIZE - (size % TAB_SIZE);
        } else if (character === C_SPACE) {
            size++;
        } else {
            break;
        }

        index++;
    }

    if (size >= TAB_SIZE) {
        return;
    }

    character = value.charAt(index);

    markers = commonmark ?
        LIST_ORDERED_COMMONMARK_MARKERS :
        LIST_ORDERED_MARKERS;

    if (LIST_UNORDERED_MARKERS[character] === true) {
        marker = character;
        ordered = false;
    } else {
        ordered = true;
        queue = '';

        while (index < length) {
            character = value.charAt(index);

            if (!decimal(character)) {
                break;
            }

            queue += character;
            index++;
        }

        character = value.charAt(index);

        if (!queue || markers[character] !== true) {
            return;
        }

        start = parseInt(queue, 10);
        marker = character;
    }

    character = value.charAt(++index);

    if (character !== C_SPACE && character !== C_TAB) {
        return;
    }

    if (silent) {
        return true;
    }

    index = 0;
    items = [];
    allLines = [];
    emptyLines = [];

    while (index < length) {
        nextIndex = value.indexOf(C_NEWLINE, index);
        startIndex = index;
        prefixed = false;
        indented = false;

        if (nextIndex === -1) {
            nextIndex = length;
        }

        end = index + TAB_SIZE;
        size = 0;

        while (index < length) {
            character = value.charAt(index);

            if (character === C_TAB) {
                size += TAB_SIZE - (size % TAB_SIZE);
            } else if (character === C_SPACE) {
                size++;
            } else {
                break;
            }

            index++;
        }

        if (size >= TAB_SIZE) {
            indented = true;
        }

        if (item && size >= item.indent) {
            indented = true;
        }

        character = value.charAt(index);
        currentMarker = null;

        if (!indented) {
            if (LIST_UNORDERED_MARKERS[character] === true) {
                currentMarker = character;
                index++;
                size++;
            } else {
                queue = '';

                while (index < length) {
                    character = value.charAt(index);

                    if (!decimal(character)) {
                        break;
                    }

                    queue += character;
                    index++;
                }

                character = value.charAt(index);
                index++;

                if (queue && markers[character] === true) {
                    currentMarker = character;
                    size += queue.length + 1;
                }
            }

            if (currentMarker) {
                character = value.charAt(index);

                if (character === C_TAB) {
                    size += TAB_SIZE - (size % TAB_SIZE);
                    index++;
                } else if (character === C_SPACE) {
                    end = index + TAB_SIZE;

                    while (index < end) {
                        if (value.charAt(index) !== C_SPACE) {
                            break;
                        }

                        index++;
                        size++;
                    }

                    if (index === end && value.charAt(index) === C_SPACE) {
                        index -= TAB_SIZE - 1;
                        size -= TAB_SIZE - 1;
                    }
                } else if (character !== C_NEWLINE && character !== '') {
                    currentMarker = null;
                }
            }
        }

        if (currentMarker) {
            if (!pedantic && marker !== currentMarker) {
                break;
            }

            prefixed = true;
        } else {
            if (!commonmark && !indented && value.charAt(startIndex) === C_SPACE) {
                indented = true;
            } else if (commonmark && item) {
                indented = size >= item.indent || size > TAB_SIZE;
            }

            prefixed = false;
            index = startIndex;
        }

        line = value.slice(startIndex, nextIndex);
        content = startIndex === index ? line : value.slice(index, nextIndex);

        if (
            currentMarker === C_ASTERISK ||
            currentMarker === C_UNDERSCORE ||
            currentMarker === C_DASH
        ) {
            if (tokenizers.thematicBreak.call(self, eat, line, true)) {
                break;
            }
        }

        prevEmpty = empty;
        empty = !trim(content).length;

        if (indented && item) {
            item.value = item.value.concat(emptyLines, line);
            allLines = allLines.concat(emptyLines, line);
            emptyLines = [];
        } else if (prefixed) {
            if (emptyLines.length !== 0) {
                item.value.push('');
                item.trail = emptyLines.concat();
            }

            item = {
                value: [line],
                indent: size,
                trail: []
            };

            items.push(item);
            allLines = allLines.concat(emptyLines, line);
            emptyLines = [];
        } else if (empty) {
            if (prevEmpty) {
                break;
            }

            emptyLines.push(line);
        } else {
            if (prevEmpty) {
                break;
            }

            if (interrupt(interuptors, tokenizers, self, [eat, line, true])) {
                break;
            }

            item.value = item.value.concat(emptyLines, line);
            allLines = allLines.concat(emptyLines, line);
            emptyLines = [];
        }

        index = nextIndex + 1;
    }

    node = eat(allLines.join(C_NEWLINE)).reset({
        type: 'list',
        ordered: ordered,
        start: start,
        loose: null,
        children: []
    });

    enterTop = self.enterList();
    exitBlockquote = self.enterBlock();
    isLoose = false;
    index = -1;
    length = items.length;

    while (++index < length) {
        item = items[index].value.join(C_NEWLINE);
        now = eat.now();

        item = eat(item)(listItem(self, item, now), node);

        if (item.loose) {
            isLoose = true;
        }

        item = items[index].trail.join(C_NEWLINE);

        if (index !== length - 1) {
            item += C_NEWLINE;
        }

        eat(item);
    }

    enterTop();
    exitBlockquote();

    node.loose = isLoose;

    return node;
}

function listItem(ctx, value, position) {
    var offsets = ctx.offset;
    var fn = ctx.options.pedantic ? pedanticListItem : normalListItem;
    var checked = null;
    var task;
    var indent;

    value = fn.apply(null, arguments);

    if (ctx.options.gfm) {
        task = value.match(EXPRESSION_TASK_ITEM);

        if (task) {
            indent = task[0].length;
            checked = task[1].toLowerCase() === C_X_LOWER;
            offsets[position.line] += indent;
            value = value.slice(indent);
        }
    }

    return {
        type: 'listItem',
        loose: EXPRESSION_LOOSE_LIST_ITEM.test(value) ||
            value.charAt(value.length - 1) === C_NEWLINE,
        checked: checked,
        children: ctx.tokenizeBlock(value, position)
    };
}

/* Create a list-item using overly simple mechanics. */
function pedanticListItem(ctx, value, position) {
    var offsets = ctx.offset;
    var line = position.line;

    /* Remove the list-item’s bullet. */
    value = value.replace(EXPRESSION_PEDANTIC_BULLET, replacer);

    /* The initial line was also matched by the below, so
     * we reset the `line`. */
    line = position.line;

    return value.replace(EXPRESSION_INITIAL_INDENT, replacer);

    /* A simple replacer which removed all matches,
     * and adds their length to `offset`. */
    function replacer($0) {
        offsets[line] = (offsets[line] || 0) + $0.length;
        line++;

        return '';
    }
}

/* Create a list-item using sane mechanics. */
function normalListItem(ctx, value, position) {
    var offsets = ctx.offset;
    var line = position.line;
    var max;
    var bullet;
    var rest;
    var lines;
    var trimmedLines;
    var index;
    var length;

    /* Remove the list-item’s bullet. */
    value = value.replace(EXPRESSION_BULLET, replacer);

    lines = value.split(C_NEWLINE);

    trimmedLines = removeIndent(value, getIndent(max).indent).split(C_NEWLINE);

    /* We replaced the initial bullet with something
     * else above, which was used to trick
     * `removeIndentation` into removing some more
     * characters when possible.  However, that could
     * result in the initial line to be stripped more
     * than it should be. */
    trimmedLines[0] = rest;

    offsets[line] = (offsets[line] || 0) + bullet.length;
    line++;

    index = 0;
    length = lines.length;

    while (++index < length) {
        offsets[line] = (offsets[line] || 0) +
            lines[index].length - trimmedLines[index].length;
        line++;
    }

    return trimmedLines.join(C_NEWLINE);

    function replacer($0, $1, $2, $3, $4) {
        bullet = $1 + $2 + $3;
        rest = $4;

        /* Make sure that the first nine numbered list items
         * can indent with an extra space.  That is, when
         * the bullet did not receive an extra final space. */
        if (Number($2) < 10 && bullet.length % 2 === 1) {
            $2 = C_SPACE + $2;
        }

        max = $1 + repeat(C_SPACE, $2.length) + $3;

        return max + rest;
    }
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = indentation;

/* Map of characters, and their column length,
 * which can be used as indentation. */
var characters = {' ': 1, '\t': 4};

/* Gets indentation information for a line. */
function indentation(value) {
    var index = 0;
    var indent = 0;
    var character = value.charAt(index);
    var stops = {};
    var size;

    while (character in characters) {
        size = characters[character];

        indent += size;

        if (size > 1) {
            indent = Math.floor(indent / size) * size;
        }

        stops[indent] = index;

        character = value.charAt(++index);
    }

    return {indent: indent, stops: stops};
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(51);
var repeat = __webpack_require__(47);
var getIndent = __webpack_require__(56);

module.exports = indentation;

var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_TAB = '\t';

/* Remove the minimum indent from every line in `value`.
 * Supports both tab, spaced, and mixed indentation (as
 * well as possible). */
function indentation(value, maximum) {
    var values = value.split(C_NEWLINE);
    var position = values.length + 1;
    var minIndent = Infinity;
    var matrix = [];
    var index;
    var indentation;
    var stops;
    var padding;

    values.unshift(repeat(C_SPACE, maximum) + '!');

    while (position--) {
        indentation = getIndent(values[position]);

        matrix[position] = indentation.stops;

        if (trim(values[position]).length === 0) {
            continue;
        }

        if (indentation.indent) {
            if (indentation.indent > 0 && indentation.indent < minIndent) {
                minIndent = indentation.indent;
            }
        } else {
            minIndent = Infinity;

            break;
        }
    }

    if (minIndent !== Infinity) {
        position = values.length;

        while (position--) {
            stops = matrix[position];
            index = minIndent;

            while (index && !(index in stops)) {
                index--;
            }

            if (
                trim(values[position]).length !== 0 &&
                minIndent &&
                index !== minIndent
            ) {
                padding = C_TAB;
            } else {
                padding = '';
            }

            values[position] = padding + values[position].slice(
                index in stops ? stops[index] + 1 : 0
            );
        }
    }

    values.shift();

    return values.join(C_NEWLINE);
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = setextHeading;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_EQUALS = '=';
var C_DASH = '-';

var MAX_HEADING_INDENT = 3;

/* Map of characters which can be used to mark setext
 * headers, mapping to their corresponding depth. */
var SETEXT_MARKERS = {};

SETEXT_MARKERS[C_EQUALS] = 1;
SETEXT_MARKERS[C_DASH] = 2;

function setextHeading(eat, value, silent) {
    var self = this;
    var now = eat.now();
    var length = value.length;
    var index = -1;
    var subvalue = '';
    var content;
    var queue;
    var character;
    var marker;
    var depth;

    /* Eat initial indentation. */
    while (++index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE || index >= MAX_HEADING_INDENT) {
            index--;
            break;
        }

        subvalue += character;
    }

    /* Eat content. */
    content = '';
    queue = '';

    while (++index < length) {
        character = value.charAt(index);

        if (character === C_NEWLINE) {
            index--;
            break;
        }

        if (character === C_SPACE || character === C_TAB) {
            queue += character;
        } else {
            content += queue + character;
            queue = '';
        }
    }

    now.column += subvalue.length;
    now.offset += subvalue.length;
    subvalue += content + queue;

    /* Ensure the content is followed by a newline and a
     * valid marker. */
    character = value.charAt(++index);
    marker = value.charAt(++index);

    if (character !== C_NEWLINE || !SETEXT_MARKERS[marker]) {
        return;
    }

    subvalue += character;

    /* Eat Setext-line. */
    queue = marker;
    depth = SETEXT_MARKERS[marker];

    while (++index < length) {
        character = value.charAt(index);

        if (character !== marker) {
            if (character !== C_NEWLINE) {
                return;
            }

            index--;
            break;
        }

        queue += character;
    }

    if (silent) {
        return true;
    }

    return eat(subvalue + queue)({
        type: 'heading',
        depth: depth,
        children: self.tokenizeInline(content, now)
    });
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var openCloseTag = __webpack_require__(60).openCloseTag;

module.exports = blockHTML;

var C_TAB = '\t';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_LT = '<';

function blockHTML(eat, value, silent) {
    var self = this;
    var blocks = self.options.blocks;
    var length = value.length;
    var index = 0;
    var next;
    var line;
    var offset;
    var character;
    var count;
    var sequence;
    var subvalue;

    var sequences = [
        [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
        [/^<!--/, /-->/, true],
        [/^<\?/, /\?>/, true],
        [/^<![A-Za-z]/, />/, true],
        [/^<!\[CDATA\[/, /\]\]>/, true],
        [new RegExp('^</?(' + blocks.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true],
        [new RegExp(openCloseTag.source + '\\s*$'), /^$/, false]
    ];

    /* Eat initial spacing. */
    while (index < length) {
        character = value.charAt(index);

        if (character !== C_TAB && character !== C_SPACE) {
            break;
        }

        index++;
    }

    if (value.charAt(index) !== C_LT) {
        return;
    }

    next = value.indexOf(C_NEWLINE, index + 1);
    next = next === -1 ? length : next;
    line = value.slice(index, next);
    offset = -1;
    count = sequences.length;

    while (++offset < count) {
        if (sequences[offset][0].test(line)) {
            sequence = sequences[offset];
            break;
        }
    }

    if (!sequence) {
        return;
    }

    if (silent) {
        return sequence[2];
    }

    index = next;

    if (!sequence[1].test(line)) {
        while (index < length) {
            next = value.indexOf(C_NEWLINE, index + 1);
            next = next === -1 ? length : next;
            line = value.slice(index + 1, next);

            if (sequence[1].test(line)) {
                if (line) {
                    index = next;
                }

                break;
            }

            index = next;
        }
    }

    subvalue = value.slice(0, index);

    return eat(subvalue)({type: 'html', value: subvalue});
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
var singleQuoted = '\'[^\']*\'';
var doubleQuoted = '"[^"]*"';
var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing = '<[?].*?[?]>';
var declaration = '<![A-Za-z]+\\s+[^>]*>';
var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

exports.openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');

exports.tag = new RegExp('^(?:' +
    openTag + '|' +
    closeTag + '|' +
    comment + '|' +
    processing + '|' +
    declaration + '|' +
    cdata +
    ')');


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var normalize = __webpack_require__(62);


module.exports = footnoteDefinition;
footnoteDefinition.notInList = true;
footnoteDefinition.notInBlock = true;

var C_BACKSLASH = '\\';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_CARET = '^';
var C_COLON = ':';

var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm;


function trimTrailingLines(value) {
    var val = String(value);
    var index = val.length;

    var c = val.charAt(--index);
    while (c === ' ' || c === '\n') {
        c = val.charAt(--index);
    }

    return val.slice(0, index + 1)
}


function footnoteDefinition(eat, value, silent) {

    var self = this;
    var offsets = self.offset;
    var index;
    var length;
    var subvalue;
    var now;
    var currentLine;
    var content;
    var queue;
    var subqueue;
    var character;
    var identifier;
    var add;
    var exit;

    if (!self.options.footnotes) {
        return;
    }

    index = 0;
    length = value.length;
    subvalue = '';
    now = eat.now();
    currentLine = now.line;

    while (index < length) {
        character = value.charAt(index);

        if (!whitespace(character)) {
            break;
        }

        subvalue += character;
        index++;
    }

    if (
        value.charAt(index) !== C_BRACKET_OPEN ||
        value.charAt(index + 1) !== C_CARET
    ) {
        return;
    }

    subvalue += C_BRACKET_OPEN + C_CARET;
    index = subvalue.length;
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (character === C_BRACKET_CLOSE) {
            break;
        } else if (character === C_BACKSLASH) {
            queue += character;
            index++;
            character = value.charAt(index);
        }

        queue += character;
        index++;
    }

    if (
        !queue ||
        value.charAt(index) !== C_BRACKET_CLOSE ||
        value.charAt(index + 1) !== C_COLON
    ) {
        return;
    }

    if (silent) {
        return true;
    }

    identifier = normalize(queue);
    subvalue += queue + C_BRACKET_CLOSE + C_COLON;
    index = subvalue.length;

    while (index < length) {
        character = value.charAt(index);

        if (character !== C_TAB && character !== C_SPACE) {
            break;
        }

        subvalue += character;
        index++;
    }

    now.column += subvalue.length;
    now.offset += subvalue.length;
    queue = '';
    content = '';
    subqueue = '';

    while (index < length) {
        character = value.charAt(index);

        if (character === C_NEWLINE) {
            subqueue = character;
            index++;

            while (index < length) {
                character = value.charAt(index);

                if (character !== C_NEWLINE) {
                    break;
                }

                subqueue += character;
                index++;
            }

            queue += subqueue;
            subqueue = '';

            while (index < length) {
                character = value.charAt(index);

                //============================================
                if (
                    value.charAt(index) === C_BRACKET_OPEN && value.charAt(index + 1) !== C_CARET
                ) {
                    var a = value.substring(index);
                    if(/^\[[\s\S]+\]:/.test(a)){
                        character = '';
                        index = length;
                        // console.log( value.charAt(index + 1) )
                        break;
                    }
                }
                //============================================


                if (character !== C_SPACE) {
                    break;
                }



                subqueue += character;
                index++;
            }

            if (subqueue.length === 0) {
                break;
            }

            queue += subqueue;
        }

        if (queue) {
            content += queue;
            queue = '';
        }

        content += character;
        index++;
    }
    //============================================
    content = trimTrailingLines(content);
    //============================================
    subvalue += content;

    content = content.replace(EXPRESSION_INITIAL_TAB, function (line) {
        offsets[currentLine] = (offsets[currentLine] || 0) + line.length;
        currentLine++;

        return '';
    });

    add = eat(subvalue);

    exit = self.enterBlock();
    content = self.tokenizeBlock(content, now);
    exit();

    return add({
        type: 'footnoteDefinition',
        identifier: identifier,
        children: content
    });
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var collapseWhiteSpace = __webpack_require__(63);

module.exports = normalize;

/* Normalize an identifier.  Collapses multiple white space
 * characters into a single space, and removes casing. */
function normalize(value) {
    return collapseWhiteSpace(value).toLowerCase();
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = collapse

/* collapse(' \t\nbar \nbaz\t'); // ' bar baz ' */
function collapse(value) {
  return String(value).replace(/\s+/g, ' ')
}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var normalize = __webpack_require__(62);

module.exports = definition;
definition.notInList = true;
definition.notInBlock = true;

var C_DOUBLE_QUOTE = '"';
var C_SINGLE_QUOTE = '\'';
var C_BACKSLASH = '\\';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_PAREN_OPEN = '(';
var C_PAREN_CLOSE = ')';
var C_COLON = ':';
var C_LT = '<';
var C_GT = '>';

function definition(eat, value, silent) {
    var self = this;
    var commonmark = self.options.commonmark;
    var index = 0;
    var length = value.length;
    var subvalue = '';
    var beforeURL;
    var beforeTitle;
    var queue;
    var character;
    var test;
    var identifier;
    var url;
    var title;

    while (index < length) {
        character = value.charAt(index);

        if (character !== C_SPACE && character !== C_TAB) {
            break;
        }

        subvalue += character;
        index++;
    }

    character = value.charAt(index);

    if (character !== C_BRACKET_OPEN) {
        return;
    }

    index++;
    subvalue += character;
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (character === C_BRACKET_CLOSE) {
            break;
        } else if (character === C_BACKSLASH) {
            queue += character;
            index++;
            character = value.charAt(index);
        }

        queue += character;
        index++;
    }

    if (
        !queue ||
        value.charAt(index) !== C_BRACKET_CLOSE ||
        value.charAt(index + 1) !== C_COLON
    ) {
        return;
    }

    identifier = queue;
    subvalue += queue + C_BRACKET_CLOSE + C_COLON;
    index = subvalue.length;
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (
            character !== C_TAB &&
            character !== C_SPACE &&
            character !== C_NEWLINE
        ) {
            break;
        }

        subvalue += character;
        index++;
    }

    character = value.charAt(index);
    queue = '';
    beforeURL = subvalue;

    if (character === C_LT) {
        index++;

        while (index < length) {
            character = value.charAt(index);

            if (!isEnclosedURLCharacter(character)) {
                break;
            }

            queue += character;
            index++;
        }

        character = value.charAt(index);

        if (character === isEnclosedURLCharacter.delimiter) {
            subvalue += C_LT + queue + character;
            index++;
        } else {
            if (commonmark) {
                return;
            }

            index -= queue.length + 1;
            queue = '';
        }
    }

    if (!queue) {
        while (index < length) {
            character = value.charAt(index);

            if (!isUnclosedURLCharacter(character)) {
                break;
            }

            queue += character;
            index++;
        }

        subvalue += queue;
    }

    if (!queue) {
        return;
    }

    url = queue;
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (
            character !== C_TAB &&
            character !== C_SPACE &&
            character !== C_NEWLINE
        ) {
            break;
        }

        queue += character;
        index++;
    }

    character = value.charAt(index);
    test = null;

    if (character === C_DOUBLE_QUOTE) {
        test = C_DOUBLE_QUOTE;
    } else if (character === C_SINGLE_QUOTE) {
        test = C_SINGLE_QUOTE;
    } else if (character === C_PAREN_OPEN) {
        test = C_PAREN_CLOSE;
    }

    if (!test) {
        queue = '';
        index = subvalue.length;
    } else if (queue) {
        subvalue += queue + character;
        index = subvalue.length;
        queue = '';

        while (index < length) {
            character = value.charAt(index);

            if (character === test) {
                break;
            }

            if (character === C_NEWLINE) {
                index++;
                character = value.charAt(index);

                if (character === C_NEWLINE || character === test) {
                    return;
                }

                queue += C_NEWLINE;
            }

            queue += character;
            index++;
        }

        character = value.charAt(index);

        if (character !== test) {
            return;
        }

        beforeTitle = subvalue;
        subvalue += queue + character;
        index++;
        title = queue;
        queue = '';
    } else {
        return;
    }

    while (index < length) {
        character = value.charAt(index);

        if (character !== C_TAB && character !== C_SPACE) {
            break;
        }

        subvalue += character;
        index++;
    }

    character = value.charAt(index);

    if (!character || character === C_NEWLINE) {
        if (silent) {
            return true;
        }

        beforeURL = eat(beforeURL).test().end;
        url = self.decode.raw(self.unescape(url), beforeURL, {nonTerminated: false});

        if (title) {
            beforeTitle = eat(beforeTitle).test().end;
            title = self.decode.raw(self.unescape(title), beforeTitle);
        }

        return eat(subvalue)({
            type: 'definition',
            identifier: normalize(identifier),
            title: title || null,
            url: url
        });
    }
}

/* Check if `character` can be inside an enclosed URI. */
function isEnclosedURLCharacter(character) {
    return character !== C_GT &&
        character !== C_BRACKET_OPEN &&
        character !== C_BRACKET_CLOSE;
}

isEnclosedURLCharacter.delimiter = C_GT;

/* Check if `character` can be inside an unclosed URI. */
function isUnclosedURLCharacter(character) {
    return character !== C_BRACKET_OPEN &&
        character !== C_BRACKET_CLOSE &&
        !whitespace(character);
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);

module.exports = table;

var C_BACKSLASH = '\\';
var C_TICK = '`';
var C_DASH = '-';
var C_PIPE = '|';
var C_COLON = ':';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_TAB = '\t';

var MIN_TABLE_COLUMNS = 1;
var MIN_TABLE_ROWS = 2;

var TABLE_ALIGN_LEFT = 'left';
var TABLE_ALIGN_CENTER = 'center';
var TABLE_ALIGN_RIGHT = 'right';
var TABLE_ALIGN_NONE = null;

function table(eat, value, silent) {
    var self = this;
    var index;
    var alignments;
    var alignment;
    var subvalue;
    var row;
    var length;
    var lines;
    var queue;
    var character;
    var hasDash;
    var align;
    var cell;
    var preamble;
    var count;
    var opening;
    var now;
    var position;
    var lineCount;
    var line;
    var rows;
    var table;
    var lineIndex;
    var pipeIndex;
    var first;

    /* Exit when not in gfm-mode. */
    if (!self.options.gfm) {
        return;
    }

    /* Get the rows.
     * Detecting tables soon is hard, so there are some
     * checks for performance here, such as the minimum
     * number of rows, and allowed characters in the
     * alignment row. */
    index = 0;
    lineCount = 0;
    length = value.length + 1;
    lines = [];

    while (index < length) {
        lineIndex = value.indexOf(C_NEWLINE, index);
        pipeIndex = value.indexOf(C_PIPE, index + 1);

        if (lineIndex === -1) {
            lineIndex = value.length;
        }

        if (pipeIndex === -1 || pipeIndex > lineIndex) {
            if (lineCount < MIN_TABLE_ROWS) {
                return;
            }

            break;
        }

        lines.push(value.slice(index, lineIndex));
        lineCount++;
        index = lineIndex + 1;
    }

    /* Parse the alignment row. */
    subvalue = lines.join(C_NEWLINE);
    alignments = lines.splice(1, 1)[0] || [];
    index = 0;
    length = alignments.length;
    lineCount--;
    alignment = false;
    align = [];

    while (index < length) {
        character = alignments.charAt(index);

        if (character === C_PIPE) {
            hasDash = null;

            if (alignment === false) {
                if (first === false) {
                    return;
                }
            } else {
                align.push(alignment);
                alignment = false;
            }

            first = false;
        } else if (character === C_DASH) {
            hasDash = true;
            alignment = alignment || TABLE_ALIGN_NONE;
        } else if (character === C_COLON) {
            if (alignment === TABLE_ALIGN_LEFT) {
                alignment = TABLE_ALIGN_CENTER;
            } else if (hasDash && alignment === TABLE_ALIGN_NONE) {
                alignment = TABLE_ALIGN_RIGHT;
            } else {
                alignment = TABLE_ALIGN_LEFT;
            }
        } else if (!whitespace(character)) {
            return;
        }

        index++;
    }

    if (alignment !== false) {
        align.push(alignment);
    }

    /* Exit when without enough columns. */
    if (align.length < MIN_TABLE_COLUMNS) {
        return;
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    /* Parse the rows. */
    position = -1;
    rows = [];

    table = eat(subvalue).reset({
        type: 'table',
        align: align,
        children: rows
    });

    while (++position < lineCount) {
        line = lines[position];
        row = {type: 'tableRow', children: []};

        /* Eat a newline character when this is not the
         * first row. */
        if (position) {
            eat(C_NEWLINE);
        }

        /* Eat the row. */
        eat(line).reset(row, table);

        length = line.length + 1;
        index = 0;
        queue = '';
        cell = '';
        preamble = true;
        count = null;
        opening = null;

        while (index < length) {
            character = line.charAt(index);

            if (character === C_TAB || character === C_SPACE) {
                if (cell) {
                    queue += character;
                } else {
                    eat(character);
                }

                index++;
                continue;
            }

            if (character === '' || character === C_PIPE) {
                if (preamble) {
                    eat(character);
                } else {
                    if (character && opening) {
                        queue += character;
                        index++;
                        continue;
                    }

                    if ((cell || character) && !preamble) {
                        subvalue = cell;

                        if (queue.length > 1) {
                            if (character) {
                                subvalue += queue.slice(0, queue.length - 1);
                                queue = queue.charAt(queue.length - 1);
                            } else {
                                subvalue += queue;
                                queue = '';
                            }
                        }

                        now = eat.now();

                        eat(subvalue)({
                            type: 'tableCell',
                            children: self.tokenizeInline(cell, now)
                        }, row);
                    }

                    eat(queue + character);

                    queue = '';
                    cell = '';
                }
            } else {
                if (queue) {
                    cell += queue;
                    queue = '';
                }

                cell += character;

                if (character === C_BACKSLASH && index !== length - 2) {
                    cell += line.charAt(index + 1);
                    index++;
                }

                if (character === C_TICK) {
                    count = 1;

                    while (line.charAt(index + 1) === character) {
                        cell += character;
                        index++;
                        count++;
                    }

                    if (!opening) {
                        opening = count;
                    } else if (count >= opening) {
                        opening = 0;
                    }
                }
            }

            preamble = false;
            index++;
        }

        /* Eat the alignment row. */
        if (!position) {
            eat(C_NEWLINE + alignments);
        }
    }

    return table;
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(51);
var decimal = __webpack_require__(30);
var trimTrailingLines = __webpack_require__(48);
var interrupt = __webpack_require__(52);

module.exports = paragraph;

var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';

var TAB_SIZE = 4;

/* Tokenise paragraph. */
function paragraph(eat, value, silent) {
    var self = this;
    var settings = self.options;
    var commonmark = settings.commonmark;
    var gfm = settings.gfm;
    var tokenizers = self.blockTokenizers;
    var interruptors = self.interruptParagraph;
    var index = value.indexOf(C_NEWLINE);
    var length = value.length;
    var position;
    var subvalue;
    var character;
    var size;
    var now;

    while (index < length) {
        /* Eat everything if there’s no following newline. */
        if (index === -1) {
            index = length;
            break;
        }

        /* Stop if the next character is NEWLINE. */
        if (value.charAt(index + 1) === C_NEWLINE) {
            break;
        }

        /* In commonmark-mode, following indented lines
         * are part of the paragraph. */
        if (commonmark) {
            size = 0;
            position = index + 1;

            while (position < length) {
                character = value.charAt(position);

                if (character === C_TAB) {
                    size = TAB_SIZE;
                    break;
                } else if (character === C_SPACE) {
                    size++;
                } else {
                    break;
                }

                position++;
            }

            if (size >= TAB_SIZE) {
                index = value.indexOf(C_NEWLINE, index + 1);
                continue;
            }
        }

        subvalue = value.slice(index + 1);

        /* Check if the following code contains a possible
         * block. */
        if (interrupt(interruptors, tokenizers, self, [eat, subvalue, true])) {
            break;
        }

        /* Break if the following line starts a list, when
         * already in a list, or when in commonmark, or when
         * in gfm mode and the bullet is *not* numeric. */
        if (
            tokenizers.list.call(self, eat, subvalue, true) &&
            (
                self.inList ||
                commonmark ||
                (gfm && !decimal(trim.left(subvalue).charAt(0)))
            )
        ) {
            break;
        }

        position = index;
        index = value.indexOf(C_NEWLINE, index + 1);

        if (index !== -1 && trim(value.slice(position, index)) === '') {
            index = position;
            break;
        }
    }

    subvalue = value.slice(0, index);

    if (trim(subvalue) === '') {
        eat(subvalue);

        return null;
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    now = eat.now();
    subvalue = trimTrailingLines(subvalue);

    return eat(subvalue)({
        type: 'paragraph',
        children: self.tokenizeInline(subvalue, now)
    });
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var locate = __webpack_require__(68);

module.exports = escape;
escape.locator = locate;

function escape(eat, value, silent) {
    var self = this;
    var character;
    var node;

    if (value.charAt(0) === '\\') {
        character = value.charAt(1);

        if (self.escape.indexOf(character) !== -1) {
            /* istanbul ignore if - never used (yet) */
            if (silent) {
                return true;
            }

            if (character === '\n') {
                node = {type: 'break'};
            } else {
                node = {
                    type: 'text',
                    value: character
                };
            }

            return eat('\\' + character)(node);
        }
    }
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    return value.indexOf('\\', fromIndex);
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var decode = __webpack_require__(26);
var locate = __webpack_require__(70);

module.exports = autoLink;
autoLink.locator = locate;
autoLink.notInLink = true;

var C_LT = '<';
var C_GT = '>';
var C_AT_SIGN = '@';
var C_SLASH = '/';
var MAILTO = 'mailto:';
var MAILTO_LENGTH = MAILTO.length;

/* Tokenise a link. */
function autoLink(eat, value, silent) {
    var self;
    var subvalue;
    var length;
    var index;
    var queue;
    var character;
    var hasAtCharacter;
    var link;
    var now;
    var content;
    var tokenizers;
    var exit;

    if (value.charAt(0) !== C_LT) {
        return;
    }

    self = this;
    subvalue = '';
    length = value.length;
    index = 0;
    queue = '';
    hasAtCharacter = false;
    link = '';

    index++;
    subvalue = C_LT;

    while (index < length) {
        character = value.charAt(index);

        if (
            whitespace(character) ||
            character === C_GT ||
            character === C_AT_SIGN ||
            (character === ':' && value.charAt(index + 1) === C_SLASH)
        ) {
            break;
        }

        queue += character;
        index++;
    }

    if (!queue) {
        return;
    }

    link += queue;
    queue = '';

    character = value.charAt(index);
    link += character;
    index++;

    if (character === C_AT_SIGN) {
        hasAtCharacter = true;
    } else {
        if (
            character !== ':' ||
            value.charAt(index + 1) !== C_SLASH
        ) {
            return;
        }

        link += C_SLASH;
        index++;
    }

    while (index < length) {
        character = value.charAt(index);

        if (whitespace(character) || character === C_GT) {
            break;
        }

        queue += character;
        index++;
    }

    character = value.charAt(index);

    if (!queue || character !== C_GT) {
        return;
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    link += queue;
    content = link;
    subvalue += link + character;
    now = eat.now();
    now.column++;
    now.offset++;

    if (hasAtCharacter) {
        if (link.slice(0, MAILTO_LENGTH).toLowerCase() === MAILTO) {
            content = content.substr(MAILTO_LENGTH);
            now.column += MAILTO_LENGTH;
            now.offset += MAILTO_LENGTH;
        } else {
            link = MAILTO + link;
        }
    }

    /* Temporarily remove all tokenizers except text in autolinks. */
    tokenizers = self.inlineTokenizers;
    self.inlineTokenizers = {text: tokenizers.text};

    exit = self.enterLink();

    content = self.tokenizeInline(content, now);

    self.inlineTokenizers = tokenizers;
    exit();

    return eat(subvalue)({
        type: 'link',
        title: null,
        url: decode(link, {nonTerminated: false}),
        children: content
    });
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    return value.indexOf('<', fromIndex);
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var decode = __webpack_require__(26);
var whitespace = __webpack_require__(45);
var locate = __webpack_require__(72);

module.exports = url;
url.locator = locate;
url.notInLink = true;

var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_PAREN_OPEN = '(';
var C_PAREN_CLOSE = ')';
var C_LT = '<';
var C_AT_SIGN = '@';

var HTTP_PROTOCOL = 'http://';
var HTTPS_PROTOCOL = 'https://';
var MAILTO_PROTOCOL = 'mailto:';

var PROTOCOLS = [
    HTTP_PROTOCOL,
    HTTPS_PROTOCOL,
    MAILTO_PROTOCOL
];

var PROTOCOLS_LENGTH = PROTOCOLS.length;

function url(eat, value, silent) {
    var self = this;
    var subvalue;
    var content;
    var character;
    var index;
    var position;
    var protocol;
    var match;
    var length;
    var queue;
    var parenCount;
    var nextCharacter;
    var exit;

    if (!self.options.gfm) {
        return;
    }

    subvalue = '';
    index = -1;
    length = PROTOCOLS_LENGTH;

    while (++index < length) {
        protocol = PROTOCOLS[index];
        match = value.slice(0, protocol.length);

        if (match.toLowerCase() === protocol) {
            subvalue = match;
            break;
        }
    }

    if (!subvalue) {
        return;
    }

    index = subvalue.length;
    length = value.length;
    queue = '';
    parenCount = 0;

    while (index < length) {
        character = value.charAt(index);

        if (whitespace(character) || character === C_LT) {
            break;
        }

        if (
            character === '.' ||
            character === ',' ||
            character === ':' ||
            character === ';' ||
            character === '"' ||
            character === '\'' ||
            character === ')' ||
            character === ']'
        ) {
            nextCharacter = value.charAt(index + 1);

            if (!nextCharacter || whitespace(nextCharacter)) {
                break;
            }
        }

        if (character === C_PAREN_OPEN || character === C_BRACKET_OPEN) {
            parenCount++;
        }

        if (character === C_PAREN_CLOSE || character === C_BRACKET_CLOSE) {
            parenCount--;

            if (parenCount < 0) {
                break;
            }
        }

        queue += character;
        index++;
    }

    if (!queue) {
        return;
    }

    subvalue += queue;
    content = subvalue;

    if (protocol === MAILTO_PROTOCOL) {
        position = queue.indexOf(C_AT_SIGN);

        if (position === -1 || position === length - 1) {
            return;
        }

        content = content.substr(MAILTO_PROTOCOL.length);
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    exit = self.enterLink();
    content = self.tokenizeInline(content, eat.now());
    exit();

    return eat(subvalue)({
        type: 'link',
        title: null,
        url: decode(subvalue, {nonTerminated: false}),
        children: content
    });
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

var PROTOCOLS = ['https://', 'http://', 'mailto:'];

function locate(value, fromIndex) {
    var length = PROTOCOLS.length;
    var index = -1;
    var min = -1;
    var position;

    if (!this.options.gfm) {
        return -1;
    }

    while (++index < length) {
        position = value.indexOf(PROTOCOLS[index], fromIndex);

        if (position !== -1 && (position < min || min === -1)) {
            min = position;
        }
    }

    return min;
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabetical = __webpack_require__(33);
var locate = __webpack_require__(70);
var tag = __webpack_require__(60).tag;

module.exports = inlineHTML;
inlineHTML.locator = locate;

var EXPRESSION_HTML_LINK_OPEN = /^<a /i;
var EXPRESSION_HTML_LINK_CLOSE = /^<\/a>/i;

function inlineHTML(eat, value, silent) {
    var self = this;
    var length = value.length;
    var character;
    var subvalue;

    if (value.charAt(0) !== '<' || length < 3) {
        return;
    }

    character = value.charAt(1);

    if (
        !alphabetical(character) &&
        character !== '?' &&
        character !== '!' &&
        character !== '/'
    ) {
        return;
    }

    subvalue = value.match(tag);

    if (!subvalue) {
        return;
    }

    /* istanbul ignore if - not used yet. */
    if (silent) {
        return true;
    }

    subvalue = subvalue[0];

    if (!self.inLink && EXPRESSION_HTML_LINK_OPEN.test(subvalue)) {
        self.inLink = true;
    } else if (self.inLink && EXPRESSION_HTML_LINK_CLOSE.test(subvalue)) {
        self.inLink = false;
    }

    return eat(subvalue)({type: 'html', value: subvalue});
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var locate = __webpack_require__(75);

module.exports = link;
link.locator = locate;

var own = {}.hasOwnProperty;

var C_BACKSLASH = '\\';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_PAREN_OPEN = '(';
var C_PAREN_CLOSE = ')';
var C_LT = '<';
var C_GT = '>';
var C_TICK = '`';
var C_DOUBLE_QUOTE = '"';
var C_SINGLE_QUOTE = '\'';

/* Map of characters, which can be used to mark link
 * and image titles. */
var LINK_MARKERS = {};

LINK_MARKERS[C_DOUBLE_QUOTE] = C_DOUBLE_QUOTE;
LINK_MARKERS[C_SINGLE_QUOTE] = C_SINGLE_QUOTE;

/* Map of characters, which can be used to mark link
 * and image titles in commonmark-mode. */
var COMMONMARK_LINK_MARKERS = {};

COMMONMARK_LINK_MARKERS[C_DOUBLE_QUOTE] = C_DOUBLE_QUOTE;
COMMONMARK_LINK_MARKERS[C_SINGLE_QUOTE] = C_SINGLE_QUOTE;
COMMONMARK_LINK_MARKERS[C_PAREN_OPEN] = C_PAREN_CLOSE;

function link(eat, value, silent) {
    var self = this;
    var subvalue = '';
    var index = 0;
    var character = value.charAt(0);
    var pedantic = self.options.pedantic;
    var commonmark = self.options.commonmark;
    var gfm = self.options.gfm;
    var closed;
    var count;
    var opening;
    var beforeURL;
    var beforeTitle;
    var subqueue;
    var hasMarker;
    var markers;
    var isImage;
    var content;
    var marker;
    var length;
    var title;
    var depth;
    var queue;
    var url;
    var now;
    var exit;
    var node;

    /* Detect whether this is an image. */
    if (character === '!') {
        isImage = true;
        subvalue = character;
        character = value.charAt(++index);
    }

    /* Eat the opening. */
    if (character !== C_BRACKET_OPEN) {
        return;
    }

    /* Exit when this is a link and we’re already inside
     * a link. */
    if (!isImage && self.inLink) {
        return;
    }

    subvalue += character;
    queue = '';
    index++;

    /* Eat the content. */
    length = value.length;
    now = eat.now();
    depth = 0;

    now.column += index;
    now.offset += index;

    while (index < length) {
        character = value.charAt(index);
        subqueue = character;

        if (character === C_TICK) {
            /* Inline-code in link content. */
            count = 1;

            while (value.charAt(index + 1) === C_TICK) {
                subqueue += character;
                index++;
                count++;
            }

            if (!opening) {
                opening = count;
            } else if (count >= opening) {
                opening = 0;
            }
        } else if (character === C_BACKSLASH) {
            /* Allow brackets to be escaped. */
            index++;
            subqueue += value.charAt(index);
            /* In GFM mode, brackets in code still count.
             * In all other modes, they don’t.  This empty
             * block prevents the next statements are
             * entered. */
        } else if ((!opening || gfm) && character === C_BRACKET_OPEN) {
            depth++;
        } else if ((!opening || gfm) && character === C_BRACKET_CLOSE) {
            if (depth) {
                depth--;
            } else {
                /* Allow white-space between content and
                 * url in GFM mode. */
                if (!pedantic) {
                    while (index < length) {
                        character = value.charAt(index + 1);

                        if (!whitespace(character)) {
                            break;
                        }

                        subqueue += character;
                        index++;
                    }
                }

                if (value.charAt(index + 1) !== C_PAREN_OPEN) {
                    return;
                }

                subqueue += C_PAREN_OPEN;
                closed = true;
                index++;

                break;
            }
        }

        queue += subqueue;
        subqueue = '';
        index++;
    }

    /* Eat the content closing. */
    if (!closed) {
        return;
    }

    content = queue;
    subvalue += queue + subqueue;
    index++;

    /* Eat white-space. */
    while (index < length) {
        character = value.charAt(index);

        if (!whitespace(character)) {
            break;
        }

        subvalue += character;
        index++;
    }

    /* Eat the URL. */
    character = value.charAt(index);
    markers = commonmark ? COMMONMARK_LINK_MARKERS : LINK_MARKERS;
    queue = '';
    beforeURL = subvalue;

    if (character === C_LT) {
        index++;
        beforeURL += C_LT;

        while (index < length) {
            character = value.charAt(index);

            if (character === C_GT) {
                break;
            }

            if (commonmark && character === '\n') {
                return;
            }

            queue += character;
            index++;
        }

        if (value.charAt(index) !== C_GT) {
            return;
        }

        subvalue += C_LT + queue + C_GT;
        url = queue;
        index++;
    } else {
        character = null;
        subqueue = '';

        while (index < length) {
            character = value.charAt(index);

            if (subqueue && own.call(markers, character)) {
                break;
            }

            if (whitespace(character)) {
                if (!pedantic) {
                    break;
                }

                subqueue += character;
            } else {
                if (character === C_PAREN_OPEN) {
                    depth++;
                } else if (character === C_PAREN_CLOSE) {
                    if (depth === 0) {
                        break;
                    }

                    depth--;
                }

                queue += subqueue;
                subqueue = '';

                if (character === C_BACKSLASH) {
                    queue += C_BACKSLASH;
                    character = value.charAt(++index);
                }

                queue += character;
            }

            index++;
        }

        subvalue += queue;
        url = queue;
        index = subvalue.length;
    }

    /* Eat white-space. */
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (!whitespace(character)) {
            break;
        }

        queue += character;
        index++;
    }

    character = value.charAt(index);
    subvalue += queue;

    /* Eat the title. */
    if (queue && own.call(markers, character)) {
        index++;
        subvalue += character;
        queue = '';
        marker = markers[character];
        beforeTitle = subvalue;

        /* In commonmark-mode, things are pretty easy: the
         * marker cannot occur inside the title.
         *
         * Non-commonmark does, however, support nested
         * delimiters. */
        if (commonmark) {
            while (index < length) {
                character = value.charAt(index);

                if (character === marker) {
                    break;
                }

                if (character === C_BACKSLASH) {
                    queue += C_BACKSLASH;
                    character = value.charAt(++index);
                }

                index++;
                queue += character;
            }

            character = value.charAt(index);

            if (character !== marker) {
                return;
            }

            title = queue;
            subvalue += queue + character;
            index++;

            while (index < length) {
                character = value.charAt(index);

                if (!whitespace(character)) {
                    break;
                }

                subvalue += character;
                index++;
            }
        } else {
            subqueue = '';

            while (index < length) {
                character = value.charAt(index);

                if (character === marker) {
                    if (hasMarker) {
                        queue += marker + subqueue;
                        subqueue = '';
                    }

                    hasMarker = true;
                } else if (!hasMarker) {
                    queue += character;
                } else if (character === C_PAREN_CLOSE) {
                    subvalue += queue + marker + subqueue;
                    title = queue;
                    break;
                } else if (whitespace(character)) {
                    subqueue += character;
                } else {
                    queue += marker + subqueue + character;
                    subqueue = '';
                    hasMarker = false;
                }

                index++;
            }
        }
    }

    if (value.charAt(index) !== C_PAREN_CLOSE) {
        return;
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    subvalue += C_PAREN_CLOSE;

    url = self.decode.raw(self.unescape(url), eat(beforeURL).test().end, {nonTerminated: false});

    if (title) {
        beforeTitle = eat(beforeTitle).test().end;
        title = self.decode.raw(self.unescape(title), beforeTitle);
    }

    node = {
        type: isImage ? 'image' : 'link',
        title: title || null,
        url: url
    };

    if (isImage) {
        node.alt = self.decode.raw(self.unescape(content), now) || null;
    } else {
        exit = self.enterLink();
        node.children = self.tokenizeInline(content, now);
        exit();
    }

    return eat(subvalue)(node);
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    var link = value.indexOf('[', fromIndex);
    var image = value.indexOf('![', fromIndex);

    if (image === -1) {
        return link;
    }

    /* Link can never be `-1` if an image is found, so we don’t need
     * to check for that :) */
    return link < image ? link : image;
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var locate = __webpack_require__(75);
var normalize = __webpack_require__(62);

module.exports = reference;
reference.locator = locate;

var T_LINK = 'link';
var T_IMAGE = 'image';
var T_FOOTNOTE = 'footnote';
var REFERENCE_TYPE_SHORTCUT = 'shortcut';
var REFERENCE_TYPE_COLLAPSED = 'collapsed';
var REFERENCE_TYPE_FULL = 'full';
var C_CARET = '^';
var C_BACKSLASH = '\\';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';

function reference(eat, value, silent) {
    var self = this;
    var character = value.charAt(0);
    var index = 0;
    var length = value.length;
    var subvalue = '';
    var intro = '';
    var type = T_LINK;
    var referenceType = REFERENCE_TYPE_SHORTCUT;
    var content;
    var identifier;
    var now;
    var node;
    var exit;
    var queue;
    var bracketed;
    var depth;

    /* Check whether we’re eating an image. */
    if (character === '!') {
        type = T_IMAGE;
        intro = character;
        character = value.charAt(++index);
    }

    if (character !== C_BRACKET_OPEN) {
        return;
    }

    index++;
    intro += character;
    queue = '';

    /* Check whether we’re eating a footnote. */
    if (self.options.footnotes && value.charAt(index) === C_CARET) {
        /* Exit if `![^` is found, so the `!` will be seen as text after this,
         * and we’ll enter this function again when `[^` is found. */
        if (type === T_IMAGE) {
            return;
        }

        intro += C_CARET;
        index++;
        type = T_FOOTNOTE;
    }

    /* Eat the text. */
    depth = 0;

    while (index < length) {
        character = value.charAt(index);

        if (character === C_BRACKET_OPEN) {
            bracketed = true;
            depth++;
        } else if (character === C_BRACKET_CLOSE) {
            if (!depth) {
                break;
            }

            depth--;
        }

        if (character === C_BACKSLASH) {
            queue += C_BACKSLASH;
            character = value.charAt(++index);
        }

        queue += character;
        index++;
    }

    subvalue = queue;
    content = queue;
    character = value.charAt(index);

    if (character !== C_BRACKET_CLOSE) {
        return;
    }

    index++;
    subvalue += character;
    queue = '';

    while (index < length) {
        character = value.charAt(index);

        if (!whitespace(character)) {
            break;
        }

        queue += character;
        index++;
    }

    character = value.charAt(index);

    /* Inline footnotes cannot have an identifier. */
    if (type !== T_FOOTNOTE && character === C_BRACKET_OPEN) {
        identifier = '';
        queue += character;
        index++;

        while (index < length) {
            character = value.charAt(index);

            if (character === C_BRACKET_OPEN || character === C_BRACKET_CLOSE) {
                break;
            }

            if (character === C_BACKSLASH) {
                identifier += C_BACKSLASH;
                character = value.charAt(++index);
            }

            identifier += character;
            index++;
        }

        character = value.charAt(index);

        if (character === C_BRACKET_CLOSE) {
            referenceType = identifier ? REFERENCE_TYPE_FULL : REFERENCE_TYPE_COLLAPSED;
            queue += identifier + character;
            index++;
        } else {
            identifier = '';
        }

        subvalue += queue;
        queue = '';
    } else {
        if (!content) {
            return;
        }

        identifier = content;
    }

    /* Brackets cannot be inside the identifier. */
    if (referenceType !== REFERENCE_TYPE_FULL && bracketed) {
        return;
    }

    subvalue = intro + subvalue;

    if (type === T_LINK && self.inLink) {
        return null;
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    if (type === T_FOOTNOTE && content.indexOf(' ') !== -1) {
        return eat(subvalue)({
            type: 'footnote',
            children: this.tokenizeInline(content, eat.now())
        });
    }

    now = eat.now();
    now.column += intro.length;
    now.offset += intro.length;
    identifier = referenceType === REFERENCE_TYPE_FULL ? identifier : content;

    node = {
        type: type + 'Reference',
        identifier: normalize(identifier)
    };

    if (type === T_LINK || type === T_IMAGE) {
        node.referenceType = referenceType;
    }

    if (type === T_LINK) {
        exit = self.enterLink();
        node.children = self.tokenizeInline(content, now);
        exit();
    } else if (type === T_IMAGE) {
        node.alt = self.decode.raw(self.unescape(content), now) || null;
    }

    return eat(subvalue)(node);
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(51);
var whitespace = __webpack_require__(45);
var locate = __webpack_require__(78);

module.exports = strong;
strong.locator = locate;

var C_ASTERISK = '*';
var C_UNDERSCORE = '_';

function strong(eat, value, silent) {
    var self = this;
    var index = 0;
    var character = value.charAt(index);
    var now;
    var pedantic;
    var marker;
    var queue;
    var subvalue;
    var length;
    var prev;

    if (
        (character !== C_ASTERISK && character !== C_UNDERSCORE) ||
        value.charAt(++index) !== character
    ) {
        return;
    }

    pedantic = self.options.pedantic;
    marker = character;
    subvalue = marker + marker;
    length = value.length;
    index++;
    queue = '';
    character = '';

    if (pedantic && whitespace(value.charAt(index))) {
        return;
    }

    while (index < length) {
        prev = character;
        character = value.charAt(index);

        if (
            character === marker &&
            value.charAt(index + 1) === marker &&
            (!pedantic || !whitespace(prev))
        ) {
            character = value.charAt(index + 2);

            if (character !== marker) {
                if (!trim(queue)) {
                    return;
                }

                /* istanbul ignore if - never used (yet) */
                if (silent) {
                    return true;
                }

                now = eat.now();
                now.column += 2;
                now.offset += 2;

                return eat(subvalue + queue + subvalue)({
                    type: 'strong',
                    children: self.tokenizeInline(queue, now)
                });
            }
        }

        if (!pedantic && character === '\\') {
            queue += character;
            character = value.charAt(++index);
        }

        queue += character;
        index++;
    }
}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    var asterisk = value.indexOf('**', fromIndex);
    var underscore = value.indexOf('__', fromIndex);

    if (underscore === -1) {
        return asterisk;
    }

    if (asterisk === -1) {
        return underscore;
    }

    return underscore < asterisk ? underscore : asterisk;
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(51);
var word = __webpack_require__(80);
var whitespace = __webpack_require__(45);
var locate = __webpack_require__(81);

module.exports = emphasis;
emphasis.locator = locate;

var C_ASTERISK = '*';
var C_UNDERSCORE = '_';

function emphasis(eat, value, silent) {
    var self = this;
    var index = 0;
    var character = value.charAt(index);
    var now;
    var pedantic;
    var marker;
    var queue;
    var subvalue;
    var length;
    var prev;

    if (character !== C_ASTERISK && character !== C_UNDERSCORE) {
        return;
    }

    pedantic = self.options.pedantic;
    subvalue = character;
    marker = character;
    length = value.length;
    index++;
    queue = '';
    character = '';

    if (pedantic && whitespace(value.charAt(index))) {
        return;
    }

    while (index < length) {
        prev = character;
        character = value.charAt(index);

        if (character === marker && (!pedantic || !whitespace(prev))) {
            character = value.charAt(++index);

            if (character !== marker) {
                if (!trim(queue) || prev === marker) {
                    return;
                }

                if (!pedantic && marker === C_UNDERSCORE && word(character)) {
                    queue += marker;
                    continue;
                }

                /* istanbul ignore if - never used (yet) */
                if (silent) {
                    return true;
                }

                now = eat.now();
                now.column++;
                now.offset++;

                return eat(subvalue + queue + marker)({
                    type: 'emphasis',
                    children: self.tokenizeInline(queue, now)
                });
            }

            queue += marker;
        }

        if (!pedantic && character === '\\') {
            queue += character;
            character = value.charAt(++index);
        }

        queue += character;
        index++;
    }
}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = wordCharacter

var fromCode = String.fromCharCode
var re = /\w/

/* Check if the given character code, or the character
 * code at the first character, is a word character. */
function wordCharacter(character) {
  return re.test(
    typeof character === 'number' ? fromCode(character) : character.charAt(0)
  )
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    var asterisk = value.indexOf('*', fromIndex);
    var underscore = value.indexOf('_', fromIndex);

    if (underscore === -1) {
        return asterisk;
    }

    if (asterisk === -1) {
        return underscore;
    }

    return underscore < asterisk ? underscore : asterisk;
}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var locate = __webpack_require__(83);

module.exports = strikethrough;
strikethrough.locator = locate;

var C_TILDE = '~';
var DOUBLE = '~~';

function strikethrough(eat, value, silent) {
    var self = this;
    var character = '';
    var previous = '';
    var preceding = '';
    var subvalue = '';
    var index;
    var length;
    var now;

    if (
        !self.options.gfm ||
        value.charAt(0) !== C_TILDE ||
        value.charAt(1) !== C_TILDE ||
        whitespace(value.charAt(2))
    ) {
        return;
    }

    index = 1;
    length = value.length;
    now = eat.now();
    now.column += 2;
    now.offset += 2;

    while (++index < length) {
        character = value.charAt(index);

        if (
            character === C_TILDE &&
            previous === C_TILDE &&
            (!preceding || !whitespace(preceding))
        ) {
            /* istanbul ignore if - never used (yet) */
            if (silent) {
                return true;
            }

            return eat(DOUBLE + subvalue + DOUBLE)({
                type: 'delete',
                children: self.tokenizeInline(subvalue, now)
            });
        }

        subvalue += previous;
        preceding = previous;
        previous = character;
    }
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    return value.indexOf('~~', fromIndex);
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__(45);
var locate = __webpack_require__(85);

module.exports = inlineCode;
inlineCode.locator = locate;

var C_TICK = '`';

/* Tokenise inline code. */
function inlineCode(eat, value, silent) {
    var length = value.length;
    var index = 0;
    var queue = '';
    var tickQueue = '';
    var contentQueue;
    var subqueue;
    var count;
    var openingCount;
    var subvalue;
    var character;
    var found;
    var next;

    while (index < length) {
        if (value.charAt(index) !== C_TICK) {
            break;
        }

        queue += C_TICK;
        index++;
    }

    if (!queue) {
        return;
    }

    subvalue = queue;
    openingCount = index;
    queue = '';
    next = value.charAt(index);
    count = 0;

    while (index < length) {
        character = next;
        next = value.charAt(index + 1);

        if (character === C_TICK) {
            count++;
            tickQueue += character;
        } else {
            count = 0;
            queue += character;
        }

        if (count && next !== C_TICK) {
            if (count === openingCount) {
                subvalue += queue + tickQueue;
                found = true;
                break;
            }

            queue += tickQueue;
            tickQueue = '';
        }

        index++;
    }

    if (!found) {
        if (openingCount % 2 !== 0) {
            return;
        }

        queue = '';
    }

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    contentQueue = '';
    subqueue = '';
    length = queue.length;
    index = -1;

    while (++index < length) {
        character = queue.charAt(index);

        if (whitespace(character)) {
            subqueue += character;
            continue;
        }

        if (subqueue) {
            if (contentQueue) {
                contentQueue += subqueue;
            }

            subqueue = '';
        }

        contentQueue += character;
    }

    return eat(subvalue)({
        type: 'inlineCode',
        value: contentQueue
    });
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    return value.indexOf('`', fromIndex);
}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var locate = __webpack_require__(87);

module.exports = hardBreak;
hardBreak.locator = locate;

var MIN_BREAK_LENGTH = 2;

function hardBreak(eat, value, silent) {
    var length = value.length;
    var index = -1;
    var queue = '';
    var character;

    while (++index < length) {
        character = value.charAt(index);

        if (character === '\n') {
            if (index < MIN_BREAK_LENGTH) {
                return;
            }

            /* istanbul ignore if - never used (yet) */
            if (silent) {
                return true;
            }

            queue += character;

            return eat(queue)({type: 'break'});
        }

        if (character !== ' ') {
            return;
        }

        queue += character;
    }
}


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;

function locate(value, fromIndex) {
    var index = value.indexOf('\n', fromIndex);

    while (index > fromIndex) {
        if (value.charAt(index - 1) !== ' ') {
            break;
        }

        index--;
    }

    return index;
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = text;

function text(eat, value, silent) {
    var self = this;
    var methods;
    var tokenizers;
    var index;
    var length;
    var subvalue;
    var position;
    var tokenizer;
    var name;
    var min;
    var now;

    /* istanbul ignore if - never used (yet) */
    if (silent) {
        return true;
    }

    methods = self.inlineMethods;
    length = methods.length;
    tokenizers = self.inlineTokenizers;
    index = -1;
    min = value.length;

    while (++index < length) {
        name = methods[index];

        if (name === 'text' || !tokenizers[name]) {
            continue;
        }

        tokenizer = tokenizers[name].locator;

        if (!tokenizer) {
            eat.file.fail('Missing locator: `' + name + '`');
        }

        position = tokenizer.call(self, value, 1);

        if (position !== -1 && position < min) {
            min = position;
        }
    }

    subvalue = value.slice(0, min);
    now = eat.now();

    self.decode(subvalue, now, function (content, position, source) {
        eat(source || content)({
            type: 'text',
            value: content
        });
    });
}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = breaks

function breaks() {
  var parser = this.Parser
  var tokenizers

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `remark-breaks` to')
  }

  tokenizers = parser.prototype.inlineTokenizers

  tokenizeBreak.locator = tokenizers.break.locator

  tokenizers.break = tokenizeBreak

  function tokenizeBreak(eat, value, silent) {
    var length = value.length
    var index = -1
    var queue = ''
    var character

    while (++index < length) {
      character = value.charAt(index)

      if (character === '\n') {
        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true
        }

        queue += character

        return eat(queue)({type: 'break'})
      }

      if (character !== ' ') {
        return
      }

      queue += character
    }
  }
}

function isRemarkParser(parser) {
  return Boolean(
    parser &&
      parser.prototype &&
      parser.prototype.inlineTokenizers &&
      parser.prototype.inlineTokenizers.break &&
      parser.prototype.inlineTokenizers.break.locator
  )
}


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

const inlinePlugin = __webpack_require__(91)
const blockPlugin = __webpack_require__(92)

module.exports = function mathPlugin(opts = {}) {
    blockPlugin.call(this, opts)
    inlinePlugin.call(this, opts)
}


/***/ }),
/* 91 */
/***/ (function(module, exports) {

function locator(value, fromIndex) {
    return value.indexOf('$', fromIndex)
}

const ESCAPED_INLINE_MATH = /^\\\$/
const INLINE_MATH = /^\$((?:\\\$|[^$])+)\$/
const INLINE_MATH_DOUBLE = /^\$\$((?:\\\$|[^$])+)\$\$/

module.exports = function inlinePlugin(opts) {
    function inlineTokenizer(eat, value, silent) {
        let isDouble = true
        let match = INLINE_MATH_DOUBLE.exec(value)
        if (!match) {
            match = INLINE_MATH.exec(value)
            isDouble = false
        }
        const escaped = ESCAPED_INLINE_MATH.exec(value)

        if (escaped) {
            /* istanbul ignore if - never used (yet) */
            if (silent) {
                return true
            }
            return eat(escaped[0])({
                type: 'text',
                value: '$'
            })
        }

        if (value.slice(-2) === '\\$') {
            return eat(value)({
                type: 'text',
                value: value.slice(0, -2) + '$'
            })
        }

        if (match) {
            /* istanbul ignore if - never used (yet) */
            if (silent) {
                return true
            }

            const endingDollarInBackticks = match[0].includes('`') && value.slice(match[0].length).includes('`')
            if (endingDollarInBackticks) {
                const toEat = value.slice(0, value.indexOf('`'))
                return eat(toEat)({
                    type: 'text',
                    value: toEat
                })
            }

            const trimmedContent = match[1].trim()

            return eat(match[0])({
                type: 'inlineMath',
                value: trimmedContent,
                data: {
                    hName: 'span',
                    hProperties: {
                        className: 'inlineMath' + (isDouble && opts.inlineMathDouble ? ' inlineMathDouble' : '')
                    },
                    hChildren: [
                        {
                            type: 'text',
                            value: trimmedContent
                        }
                    ]
                }
            })
        }
    }

    inlineTokenizer.locator = locator

    const Parser = this.Parser

    // Inject inlineTokenizer
    const inlineTokenizers = Parser.prototype.inlineTokenizers
    const inlineMethods = Parser.prototype.inlineMethods
    inlineTokenizers.math = inlineTokenizer
    inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'math')

    const Compiler = this.Compiler

    // Stringify for math inline
    if (Compiler != null) {
        const visitors = Compiler.prototype.visitors
        visitors.inlineMath = function (node) {
            return '$' + node.value + '$'
        }
    }
}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var latexBlock = /[ \t]*\$\$\n?(?:[^\n]+\n)*(?:[^\n]*[^\\\n])?\$\$(?:[ \t]*\([ \t]*\S+[ \t]*\))?[ \t]*(?:\n|$)/;


var trim = __webpack_require__(48)

var C_NEWLINE = '\n'
var C_TAB = '\t'
var C_SPACE = ' '
var C_DOLLAR = '$'

var MIN_FENCE_COUNT = 2
var CODE_INDENT_COUNT = 4

module.exports = function blockPlugin(opts) {

    function blockTokenizer(eat, value, silent) {

        var length = value.length + 1;
        var index = 0;
        var subvalue = '';
        var character;

        /* Eat initial spacing. */
        while (index < length) {
            character = value.charAt(index)

            if (character !== C_SPACE && character !== C_TAB) {
                break
            }

            subvalue += character
            index++
        }

        /* Eat the fence. */
        character = value.charAt(index);

        if (character !== C_DOLLAR) {
            return
        }

        subvalue = value.match(latexBlock);

        if (!subvalue) {
            return;
        }

        if (silent) {
            return true;
        }

        subvalue = subvalue[0];

        var checkLastDouble = subvalue.lastIndexOf('$$');
        if(checkLastDouble>-1) {
            subvalue = subvalue.substring(0, checkLastDouble + 2);
        }

        var trimmedContent = trim(subvalue);
        if(trimmedContent) {
            var fromIndex = trimmedContent.startsWith('$$')?2:0;
            var toIndex = trimmedContent.endsWith('$$')?trimmedContent.length-2:trimmedContent.length;
            trimmedContent = trimmedContent.substring(fromIndex , toIndex);
        }

        return eat(subvalue)({
            type: 'math',
            value: trimmedContent,
            data: {
                hName: 'div',
                hProperties: {
                    className: 'math'
                },
                hChildren: [
                    {
                        type: 'text',
                        value: trimmedContent
                    }
                ]
            }
        })
    }

    const Parser = this.Parser

    // Inject blockTokenizer
    const blockTokenizers = Parser.prototype.blockTokenizers
    const blockMethods = Parser.prototype.blockMethods
    blockTokenizers.math = blockTokenizer
    blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'math')

    // Inject math to interrupt rules
    const interruptParagraph = Parser.prototype.interruptParagraph
    const interruptList = Parser.prototype.interruptList
    const interruptBlockquote = Parser.prototype.interruptBlockquote
    interruptParagraph.splice(interruptParagraph.indexOf('fencedCode') + 1, 0, ['math'])
    interruptList.splice(interruptList.indexOf('fencedCode') + 1, 0, ['math'])
    interruptBlockquote.splice(interruptBlockquote.indexOf('fencedCode') + 1, 0, ['math'])

    const Compiler = this.Compiler

    // Stringify for math block
    if (Compiler != null) {
        const visitors = Compiler.prototype.visitors
        visitors.math = function (node) {
            return '$$\n' + node.value + '\n$$'
        }
    }
}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var visit = __webpack_require__(41);
var util = __webpack_require__(94);

function all(nodes, map) {
    var hashs = [];

    for(var i=0;i<nodes.length;i++) {

        var node = nodes[i];

        var h = one(node, map);

        hashs.push(h);

    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    return hash;
}

function one(node, map) {

    var hashs = [];

    if(node.hasOwnProperty('value') || node.hasOwnProperty('url')){
        var value0 = node.value || node.url;
        var hash0 = util.hash(String(value0));
        hashs.push(hash0);
    }

    if(node.children && node.children.length>0){
        var hash1 = all(node.children, map);
        hashs.push(hash1);
    }

    if(hashs.length === 0) {
        var value2 =
            node.position.start.line + ':' + node.position.start.column
            + '-'
            + node.position.end.line + ':' + node.position.end.column;
        var hash2 = util.hash(value2);
        hashs.push(hash2);
    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    if(!map[hash]) {
        map[hash] = 1;
    }
    else{
        var nhash = hash;
        while (map[nhash]) {
            map[hash] = map[hash] + 1;
            nhash = nhash + map[hash];
        }
        hash = nhash;
        map[hash] = 1;
    }

    node.hash = hash;

    return hash;

}

module.exports = function hashid(options = {}) {
    return function transformer(root) {
        console.time('hash');
        var map = {};
        one(root, map);
        console.timeEnd('hash');
    };
};

/***/ }),
/* 94 */
/***/ (function(module, exports) {

function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
}

function hash(string) {
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
        hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
}

function hash1(str) {
    var hash = 5381, i = str.length;
    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

function createKey(node) {
    if(node.hasOwnProperty('value') || node.hasOwnProperty('url')){
        var value0 = node.value || node.url;
        var hash0 = hash(String(value0));
        return hash0;
    }
    var value1 =
        node.position.start.line + ':' + node.position.start.column
        + '-'
        + node.position.end.line + ':' + node.position.end.column;
    return hash(value1);
}



module.exports = {
    hash: hash1,
    createKey: createKey
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

const PLUGIN_NAME = 'vremark-plugin-math';

var visit = __webpack_require__(41);
function isPlugin(node) {
    return (node.type === 'math' || node.type === 'inlineMath' )
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        visit(root, function (node) {
            return isPlugin(node);
        }, function (node) {

            node.data = node.data || {};

            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                inline: (node.type === "inlineMath"),
                code: node.value
            });

            node.type = 'code';
            node.tagName = PLUGIN_NAME;

            root.plugins[PLUGIN_NAME] = true;

        });

    };

}

module.exports = plugin;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

const PLUGIN_NAME = 'vremark-plugin-flowchart';

function isPlugin(node) {
    return node.lang && (node.lang === 'flow' || node.lang === 'flowchart' )
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;

            }
        }

    };

}

module.exports = plugin;

/***/ }),
/* 97 */
/***/ (function(module, exports) {

const PLUGIN_NAME = 'vremark-plugin-sequence';

function isPlugin(node) {
    return node.lang && (node.lang === 'seq' || node.lang === 'sequence' )
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;
            }
        }

    };

}

module.exports = plugin;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

const PLUGIN_NAME = 'vremark-plugin-mermaid';

function isPlugin(node) {
    return node.lang && node.lang === 'mermaid';
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;
            }
        }

    };

}

module.exports = plugin;

/***/ }),
/* 99 */
/***/ (function(module, exports) {

const PLUGIN_NAME = 'vremark-plugin-g2';

function isPlugin(node) {
    return node.lang && node.lang === 'g2';
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;

            }
        }

    };

}

module.exports = plugin;

/***/ }),
/* 100 */
/***/ (function(module, exports) {

const PLUGIN_NAME = 'vremark-plugin-chart';

function isPlugin(node) {
    return node.lang && node.lang === 'chart';
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        var children = root.children;

        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;

            }
        }


    };

}

module.exports = plugin;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

const PLUGIN_NAME = 'vremark-plugin-highlight';

var languages = (function () {
    var languages = __webpack_require__(102);
    var keys = {};
    languages.forEach(function (language) {
        keys[language] = true;
    });
    return keys;
})();

function isPlugin(node) {
    return node.lang && languages[node.lang];
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;
            }
        }

    };

}

module.exports = plugin;

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = ["1c","abnf","accesslog","actionscript","ada","angelscript","apache","applescript","arcade","cpp","arduino","armasm","xml","asciidoc","aspectj","autohotkey","autoit","avrasm","awk","axapta","bash","basic","bnf","brainfuck","cal","capnproto","ceylon","clean","clojure","clojure-repl","cmake","coffeescript","coq","cos","crmsh","crystal","cs","csp","css","d","markdown","dart","delphi","diff","django","dns","dockerfile","dos","dsconfig","dts","dust","ebnf","elixir","elm","ruby","erb","erlang-repl","erlang","excel","fix","flix","fortran","fsharp","gams","gauss","gcode","gherkin","glsl","gml","go","golo","gradle","groovy","haml","handlebars","haskell","haxe","hsp","htmlbars","http","hy","inform7","ini","irpf90","isbl","java","javascript","jboss-cli","json","julia","julia-repl","kotlin","lasso","ldif","leaf","less","lisp","livecodeserver","livescript","llvm","lsl","lua","makefile","mathematica","matlab","maxima","mel","mercury","mipsasm","mizar","perl","mojolicious","monkey","moonscript","n1ql","nginx","nimrod","nix","nsis","objectivec","ocaml","openscad","oxygene","parser3","pf","pgsql","php","plaintext","pony","powershell","processing","profile","prolog","properties","protobuf","puppet","purebasic","python","q","qml","r","reasonml","rib","roboconf","routeros","rsl","ruleslanguage","rust","sas","scala","scheme","scilab","scss","shell","smali","smalltalk","sml","sqf","sql","stan","stata","step21","stylus","subunit","swift","taggerscript","yaml","tap","tcl","tex","thrift","tp","twig","typescript","vala","vbnet","vbscript","vbscript-html","verilog","vhdl","vim","x86asm","xl","xquery","zephir"];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mdast2hast = __webpack_require__(104)

module.exports = remark2rehype

/* Attacher.
 * If a destination is given, runs the destination with
 * the new HAST tree (bridge-mode).
 * Without destination, returns the HAST tree: further
 * plug-ins run on that tree (mutate-mode). */
function remark2rehype(destination, options) {
    if (destination && !destination.process) {
        options = destination
        destination = null
    }

    return destination ? bridge(destination, options) : mutate(options)
}

/* Bridge-mode.  Runs the destination with the new HAST
 * tree. */
function bridge(destination, options) {
    return transformer

    function transformer(node, file, next) {
        destination.run(mdast2hast(node, options), file, done)

        function done(err) {
            next(err)
        }
    }
}

/* Mutate-mode.  Further transformers run on the HAST tree. */
function mutate(options) {
    return transformer

    function transformer(node) {
        return mdast2hast(node, options)
    }
}


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(105)


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = toHAST

var xtend = __webpack_require__(19)
var u = __webpack_require__(106)
var visit = __webpack_require__(41)
var position = __webpack_require__(108)
var generated = __webpack_require__(109)
var definitions = __webpack_require__(110)
var one = __webpack_require__(111)
var footer = __webpack_require__(113)
var handlers = __webpack_require__(117)

/* Factory to transform. */
function factory(tree, options) {
    var settings = options || {}
    var dangerous = settings.allowDangerousHTML

    h.dangerous = dangerous
    h.definition = definitions(tree, settings)
    h.footnotes = []
    h.augment = augment
    h.handlers = xtend(handlers, settings.handlers || {})

    visit(tree, 'footnoteDefinition', visitor)

    return h

    /* Finalise the created `right`, a HAST node, from
     * `left`, an MDAST node.   */
    function augment(left, right) {
        var data
        var ctx

        /* Handle `data.hName`, `data.hProperties, `hChildren`. */
        if (left && 'data' in left) {
            data = left.data

            if (right.type === 'element' && data.hName) {
                right.tagName = data.hName
            }

            if (right.type === 'element' && data.hProperties) {
                right.properties = xtend(right.properties, data.hProperties)
            }

            if (right.children && data.hChildren) {
                right.children = data.hChildren
            }
        }

        ctx = left && left.position ? left : {position: left}

        if (!generated(ctx)) {
            right.position = {
                start: position.start(ctx),
                end: position.end(ctx)
            }
        }

        if(left){
            if(left.tagName) {
                right.tagName = left.tagName;
            }
            if(left.hash) {
                right.hash = left.hash;
            }
            if(left.data) {

                right.data = left.data;
                if(right.data.hChildren) delete right.data.hChildren;
                if(right.data.hName) delete right.data.hName;
                if(right.data.hProperties) delete right.data.hProperties;

            }
        }

        return right
    }

    /* Create an element for a `node`. */
    function h(node, tagName, props, children) {
        if (
            (children === undefined || children === null) &&
            typeof props === 'object' &&
            'length' in props
        ) {
            children = props
            props = {}
        }

        return augment(node, {
            type: 'element',
            tagName: tagName,
            properties: props || {},
            children: children || []
        })
    }

    function visitor(definition) {
        h.footnotes.push(definition)
    }
}

/* Transform `tree`, which is an MDAST node, to a HAST node. */
function toHAST(tree, options) {
    var h = factory(tree, options)
    var node = one(h, tree)
    var footnotes = footer(h)

    if (node && node.children && footnotes) {
        // node.children = node.children.concat(u('text', '\n'), footnotes)
        node.children = node.children.concat(footnotes)
    }

    return node
}


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(107)

module.exports = u

function u(type, props, value) {
  var node

  if (
    (value === null || value === undefined) &&
    (typeof props !== 'object' || Array.isArray(props))
  ) {
    value = props
    props = {}
  }

  node = assign({type: String(type)}, props)

  if (Array.isArray(value)) {
    node.children = value
  } else if (value !== null && value !== undefined) {
    node.value = String(value)
  }

  return node
}


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Expose. */
var position = exports

position.start = factory('start')
position.end = factory('end')

/* Factory to get a `type` point in the positional info of a node. */
function factory(type) {
  point.displayName = type

  return point

  /* Get a point in `node.position` at a bound `type`. */
  function point(node) {
    var point = (node && node.position && node.position[type]) || {}

    return {
      line: point.line || null,
      column: point.column || null,
      offset: isNaN(point.offset) ? null : point.offset
    }
  }
}


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Expose. */
module.exports = generated

/* Detect if a node was available in the original document. */
function generated(node) {
  var position = optional(optional(node).position)
  var start = optional(position.start)
  var end = optional(position.end)

  return !start.line || !start.column || !end.line || !end.column
}

/* Return `value` if it’s an object, an empty object
 * otherwise. */
function optional(value) {
  return value && typeof value === 'object' ? value : {}
}


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var visit = __webpack_require__(41)

module.exports = getDefinitionFactory

var own = {}.hasOwnProperty

/* Get a definition in `node` by `identifier`. */
function getDefinitionFactory(node, options) {
  return getterFactory(gather(node, options))
}

/* Gather all definitions in `node` */
function gather(node, options) {
  var cache = {}

  if (!node || !node.type) {
    throw new Error('mdast-util-definitions expected node')
  }

  visit(node, 'definition', options && options.commonmark ? commonmark : normal)

  return cache

  function commonmark(definition) {
    var id = normalise(definition.identifier)
    if (!own.call(cache, id)) {
      cache[id] = definition
    }
  }

  function normal(definition) {
    cache[normalise(definition.identifier)] = definition
  }
}

/* Factory to get a node from the given definition-cache. */
function getterFactory(cache) {
  return getter

  /* Get a node from the bound definition-cache. */
  function getter(identifier) {
    var id = identifier && normalise(identifier)
    return id && own.call(cache, id) ? cache[id] : null
  }
}

function normalise(identifier) {
  return identifier.toUpperCase()
}


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = one

var u = __webpack_require__(106)
var all = __webpack_require__(112)

var own = {}.hasOwnProperty

/* Transform an unknown node. */
function unknown(h, node) {
    if (text(node)) {
        return h.augment(node, u('text', {position: node.position}, node.value))
    }

    return h(node, 'div', all(h, node))
}

/* Visit a node. */
function one(h, node, parent) {
    var type = node && node.type
    var fn = own.call(h.handlers, type) ? h.handlers[type] : null

    /* Fail on non-nodes. */
    if (!type) {
        throw new Error('Expected node, got `' + node + '`')
    }

    return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
}

/* Check if the node should be renderered a text node. */
function text(node) {
    var data = node.data || {}

    if (
        own.call(data, 'hName') ||
        own.call(data, 'hProperties') ||
        own.call(data, 'hChildren')
    ) {
        return false
    }

    return 'value' in node
}


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = all

var trim = __webpack_require__(51)
var one = __webpack_require__(111)

/* Transform the children of `parent`. */
function all(h, parent) {
    var nodes = parent.children || []
    var length = nodes.length
    var values = []
    var index = -1
    var result
    var head

    while (++index < length) {
        result = one(h, nodes[index], parent)

        if (result) {

            if(nodes[index] && nodes[index].hasOwnProperty('hash')) {
                result.hash = nodes[index].hash;
            }


            if (index && nodes[index - 1].type === 'break') {
                if (result.value) {
                    result.value = trim.left(result.value)
                }

                head = result.children && result.children[0]

                if (head && head.value) {
                    head.value = trim.left(head.value)
                }
            }

            values = values.concat(result)
        }
    }

    return values
}


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = generateFootnotes

var thematicBreak = __webpack_require__(114)
var list = __webpack_require__(115)
var wrap = __webpack_require__(116)

/* Transform all footnote definitions, if any. */
function generateFootnotes(h) {

    var footnotes = h.footnotes
    var length = footnotes.length
    var index = -1
    var listItems = []
    var def

    if (!length) {
        return null
    }

    while (++index < length) {
        def = footnotes[index]

        // if(def.children.length>0 && def.children[0].type === "paragraph") {
        //     // debugger
        //     def.children[0].tagName = 'span';
        // }

        listItems[index] = {
            type: 'listItem',
            data: {hProperties: {id: 'fn-' + def.identifier}},
            children: def.children.concat({
                type: 'link',
                url: '#fnref-' + def.identifier,
                target: '_self',
                data: {hProperties: {className: ['footnote-backref']}},
                children: [{type: 'text', value: '↩'}]
            }),
            position: def.position
        }
    }



    var footnoteList = list(h, {
        type: 'list',
        ordered: true,
        children: listItems
    });

    footnoteList.children && footnoteList.children.forEach(function (listItem) {
        if(listItem.type === "element"
            && listItem.tagName === "li"
            && listItem.children.length > 0 ) {
            var item = listItem.children[0];
            item.tagName = 'span';
        }
    });

    return h(
        null,
        'div',
        {className: ['footnotes']},
        wrap(
            [
                thematicBreak(h),
                footnoteList
            ],
            true
        )
    );


}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = thematicBreak

/* Transform a thematic break / horizontal rule. */
function thematicBreak(h, node) {
    return h(node, 'hr')
}


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = list

var wrap = __webpack_require__(116)
var all = __webpack_require__(112)

/* Transform a list. */
function list(h, node) {
    var props = {}
    var name = node.ordered ? 'ol' : 'ul'

    if (typeof node.start === 'number' && node.start !== 1) {
        props.start = node.start
    }

    return h(node, name, props, wrap(all(h, node), true))
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = wrap

var u = __webpack_require__(106)

function wrap(nodes, loose) {
    return nodes
}

/* Wrap `nodes` with newlines between each entry.
 * Optionally adds newlines at the start and end. */
function wrap1(nodes, loose) {
    var result = []
    var index = -1
    var length = nodes.length

    if (loose) {
        result.push(u('text', '\n'))
    }

    while (++index < length) {
        if (index) {
            result.push(u('text', '\n'))
        }

        result.push(nodes[index])
    }

    if (loose && nodes.length !== 0) {
        result.push(u('text', '\n'))
    }

    return result
}


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    component: __webpack_require__(118),
    // highlight: require('./highlight'),
    // math: require('./math'),
    // inlineMath: require('./inlineMath'),
    // flowchart: require('./flowchart'),

    blockquote: __webpack_require__(119),
    break: __webpack_require__(120),
    code: __webpack_require__(121),
    delete: __webpack_require__(123),
    emphasis: __webpack_require__(124),
    footnoteReference: __webpack_require__(125),
    footnote: __webpack_require__(126),
    heading: __webpack_require__(127),
    html: __webpack_require__(128),
    imageReference: __webpack_require__(129),
    image: __webpack_require__(132),
    inlineCode: __webpack_require__(133),
    linkReference: __webpack_require__(134),
    link: __webpack_require__(135),
    listItem: __webpack_require__(136),
    list: __webpack_require__(115),
    paragraph: __webpack_require__(137),
    root: __webpack_require__(138),
    strong: __webpack_require__(139),
    table: __webpack_require__(140),
    text: __webpack_require__(141),
    thematicBreak: __webpack_require__(114),
    toml: ignore,
    yaml: ignore,
    definition: ignore,
    footnoteDefinition: ignore
}

/* Return nothing for nodes which are ignored. */
function ignore() {
    return null
}


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = component

function component(h, node) {
    // debugger
    // return h(node, 'h' + node.depth, all(h, node))

    // var _node = {
    //     component: node.component,
    //     children: [],
    //     position: node.position,
    //     properties: node.properties || {},
    //     tagName: "div",
    //     type: "component",
    // };
    //
    // return _node;


    var n = {
        type: node.type,
        component: node.component,
        position: node.position,
        properties: node.properties || {},
        data: node.data,
        children: []
    };


    return n;
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = blockquote

var wrap = __webpack_require__(116)
var all = __webpack_require__(112)

/* Transform a block quote. */
function blockquote(h, node) {
    return h(node, 'blockquote', wrap(all(h, node), true))
}


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = hardBreak

var u = __webpack_require__(106)

/* Transform an inline break. */
function hardBreak(h, node) {
    return [h(node, 'br')
        // , u('text', '\n')
    ]
}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = code

var detab = __webpack_require__(122)
var u = __webpack_require__(106)

/* Transform a code block. */
function code(h, node) {

    if( node.tagName ){
        // return h(node, node.tagName, {data: node.data});
        return h(node, node.tagName);
    }


    var value = node.value ? detab(node.value + '\n') : ''
    var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/)
    var props = {}

    if (lang) {
        props.className = ['language-' + lang]
    }


    if (node.properties && node.properties.innerHTML) {
        return h(node, node.tagName || 'div', node.properties);
    }

    // return h(node.position, 'pre', [h(node, 'code', props, [u('text', {position: node.position}, value)])])
    return h(node, 'pre', [h(node, 'code', props, [u('text', {position: node.position}, value)])])
}


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = detab;

var repeat = __webpack_require__(47);

var TAB = 0x09;
var LF = 0x0A;
var CR = 0x0D;

/* Replace tabs with spaces, being smart about which
 * column the tab is at and which size should be used. */
function detab(value, size) {
  var string = typeof value === 'string';
  var length = string && value.length;
  var start = 0;
  var index = -1;
  var column = -1;
  var tabSize = size || 4;
  var results = [];
  var code;
  var add;

  if (!string) {
    throw new Error('detab expected string');
  }

  while (++index < length) {
    code = value.charCodeAt(index);

    if (code === TAB) {
      add = tabSize - ((column + 1) % tabSize);
      column += add;
      results.push(value.slice(start, index) + repeat(' ', add));
      start = index + 1;
    } else if (code === LF || code === CR) {
      column = -1;
    } else {
      column++;
    }
  }

  results.push(value.slice(start));

  return results.join('');
}


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = strikethrough

var all = __webpack_require__(112)

/* Transform deletions. */
function strikethrough(h, node) {
    return h(node, 'del', all(h, node))
}


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = emphasis

var all = __webpack_require__(112)

/* Transform emphasis. */
function emphasis(h, node) {
    return h(node, 'em', all(h, node))
}


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = footnoteReference

var u = __webpack_require__(106)

/* Transform a reference to a footnote. */
function footnoteReference(h, node) {
    var identifier = node.identifier

    return h(node.position, 'sup', {id: 'fnref-' + identifier}, [
        h(node, 'a', {href: '#fn-' + identifier, className: ['footnote-ref']}, [
            u('text', {position: node.position}, identifier)
        ])
    ])
}


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = footnote

var footnoteReference = __webpack_require__(125)

/* Transform an inline footnote. */
function footnote(h, node) {
    var identifiers = []
    var identifier = 1
    var footnotes = h.footnotes
    var length = footnotes.length
    var index = -1

    while (++index < length) {
        identifiers[index] = footnotes[index].identifier
    }

    while (identifiers.indexOf(String(identifier)) !== -1) {
        identifier++
    }

    identifier = String(identifier)

    footnotes.push({
        type: 'footnoteDefinition',
        identifier: identifier,
        children: [{type: 'paragraph', children: node.children}],
        position: node.position
    })

    return footnoteReference(h, {
        type: 'footnoteReference',
        identifier: identifier,
        position: node.position
    })
}


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = heading

var all = __webpack_require__(112)

/* Transform a heading. */
function heading(h, node) {
    return h(node, 'h' + node.depth, all(h, node))
}


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = html

var u = __webpack_require__(106)

/* Return either a `raw` node, in dangerous mode, or
 * nothing. */
function html(h, node) {
    return h.dangerous ? h.augment(node, u('raw', node.value)) : null
}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = imageReference

var normalize = __webpack_require__(130)
var revert = __webpack_require__(131)

/* Transform a reference to an image. */
function imageReference(h, node) {
    var def = h.definition(node.identifier)
    var props

    if (!def) {
        return revert(h, node)
    }

    props = {src: normalize(def.url || ''), alt: node.alt}

    if (def.title !== null && def.title !== undefined) {
        props.title = def.title
    }

    return h(node, 'img', props)
}


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = revert

var u = __webpack_require__(106)
var all = __webpack_require__(112)

/* Return the content of a reference without definition as markdown. */
function revert(h, node) {
    var subtype = node.referenceType
    var suffix = ']'
    var contents
    var head
    var tail

    if (subtype === 'collapsed') {
        suffix += '[]'
    } else if (subtype === 'full') {
        suffix += '[' + node.identifier + ']'
    }

    if (node.type === 'imageReference') {
        return u('text', {position: node.position}, '![' + node.alt + suffix)
    }

    contents = all(h, node)
    head = contents[0]

    if (head && head.type === 'text') {
        head.value = '[' + head.value
    } else {
        contents.unshift(u('text', {position: node.position}, '['))
    }

    tail = contents[contents.length - 1]

    if (tail && tail.type === 'text') {
        tail.value += suffix
    } else {
        contents.push(u('text', {position: node.position}, suffix))
    }

    return contents
}


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalize = __webpack_require__(130)

module.exports = image

/* Transform an image. */
function image(h, node) {
    var props = {src: normalize(node.url), alt: node.alt}

    if (node.title !== null && node.title !== undefined) {
        props.title = node.title
    }

    //.mp4, .m4v, .mov, .webm, and .ogv.
    // var url = normalize(node.url);
    // var tagName = 'img';
    // if(url.endsWith('.mp4')) {
    //     props.controls = "true";
    //     tagName = 'video';
    // }

    return h(node, 'img', props)
}


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineCode

var collapse = __webpack_require__(63)
var u = __webpack_require__(106)

/* Transform inline code. */
function inlineCode(h, node) {
    return h(node, 'code', [u('text', {position: node.position}, collapse(node.value))])
}


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = linkReference

var normalize = __webpack_require__(130)
var revert = __webpack_require__(131)
var all = __webpack_require__(112)

/* Transform a reference to a link. */
function linkReference(h, node) {
    var def = h.definition(node.identifier)
    var props

    if (!def) {
        return revert(h, node)
    }

    props = {href: normalize(def.url || ''), target: '_blank'}

    if (def.title !== null && def.title !== undefined) {
        props.title = def.title
    }

    return h(node, 'a', props, all(h, node))
}


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalize = __webpack_require__(130)
var all = __webpack_require__(112)

module.exports = link

/* Transform a link. */
function link(h, node) {
    var href = normalize(node.url);
    var isEmailAddress = href && href.startsWith('mailto:');
    var props = {href: href};

    if (node.target) {
        props.target = node.target;
    }
    else if (isEmailAddress) {

    }
    else {
        props.target = '_blank';
    }

    if (node.title !== null && node.title !== undefined) {
        props.title = node.title;
    }

    return h(node, 'a', props, all(h, node))
}


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = listItem

var u = __webpack_require__(106)
var wrap = __webpack_require__(116)
var all = __webpack_require__(112)

/* Transform a list-item. */
function listItem(h, node, parent) {
    var children = node.children
    var head = children[0]
    var props = {}
    var single = false
    var result
    var container

    if (
        (!parent || !parent.loose) &&
        children.length === 1 &&
        head.type === 'paragraph'
    ) {
        single = true
    }

    result = all(h, single ? head : node)

    if (typeof node.checked === 'boolean') {
        if (!single && (!head || head.type !== 'paragraph')) {
            result.unshift(h(node, 'p', []))
        }

        container = single ? result : result[0].children

        if (container.length !== 0) {
            container.unshift(u('text', {position: node.position}, ' '))
        }

        container.unshift(
            h(node, 'input', {
                type: 'checkbox',
                // position: node.position,
                checked: node.checked,
                disabled: true
            })
        )

        /* According to github-markdown-css, this class hides bullet. */
        props.className = ['task-list-item']
    }

    if (!single && result.length !== 0) {
        result = wrap(result, true)
    }

    return h(node, 'li', props, result)
}


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = paragraph

var all = __webpack_require__(112)

/* Transform a paragraph. */
function paragraph(h, node) {
    return h(node, 'p', all(h, node))
}


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = root

var u = __webpack_require__(106)
var wrap = __webpack_require__(116)
var all = __webpack_require__(112)

/* Transform a `root`. */
function root(h, node) {
    return h.augment(node, u('root', wrap(all(h, node))))
}


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = strong

var all = __webpack_require__(112)

/* Transform importance. */
function strong(h, node) {
    return h(node, 'strong', all(h, node))
}


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = table

var position = __webpack_require__(108)
var wrap = __webpack_require__(116)
var all = __webpack_require__(112)

/* Transform a table. */
function table(h, node) {
    var rows = node.children
    var index = rows.length
    var align = node.align
    var alignLength = align.length
    var result = []
    var pos
    var row
    var out
    var name
    var cell

    while (index--) {
        row = rows[index].children
        name = index === 0 ? 'th' : 'td'
        pos = alignLength
        out = []

        while (pos--) {
            cell = row[pos]
            out[pos] = h(cell, name, {align: align[pos]}, cell ? all(h, cell) : [])
        }

        result[index] = h(rows[index], 'tr', wrap(out, true))
    }

    return h(
        node,
        'table',
        wrap(
            [
                h(result[0].position, 'thead', wrap([result[0]], true)),
                h(
                    {
                        start: position.start(result[1]),
                        end: position.end(result[result.length - 1])
                    },
                    'tbody',
                    wrap(result.slice(1), true)
                )
            ],
            true
        )
    )
}


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = text

var u = __webpack_require__(106)
var trimLines = __webpack_require__(142)

/* Transform text. */
function text(h, node) {
    return h.augment(node, u('text', {position: node.position}, trimLines(node.value)))
}


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = trimLines

var ws = /[ \t]*\n+[ \t]*/g
var newline = '\n'

function trimLines(value) {
  return String(value).replace(ws, newline)
}


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(19);
var toVDom = __webpack_require__(144);

module.exports = VDom;

function VDom(config) {
    var settings = xtend(config, this.data('settings'));

    this.Compiler = compiler;

    function compiler(tree) {
        return toVDom(tree, settings)
    }
}


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(145);


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(146);
// var data = require('./data');
module.exports = function toDom(node, options) {
    // data(node, options);
    var parser = new Parser(options);
    return parser.parse(node);
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var mode = __webpack_require__(147);
var renderer = __webpack_require__(148);

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
/* 147 */
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
/* 148 */
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
/* 149 */
/***/ (function(module, exports) {

module.exports = {
    // parse
    breaks: true,
    math: true,
    allowDangerousHTML: true,
    hash: true,

    //plugins
    flowchart: true,
    mermaid: true,
    sequence: true,
    chart: true,
    g2: true,
    highlight: true,


    // render
    mode: 'vue',
    h: function () {},
    rootClassName: 'remark-body',
    rootTagName: 'div',
    hashid: true
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var visit = __webpack_require__(41);
var defaultOptions = __webpack_require__(149);

module.exports = function data(root, options) {
    options.rootClassName = [defaultOptions.rootClassName].concat(options.rootClassName);
    options.rootTagName = options.rootTagName || defaultOptions.rootTagName;

    if(root.type === 'root') {
        if(options.rootTagName) {
            root.tagName = options.rootTagName;
        }
        var data = root.data || {};
        if(options.rootClassName) {
            data['class'] = options.rootClassName;
        }
        root.data = data;
    }

    visit(root, function (node) {

        var data = node.data || {};
        data.attrs = data.attrs || {};
        data.props = data.props || {};

        Object.assign(data.attrs, node.properties);

        if(node.type !== 'root' && node.hasOwnProperty('hash')) {

            options.hashid && Object.assign(data.attrs, {
                id: node.hash
            });

            Object.assign(data, {
                key: node.hash
            });
        }

        node.data = data;

    });
};


/***/ })
/******/ ]);