'use strict';

vmBuilder.data.promotionsLoaded = false;

let articles;
let promotions;

let silent = false;

vmBuilder.methods.silentBasketOnce = () => {
    silent = true;
};

vmBuilder.watchers.push(['basket', basket => {
    if (!vm.$data.promotionsLoaded || !vm.$data.articlesLoaded) {
        return;
    }

    if (silent === true) {
        silent = false;
        return;
    }

    articles   = sanitizeArticles(vm.$data.articles);
    promotions = sanitizePromotions(vm.$data.promotions);

    let basketPromotions         = vm.$data.basketPromotions;
    let promotionsThatDidntMatch = 0;
    let i                        = 0;

    // Check the first promotion and continues while they all stop matching (promotionsThatDidntMatch)
    do {
        let promotion   = promotions[i];
        let basketCopy  = basket.slice();
        let basketPromo = [];
        // Count what needs to be found
        let still       = promotion.articles.length + promotion.categories.length;

        console.log('Promotion', promotion.id);

        // First check if basket contains articles (more precise)
        for (let j = 0; j < promotion.articles.length; j++) {
            let articlePromotion = promotion.articles[j];
            let position         = containsArticle(basketCopy, articlePromotion);

            if (position > -1) {
                console.log(articlePromotion + ' is present');
                // Remove from the temporary basket
                basketCopy.splice(position, 1);
                // And add to the temporary basket for this promotion
                basketPromo.push(articlePromotion);
                --still;
            }
        }

        // Then check if basket contains article that matches category
        for (let j = 0; j < promotion.categories.length; j++) {
            let categoryPromotion = promotion.categories[j];
            let position          = containsArticleFromCategory(basketCopy, categoryPromotion);

            if (position > -1) {
                console.log(categoryPromotion + ' has the good category');
                // Get back the article id
                let articlePromotion  = basketCopy[position];
                // Remove from the temporary basket
                basketCopy.splice(position, 1);
                // And add to the temporary basket for this promotion
                basketPromo.push(articlePromotion);
                --still;
            }
        }

        // still = 0 => everything has been found
        if (still === 0) {
            console.log('Promotion matches');
            basket = basketCopy;
            basketPromotions.push({ id: promotion.id, contents: basketPromo });
        } else {
            console.log('Promotion didnt match');
            promotionsThatDidntMatch++;
        }

        // Increases or resets i
        i = (i + 1) % promotions.length;
    } while (promotionsThatDidntMatch < promotions.length);

    vm.$data.$set('basket', basket);
    vm.$data.$set('basketPromotions', basketPromotions);
}]);

/**
 * Sanitizes an articles array to keep only what's need for the algorithm
 * @param  {Array} articles Array of articles loaded by AJAX
 * @return {Array} Array sanitized
 */
function sanitizeArticles (articles) {
    return articles
        .slice()
        .map(article => {
            return {
                id: article.id,
                category: article.category.id
            };
        });
}

/**
 * Sanitizes a promotions array to keep only what's need for the algorithm
 * @param  {Array} promotions Array of promotions loaded by AJAX
 * @return {Array} Array sanitized
 */
function sanitizePromotions (promotions) {
    return promotions
        .slice()
        .map(promotion => {
            promotion.articles   = promotion.articles || [];
            promotion.categories = promotion.categories || [];
            return {
                id: promotion.id,
                articles: promotion.articles.map(article => article.id),
                categories: promotion.categories.map(category =>category.id),
            }
        });
}

/**
 * Checks if the basket contains article
 * @param  {Array}  basketCopy Basket
 * @param  {String} article    Article id
 * @return {Number} Index of article in basketCopy
 */
function containsArticle (basketCopy, article) {
    return basketCopy.indexOf(article);
}

/**
 * Check if an article is in the basket with the specified category
 * @param  {Array}  basketCopy Basket
 * @param  {String} category   Category id
 * @return {Number} Index of article in basketCopy
 */
function containsArticleFromCategory (basketCopy, category) {
    for (var i = 0; i < basketCopy.length; i++) {
        var article = basketCopy[i];

        if (articleIsFromCategory(article, category)) {
            return i;
        }
    }

    return -1;
}

/**
 * Returns true if article has category; false if article has not the category
 * @param  {String} articleId Article id
 * @param  {String} category  Category id
 * @return {Boolean} True ir article is in the given category
 */
function articleIsFromCategory (articleId, category) {
    var fullArticle = articles.filter(article => article.id === articleId && article.category === category);

    return fullArticle.length > 0;
}
