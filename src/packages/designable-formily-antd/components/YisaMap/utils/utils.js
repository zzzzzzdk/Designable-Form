export default {
  isObject: (t) => '[object Object]' === Object.prototype.toString.call(t),
  isArray: (t) => '[object Array]' === Object.prototype.toString.call(t),
  isFunction: (t) => '[object Function]' === Object.prototype.toString.call(t),
};
