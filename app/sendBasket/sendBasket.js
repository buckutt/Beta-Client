'use strict';

/* global vmBuilder, vm */

vmBuilder.data.loadingBasket   = false;
vmBuilder.data.notEnoughCredit = false;

vmBuilder.methods.sendBasket = () => {
    let basketToSend = [];

    if (vm.$data.loadingBasket) {
        return;
    }

    vm.$data.$set('loadingBasket', true);

    if (vm.$data.currentUser.credit + vm.$data.totalReload - vm.$data.totalCost < 0) {
        setTimeout(() => {
            vm.$data.$set('loadingBasket', false);
            vm.$data.$set('notEnoughCredit', true);

            setTimeout(() => {
                vm.$data.$set('notEnoughCredit', false);
            }, 1000);
        }, 1000);
        return;
    }

    vm.$data.basket.forEach(articleId => {
        let article = vm.$data.articles.filter(article => article.id === articleId)[0];
        basketToSend.push({
            buyerId    : vm.$data.currentUser.id,
            fundationId: article.fundationId,
            promotionId: null,
            sellerId   : vm.$data.currentSeller.id,
            articles   : [article.id],
            cost       : article.price.amount,
            type       : 'purchase'
        });
    });

    vm.$data.basketPromotions.forEach(basketPromo => {
        let promoId        = basketPromo.id;
        let articlesInside = basketPromo.contents;
        let promo          = vm.$data.promotions.filter(promoToCheck => promoToCheck.id === promoId)[0];

        basketToSend.push({
            buyerId    : vm.$data.currentUser.id,
            fundationId: promo.fundationId,
            sellerId   : vm.$data.currentSeller.id,
            promotionId: promo.id,
            articles   : articlesInside,
            cost       : promo.price.amount,
            type       : 'purchase'
        });
    });

    vm.$data.detailedReloads.forEach(reload => {
        basketToSend.push({
            credit  : reload.amount,
            trace   : reload.with,
            buyerId : vm.$data.currentUser.id,
            sellerId: vm.$data.currentSeller.id,
            type    : 'reload'
        });
    });

    console.info('Basket sending', basketToSend);
    setTimeout(() => {
        const success = true;

        if (success) {
            vm.$data.$set('lastCredit', vm.$data.totalCost);
            vm.$data.$set('lastReload', vm.$data.totalReload);
            vm.$data.$set('lastUser', vm.$data.currentUser.fullname);

            vm.onEject();
        } else {
            let error = 'Impossible d\'enregistrer les achats ou de déduire le crédit de l\'utilisateur.<br>';
            error      += 'Si un rechargement par carte a été effectué, le débit a eu lieu.<br>';
            error      += 'Vous pouvez réessayer l\'achat ou concacter l\'équipe gérant Buckutt.';
            vm.throwError(error);
        }
    }, 500);
};
