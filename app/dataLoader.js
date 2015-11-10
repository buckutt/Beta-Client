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
        deviceLoaded        : false,
        pointId             : 'adf24c29-fa1f-4561-8556-938da22f4897',
        deviceId            : '180e1e56-79a4-4a9b-acfe-c397bb488131',
        doubleValidation    : false,
        offlineSupport      : false
    };

    dataLoader.methods = {
        /**
         * Loads JSON data
         */
        loadData() {
            this.startedLoading = true;

            // Get the device id and point id from the headers

            let loadArticles = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded articles');
                    this.articlesLoaded   = true;
                    this.articles         = data.articles;
                    this.doubleValidation = data.devices[0].doubleValidation;
                    this.offlineSupport   = data.devices[0].offlineSupport;
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

            let loadDevice = new Promise(resolve => {
                setTimeout(() => {
                    console.info('Loaded device');
                    this.deviceLoaded = true;
                    this.device       = data.devices.filter(device => device.id === this.deviceId)[0];
                    resolve();
                }, 400);
            });

            Promise
                .all([loadArticles, loadPromotions, loadSets, loadPayments, loadDevice])
                .then(() => {
                    this.startedLoading = false;
                });
        }
    };

    return dataLoader;
});
