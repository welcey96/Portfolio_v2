export default class Utils {
    _ga = (invoker, attr) => invoker.getAttribute(attr)
    _qs = (selector) => document.querySelector(selector);
    _qsa = (selector) => document.querySelectorAll(selector);
    _id = (id) =>  document.getElementById(id);
    _cls = (className, invoker = null, i = 0) => {
        const doc = invoker != null ? invoker : document;
        const el = doc.getElementsByClassName(className);
        return i === 0 ? el[0] : i > 0 ? el[i] : el;
    };
}