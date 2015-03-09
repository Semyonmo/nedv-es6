const TIMEOUT = new WeakMap();
const DATASERVICE = new WeakMap();
var self = {};

export class FilterDirective {
    /*@ngInject*/
    constructor($timeout, dataService) {
        TIMEOUT.set(this, $timeout);
        DATASERVICE.set(this, dataService);
        this.scope = {
            filterField: '@',
            filterValue: '@'
        };

        self = this;
    }

    link(scope) {
        TIMEOUT.get(self)(function () {
            DATASERVICE.get(self).updateFilter(scope.filterField, scope.filterValue);
        }, 0);
    }
}
