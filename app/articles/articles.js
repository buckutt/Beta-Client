'use strict';

vmBuilder.data.articlesLoaded = false;

setTimeout(function () {
    console.info('Loaded articles');
    vm.$data.$set('articlesLoaded', true);
    vm.$data.$set('articles', [
        { id       : '94115f81-137f-4525-8947-4999990ca339',
          name     : 'Kinder Delice',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' }, price: { amount: 50 } },
        { id       : '5c9938ae-241f-45df-88a0-c62d8c16a601',
          name     : 'Mars',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' }, price: { amount: 50 } },
        { id       : 'bd542a64-60e2-4ca5-ab0e-adaee988e70e',
          name     : 'Kinder Country',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' }, price: { amount: 50 } },
        { id       : '5ae1a91b-8275-4483-8c41-5f5d7a936744',
          name     : 'Ice Tea Pêche',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }, price: { amount: 50 } },
        { id       : '86ccd543-ced1-43ca-8754-3f8c02a91c22',
          name     : 'Eau',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' }, price: { amount: 50 } },
        { id       : '27b3fa3a-8fac-4b34-b59f-91ea541df146',
          name     : 'Ice Tea Mangue',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }, price: { amount: 50 } },
        { id       : '02efc80a-f3e6-46ad-833d-73736cea33c2',
          name     : 'Liptonic',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }, price: { amount: 50 } },
        { id       : 'a385d92c-2ce0-4b1a-8bc1-1ecabe272a57',
          name     : 'Schweppes',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }, price: { amount: 50 } },
        { id       : '0930eb9d-087e-46da-b690-bff9cf534f02',
          name     : 'Scwheppes Agrum',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }, price: { amount: 50 } },
        { id       : '321d43a8-0852-4b4f-a806-4878bd160d47',
          name     : 'Coca-Cola',
          stock    : 50,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' }, price: { amount: 50 } },
        { id       : '9677b024-19e8-460a-93ac-14111be1309d',
          name     : 'Crêpe',
          stock    : 100,
          createdAt: new Date,
          editedAt : new Date,
          isRemoved: false, category: { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' }, price: { amount: 50 } }
    ]);
}, 1500);

vmBuilder.data.basket           = [];
vmBuilder.data.basketPromotions = [];
vmBuilder.data.totalCost        = 0;

/**
 * Calculate the cost of the basket, including promotion.
 */
function calculateCost () {
    let basketCost = vm.$data.basket
        .map(articleId => {
            return vm.$data.articles
                .filterObjId(articleId)
                .price
                .amount;
        });

    let promoCost = vm.$data.basketPromotions
        .map(basketPromotion => {
            let promotionId = Object.keys(basketPromotion)[0];
            return vm.$data.promotions
                .filterObjId(promotionId)
                .price.amount
        });

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

    vm.revertPromotions(true);

    Vue.nextTick(() => {
        let id      = $target.getAttribute('data-id');
        let index   = vm.$data.basket.indexOf(id);

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
}
