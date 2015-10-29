'use strict';

/* global vmBuilder, vm, Vue, $, $$ */

vmBuilder.data.tab        = 'none';
vmBuilder.data.categories = [];

vmBuilder.methods.onTabClick = e => {
    let target  = e.target.parentElement.getAttribute('data-target');
    console.info('New tab', target);
    vm.tab = target;
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
    if (articlesParsed || vm.articles.length === 0) {
        return;
    }
    console.info('Creating categories based on articles');
    articlesParsed = true;

    let categories = vm.articles
        .map(a => a.category.name)
        .uniq()
        .sort((a, b) => 1 - a.localeCompare(b)); // Reverse sort

    vm.categories = categories;
}]);
