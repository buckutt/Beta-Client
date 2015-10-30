'use strict';

/**
 * Check if the string is a etu card number
 * @return {Boolean} True if the string is an etu card number
 */
String.prototype.isEtuNumber = function () {
    return this.slice(0, 8) === '22000000';
};
