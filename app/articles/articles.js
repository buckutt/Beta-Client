'use strict';

/* global vmBuilder, vm, Vue */

vmBuilder.data.articlesLoaded   = false;
vmBuilder.data.basket           = [];
vmBuilder.data.basketPromotions = [];
vmBuilder.data.totalCost        = 0;

/**
 * Calculate the cost of the basket, including promotion.
 */
function calculateCost () {
    let basketCost = vm.$data.basket
        .map(articleId =>
            vm.$data.articles
                .filterObjId(articleId)
                .price
                .amount
        );

    let promoCost = vm.$data.basketPromotions
        .map(basketPromotion =>
            vm.$data.promotions
                .filterObjId(basketPromotion.id)
                .price.amount
        );

    let totalCost = [0] // There must be at least one value to reduce
        .concat(basketCost)
        .concat(promoCost)
        .reduce((a, b) => a + b);

    vm.$data.totalCost = totalCost;
}

vmBuilder.methods.onArticleClick = e => {
    console.log('Click on article');
    let $target = e.target.parents('.buckutt-card-image');
    let id      = $target.getAttribute('data-id');

    vm.$data.basket.push(id);
    Vue.nextTick(calculateCost);

    if ($target.hasAttribute('data-badge')) {
        $target.setAttribute('data-badge', parseInt($target.getAttribute('data-badge'), 10) + 1 + '');
    } else {
        $target.setAttribute('data-badge', '1');
        $target.classList.add('mdl-badge');
        $target.classList.add('active');
    }
};

vmBuilder.methods.onMinusClick = e => {
    console.log('Click on article removal');
    e.stopPropagation();

    let $target = e.target.parents('.buckutt-card-image');
    let badge   = parseInt($target.getAttribute('data-badge'), 10);

    vm.revertPromotions();

    Vue.nextTick(() => {
        let id      = $target.getAttribute('data-id');
        let index   = vm.$data.basket.indexOf(id);
        console.log(id, index);

        vm.$data.basket.splice(index, 1);
        Vue.nextTick(calculateCost);
    });

    if (badge > 1) {
        $target.setAttribute('data-badge', badge - 1 + '');
    } else {
        $target.removeAttribute('data-badge');
        $target.classList.remove('mdl-badge');
        $target.classList.remove('active');
    }
};
