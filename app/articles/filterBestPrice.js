'use strict';

/* global vmBuilder, vm */

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

    article.$set('price', chosenPrice);

    return article;
};

vmBuilder.watchers.push(['articles', () => {
    console.info('Finding prices');

    let articles = vm.$data.articles.map(article => filterBestPrice(article));
    console.log(articles[0]);
}]);
