'use strict';

/* global window, Node, document */

window.vmBuilder = {
    el      : '#main',
    data    : {},
    methods : {},
    watchers: [],
    inits   : []
};

/**
 * Wrapper over Node.prototype.querySelector
 * @param  {String} s                   The selector
 * @param  {Node}   [fromEl = document] Source Node. If not specified, document
 * @return {Node} The result
 */
window.$ = function (s, fromEl) {
    if (fromEl instanceof Node) {
        return fromEl.querySelector(s);
    }

    return document.querySelector(s);
};

/**
 * Wrapper over Node.prototype.querySelectorAll
 * @param  {String} s                   The selector
 * @param  {Node}   [fromEl = document] Source Node. If not specified, document
 * @return {Node[]} The results
 */
window.$$ = function (s, fromEl) {
    if (fromEl instanceof Node) {
        return Array.prototype.slice.call(fromEl.querySelectorAll(s));
    }

    return Array.prototype.slice.call(document.querySelectorAll(s));
};
