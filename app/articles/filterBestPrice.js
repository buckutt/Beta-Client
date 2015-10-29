'use strict';

/* global vmBuilder, vm, Vue */

const now = new Date();

let filterBestPrice = article => {
    article.prices = article.prices.filter(price => (price.period.start <= now && now <= price.period.end));

    let min   = Infinity;
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

vmBuilder.watchers.push(['articles', () => {
    console.info('Finding prices');

    vm.articles.forEach(article => filterBestPrice(article));
}]);
