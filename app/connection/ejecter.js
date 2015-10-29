'use strict';

/* global vmBuilder, vm */

vmBuilder.methods.onEject = () => {
    if (!vm.userConnected) {
        console.info('-> Eject seller');
        vm.currentSeller   = {};
        vm.sellerConnected = false;
        vm.sellerAuth      = false;

        return;
    }

    console.info('Please eject');
    console.info('-> Eject user');
    vm.currentUser      = {};
    vm.userConnected    = false;
    vm.basket           = [];
    vm.basketPromotions = [];
    vm.totalCost        = 0;
    vm.totalReload      = 0;
    vm.detailedReloads  = [];
    vm.reloadMethod     = 'card';
    vm.tab              = null;
};
