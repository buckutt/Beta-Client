'use strict';

vmBuilder.data.promotionsLoaded = false;

setTimeout(function () {
    console.info('Loaded promotions');
    vm.$data.$set('promotionsLoaded', true);
    vm.$data.$set('promotions', [
        {
            id: 'a8b94aea-8be2-4b42-b171-930eb8d3e874',
            name: 'Formule 1€',
            categories: [
                { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }
            ],
            price: { amount: 100 },
            fundationId: 'abcdef',
            pointId: 'pointId'
        },
        {
            id: '5346d179-4f4c-4a32-989d-ecbfb5d21692',
            name: '3 Crêpes',
            articles: [
                { id       : '9677b024-19e8-460a-93ac-14111be1309d',
                  name     : 'Crêpe',
                  stock    : 100,
                  createdAt: new Date,
                  editedAt : new Date,
                  isRemoved: false, category: { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' }, price: { amount: 50 } },
                { id       : '9677b024-19e8-460a-93ac-14111be1309d',
                  name     : 'Crêpe',
                  stock    : 100,
                  createdAt: new Date,
                  editedAt : new Date,
                  isRemoved: false, category: { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' }, price: { amount: 50 } },
                { id       : '9677b024-19e8-460a-93ac-14111be1309d',
                  name     : 'Crêpe',
                  stock    : 100,
                  createdAt: new Date,
                  editedAt : new Date,
                  isRemoved: false, category: { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' }, price: { amount: 50 } }
            ],
            price: { amount: 100 },
            fundationId: 'abcdef',
            pointId: 'pointId'
        }
    ]);
}, 1000);

/**
 * Functionment of Promotion algorithm :
 * basket contains articles ids
 * And in vuejs data, there is the full articles
 * For each promotion, it works on a copy of the basket because it will be modified and it should not impact the other promotions
 * Moreover, there is a watcher on basket, so copying it is mandatory
 * The algorithm copy what the promotion should have in articles and categories; copy because thoses arrays will be
 * filtered if found, and the final check checks if both of the arrays are empty.
 * Articles are first because they're more precise that categories
 * But, we must loop on thoses array and remove elements in the loop. That mean classic for() and forEach will fail or be a mess.
 * So the technique is : map on it. If found return undefined, else, return the original article or category. Then filter the undefined values.
 * The result is an array of what is needed left (or nothing if the promotion is complete)
 * To find the articles/categories, do the same (.map() + .filter() the undefined) on the copy of the basket
 * To remove articles from the basket used in the promotion
 * To avoid that one item is used in multiple promotions
 * If a promotion is found, loop again. Detects multiple promotions
 */

// Disable one change (when the watcher is called, it will update basket, and trigger again the watcher).
let disableOneChange = false;
vmBuilder.watchers.push(['basket', newBasket => {
    // Not ready yet
    if (!vm.$data.promotions) {
        return;
    }

    if (disableOneChange) {
        disableOneChange = false;
        return;
    }

    console.info('Basket change');

    // Extract ids and categories in the basket
    let basket = newBasket
        .map(item => vm.$data.articles.filterObjId(item))
        .map(article => { return { id: article.id, category: article.category.id } });

    // { promotionId: [articleId, articleId] }
    let removedUnderPromotion = {};

    console.log('Basket extracted : ', basket);

    while (1) {
        let promotionFound = false;

        vm.$data.promotions.forEach(promotion => {
            // Copy basket to avoid remoing one item of X item needed to check.
            // Instead, copy it, and if this promotion is okay, replace the general basket with copyBasket
            let copyBasket = basket.slice();
            console.log('CALL', copyBasket);

            console.log('Checking promotion : ', promotion.name);
            let categories = (promotion.categories || []).slice();
            let articles   = (promotion.articles || []).slice();
            let removed    = [];

            // Articles have priority on categories (more precise)
            console.log('Starting articles');
            let removedArticles = [];
            // Use of .map to avoid splice in forEach, which cause forEach to fail.
            articles = articles
                .map((article, articleIndex) => {
                    let found = false;
                    // Use of .map to avoid splice in forEach, which cause forEach to fail.
                    copyBasket = copyBasket
                        .map((articleBasket, articleBasketIndex) => {
                            // No need to search further if already validated in this category
                            if (found) {
                                return articleBasket;
                            }

                            console.log('Checking article', articleBasket.id);
                            if (articleBasket.id === article.id) {
                                console.log('Article is in the basket');
                                // And remove tlater his article from the basket
                                removed.push(articleBasket);
                                found = true;
                                console.log('Still', articles, categories, 'to match');
                                return undefined;
                            }
                        })
                        .filerUndefined();

                    return (!found) ? article : undefined;
                })
                .filerUndefined();

            // Use of .map to avoid splice in forEach, which cause forEach to fail.
            categories = categories
                .map((category, categoryIndex) => {
                    let found = false;
                    // Use of .map to avoid splice in forEach, which cause forEach to fail.
                    copyBasket = copyBasket
                        .map((articleBasket, articleBasketIndex) => {
                            // No need to search further if already validated in this category
                            if (found) {
                                return articleBasket;
                            }

                            console.log('Checking article', articleBasket.id, '/', articleBasket.category, '===', category.id);
                            if (articleBasket.category === category.id) {
                                console.log('Article has the wanted category and is in the basket');
                                removed.push(articleBasket);
                                found = true;
                                console.log('Still', articles, categories, 'to match');
                                return undefined;
                            }

                            return articleBasket;
                        })
                        .filerUndefined();

                    return (!found) ? category : undefined;
                })
                .filerUndefined();

            removed = removed.map(removedItem => removedItem.id);

            console.log('Status articles.length', articles.length, 'categories.length', categories.length);
            // No more step => promotion is done. Copy back basket to make this promotion impact the next ones
            if (articles.length === 0 && categories.length === 0) {
                console.log('That should be good !');
                let newPromotion = {};
                vm.$data.basketPromotions.push(newPromotion);
                newPromotion[promotion.id] = removed;
                promotionFound             = true;
                basket                     = copyBasket;
            }
        });

        // Stop when no promotion is found
        if (!promotionFound) {
            break;
        }
    }

    basket = basket.map(item => item.id);
    disableOneChange = true;
    vm.$data.$set('basket', basket);
    console.log('New basket : ', basket);
    console.log('Under promotion : ', vm.$data.basketPromotions);
}]);
