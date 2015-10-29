'use strict';

/* global vmBuilder, vm */

vmBuilder.data.promotionsLoaded = false;
vmBuilder.data.setsLoaded       = false;

let articles;
let promotions;

let silent = false;

vmBuilder.methods.silentBasketOnce = () => {
    silent = true;
};

/**
 * Sanitizes an articles array to keep only what's need for the algorithm
 * @param  {Array} articles Array of articles loaded by AJAX
 * @return {Array} Array sanitized
 */
function sanitizeArticles (articles) {
    return articles
        .slice()
        .map(article => ({
                id: article.id
            })
        );
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
            promotion.articles = promotion.articles || [];
            promotion.sets     = promotion.sets || [];

            return {
                id      : promotion.id,
                articles: promotion.articles.map(article => article.id),
                sets    : promotion.sets.map(set => set.id)
            };
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
 * Returns true if article has set; false if article has not the set
 * @param  {String} articleId Article id
 * @param  {String} setId     Set id
 * @return {Boolean} True if article is in the given set
 */
function articleIsFromSet (articleId, setId) {
    let found = false;

    let fullSet = vm.sets.filterObjId(setId);

    fullSet.articles.forEach(article => {
        if (article.id === articleId) {
            found = true;
        }
    });

    return found;
}

/**
 * Check if an article is in the basket with the specified set
 * @param  {Array}  basketCopy Basket
 * @param  {String} set        Set id
 * @return {Number} Index of article in basketCopy
 */
function containsArticleFromSet (basketCopy, set) {
    for (let i = 0; i < basketCopy.length; i++) {
        let article = basketCopy[i];

        if (articleIsFromSet(article, set)) {
            return i;
        }
    }

    return -1;
}

vmBuilder.watchers.push(['basket', basket => {
    if (!vm.promotionsLoaded || !vm.articlesLoaded) {
        return;
    }

    if (silent === true) {
        silent = false;

        return;
    }

    articles   = sanitizeArticles(vm.articles);
    promotions = sanitizePromotions(vm.promotions);

    let basketPromotions         = vm.basketPromotions;
    let promotionsThatDidntMatch = 0;
    let i                        = 0;

    // Check the first promotion and continues while they all stop matching (promotionsThatDidntMatch)
    do {
        let promotion   = promotions[i];
        let basketCopy  = basket.slice();
        let basketPromo = [];
        // Count what needs to be found
        let still       = promotion.articles.length + promotion.sets.length;

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

        // Then check if basket contains article that matches set
        for (let j = 0; j < promotion.sets.length; j++) {
            let setPromotion = promotion.sets[j];
            let position     = containsArticleFromSet(basketCopy, setPromotion);

            if (position > -1) {
                console.log(setPromotion + ' has the good set');
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
            basketPromotions.push({
                id      : promotion.id,
                contents: basketPromo
            });
        } else {
            console.log('Promotion didnt match');
            promotionsThatDidntMatch++;
        }

        // Increases or resets i
        i = (i + 1) % promotions.length;
    } while (promotionsThatDidntMatch < promotions.length);

    vm.basket           = basket;
    vm.basketPromotions = basketPromotions;
}]);
