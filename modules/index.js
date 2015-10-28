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

export function startsWithSegment(route, segment) {
    return test(route, new RegExp('^' + normaliseSegment(segment) + dotOrEnd));
}

export function endsWithSegment(route, segment) {
    return test(route, new RegExp(dotOrStart + normaliseSegment(segment) + '$'));
}

export function includesSegment(route, segment) {
    return test(route, new RegExp(dotOrStart + normaliseSegment(segment) + dotOrEnd));
}
