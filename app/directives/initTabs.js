'use strict';

/* global define, componentHandler, location, MaterialLayoutTab */

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
                try {
                    new MaterialLayoutTab($tabs[i], $tabs, $panels, $layout.MaterialLayout);
                } catch (e) {
                    location.reload();
                }
                componentHandler.upgradeElement($tabs[i].children[0]);
            });
        }
    });
});
