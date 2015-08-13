'use strict';

vmBuilder.methods.sendBasket = () => {
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
        const success = false;

        if (success) {
            // set last action by xxx
            vm.$data.$set('lastCredit', vm.$data.totalCost);
            vm.$data.$set('lastReload', vm.$data.totalReload);
            vm.$data.$set('lastUser', vm.$data.currentUser.fullname);

            vm.onEject();
        } else {
            let error = 'Impossible d\'enregistrer les achats ou de déduire le crédit de l\'utilisateur.<br>';
            error      += 'Si un rechargement par carte a été effectué, le débit a eu lieu.<br>';
            error      += 'Vous pouvez réessayer l\'achat ou concacter l\'équipe gérant Buckutt.';
            vm.$data.$set('error', error);
        }
    }, 500);
};
