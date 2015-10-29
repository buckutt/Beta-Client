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
    vm.startedLoading = true;

    setTimeout(function () {
        console.info('Loaded articles');
        vm.articlesLoaded = true;
        vm.articles       = window.data.articles;
    }, 1500);

    setTimeout(function () {
        console.info('Loaded promotions');
        vm.promotionsLoaded = true;
        vm.promotions       = window.data.promotions;
    }, 1000);

    setTimeout(function () {
        console.info('Loaded sets');
        vm.setsLoaded = true;
        vm.sets       = window.data.sets;
    }, 630);

    setTimeout(function () {
        console.info('Loaded payment methods');
        vm.paymentMethodsLoaded = true;
        vm.paymentMethods       = window.data.meansOfPayment;
    }, 750);
};

// jscs: enable
