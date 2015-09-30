'use strict';

// jscs: disable

/* global vmBuilder, vm */

vmBuilder.methods.go = () => {
    vm.loadFakeData();

    vm.$data.$set('currentSeller', {
        id       : 'abc',
        firstname: 'Gabriel',
        lastname : 'Juchault',
        fullname : 'Gabriel Juchault',
        credit   : 500
    });

    vm.$data.$set('sellerPasswordInput', '');
    vm.$data.$set('sellerAuth', true);

    setTimeout(function () {
        vm.$data.$set('currentUser', {
            id       : 'abc',
            firstname: 'Gabriel',
            lastname : 'Juchault',
            fullname : 'Gabriel Juchault',
            credit   : 500
        });

        vm.$data.$set('userConnected', true);
    }, 1500);
};

vmBuilder.data.startedLoading = false;

vmBuilder.methods.loadFakeData = () => {
    vm.$data.$set('startedLoading', true);

    setTimeout(function () {
        console.info('Loaded articles');
        vm.$data.$set('articlesLoaded', true);
        vm.$data.$set('articles', [
            {
                id         : '94115f81-137f-4525-8947-4999990ca339',
                name       : 'Kinder Delice',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '5c9938ae-241f-45df-88a0-c62d8c16a601',
                name       : 'Mars',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : 'bd542a64-60e2-4ca5-ab0e-adaee988e70e',
                name       : 'Kinder Country',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '5ae1a91b-8275-4483-8c41-5f5d7a936744',
                name       : 'Ice Tea Pêche',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '86ccd543-ced1-43ca-8754-3f8c02a91c22',
                name       : 'Eau',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '27b3fa3a-8fac-4b34-b59f-91ea541df146',
                name       : 'Ice Tea Mangue',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '02efc80a-f3e6-46ad-833d-73736cea33c2',
                name       : 'Liptonic',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : 'a385d92c-2ce0-4b1a-8bc1-1ecabe272a57',
                name       : 'Schweppes',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '0930eb9d-087e-46da-b690-bff9cf534f02',
                name       : 'Scwheppes Agrum',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '321d43a8-0852-4b4f-a806-4878bd160d47',
                name       : 'Coca-Cola',
                stock      : 50,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            },
            {
                id         : '9677b024-19e8-460a-93ac-14111be1309d',
                name       : 'Crêpe',
                stock      : 100,
                createdAt  : new Date(),
                editedAt   : new Date(),
                isRemoved  : false,
                category   : { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' },
                price      : { amount: 50 },
                fundationId: 'fundationId',
                pointId    : 'pointId'
            }
        ]);
    }, 1500);

    setTimeout(function () {
        console.info('Loaded promotions');
        vm.$data.$set('promotionsLoaded', true);
        vm.$data.$set('promotions', [
            {
                id         : 'a8b94aea-8be2-4b42-b171-930eb8d3e874',
                name       : 'Formule 1€',
                sets       : [
                    { id: 'ffd53154-f0be-4453-a6fe-ffe6a80ed281', name: 'Barres F1€' },
                    { id: '07dbafeb-2728-428b-a4ff-a9999f034617', name: 'Canettes F1€' }
                ],
                price      : { amount: 100 },
                fundationId: 'abcdef',
                pointId    : 'pointId'
            },
            {
                id         : '5346d179-4f4c-4a32-989d-ecbfb5d21692',
                name       : '3 Crêpes',
                articles   : [
                    { id       : '9677b024-19e8-460a-93ac-14111be1309d',
                      name     : 'Crêpe',
                      stock    : 100,
                      createdAt: new Date(),
                      editedAt : new Date(),
                      isRemoved: false,
                      category : { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' },
                      price    : { amount: 50 }
                    },
                    { id       : '9677b024-19e8-460a-93ac-14111be1309d',
                      name     : 'Crêpe',
                      stock    : 100,
                      createdAt: new Date(),
                      editedAt : new Date(),
                      isRemoved: false,
                      category : { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' },
                      price    : { amount: 50 }
                    },
                    { id       : '9677b024-19e8-460a-93ac-14111be1309d',
                      name     : 'Crêpe',
                      stock    : 100,
                      createdAt: new Date(),
                      editedAt : new Date(),
                      isRemoved: false,
                      category : { id: '166e5d2d-25ac-40e2-afe2-c85d5ad739ac', name: 'Général' },
                      price    : { amount: 50 }
                    }
                ],
                price      : { amount: 100 },
                fundationId: 'abcdef',
                pointId    : 'pointId'
            }
        ]);
    }, 1000);

    setTimeout(function () {
        console.info('Loaded sets');
        vm.$data.$set('setsLoaded', true);
        vm.$data.$set('sets', [
            {
                id      : 'ffd53154-f0be-4453-a6fe-ffe6a80ed281',
                name    : 'Barres F1€',
                articles: [
                    {
                        id         : '94115f81-137f-4525-8947-4999990ca339',
                        name       : 'Kinder Delice',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    },
                    {
                        id         : '5c9938ae-241f-45df-88a0-c62d8c16a601',
                        name       : 'Mars',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    },
                    {
                        id         : 'bd542a64-60e2-4ca5-ab0e-adaee988e70e',
                        name       : 'Kinder Country',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '51befa52-f25f-4d59-b77c-9f2839cb7629', name: 'Barres' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    }
                ]
            },
            {
                id      : '07dbafeb-2728-428b-a4ff-a9999f034617',
                name    : 'Canettes F1€',
                articles: [
                    {
                        id         : '5ae1a91b-8275-4483-8c41-5f5d7a936744',
                        name       : 'Ice Tea Pêche',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    },
                    {
                        id         : '27b3fa3a-8fac-4b34-b59f-91ea541df146',
                        name       : 'Ice Tea Mangue',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    },
                    {
                        id         : '02efc80a-f3e6-46ad-833d-73736cea33c2',
                        name       : 'Liptonic',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    },
                    {
                        id         : 'a385d92c-2ce0-4b1a-8bc1-1ecabe272a57',
                        name       : 'Schweppes',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    },
                    {
                        id         : '0930eb9d-087e-46da-b690-bff9cf534f02',
                        name       : 'Scwheppes Agrum',
                        stock      : 50,
                        createdAt  : new Date(),
                        editedAt   : new Date(),
                        isRemoved  : false,
                        category   : { id: '912735f7-3257-4f5b-9245-fa7a75db7265', name: 'Canettes' },
                        price      : { amount: 50 },
                        fundationId: 'fundationId',
                        pointId    : 'pointId'
                    }
                    // Coca-Cola is not in the set willingly
                ]
            }
        ]);
    }, 630);

    setTimeout(function () {
        console.info('Loaded payment methods');
        vm.$data.$set('paymentMethodsLoaded', true);
        vm.$data.$set('paymentMethods', [
            {
                slug: 'card',
                text: 'Carte'
            },
            {
                slug: 'cash',
                text: 'Liquide'
            },
            {
                slug: 'cheque',
                text: 'Chèque'
            },
            {
                slug: 'gobby',
                text: 'Gobby'
            }
        ]);
    }, 750);
};

// jscs: enable
