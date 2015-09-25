'use strict';

/* global document, $$, Element */

/**
 * Search among all parents of a child, stops when the wanted parent is found
 * @param  {String} selector CSS3 selector
 * @return {HTMLElement} The parent
 */
Element.prototype.parents = function (selector) {
    let $matches = $$(selector);
    let parent = this;

    do {
        if ($matches.indexOf(parent) !== -1) {
            return parent;
        }
        parent = parent.parentElement;
    } while (parent !== document.documentElement);

    return parent;
};
