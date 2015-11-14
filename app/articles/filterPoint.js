'use strict';

/* global define */

define('filterPoint', require => {
    let filterPoint = {};

    let filterPointArticle = (article, i, articles, pointId) => {
        let articleHasPoint = article.points
            .filter(point => point.id === pointId)
            .length > 0;

        if (!articleHasPoint) {
            articles.splice(i, 1);
        }

        return article;
    };

    filterPoint.data = {
        silentWatch: false
    };

    filterPoint.controller = vm => {
        vm.$watch('articles', function () {
            if (this.silentWatch) {
                return;
            }

            console.info('Filtering articles', this.articles.length);

            this.silentWatch = true;

            for (let i = this.articles.length - 1; i >= 0; i--) {
                filterPointArticle(this.articles[i], i, this.articles, this.pointId);
            }

            require('vue').nextTick((function () {
                this.silentWatch = false;
            }));
        });
    };

    return filterPoint;
});
