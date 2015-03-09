const DATASERVICE = new WeakMap();
const CACHESERVICE = new WeakMap();
const TIMEOUT = new WeakMap();
var self = {};

export class ToggleDirective {
    /*@ngInject*/
    constructor($timeout ,dataService, cacheService) {
        DATASERVICE.set(this, dataService);
        CACHESERVICE.set(this, cacheService);
        TIMEOUT.set(this, $timeout);
        this.scope = {
            values: '@',
            filterField: '@',
            typeOfBuilding: '@'
        };

        self = this;
    }

    // optional link function
    link(scope, element) {
        CACHESERVICE.get(self).components.push({
            element: element,
            type: 'toggle',
            typeOfBuilding: scope.typeOfBuilding,
            filterField: scope.filterField
        });

        var values = scope.values.split(';');

        $.each(values, function (index, value) {
            var text = value.split(':')[0];
            var queryText = value.split(':')[1] || text;
            var active = value.split(':')[2] ? true : false;

            var item = $('<span></span>')
                .addClass('search__toggle-element-item')
                .attr('value', queryText);

            item.on('click', function () {
                if (item.hasClass('active')) {
                    item.removeClass('active');
                } else {
                    item.addClass('active');
                }
                applyFilter();
            });

            if (active) item.addClass('active');
            var itemText = $('<span></span>').addClass('search__toggle-element-item-text');

            itemText.append(text);
            item.append(itemText);
            element.append(item);
        });


        //FILTER FUNCTIONS
        function applyFilter(state) {
            var items = $('.search__toggle-element-item', element);
            var query = [];
            $.each(items, function (index, element) {
                if ($(element).hasClass('active'))
                    query.push($(element).attr('value'));
            });
            var data = {};
            data[scope.filterField] = query.toString();

            DATASERVICE.get(self).updateBuildingFilter(scope.typeOfBuilding, data, state);
        }

        TIMEOUT.get(self)(() => {
            applyFilter('start');
        }, 0);
    }
}
