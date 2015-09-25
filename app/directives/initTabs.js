'use strict';

/* global vm, Vue, $, $$, MaterialLayoutTab */

Vue.directive('inittabs', {
    bind: () => {
        vm.$data.$set('tab', 'tab-0');

        // Re enable tabs. See https://github.com/google/material-design-lite/issues/1165
        let $tabs   = $$('.mdl-layout__tab');
        let $panels = $$('.mdl-tabs__panel');
        let $layout = $('.mdl-js-layout');

        $tabs.forEach((tab, i) => new MaterialLayoutTab($tabs[i], $tabs, $panels, $layout.MaterialLayout));
    }
});
