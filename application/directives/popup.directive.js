const TIMEOUT = new WeakMap();
var self = {};

export class PopupDirective {
    /*@ngInject*/
    constructor($timeout) {
        TIMEOUT.set(this, $timeout);
        this.scope = {
            popupText: '@',
            popupPosition: '@'
        };

        self = this;
    }

    link(scope, element) {
        TIMEOUT.get(self)(() => {
            window.popup(element, scope.popupText, scope.popupPosition);
        }, 0);
    }
}
