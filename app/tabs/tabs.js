'use strict';

/* global vmBuilder, vm, Vue, $, $$ */

vmBuilder.data.tab = 'none';

vmBuilder.methods.onTabClick = e => {
    let target  = e.target.parentElement.getAttribute('data-target');
    console.info('New tab', target);
    vm.$data.$set('tab', target);
};

vmBuilder.watchers.push(['tab', newTab => {
    Vue.nextTick(() => {
        $$('.mdl-tabs__panel').forEach($tab => {
            $tab.style.display = 'none';
        });

        let $newTab = $(`#${newTab}`);

        if ($newTab) {
            $newTab.style.display = 'flex';
        }
    });
}]);

let articlesParsed = false;
vmBuilder.watchers.push(['articles', () => {
    if (articlesParsed) {
        return;
    }
    console.info('Creating categories based on articles');
    articlesParsed = true;

    let categories = vm.$data.articles
        .map(a => a.category.name)
        .uniq()
        .sort((a, b) => 1 - a.localeCompare(b)); // Reverse sort

    vm.$data.$add('categories', categories);
}]);
