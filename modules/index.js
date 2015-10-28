const dotOrEnd = '(\\..+$|$)';
const dotOrStart = '(^.+\\.|^)';

function getName(route) {
    return typeof route === 'string' ? route : (route.name || '');
}

function test(route, regex) {
    return regex.test(getName(route));
}

function normaliseSegment(name) {
    return name.replace('.', '\\.');
}

function testRouteWithSegment(before, after) {
    return function () {
        const route = arguments[0];

        function applySegment(segment) {
            return test(route, new RegExp(before + normaliseSegment(segment) + after));
        };

        if (arguments.length === 2) {
            return applySegment(arguments[1]);
        }

        return applySegment;
    };
}

const startsWithSegment = testRouteWithSegment('^', dotOrEnd);
const endsWithSegment = testRouteWithSegment(dotOrStart, '$');
const includesSegment = testRouteWithSegment(dotOrStart, dotOrEnd);

export { startsWithSegment, endsWithSegment, includesSegment };
