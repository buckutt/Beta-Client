'use strict';

/* global define */

define('sendBasket', require => {
    const config         = require('config');
    const OfflineRequest = require('OfflineRequest');

    let sendBasket = {};

    sendBasket.data = {
        loadingBasket  : false,
        notEnoughCredit: false,
        lastCredit     : '',
        lastReload     : '',
        lastUser       : '',
        lastAmount     : ''
    };

    sendBasket.methods = {
        /**
         * Sends the basket to the API
         * @param {Boolean} revalidated Sends basket after correct revalidation
         */
        sendBasket(revalidated) {
            let basketToSend = [];

            if (this.loadingBasket) {
                return;
            }

            if (this.doubleValidation) {
                // revalidated may be a MouseEvent
                if (revalidated !== true) {
                    console.info('Entering double validation mode');
                    this.inputIsForDoubleValidation = true;

                    return;
                }
            }

            this.loadingBasket = true;

            if (this.currentUser.credit + this.totalReload - this.totalCost < 0) {
                setTimeout(() => {
                    this.loadingBasket   = false;
                    this.notEnoughCredit = true;

                    setTimeout(() => {
                        this.notEnoughCredit = false;
                    }, 1000);
                }, 1000);

                return;
            }

            this.basket.forEach(articleId => {
                let article = this.articles.filter(article => article.id === articleId)[0];
                basketToSend.push({
                    buyerId    : this.currentUser.id,
                    fundationId: article.fundationId,
                    promotionId: null,
                    sellerId   : this.currentSeller.id,
                    articles   : [article.id],
                    cost       : article.price.amount,
                    type       : 'purchase'
                });
            });

            this.basketPromotions.forEach(basketPromo => {
                let promoId        = basketPromo.id;
                let articlesInside = basketPromo.contents;
                let promo          = this.promotions.filter(promoToCheck => promoToCheck.id === promoId)[0];

                basketToSend.push({
                    buyerId    : this.currentUser.id,
                    fundationId: promo.fundationId,
                    sellerId   : this.currentSeller.id,
                    promotionId: promo.id,
                    articles   : articlesInside,
                    cost       : promo.price.amount,
                    type       : 'purchase'
                });
            });

            this.detailedReloads.forEach(reload => {
                basketToSend.push({
                    credit  : reload.amount,
                    trace   : reload.with,
                    buyerId : this.currentUser.id,
                    sellerId: this.currentSeller.id,
                    type    : 'reload'
                });
            });

            console.info('Basket sending', basketToSend);
            OfflineRequest
                .post(`${config.baseURL}/services/basket`, basketToSend)
                .then(response => {
                    this.loadingBasket = false;

                    if (response.hasOwnProperty('newCredit')) {
                        this.lastCredit = this.totalCost;
                        this.lastReload = this.totalReload;
                        this.lastAmount = this.currentUser.credit - this.totalCost + this.totalReload;
                        this.lastUser   = this.currentUser.fullname;

                        this.onEject();
                    } else {
                        let error = 'Impossible d\'enregistrer les achats ou de déduire le crédit de l\'utilisateur.<br>';
                        error    += 'Si un rechargement par carte a été effectué, le débit a eu lieu.<br>';
                        error    += 'Vous pouvez réessayer l\'achat ou concacter l\'équipe gérant Buckutt.';
                        this.throwError(error);
                    }
                });
            // setTimeout(() => {
            //     const success      = true;
            //     this.loadingBasket = false;

            //     if (success) {
            //         this.lastCredit = this.totalCost;
            //         this.lastReload = this.totalReload;
            //         this.lastAmount = this.currentUser.credit - this.totalCost + this.totalReload;
            //         this.lastUser   = this.currentUser.fullname;

            //         this.onEject();
            //     } else {
            //         let error = 'Impossible d\'enregistrer les achats ou de déduire le crédit de l\'utilisateur.<br>';
            //         error    += 'Si un rechargement par carte a été effectué, le débit a eu lieu.<br>';
            //         error    += 'Vous pouvez réessayer l\'achat ou concacter l\'équipe gérant Buckutt.';
            //         this.throwError(error);
            //     }
            // }, 500);
        }
    };

    return sendBasket;
});
