'use strict';

window.vm = new Vue(window.vmBuilder);

/*
 * This enables initialisers
 */
window.vmBuilder.inits
    .sort((a, b) => a[0] - b[0])
    .forEach(initier => initier[1](window.vm));

/*
 * This enables automatic watchers directly from a custom option.
 * It will trigger the watch if the data has been initialized through vm.data
 */
window.vmBuilder.watchers.forEach(watcher => {
    let expr      = watcher[0];
    let callback  = watcher[1];
    let firstCall = window.vm.$eval(expr);

    window.vm.$watch(expr, callback);

    if (firstCall !== undefined) {
        callback(firstCall);
    }
});
