'use strict';

/* global vmBuilder, vm */

vmBuilder.data.loadingBasket   = false;
vmBuilder.data.notEnoughCredit = false;
vmBuilder.data.lastCredit      = '';
vmBuilder.data.lastReload      = '';
vmBuilder.data.lastUser        = '';

vmBuilder.methods.sendBasket = () => {
    let basketToSend = [];

    if (vm.loadingBasket) {
        return;
    }

    vm.loadingBasket = true;

    if (vm.currentUser.credit + vm.totalReload - vm.totalCost < 0) {
        setTimeout(() => {
            vm.loadingBasket   = false;
            vm.notEnoughCredit = true;

            setTimeout(() => {
                vm.notEnoughCredit = false;
            }, 1000);
        }, 1000);

        return;
    }

    vm.basket.forEach(articleId => {
        let article = vm.articles.filter(article => article.id === articleId)[0];
        basketToSend.push({
            buyerId    : vm.currentUser.id,
            fundationId: article.fundationId,
            promotionId: null,
            sellerId   : vm.currentSeller.id,
            articles   : [article.id],
            cost       : article.price.amount,
            type       : 'purchase'
        });
    });

    vm.basketPromotions.forEach(basketPromo => {
        let promoId        = basketPromo.id;
        let articlesInside = basketPromo.contents;
        let promo          = vm.promotions.filter(promoToCheck => promoToCheck.id === promoId)[0];

        basketToSend.push({
            buyerId    : vm.currentUser.id,
            fundationId: promo.fundationId,
            sellerId   : vm.currentSeller.id,
            promotionId: promo.id,
            articles   : articlesInside,
            cost       : promo.price.amount,
            type       : 'purchase'
        });
    });

    vm.detailedReloads.forEach(reload => {
        basketToSend.push({
            credit  : reload.amount,
            trace   : reload.with,
            buyerId : vm.currentUser.id,
            sellerId: vm.currentSeller.id,
            type    : 'reload'
        });
    });

    console.info('Basket sending', basketToSend);
    setTimeout(() => {
        const success = true;

        if (success) {
            vm.lastCredit = vm.totalCost;
            vm.lastReload = vm.totalReload;
            vm.lastUser   = vm.currentUser.fullname;

            vm.onEject();
        } else {
            let error = 'Impossible d\'enregistrer les achats ou de déduire le crédit de l\'utilisateur.<br>';
            error    += 'Si un rechargement par carte a été effectué, le débit a eu lieu.<br>';
            error    += 'Vous pouvez réessayer l\'achat ou concacter l\'équipe gérant Buckutt.';
            vm.throwError(error);
        }
    }, 500);
};
