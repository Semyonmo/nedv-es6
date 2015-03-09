const TIMEOUT = new WeakMap();
var self = {};

export class FavoriteDirective {
    /*@ngInject*/
    constructor($timeout) {
        TIMEOUT.set(this, $timeout);

        self = this;
    }

    link(scope, element) {
        TIMEOUT.get(self)(() => {
            window.favorite(element);
        }, 0);
    }
}
