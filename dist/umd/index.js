(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    exports.startsWithSegment = startsWithSegment;
    exports.endsWithSegment = endsWithSegment;
    exports.includesSegment = includesSegment;
    var dotOrEnd = '(\\..+$|$)';
    var dotOrStart = '(^.+\\.|^)';

    function getName(route) {
        return typeof route === 'string' ? route : route.name || '';
    }

    function test(route, regex) {
        return regex.test(getName(route));
    }

    function normaliseSegment(name) {
        return name.replace('.', '\\.');
    }

    function startsWithSegment(route, segment) {
        return test(route, new RegExp('^' + normaliseSegment(segment) + dotOrEnd));
    }

    function endsWithSegment(route, segment) {
        return test(route, new RegExp(dotOrStart + normaliseSegment(segment) + '$'));
    }

    function includesSegment(route, segment) {
        return test(route, new RegExp(dotOrStart + normaliseSegment(segment) + dotOrEnd));
    }
});