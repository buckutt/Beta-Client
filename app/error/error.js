'use strict';

/* global define */

define('error', () => {
    let error = {};

    error.data = {
        error       : false,
        errorMessage: ''
    };

    error.methods = {
        /**
         * Shows the error modal box
         * @param  {String} message The error message
         */
        throwError(message) {
            this.error        = true;
            this.errorMessage = message;
        },

        /**
         * Closes the error modal box
         */
        closeError() {
            this.error = false;
        }
    };

    return error;
});
