const DATASERVICE = new WeakMap();
const CACHESERVICE = new WeakMap();
const TIMEOUT = new WeakMap();
var self = {};

export class SliderDirective {
    /*@ngInject*/
    constructor($timeout ,dataService, cacheService) {
        DATASERVICE.set(this, dataService);
        CACHESERVICE.set(this, cacheService);
        TIMEOUT.set(this, $timeout);
        this.scope = {
            filterField: '@',
            value: '@',
            range: '@',
            postfix: '@',
            typeOfBuilding: '@'
        };

        self = this;
    }

    // optional link function
    link(scope, element) {
        var values = scope.value.split(';');
        var ranges = scope.range.split(';');
        var beforeInput = $('.before', $(element).parent());
        var afterInput = $('.after', $(element).parent());

        //beforeInput это первый input в который вводится minPrice
        //так же нужно описать и для второго инпута с чуть другими данными

        beforeInput.change(function () {
            var after = parseInt(afterInput.val());
            var before = parseInt(beforeInput.val());
            if (before < parseInt(values[0])) {
                before = values[0];
            }
            if (before > parseInt(values[1])) {
                before = values[1];
            }
            if (before > after) {
                before = after;
            }
            $(element).ionRangeSlider("update", {
                from: before
            });
        });

        afterInput.change(function () {
            var after = parseInt(afterInput.val());
            var before = parseInt(beforeInput.val());
            if (after > parseInt(values[1])) {
                after = values[1];
            }
            if (after < parseInt(values[0])) {
                after = values[0];
            }
            if (after < before) {
                after = before;
            }
            $(element).ionRangeSlider("update", {
                to: after
            });
        });

        //UI FUNCTIONS
        TIMEOUT.get(self)(() => {
            $(element).ionRangeSlider({
                min: +values[0],
                max: +values[1],
                type: "double",
                postfix: " " + scope.postfix,
                step: 1,
                force_edges: true,
                from: +ranges[0],
                to: +ranges[1],
                onFinish: function (a) {
                    applyFilter(a);
                },
                onStart: function (a) {
                    applyFilter(a, 'start');
                }
            });

            CACHESERVICE.get(self).components.push({
                element: element,
                slider: $(element).data("ionRangeSlider"),
                type: 'slider',
                typeOfBuilding: scope.typeOfBuilding,
                propertyMin: scope.filterField + '_min',
                propertyMax: scope.filterField + '_max',
                filterField: scope.filterField,
                beforeInput: beforeInput,
                afterInput: afterInput
            });
        });

        //FILTER FUNCTIONS
        function applyFilter(a, state) {
            beforeInput.val(a.from);
            afterInput.val(a.to);

            var data = {};
            data[scope.filterField + '_min'] = a.from;
            data[scope.filterField + '_max'] = a.to;

            DATASERVICE.get(self).updateBuildingFilter(scope.typeOfBuilding, data,  state);
        }
    }
}
