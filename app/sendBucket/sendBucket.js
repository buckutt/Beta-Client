'use strict';

vmBuilder.methods.sendBucket = () => {
    vm.$data.$set('currentUser', {
        firstname: 'Gabriel',
        lastname: 'Juchault',
        fullname: 'Gabriel Juchault',
        credit: 500
    });
    vm.$data.$set('currentSeller', {
        firstname: 'Gabriel',
        lastname: 'Juchault',
        fullname: 'Gabriel Juchault',
        credit: 500
    });

    vm.$data.$set('sellerConnected', true);
    vm.$data.$set('userConnected', true);
    vm.$data.$set('sellerAuth', true);
};
