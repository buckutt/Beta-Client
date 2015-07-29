'use strict';

Vue.filter('credit', (credit, divide) => {
    let newCredit = (divide) ? (credit / 100) : credit;
    newCredit = newCredit.toFixed(2);

    return `${newCredit}€`;
});
