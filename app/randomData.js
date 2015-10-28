'use strict';

// jscs: disable

/* global window, vmBuilder, vm */

vmBuilder.methods.go = () => {
    vm.loadFakeData();

    vm.$data.$set('currentSeller', {
        id       : 'abc',
        firstname: 'Gabriel',
        lastname : 'Juchault',
        fullname : 'Gabriel Juchault',
        credit   : 500
    });

    vm.$data.$set('sellerPasswordInput', '');
    vm.$data.$set('sellerAuth', true);

    setTimeout(function () {
        vm.$data.$set('currentUser', {
            id       : 'abc',
            firstname: 'Gabriel',
            lastname : 'Juchault',
            fullname : 'Gabriel Juchault',
            credit   : 500
        });

        vm.$data.$set('userConnected', true);
    }, 1500);
};

vmBuilder.data.startedLoading = false;

vmBuilder.methods.loadFakeData = () => {
    vm.$data.$set('startedLoading', true);

    setTimeout(function () {
        console.info('Loaded articles');
        vm.$data.$set('articlesLoaded', true);
        vm.$data.$set('articles', window.data.articles);
    }, 1500);

    setTimeout(function () {
        console.info('Loaded promotions');
        vm.$data.$set('promotionsLoaded', true);
        vm.$data.$set('promotions', window.data.promotions);
    }, 1000);

    setTimeout(function () {
        console.info('Loaded sets');
        vm.$data.$set('setsLoaded', true);
        vm.$data.$set('sets', window.data.sets);
    }, 630);

    setTimeout(function () {
        console.info('Loaded payment methods');
        vm.$data.$set('paymentMethodsLoaded', true);
        vm.$data.$set('paymentMethods', window.data.meansOfPayment);
    }, 750);
};

// jscs: enable
