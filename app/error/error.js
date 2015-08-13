'use strict';

vmBuilder.data.error = null;

vmBuilder.methods.closeError = () => {
    vm.$data.$set('error', null);
};
