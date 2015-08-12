'use strict';

vmBuilder.methods.sendBucket = () => {
    if (!vm.$data.currentUser.id) {
        vm.$data.$set('currentUser', {
            id: 'abc',
            firstname: 'Gabriel',
            lastname: 'Juchault',
            fullname: 'Gabriel Juchault',
            credit: 500
        });
        vm.$data.$set('currentSeller', {
            id: 'abc',
            firstname: 'Gabriel',
            lastname: 'Juchault',
            fullname: 'Gabriel Juchault',
            credit: 500
        });

        vm.$data.$set('sellerConnected', true);
        vm.$data.$set('userConnected', true);
        vm.$data.$set('sellerAuth', true);
        return;
    }

    let basketToSend = [];

    vm.$data.basket.forEach(articleId => {
        let article = vm.$data.articles.filter(article => article.id === articleId)[0];
        basketToSend.push({
            buyerId: vm.$data.currentUser.id,
            fundationId: article.fundationId,
            pointId: article.pointId,
            promotionId: null,
            sellerId: vm.$data.currentSeller.id,
            articles: [article.id],

            type: 'purchase'
        });
    });

    vm.$data.basketPromotions.forEach(basketPromo => {
        let promoId        = Object.keys(basketPromo)[0];
        let articlesInside = basketPromo[promoId];
        let promo          = vm.$data.promotions.filter(promoToCheck => promoToCheck.id === promoId)[0];

        basketToSend.push({
            buyerId: vm.$data.currentUser.id,
            fundationId: promo.fundationId,
            pointId: promo.pointId,
            sellerId: vm.$data.currentSeller.id,
            promotionId: promo.id,
            articles: articlesInside,

            type: 'purchase'
        });
    });

    vm.$data.detailedReloads.forEach(reload => {
        basketToSend.push({
            credit: reload.amount,
            trace: reload.with,
            pointId: vm.$data.currentPoint.id,
            buyerId: vm.$data.currentUser.id,
            sellerId: vm.$data.currentSeller.id
        });
    });

    console.info('Basket sending', basketToSend);
    setTimeout(() => {
        if (true) {
            
        } else {
            
        }
    }, 500);
};
