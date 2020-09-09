/**
 * @description 类型判断
 * @author 文亮
 */

export function isArray(ar:any) {
    return Array.isArray(ar)
}

export function isBoolean(arg:any) {
    return typeof arg === 'boolean'
}

export function isNull(arg:any) {
    return arg === null
}

export function isNullOrUndefined(arg:any) {
    // eslint-disable-next-line eqeqeq
    return arg == null
}


export function isNumber(arg:any) {
    return typeof arg === 'number'
}

export function isString(arg:any) {
    return typeof arg === 'string'
}

export function isSymbol(arg:any) {
    return typeof arg === 'symbol'
}

export function isUndefined(arg:any) {
    return arg === void 0
}

export function isRegExp(re:any) {
    return isObject(re) && objectToString(re) === '[object RegExp]'
}

function isObject(arg:any) {
    return typeof arg === 'object' && arg !== null
}

export function isDate(d:any) {
    return isObject(d) && objectToString(d) === '[object Date]'
}

export function isError(e:any) {
    return isObject(e) && objectToString(e) === '[object Error]'
}

export function isFunction(arg:any) {
    return typeof arg === 'function'
}

export function isPrimitive(arg:any) {
    return arg === null ||
      typeof arg === 'boolean' ||
      typeof arg === 'number' ||
      typeof arg === 'string' ||
      typeof arg === 'symbol' ||  // ES6 symbol
      typeof arg === 'undefined'
}

export function isBuffer(arg:any) {
    return arg instanceof Buffer
}


export function objectToString(o:any) {
    return Object.prototype.toString.call(o)
}