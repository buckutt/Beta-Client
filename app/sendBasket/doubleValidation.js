'use strict';

/* global define */

define('doubleValidation', () => {
    let doubleValidation = {};

    doubleValidation.data = {
        inputIsForDoubleValidation: false
    };

    doubleValidation.methods = {
        /**
         * Revalidates the basket.
         * @param  {String} cardNumber The buyer id
         */
        revalidate(cardNumber) {
            const revalidate = true;

            let mol = this.currentUser.meansOfLogin.filter(mol => mol.type === 'etuId')[0];

            if (cardNumber === mol || revalidate) {
                this.inputIsForDoubleValidation = false;
                this.sendBasket(true);
            }
        }
    };

    return doubleValidation;
});
