'use strict';

/* global define */

define('filterBestPrice', require => {
    const Vue = require('vue');

    let filterBestPrice = {};

    const now = new Date();

    let filterBestPriceArticle = article => {
        article.prices = article.prices.filter(price => (price.period.start <= now && now <= price.period.end));

        let min         = Infinity;
        let chosenPrice = null;
        article.prices.forEach(price => {
            if (price.amount < min) {
                min         = price.amount;
                chosenPrice = price;
            }
        });

        Vue.set(article, 'price', chosenPrice);

        return article;
    };

    filterBestPrice.controller = vm => {
        vm.$watch('articles', function () {
            if (this.silentWatch) {
                return;
            }

            console.info('Finding prices');

            this.articles.forEach(article => filterBestPriceArticle(article));
        });
    };

    return filterBestPrice;
});
