'use strict';

/* global define, document, Node */

define('$', () =>
    (s, fromEl) => {
        if (fromEl instanceof Node) {
            return fromEl.querySelector(s);
        }

        return document.querySelector(s);
    }
);

define('$$', () =>
    (s, fromEl) => {
        if (fromEl instanceof Node) {
            return Array.prototype.slice.call(fromEl.querySelectorAll(s));
        }

        return Array.prototype.slice.call(document.querySelectorAll(s));
    }
);
