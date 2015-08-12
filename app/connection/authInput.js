'use strict';

vmBuilder.data.sellerPasswordInput = '';
vmBuilder.data.wrongSellerPassord  = false;

vmBuilder.methods.onPasswordInput = e => {
    console.log('Password key input');
    let value = e.target.parents('.mdl-cell').textContent.trim();
    vm.$data.$set('sellerPasswordInput', vm.$data.sellerPasswordInput + value);
};

vmBuilder.methods.onClearInput = () => {
    console.log('Password clear input');
    vm.$data.$set('sellerPasswordInput', '');
};

let authingUser = false;
vmBuilder.methods.onValidateInput = () => {

    if (authingUser) {
        return;
    }

    authingUser = true;

    console.log('Password validate input');
    setTimeout(() => {
        const success = true;
        if (success) {
            console.info('Seller auth-ed');

            vm.$data.$set('currentSeller', {
                id: 'abc',
                firstname: 'Gabriel',
                lastname: 'Juchault',
                fullname: 'Gabriel Juchault',
                credit: 500
            });

            vm.$data.$set('sellerPasswordInput', '');
            vm.$data.$set('sellerAuth', true);
        } else {
            console.warn('Wrong password');
            vm.$data.$set('wrongSellerPassword', true);
            vm.$data.$set('sellerPasswordInput', '');

            setTimeout(() => {
                vm.$data.$set('wrongSellerPassword', false);
            }, 2500);
        }

        // Wait for animations and nextTick
        setTimeout(function () {
            authingUser = false;
        }, 500);
    }, 500)
};
