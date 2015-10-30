'use strict';

/* global define */

define('authInput', () => {
    let authInput   = {};

    let authingUser = false;

    authInput.data = {
        sellerPasswordInput: '',
        wrongSellerPassord : false
    };

    authInput.methods = {
        /**
         * Adds value to password input when key is pressed
         * @param  {KeyboardEvent} e The key press event
         */
        onPasswordInput(e) {
            console.log('Password key input');
            let value = e.target.parents('.mdl-cell').textContent.trim();
            this.sellerPasswordInput = this.sellerPasswordInput + value;
        },

        /**
         * Clears password input when clear button is pressed
         */
        onClearInput() {
            console.log('Password clear input');
            this.sellerPasswordInput = '';
        },

        /**
         * Checks the seller when validating password
         */
        onValidateInput() {
            if (authingUser) {
                return;
            }

            authingUser = true;

            console.log('Password validate input');
            setTimeout(() => {
                const success = true;

                if (success) {
                    console.info('Seller auth-ed');

                    this.loadData();

                    this.currentSeller = require('buckuttData').users[0];

                    this.sellerPasswordInput = '';
                    this.sellerAuth          = true;
                } else {
                    this.throwError('Mot de passe invalide');
                    this.sellerPasswordInput = '';
                }

                // Wait for animations and nextTick
                setTimeout(function () {
                    authingUser = false;
                }, 500);
            }, 500);
        }
    };

    return authInput;
});
