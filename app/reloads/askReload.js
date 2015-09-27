'use strict';

/* global vmBuilder, vm, $ */

vmBuilder.data.reloadCreditOpened   = false;
vmBuilder.data.waitingForValidation = false;
vmBuilder.data.reloadMethod         = 'card';
vmBuilder.data.creditToReload       = 0;
vmBuilder.data.totalReload          = 0;
vmBuilder.data.detailedReloads      = [];

vmBuilder.methods.askReload = () => {
    vm.$set('reloadCreditOpened', true);
};

vmBuilder.methods.closeReloadCredit = () => {
    vm.$set('reloadCreditOpened', false);

    if (vm.$data.waitingForValidation) {
        // Fake the event
        vm.invalidPayment({
            target: $('.buttonsGrid').children[0]
        });
    }

    vm.$set('waitingForValidation', false);
};

vmBuilder.methods.selectReloadMethod = slug => {
    vm.$set('reloadMethod', slug);
};

vmBuilder.methods.onCreditToReloadClearInput = () => {
    vm.$set('creditToReload', 0);
};

vmBuilder.methods.onCreditToReloadInput = e => {
    let value          = parseInt(e.target.parents('.mdl-cell').textContent.trim(), 10);
    let creditToReload = vm.$data.creditToReload;

    creditToReload = creditToReload * 10 + value * 0.01;
    creditToReload = Math.min(100, creditToReload);
    creditToReload = Math.max(0, creditToReload);

    vm.$set('creditToReload', creditToReload);
};

vmBuilder.methods.onCreditToReloadValidateInput = e => {
    let grid = e.target.parents('.mdl-grid');
    vm.$data.$set('waitingForValidation', true);
    grid.style.height = 0;
    grid.nextElementSibling.style.height = '122px';
};

vmBuilder.methods.invalidPayment = e => {
    let grid = e.target.parents('.mdl-grid');
    grid.style.height = 0;
    grid.previousElementSibling.style.height = '242px';
    vm.$data.$set('waitingForValidation', false);
};

vmBuilder.methods.validateReload = e => {
    let grid = e.target.parents('.mdl-grid');
    grid.style.height = 0;
    grid.previousElementSibling.style.height = '242px';

    vm.$data.$set('waitingForValidation', false);
    vm.$data.$set('totalReload', vm.$data.totalReload + (vm.$data.creditToReload * 100));

    vm.$data.detailedReloads.push({
        with  : vmBuilder.data.paymentMethods.filter(payment => payment.slug === vm.$data.reloadMethod)[0].text,
        amount: vm.$data.creditToReload * 100
    });

    setTimeout(function () {
        $('.userCredit').classList.add('showBadge');
    }, 300);

    vm.$data.$set('creditToReload', 0);
    vm.$data.$set('reloadCreditOpened', false);
};
