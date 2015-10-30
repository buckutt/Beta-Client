'use strict';

/* global define, componentHandler, MaterialLayoutTab */

define('initTabs', require => {
    const Vue = require('vue');
    const $   = require('$');
    const $$  = require('$$');

    Vue.directive('inittabs', {
        /**
         * Automatically sets the first tab and material-upgrade the elements
         */
        bind() {
            this.vm.tab = 'tab-0';

            // Re enable tabs. See https://github.com/google/material-design-lite/issues/1165
            let $tabs   = $$('.mdl-layout__tab');
            let $panels = $$('.mdl-tabs__panel');
            let $layout = $('.mdl-js-layout');

            $tabs.forEach((tab, i) => {
                new MaterialLayoutTab($tabs[i], $tabs, $panels, $layout.MaterialLayout);
                componentHandler.upgradeElement($tabs[i].children[0]);
            });
        }
    });
});
