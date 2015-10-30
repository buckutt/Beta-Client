'use strict';

/* global define */

define('tabs', require => {
    const Vue = require('vue');
    const $   = require('$');
    const $$  = require('$$');

    let tabs = {};

    let articlesParsed = false;

    tabs.data = {
        tab       : 'none',
        categories: []
    };

    tabs.methods = {
        /**
         * Change the tab
         * @param  {MouseEvent} e The click event
         */
        onTabClick(e) {
            let target  = e.target.parentElement.getAttribute('data-target');
            console.info('New tab', target);
            this.tab = target;
        }
    };

    tabs.controller = vm => {
        vm.$watch('tab', function (newTab) {
            console.log('tab change');
            Vue.nextTick(() => {
                $$('.mdl-tabs__panel').forEach($tab => {
                    $tab.style.display = 'none';
                });

                let $newTab = $(`#${newTab}`);

                if ($newTab) {
                    $newTab.style.display = 'flex';
                }
            });
        });

        vm.$watch('articles', function () {
            if (articlesParsed || this.articles.length === 0) {
                return;
            }
            console.info('Creating categories based on articles');
            articlesParsed = true;

            let categories = this.articles
                .map(a => a.category.name)
                .uniq()
                .sort((a, b) => 1 - a.localeCompare(b)); // Reverse sort

            this.categories = categories;
        });
    };

    return tabs;
});
