'use strict';

/* global vmBuilder, vm */

vmBuilder.data.error        = false;
vmBuilder.data.errorMessage = '';

vmBuilder.methods.throwError = message => {
    vm.error        = true;
    vm.errorMessage = message;
};

vmBuilder.methods.closeError = () => {
    vm.error = false;
};
