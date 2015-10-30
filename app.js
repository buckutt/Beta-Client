'use strict';

/* global requirejs, define, window */

requirejs.config({
    paths: {
        vue             : '/bower_components/vue/dist/vue',
        material        : '/bower_components/material-design-lite/material',
        axios           : '/bower_components/axios/dist/axios.min.js',

        $               : '/app/utils/selector',
        $$              : '/app/utils/selector',
        uniq            : '/app/utils/uniq',
        parents         : '/app/utils/parents',
        etuNumber       : '/app/utils/etuNumber',
        filterObjId     : '/app/utils/filterObjId',
        filterUndefined : '/app/utils/filterUndefined',
        listenOnce      : '/app/utils/listenOnce',
        credit          : '/app/filters/credit',
        basket          : '/app/filters/basket',
        passwordHide    : '/app/filters/passwordHide',
        error           : '/app/error/error',
        articles        : '/app/articles/articles',
        filterBestPrice : '/app/articles/filterBestPrice',
        initTabs        : '/app/directives/initTabs',
        tabs            : '/app/tabs/tabs',
        connection      : '/app/connection/connection',
        authInput       : '/app/connection/authInput',
        ejecter         : '/app/connection/ejecter',
        promotions      : '/app/promotions/promotions',
        promotionsEvents: '/app/promotions/promotionsEvents',
        sendBasket      : '/app/sendBasket/sendBasket',
        doubleValidation: '/app/sendBasket/doubleValidation',
        askReload       : '/app/reloads/askReload',
        reloadMenu      : '/app/reloads/reloadMenu',
        buckuttData     : '/app/buckuttData',
        dataLoader      : '/app/dataLoader'
    }
});

define('app', require => {
    require('material');

    require('uniq');
    require('parents');
    require('etuNumber');
    require('filterObjId');
    require('filterUndefined');
    require('listenOnce');

    let Vue     = require('vue');
    let data    = {
        startedLoading: false,
        config        : {}
    };
    let methods = {};

    let modules = [];
    modules.push(require('credit'));
    modules.push(require('basket'));
    modules.push(require('passwordHide'));
    modules.push(require('error'));
    modules.push(require('articles'));
    modules.push(require('filterBestPrice'));
    modules.push(require('initTabs'));
    modules.push(require('tabs'));
    modules.push(require('connection'));
    modules.push(require('authInput'));
    modules.push(require('ejecter'));
    modules.push(require('promotions'));
    modules.push(require('promotionsEvents'));
    modules.push(require('sendBasket'));
    modules.push(require('doubleValidation'));
    modules.push(require('askReload'));
    modules.push(require('reloadMenu'));
    modules.push(require('buckuttData'));
    modules.push(require('dataLoader'));

    // Get only modules data
    let modulesDatas   = modules.map(module => (module && module.data) ? module.data : {});
    let modulesMethods = modules.map(module => (module && module.methods) ? module.methods : {});

    // Merge all of it on data
    Object.assign(data, ...modulesDatas);
    Object.assign(methods, ...modulesMethods);

    let app = new Vue({
        el: '#main',
        data,
        methods
    });

    modules.forEach(module => {
        if (module && typeof module.controller === 'function') {
            module.controller(app);
        }
    });

    window.app = app;
});
