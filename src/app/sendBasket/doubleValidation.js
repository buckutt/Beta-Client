export default {
    data: {
        inputIsForDoubleValidation: false
    },

    methods: {
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
    }
};
