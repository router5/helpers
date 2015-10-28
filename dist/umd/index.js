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

    function testRouteWithSegment(before, after) {
        return function () {
            var route = arguments[0];

            function applySegment(segment) {
                return test(route, new RegExp(before + normaliseSegment(segment) + after));
            };

            if (arguments.length === 2) {
                return applySegment(arguments[1]);
            }

            return applySegment;
        };
    }

    var startsWithSegment = testRouteWithSegment('^', dotOrEnd);
    var endsWithSegment = testRouteWithSegment(dotOrStart, '$');
    var includesSegment = testRouteWithSegment(dotOrStart, dotOrEnd);

    exports.startsWithSegment = startsWithSegment;
    exports.endsWithSegment = endsWithSegment;
    exports.includesSegment = includesSegment;
});