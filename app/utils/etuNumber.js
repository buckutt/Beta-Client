'use strict';

/**
 * Check if the string is a etu card number
 * @return {Boolean} True if the string is an etu card number
 */
String.prototype.isEtuNumber = function () {
    return this.slice(0, 8) === '22000000';
};

/**
 * Convert string to etu card number
 * @return {String} Slice the string to return only the etu card number
 */
String.prototype.toEtuNumber = function () {
    return this.slice(8, 13);
};
