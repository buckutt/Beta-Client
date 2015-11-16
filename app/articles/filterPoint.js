'use strict';

/* global define */

define('filterPoint', () => {
    let filterPoint = {};

    let filterPointArticle = (article, pointId) => {
        let articleHasPoint = article.points
            .filter(point => point.id === pointId)
            .length > 0;

        if (!articleHasPoint) {
            return null;
        }

        return article;
    };

    filterPoint.methods = {
        /**
         * Filters the most accurate point
         */
        filterPoint() {
            console.info('Filtering articles', this.articles.length);

            this.articles = this.articles.map(article => filterPointArticle(article, this.pointId));
        }
    };

    return filterPoint;
});
