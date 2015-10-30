'use strict';

/* global define */

define('dataLoader', require => {
    const data = require('buckuttData');

    let dataLoader = {};

    dataLoader.data = {
        articlesLoaded      : false,
        setsLoaded          : false,
        paymentMethodsLoaded: false,
        promotionsLoaded    : false,
        configLoaded        : false
    };

    dataLoader.methods = {
        /**
         * Loads JSON data
         */
        loadData() {
            this.startedLoading = true;

            let loadArticles = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded articles');
                    this.articlesLoaded = true;
                    this.articles       = data.articles;
                    resolve();
                }, 1500);
            });

            let loadPromotions = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded promotions');
                    this.promotionsLoaded = true;
                    this.promotions       = data.promotions;
                    resolve();
                }, 1000);
            });

            let loadSets = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded sets');
                    this.setsLoaded = true;
                    this.sets       = data.sets;
                    resolve();
                }, 630);
            });

            let loadPayments = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded payment methods');
                    this.paymentMethodsLoaded = true;
                    this.paymentMethods       = data.meansOfPayment;
                    resolve();
                }, 750);
            });

            let loadConfig = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded config');
                    this.configLoaded = true;
                    this.config       = data.config;
                    resolve();
                }, 400);
            });

            Promise
                .all([loadArticles, loadPromotions, loadSets, loadPayments, loadConfig])
                .then(() => {
                    this.startedLoading = false;
                });
        }
    };

    return dataLoader;
});
