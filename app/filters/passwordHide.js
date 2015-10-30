'use strict';

/* global define */

define('passwordHide', require => {
    let Vue = require('vue');

    Vue.filter('passwordHide', password => {
        let len    = Math.max(0, password.length - 1);
        let result = '';

        while (len--) {
            result += '*';
        }

        return result + password.slice(-1);
    });
});
