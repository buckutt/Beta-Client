'use strict';

vmBuilder.methods.onEject = () => {
    console.info('Please eject');
    console.info('-> Eject user');
    vm.$data.$set('currentUser', {});
    vm.$data.$set('userConnected', false);
    vm.$data.$set('basket', []);
    vm.$data.$set('basketPromotions', []);

    if (vm.$data.sellerConnected) {
        console.info('-> Eject seller');
        vm.$data.$set('currentSeller', {});
        vm.$data.$set('sellerConnected', false);
        vm.$data.$set('sellerAuth', false);
    }
};
