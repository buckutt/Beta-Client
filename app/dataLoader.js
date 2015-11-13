'use strict';

/* global define */

define('dataLoader', require => {
    const config         = require('config');
    const q              = require('q');
    const OfflineRequest = require('OfflineRequest');

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

            let notRemoved = {
                field: 'isRemoved',
                eq   : false
            };

            let articlesJoin = {
                category: true,
                points  : true,
                prices  : {
                    fundation: true,
                    group    : true,
                    period   : true,
                    promotion: true
                }
            };

            OfflineRequest.get(`${config.baseURL}/articles/search?q=${q(notRemoved)}&embed=${q(articlesJoin)}`)
                .then(response => {
                    if (response.status === 401) {
                        throw new Error('Pas de droits vendeurs');
                    }

                    this.articlesLoaded = true;
                    this.articles       = response;

                    return OfflineRequest.get(`${config.baseURL}/promotions/search?q=${q(notRemoved)}`);
                })
                .then(response => {
                    this.promotionsLoaded = true;
                    this.promotions       = response;

                    return OfflineRequest.get(`${config.baseURL}/sets/search?q=${q(notRemoved)}`);
                })
                .then(response => {
                    this.setsLoaded = true;
                    this.sets       = response;

                    return OfflineRequest.get(`${config.baseURL}/meansofpayment/search?q=${q(notRemoved)}`);
                })
                .then(response => {
                    this.paymentMethodsLoaded = true;
                    this.paymentMethods       = response;

                    return OfflineRequest.get(`${config.baseURL}/devices/search?q=${q(notRemoved)}`);
                })
                .then(response => {
                    this.deviceLoaded = true;
                    this.device       = response.filter(device => device.id === this.deviceId)[0];
                })
                .then(() => {
                    this.startedLoading = false;
                })
                .catch(err => {
                    this.throwError(err.message);
                    this.onEject();
                    setTimeout(() => {
                        this.startedLoading = false;
                    }, 1000);
                });
        }
    };

    return dataLoader;
});
