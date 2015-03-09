const TIMEOUT = new WeakMap();
const CACHESERVICE = new WeakMap();
var self;

export class ComponentService {
    /*@ngInject*/
    constructor($timeout, cacheService) {
        //inject private
        TIMEOUT.set(this, $timeout);
        CACHESERVICE.set(this, cacheService);

        self = this;
    }

    update(search) {
        var components = CACHESERVICE.get(self).components;

        /**
         * Timeout fix for wait loading
         */
        TIMEOUT.get(self)(() => {
            $('.ui-accordion-header').each(function (index, item) {
                var $item = $(item);

                if ($item.data('building-type') === search.type) {
                    //check for active state
                    if (!$item.hasClass('ui-accordion-header-active')) {
                        $item.click();
                    }
                }
            });


            $(components).each(function (index, item) {
                if (search.type == item.typeOfBuilding) {
                    if (item.type == 'slider') {
                        var from = search[item.propertyMin];
                        var to = search[item.propertyMax];

                        if (from && to) {
                            TIMEOUT.get(self)(() => {
                                item.slider.update({
                                    to: +to,
                                    from: +from
                                });
                            }, 0);
                        }
                    }

                    if (item.type == 'selector') {
                        var values;

                        if (search[item.filterField] != null && search[item.filterField] != "")
                            values = search[item.filterField].split(',');

                        $('option', item.element).prop('selected', false);

                        if (values != null) {
                            $.each(values, function (i, name) {
                                $('option[value=' + name + ']', item.element).prop('selected', true);
                            });
                        } else {
                            $('option[value="any"]', item.element).prop('selected', true);
                        }

                        $(item.element).trigger("chosen:updated");
                    }

                    if (item.type == 'toggle') {

                        var items = $('.search__toggle-element-item', item.element);
                        var query = search[item.filterField] ? search[item.filterField].split(',') : null;

                        if (query === null) {
                            items.removeClass('active');
                        }

                        if (items != null && query != null) {
                            $.each(items, function (index, element) {
                                $(element).removeClass('active');
                                $.each(query, function (index, item) {
                                    var localQuery = $(element).attr('value').split(',');
                                    if (localQuery != null && localQuery.length > 0) {
                                        $.each(localQuery, function (index, localItem) {
                                            if (localItem == item) $(element).addClass('active');
                                        });
                                    }
                                });
                            });
                        }
                    }
                }
            });
        }, 0);
    }
}