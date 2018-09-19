/**
 * Helpers
 */

export function noop() {}
noop.exec = noop;

export function merge(obj) {
    var i = 1,
        target,
        key;

    for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
                obj[key] = target[key];
            }
        }
    }

    return obj;
}

export var isArray = Array.isArray || function (val) {
    return !! val && '[object Array]' === Object.prototype.toString.call(val);
};