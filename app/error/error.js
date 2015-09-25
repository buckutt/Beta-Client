'use strict';

/* global vmBuilder, vm */

vmBuilder.data.error        = false;
vmBuilder.data.errorMessage = '';

vmBuilder.methods.throwError = message => {
    vm.$data.$set('error', true);
    vm.$data.$set('errorMessage', message);
};

vmBuilder.methods.closeError = () => {
    vm.$data.$set('error', false);
};
