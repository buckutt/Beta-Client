'use strict';

/* global window, define */

/* Associations */
const _1 = (objA, objB, name, keyA, keyB) => {
    if (!keyB) {
        keyB = 'id';
    }

    if (!keyA) {
        keyA = name + 'Id';
    }

    objA[keyA] = objB[keyB];
    objA[name] = objB;
};

const _n = (objA, objB, name) => {
    if (Array.isArray(objA[name])) {
        objA[name].push(objB);
    } else {
        objA[name] = [objB];
    }
};

/* Articles */
let articleKinderDelice = {
    id       : '70d9f64d-ad19-4f4a-a24f-f9c220b20c25',
    name     : 'Kinder Delice',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleMars = {
    id       : '837d6b67-9839-48ca-8967-6f2a4514e382',
    name     : 'Mars',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleKinderCountry = {
    id       : '33df525c-1018-4d80-b6dd-756de9759836',
    name     : 'Kinder Country',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleIceTeaPeche = {
    id       : 'ecd348a0-cc97-41a7-bf03-460f2e13ef73',
    name     : 'Ice Tea Pêche',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleEau = {
    id       : '4b3f9766-ed14-4a73-a5e2-69838cb8571d',
    name     : 'Eau',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleIceTeaMangue = {
    id       : '23838db7-63cd-4361-b4d7-8d20cd719453',
    name     : 'Ice Tea Mangue',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleLiptonic = {
    id       : '731ec767-8b4c-466d-917b-6885c4a9f273',
    name     : 'Liptonic',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleSchweppes = {
    id       : 'f268102c-cd17-41ec-8ccb-4dced3a9c079',
    name     : 'Schweppes',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleSchweppesAgrum = {
    id       : 'd91bbe34-f9c2-49c4-848d-dbd8a8ada92c',
    name     : 'Schweppes Agrum',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleCocaCola = {
    id       : '56e5b338-abc5-49bf-bd87-c1b21d2c6d5e',
    name     : 'Coca-Cola',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let articleCrepe = {
    id       : '7f27e060-7e0d-4f94-abee-41f3dfaa0788',
    name     : 'Crêpe',
    stock    : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Categories */
let categoryBarres = {
    id       : '69c82673-98d6-455d-9aa7-4c24f46e8908',
    name     : 'Barres',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let categoryCanettes = {
    id       : '23a79d7f-dbcf-48f6-a232-ba438457e3c0',
    name     : 'Canettes',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let categoryGeneral = {
    id       : '78abb63d-e3ee-42af-be99-48eb2ce4eec2',
    name     : 'Général',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Devices */
let deviceEeetop1 = {
    id         : '180e1e56-79a4-4a9b-acfe-c397bb488131',
    fingerprint: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    name       : 'Eeetop1',
    createdAt  : new Date(),
    editedAt   : new Date(),
    isRemoved  : false
};

let deviceEeetop2 = {
    id         : '33433d25-7f12-48ac-8ea1-1f7ed4bd66f0',
    fingerprint: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    name       : 'Eeetop2',
    createdAt  : new Date(),
    editedAt   : new Date(),
    isRemoved  : false
};

/* Fundations */
let fundationUng = {
    id       : '94786f01-3d13-403d-a846-e7640e2b265b',
    name     : 'UNG',
    website  : 'http://ung.utt.fr/',
    mail     : 'ung@utt.fr',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let fundationFoyer = {
    id       : 'e8543886-c9ff-411e-a0c1-1ea1545d912b',
    name     : 'Foyer',
    website  : 'http://utt.fr/',
    mail     : 'foyer@utt.fr',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let fundationBde = {
    id       : '806c32b3-f603-4968-b31a-eb43bc737b11',
    name     : 'BDE',
    website  : 'http://bde.utt.fr/',
    mail     : 'bde@utt.fr',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Groups */

let groupCotisants = {
    id       : '165d27e3-fabf-48f9-9458-085d447f492f',
    name     : 'Cotisants',
    createdAt: new Date(),
    editedAt : new Date(),
    isOpen   : true,
    isPublic : false,
    isRemoved: false
};

let groupNonCotisants = {
    id       : 'e9186dcc-9008-40b3-9d3c-fa5f80822bf1',
    name     : 'Non Cotisants',
    createdAt: new Date(),
    editedAt : new Date(),
    isOpen   : true,
    isPublic : false,
    isRemoved: false
};

/* MeanOfLogin */
let molGJEtuCard = {
    id       : 'be654b3c-f211-44bc-9f1a-938e43698c4a',
    type     : 'etuId',
    data     : '22000000353423',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let molGJEtuMail = {
    id       : '37a6111e-5c6e-45c8-9ef0-e8e9b365784c',
    type     : 'etuId',
    data     : 'gabriel.juchault@utt.fr',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* MeanOfPayment */
let meanofpaymentCard = {
    id       : 'f83d6c31-6f5c-4650-b7cb-d9d5a484b121',
    slug     : 'card',
    name     : 'Carte',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let meanofpaymentCash = {
    id       : '1a6915e7-0e29-49dd-93d1-235e49a9e697',
    slug     : 'cash',
    name     : 'Liquide',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let meanofpaymentCheque = {
    id       : 'd0c5f0ba-b835-4b9a-b876-024941a909a3',
    slug     : 'cheque',
    name     : 'Chèque',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let meanofpaymentGobby = {
    id       : 'c2a560b3-e30b-4b41-8225-e3ab162b7ec0',
    slug     : 'gobby',
    name     : 'Gobby',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Periods */
let periodEternity = {
    id       : 'c7fb3b77-615a-4e07-8525-9a3518baacc5',
    name     : 'Éternité',
    start    : new Date(0),
    end      : new Date(21474000000000),
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let periodPrevious = {
    id       : 'c5c71175-294a-4ce6-8c44-f80303a41beb',
    name     : 'Avant',
    start    : new Date() - new Date(1000 * 60 * 60 * 24 * 30 * 5),
    end      : new Date() - new Date(1000 * 60 * 60 * 24 * 30 * 3),
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let periodAfter = {
    id       : '61a6703d-1767-45f2-b366-4d1d1389de22',
    name     : 'Après',
    start    : new Date() + new Date(1000 * 60 * 60 * 24 * 30 * 3),
    end      : new Date() + new Date(1000 * 60 * 60 * 24 * 30 * 5),
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let periodNow = {
    id       : '05a7a844-53f9-4a32-9b30-fc492d1169f3',
    name     : 'Après',
    start    : new Date() - new Date(1000 * 60 * 60 * 24 * 30 * 2),
    end      : new Date() + new Date(1000 * 60 * 60 * 24 * 30 * 2),
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Points */
let pointBde = {
    id       : 'b320d6b4-899b-4b05-9888-89260bdf2190',
    name     : 'BDE',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let pointFoyer = {
    id       : 'adf24c29-fa1f-4561-8556-938da22f4897',
    name     : 'Foyer',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Prices */
let price50 = {
    id       : '81b880dd-22f3-4a99-a28c-25e0a68030bc',
    amount   : 50,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let price100F1E = {
    id       : 'ec497ff8-43b7-44ad-93d5-b1fc9cadc256',
    amount   : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let price1003C = {
    id       : '6f5b93f9-3ab6-4c44-a609-5ffe6333e28a',
    amount   : 100,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Promotions */
let promotionF1e = {
    id       : 'ab9e8bd3-be70-4787-b714-86ec9a611d60',
    name     : 'Formule 1€',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let promotion3crepes = {
    id       : '211dcdd3-f91e-4a16-936b-020e2ae10539',
    name     : '3 Crêpes',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Rights */
let rightGJAdmin = {
    id       : '7f30a95c-b57d-45ee-8582-e0e53c0195d5',
    name     : 'admin',
    isAdmin  : true,
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Sets */
let setBarresf1e = {
    id       : '6d9e9e01-b3c8-4d8d-b967-61800d071e93',
    name     : 'Barres Formule 1€',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

let setCanettesf1e = {
    id       : '159e0439-c746-432b-9453-0e92476ec5e4',
    name     : 'Canettes Formule 1€',
    createdAt: new Date(),
    editedAt : new Date(),
    isRemoved: false
};

/* Users */
let userGJ = {
    id         : '1a8cf536-7855-468f-b8e8-4666ece97862',
    firstname  : 'Gabriel',
    lastname   : 'Juchault',
    fullname   : 'Gabriel Juchault',
    nickname   : 'Extaze',
    pin        : '$2a$12$0Hgro3cPeVvZNWrpcBsT2O2AfAfMsoigS9na6V6esH3G462.WV2fm',
    password   : '$2a$12$aqJWiCvjD.azTpE2krKu3.1GDLHApaE.hfz2BM8pIeil.OJ1khST.',
    mail       : 'gabriel.juchault@utt.fr',
    credit     : 1200,
    isTemporary: false,
    createdAt  : new Date(),
    editedAt   : new Date(),
    isRemoved  : false
};

/* Articles - Relationships : cateogry, point, price, sets, promotion */
_1(articleKinderDelice, categoryBarres, 'category');
_1(articleKinderDelice, pointFoyer, 'point');
_n(articleKinderDelice, price50, 'prices', 'priceId');
_n(articleKinderDelice, setBarresf1e, 'sets');

_1(articleMars, categoryBarres, 'category');
_1(articleMars, pointFoyer, 'point');
_n(articleMars, price50, 'prices', 'priceId');
_n(articleMars, setBarresf1e, 'sets');

_1(articleKinderCountry, categoryBarres, 'category');
_1(articleKinderCountry, pointFoyer, 'point');
_n(articleKinderCountry, price50, 'prices', 'priceId');
_n(articleKinderCountry, setBarresf1e, 'sets');

_1(articleIceTeaPeche, categoryCanettes, 'category');
_1(articleIceTeaPeche, pointFoyer, 'point');
_n(articleIceTeaPeche, price50, 'prices', 'priceId');
_n(articleIceTeaPeche, setCanettesf1e, 'sets');

_1(articleEau, categoryGeneral, 'category');
_n(articleEau, pointFoyer, 'points', 'pointId');
_n(articleEau, price50, 'prices');

_1(articleIceTeaMangue, categoryCanettes, 'category');
_1(articleIceTeaMangue, pointFoyer, 'point');
_n(articleIceTeaMangue, price50, 'prices', 'priceId');
_n(articleIceTeaMangue, setCanettesf1e, 'sets');

_1(articleLiptonic, categoryCanettes, 'category');
_1(articleLiptonic, pointFoyer, 'point');
_n(articleLiptonic, price50, 'prices', 'priceId');
_n(articleLiptonic, setCanettesf1e, 'sets');

_1(articleSchweppes, categoryCanettes, 'category');
_1(articleSchweppes, pointFoyer, 'point');
_n(articleSchweppes, price50, 'prices', 'priceId');
_n(articleSchweppes, setCanettesf1e, 'sets');

_1(articleSchweppesAgrum, categoryCanettes, 'category');
_1(articleSchweppesAgrum, pointFoyer, 'point');
_n(articleSchweppesAgrum, price50, 'prices', 'priceId');
_n(articleSchweppesAgrum, setCanettesf1e, 'sets');

_1(articleCocaCola, categoryCanettes, 'category');
_1(articleCocaCola, pointFoyer, 'point');
_n(articleCocaCola, price50, 'prices', 'priceId');
_n(articleCocaCola, setCanettesf1e, 'sets');

_1(articleCrepe, categoryGeneral, 'category');
_1(articleCrepe, pointFoyer, 'foyer');
_n(articleCrepe, price50, 'prices', 'priceId');
_n(articleCrepe, promotion3crepes, 'promotions');

/* Categories - Relationships : articles */
_n(categoryBarres, articleKinderDelice, 'articles');
_n(categoryBarres, articleMars, 'articles');
_n(categoryBarres, articleKinderCountry, 'articles');
_n(categoryCanettes, articleIceTeaPeche, 'articles');
_n(categoryCanettes, articleIceTeaMangue, 'articles');
_n(categoryCanettes, articleLiptonic, 'articles');
_n(categoryCanettes, articleSchweppes, 'articles');
_n(categoryCanettes, articleSchweppesAgrum, 'articles');
_n(categoryCanettes, articleCocaCola, 'articles');
_n(categoryGeneral, articleEau, 'articles');
_n(categoryGeneral, articleCrepe, 'articles');

/* Devices - Relationships : points */
_n(deviceEeetop1, pointFoyer, 'points');
_n(deviceEeetop2, pointFoyer, 'points');

/* Fundations - Relationships : groups, prices */
_n(fundationFoyer, price50, 'prices');
_n(fundationFoyer, price100F1E, 'prices');
_n(fundationFoyer, price1003C, 'prices');
_n(fundationBde, groupCotisants, 'groups');
_n(fundationBde, groupNonCotisants, 'groups');

/* Groups - Relationships : fundation, users, prices */
_1(groupCotisants, fundationFoyer, 'fundation');
_n(groupCotisants, userGJ, 'users');
_n(groupCotisants, price50, 'prices');
_n(groupCotisants, price100F1E, 'prices');
_n(groupCotisants, price1003C, 'prices');

/* MeanOfLogin - Relationships : user */
_1(molGJEtuCard, userGJ, 'user');
_1(molGJEtuMail, userGJ, 'user');

/* Periods - Relationships : prices, rights */
_n(periodEternity, price50, 'prices');
_n(periodEternity, price100F1E, 'prices');
_n(periodEternity, price1003C, 'prices');
_n(periodNow, rightGJAdmin, 'users');

/* Points - Relationships : articles, promotions */
_n(pointFoyer, articleKinderDelice, 'articles');
_n(pointFoyer, articleMars, 'articles');
_n(pointFoyer, articleKinderCountry, 'articles');
_n(pointFoyer, articleIceTeaPeche, 'articles');
_n(pointFoyer, articleEau, 'articles');
_n(pointFoyer, articleIceTeaMangue, 'articles');
_n(pointFoyer, articleLiptonic, 'articles');
_n(pointFoyer, articleSchweppes, 'articles');
_n(pointFoyer, articleSchweppesAgrum, 'articles');
_n(pointFoyer, articleCocaCola, 'articles');
_n(pointFoyer, articleCrepe, 'articles');
_n(pointFoyer, promotionF1e, 'promotions');
_n(pointFoyer, promotion3crepes, 'promotions');

/* Prices - Relationships : fundation, group, period, articles, promotion */
_1(price50, fundationFoyer, 'fundation');
_1(price50, groupCotisants, 'group');
_1(price50, periodEternity, 'period');
_n(price50, articleKinderDelice, 'articles');
_n(price50, articleMars, 'articles');
_n(price50, articleKinderCountry, 'articles');
_n(price50, articleIceTeaPeche, 'articles');
_n(price50, articleEau, 'articles');
_n(price50, articleIceTeaMangue, 'articles');
_n(price50, articleLiptonic, 'articles');
_n(price50, articleSchweppes, 'articles');
_n(price50, articleSchweppesAgrum, 'articles');
_n(price50, articleCocaCola, 'articles');
_n(price50, articleCrepe, 'articles');

_1(price100F1E, fundationFoyer, 'fundation');
_1(price100F1E, groupCotisants, 'group');
_1(price100F1E, periodEternity, 'period');
_1(price100F1E, promotionF1e, 'promotion');

_1(price1003C, fundationFoyer, 'fundation');
_1(price1003C, groupCotisants, 'group');
_1(price1003C, periodEternity, 'period');
_1(price1003C, promotion3crepes, 'promotion');

/* Promotions - Relationships : point, price, articles, sets */
_1(promotionF1e, pointFoyer, 'point');
_1(promotionF1e, price100F1E, 'price');
_n(promotionF1e, setBarresf1e, 'sets');
_n(promotionF1e, setCanettesf1e, 'sets');

_1(promotion3crepes, pointFoyer, 'point');
_1(promotion3crepes, price1003C, 'price');
_n(promotion3crepes, articleCrepe, 'articles');
_n(promotion3crepes, articleCrepe, 'articles');
_n(promotion3crepes, articleCrepe, 'articles');

/* Rights - Relationships : period, users */
_1(rightGJAdmin, periodNow, 'period');
_n(rightGJAdmin, userGJ, 'users');

/* Sets - Relationships : promotion, articles */
_1(setBarresf1e, promotionF1e, 'promotion');
_n(setBarresf1e, articleKinderDelice, 'articles');
_n(setBarresf1e, articleMars, 'articles');
_n(setBarresf1e, articleKinderCountry, 'articles');

_1(setCanettesf1e, promotionF1e, 'promotion');
_n(setCanettesf1e, articleIceTeaPeche, 'articles');
_n(setCanettesf1e, articleIceTeaMangue, 'articles');
_n(setCanettesf1e, articleSchweppes, 'articles');
_n(setCanettesf1e, articleSchweppesAgrum, 'articles');
_n(setCanettesf1e, articleCocaCola, 'articles');

/* Users - Relationships : groups, rights, meansOfLogin */
_n(userGJ, groupCotisants, 'groups');
_n(userGJ, rightGJAdmin, 'rights');
_n(userGJ, molGJEtuCard, 'meansOfLogin');
_n(userGJ, molGJEtuMail, 'meansOfLogin');

(function (window) {
    let articles = [
        articleKinderDelice,
        articleMars,
        articleKinderCountry,
        articleIceTeaPeche,
        articleEau,
        articleIceTeaMangue,
        articleLiptonic,
        articleSchweppes,
        articleSchweppesAgrum,
        articleCocaCola,
        articleCrepe
    ];

    let categories = [
        categoryBarres,
        categoryCanettes,
        categoryGeneral
    ];

    let devices = [
        deviceEeetop1,
        deviceEeetop2
    ];

    let fundations = [
        fundationUng,
        fundationFoyer,
        fundationBde
    ];

    let groups = [
        groupCotisants,
        groupNonCotisants
    ];

    let meansOfLogin = [
        molGJEtuCard,
        molGJEtuMail
    ];

    let meansOfPayment = [
        meanofpaymentCard,
        meanofpaymentCash,
        meanofpaymentCheque,
        meanofpaymentGobby
    ];

    let periods = [
        periodEternity,
        periodPrevious,
        periodAfter,
        periodNow
    ];

    let points = [
        pointBde,
        pointFoyer
    ];

    let prices = [
        price50,
        price100F1E,
        price1003C
    ];

    let promotions = [
        promotionF1e,
        promotion3crepes
    ];

    let rights = [
        rightGJAdmin
    ];

    let sets = [
        setBarresf1e,
        setCanettesf1e
    ];

    let users = [
        userGJ
    ];

    let config = {
        doubleValidation: true
    };

    let data = {
        articles,
        categories,
        devices,
        fundations,
        groups,
        meansOfLogin,
        meansOfPayment,
        periods,
        points,
        prices,
        promotions,
        rights,
        sets,
        users,
        config
    };

    if (typeof define === 'function') {
        define(data);

        return;
    } else if (typeof exports !== 'object') {
        window.data = data;

        return;
    }

    module.exports = data;
}(window));
