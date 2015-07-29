'use strict';

vmBuilder.data.sellerPasswordInput = '';

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
        console.info('Seller auth-ed');
        vm.$data.$set('sellerPasswordInput', '');
        vm.$data.$set('sellerAuth', true);
        // Wait for animations and nextTick
        setTimeout(function () {
            authingUser = false;
        }, 500);
    }, 500)
};
