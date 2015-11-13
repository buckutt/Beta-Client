'use strict';

/* global define */

/**
 * Checks the serie of number and do whatever it has to do (connect user or Seller)
 * @param {Vue}    vm             The vue instance
 * @param {Object} config         The configuration
 * @param {Class}  OfflineRequest The OfflineRequest module
 * @param {String} cardNumber     The number serie
 */
const checkSerie = (vm, config, OfflineRequest, cardNumber) => {
    if (!cardNumber.isCardNumber()) {
        vm.throwError('Numéro de carte étu invalide');

        return;
    }

    if (vm.sellerConnected && vm.sellerAuth && vm.userConnected && vm.inputIsForDoubleValidation) {
        console.info('Revalidating...');
        vm.revalidate(cardNumber);
    } else if (vm.sellerConnected && vm.sellerAuth) {
        console.info('User loading...');

        setTimeout(() => {
            console.info('User loaded !');
            vm.currentUser = require('buckuttData').users[0];
            vm.showPicture = vm.device.showPicture;

            vm.userConnected = true;
        }, 500);
    } else {
        console.info('Seller loading...');

        vm.sellerCardNum = cardNumber;
        vm.sellerConnected = true;
    }
};

define('connection', require => {
    const OfflineRequest = require('OfflineRequest');
    const config         = require('config');
    const $              = require('$');

    let connection = {};

    let serie             = '';
    let clearSerieTimeout = 0;

    connection.data = {
        currentSeller  : {},
        currentUser    : {},
        sellerConnected: false,
        sellerAuth     : false,
        sellerCardNum  : '',
        userConnected  : false,
        sellerCanReload: false,
        showPicture    : false
    };

    connection.controller = vm => {
        $('body').addEventListener('keypress', e => {
            if (vm.userConnected ||
               (vm.sellerConnected && !vm.sellerAuth) ||
                vm.error ||
                vm.startedLoading) {
                if (!vm.inputIsForDoubleValidation) {
                    return;
                }
            }

            console.log('keyPress and waiting for a user card number');

            serie += String.fromCharCode(e.which);
            console.log('Actual number : ', serie);
            clearTimeout(clearSerieTimeout);

            clearSerieTimeout = setTimeout(() => {
                checkSerie(vm, config, OfflineRequest, serie);
                console.info('Checking');
                serie = '';
            }, 1000);
        });
    };

    return connection;
});
