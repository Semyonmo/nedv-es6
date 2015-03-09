const DATASERVICE = new WeakMap();
const CACHESERVICE = new WeakMap();
var self = {};

export class SelectorDirective {
    /*@ngInject*/
    constructor(dataService, cacheService) {
        DATASERVICE.set(this, dataService);
        CACHESERVICE.set(this, cacheService);
        this.scope = {
            filterField: '@',
            typeOfBuilding: '@'
        };

        self = this;
    }

    // optional compile function
    //compile(tElement) {
    //    tElement.css('position', 'absolute');
    //}

    // optional link function
    link(scope, element) {
        CACHESERVICE.get(self).components.push({
            element: element,
            type: 'selector',
            typeOfBuilding: scope.typeOfBuilding,
            filterField: scope.filterField
        });

        $(element).chosen({width: '100%', disable_search_threshold: 10});

        $(element).on('change', function (evt, params) {
            if (params.selected == 'any') {
                selectAny();
            } else {
                $('option[value="any"]', element).prop('selected', false);
                $(element).trigger('chosen:updated');
            }
            if (params.deselected == 'any') {
                selectAny();
            } else {
                if ($("option:selected", element).map(function () {
                        return this.value
                    }).get().join(",") == '') {
                    selectAny();
                }
            }

            function selectAny() {
                $('option', element).prop('selected', false);
                $('option[value="any"]', element).prop('selected', true);
                $(element).trigger('chosen:updated');
            }

            applyFilter(evt, params);
        });
        //FILTER FUNCTIONS
        function applyFilter() {
            var data = {};
            data[scope.filterField] =  $("option:selected", element).map(function () {
                return this.value
            }).get().join(",");
            DATASERVICE.get(self).updateBuildingFilter(scope.typeOfBuilding, data);
        }
    }
}
