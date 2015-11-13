'use strict';

/* global define */

define('config', () => {
    let config = {
        protocol: 'https',
        host    : 'localhost',
        port    : 3000
    };

    config.baseURL = `${config.protocol}://${config.host}:${config.port}`;

    return config;
});
