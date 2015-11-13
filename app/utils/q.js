'use strict';

/* global define */

define('q', () =>
    obj => encodeURIComponent(JSON.stringify(obj))
);
