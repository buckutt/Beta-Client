'use strict';

/* global define */

/**
 * Checks the serie of number and do whatever it has to do (connect user or Seller)
 * @param {String} cardNumber The number serie
 */
const checkSerie = (vm, cardNumber) => {
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
        setTimeout(() => {
            const success = true;

            if (success) {
                console.info('Seller loaded !');
                vm.sellerConnected = true;
                vm.sellerCanReload = true;
            } else {
                vm.throwError('Numéro de carte étu non vendeur');
            }
        }, 500);
    }
};

define('connection', require => {
    const $ = require('$');

    let connection = {};

    let serie             = '';
    let clearSerieTimeout = 0;

    connection.data = {
        currentSeller  : {},
        currentUser    : {},
        sellerConnected: false,
        sellerAuth     : false,
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
                checkSerie(vm, serie);
                console.info('Checking');
                serie = '';
            }, 1000);
        });
    };

    return connection;
});
