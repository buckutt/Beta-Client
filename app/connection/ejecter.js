'use strict';

vmBuilder.methods.onEject = () => {
    if (!vm.$data.userConnected) {
        console.info('-> Eject seller');
        vm.$data.$set('currentSeller', {});
        vm.$data.$set('sellerConnected', false);
        vm.$data.$set('sellerAuth', false);
        return;
    }

    console.info('Please eject');
    console.info('-> Eject user');
    vm.$data.$set('currentUser', {});
    vm.$data.$set('userConnected', false);
    vm.$data.$set('basket', []);
    vm.$data.$set('basketPromotions', []);
    vm.$data.$set('totalCost', 0);
    vm.$data.$set('totalReload', 0);
    vm.$data.$set('detailedReloads', []);
    vm.$data.$set('reloadMethod', 'card');
    vm.$data.$set('tab', null);
};
