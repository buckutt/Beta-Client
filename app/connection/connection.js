'use strict';

/* global vmBuilder, vm, $ */

vmBuilder.data.currentSeller   = {};
vmBuilder.data.currentUser     = {};
vmBuilder.data.sellerConnected = false;
vmBuilder.data.sellerAuth      = false;
vmBuilder.data.userConnected   = false;

let serie = '';
let clearSerieTimeout = 0;

/**
 * Checks the serie of number and do whatever it has to do (connect user or Seller)
 * @param {String} etuNumber The number serie
 */
function checkSerie (etuNumber) {
    if (!etuNumber.isEtuNumber()) {
        vm.throwError('Numéro de carte étu invalide');

        return;
    }

    etuNumber = etuNumber.toEtuNumber();

    if (vm.$data.sellerConnected && vm.$data.sellerAuth) {
        console.info('User loading...');
        setTimeout(() => {
            console.info('User loaded !');
            vm.$data.$set('currentUser', {
                id       : 'abc',
                firstname: 'Gabriel',
                lastname : 'Juchault',
                fullname : 'Gabriel Juchault',
                credit   : 500
            });

            vm.$data.$set('userConnected', true);
        }, 500);
    } else {
        console.info('Seller loading...');
        setTimeout(() => {
            const success = true;

            if (success) {
                console.info('Seller loaded !');
                vm.$data.$set('sellerConnected', true);
            } else {
                vm.throwError('Numéro de carte étu non vendeur');
            }
        }, 500);
    }
}

$('body').addEventListener('keypress', e => {
    if (vm.$data.userConnected ||
       (vm.$data.sellerConnected && !vm.$data.sellerAuth)) {
        return;
    }

    console.log('keyPress and waiting for a user card number');

    serie += String.fromCharCode(e.which);
    console.log('Actual number : ', serie);
    clearTimeout(clearSerieTimeout);

    clearSerieTimeout = setTimeout(() => {
        checkSerie(serie);
        console.info('Checking');
        serie = '';
    }, 1000);
});
