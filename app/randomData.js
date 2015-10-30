'use strict';

/* global define */

define('randomData', require => {
    const data = require('buckuttData');

    let randomData = {};

    randomData.methods = {
        /**
         * Loads JSON data
         */
        loadFakeData() {
            this.startedLoading = true;

            setTimeout(() => {
                console.info('Loaded articles');
                this.articlesLoaded = true;
                this.articles       = data.articles;
            }, 1500);

            setTimeout(() => {
                console.info('Loaded promotions');
                this.promotionsLoaded = true;
                this.promotions       = data.promotions;
            }, 1000);

            setTimeout(() => {
                console.info('Loaded sets');
                this.setsLoaded = true;
                this.sets       = data.sets;
            }, 630);

            setTimeout(() => {
                console.info('Loaded payment methods');
                this.paymentMethodsLoaded = true;
                this.paymentMethods       = data.meansOfPayment;
            }, 750);
        }
    };

    return randomData;
});
