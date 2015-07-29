'use strict';

Vue.filter('basket', () => {
    let basket    = {};
    let promotion = {};

    // Articles display
    vm.basket.forEach(item => {
        let fullItem = vm.$data.articles.filterObjId(item);

        if (!fullItem) {
            return;
        }

        basket[fullItem.name] = (basket.hasOwnProperty(fullItem.name)) ? basket[fullItem.name] + 1 : 1;
    });

    // Promotions display
    vm.basketPromotions.forEach(promo => {
        let promotionId        = Object.keys(promo)[0];
        let promotionsArticles = promo[promotionId];
        console.log(promotionId, promotionsArticles);

        let fullItem = vm.$data.promotions.filterObjId(promotionId);

        if (!fullItem) {
            return;
        }

        // Store more complex structure for promotions
        if (!promotion.hasOwnProperty(fullItem.name)) {
            promotion[fullItem.name] = {
                count: 0,
                articles: [],
                name: fullItem.name
            }
        }

        promotion[fullItem.name].count++;
        promotion[fullItem.name].articles = promotionsArticles;
    });

    promotion = Object.keys(promotion)
        .map(item => {
            let fullName = `${promotion[item].name} x${promotion[item].count}`;
            let template = `<button class="mdl-button mdl-js-button promotionButton" v-on="click : onPromotionExpand">
                                ${fullName}
                            </button>
                            <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect">`;

            template += promotion[item].articles
                .map(articleId => vm.$data.articles.filterObjId(articleId))
                .map(article => `<li class="mdl-menu__item">${article.name}</li>`)
                .join('\n');

            template += '</ul>';

            return template;
        })
        .join(', ');

    basket = Object.keys(basket)
        .map(item => `${item} x${basket[item]}`)
        .join(', ');

    Vue.nextTick(() => {
        let $node = $('.mdl-layout-spacer');
        if ($node) {
            vm.$compile($node);
        }
    });

    if (basket === '' && promotion === '') {
        return 'vide';
    }

    return (promotion.length > 0) ? promotion + basket : basket;
});
