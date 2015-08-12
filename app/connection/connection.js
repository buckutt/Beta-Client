'use strict';

vmBuilder.data.currentSeller   = {};
vmBuilder.data.currentUser     = {};
vmBuilder.data.sellerConnected = false;
vmBuilder.data.sellerAuth      = false;
vmBuilder.data.userConnected   = false;
vmBuilder.data.currentPoint    = {
    id: 'pointId',
    name: 'Foyer'
};

let serie = '';
let clearSerieTimeout = 0;
$('body').addEventListener('keypress', e => {
    if (vm.$data.userConnected ||
       (vm.$data.sellerConnected && !vm.$data.sellerAuth) ||
       (!vm.$data.promotionsLoaded || !vm.$data.articlesLoaded)) {
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

/**
 * Checks the serie of number and do whatever it has to do (connect user or Seller)
 * @param  {String} etuNumber The number serie
 */
function checkSerie (etuNumber) {
    // The infoCard of the visible grid (so the one that doesn't have style="display: none;")
    let $infoCard = $('.page-content > .mdl-grid:not([style]) .infoCard');
    if (!etuNumber.isEtuNumber()) {
        let keepText = $infoCard.textContent;
        $infoCard.textContent = 'Invalide !';
        setTimeout(() => {
            $infoCard.textContent = keepText;
        }, 1000);
        return;
    }

    etuNumber = etuNumber.toEtuNumber();

    if (vm.$data.sellerConnected && vm.$data.sellerAuth) {
        console.info('User loading...');
        setTimeout(() => {
            console.info('User loaded !');
            vm.$data.$set('currentUser', {
                id: 'abc',
                firstname: 'Gabriel',
                lastname: 'Juchault',
                fullname: 'Gabriel Juchault',
                credit: 500
            });

            vm.$data.$set('userConnected', true);
        }, 500);
    } else {
        console.info('Seller loading...');
        setTimeout(() => {
            console.info('Seller loaded !');
            vm.$data.$set('currentSeller', {
                id: 'abc',
                firstname: 'Gabriel',
                lastname: 'Juchault',
                fullname: 'Gabriel Juchault',
                credit: 500
            });

            vm.$data.$set('sellerConnected', true);
        }, 500);
    }
}
