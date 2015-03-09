const TIMEOUT = new WeakMap();
const INIT = new WeakMap();
const IMMOVABLESSERVICE = new WeakMap();
const VIEWCONFIG = new WeakMap();
const LOCATIONSERVICE = new WeakMap();
const CACHESERVICE = new WeakMap();
const FAVORITESERVICE = new WeakMap();
const ROOTSCOPE = new WeakMap();

var self = {};

export class DataService {
    /*@ngInject*/
    constructor($timeout, $rootScope, immovablesService, appViewConfig, locationService, cacheService, favoriteService) {
        //inject private
        TIMEOUT.set(this, $timeout);
        IMMOVABLESSERVICE.set(this, immovablesService);
        VIEWCONFIG.set(this, appViewConfig);
        CACHESERVICE.set(this, cacheService);
        ROOTSCOPE.set(this, $rootScope);
        LOCATIONSERVICE.set(this, locationService);
        FAVORITESERVICE.set(this, favoriteService);
        /**
         * Create Data Model instance
         * @type {DataService}
         */
        self = this;

        INIT.set(this, () => {
            var search = LOCATIONSERVICE.get(this).get();

            self.map = {};
            self.table = {};
            self.grid = {};

            self.tableHeaders = VIEWCONFIG.get(this).table.headers;
            self.gridSorts = VIEWCONFIG.get(this).sort.grid;
            self.sorts = VIEWCONFIG.get(this).sorts;
            self.views = VIEWCONFIG.get(this).views;
            self.buildings = VIEWCONFIG.get(this).buildings;
            self.transactions = VIEWCONFIG.get(this).transactions;
            /**
             * Set values from LOCATION and config file
             * @type {*|view|sample.view|.filter.view|$rootScope.globalFilter.view|WindowProxy}
             */
            self.view = search.view;
            self.building = search.type;

            self.filter = {
                'subtype': search.subtype,
                'sort': search.sort,
                'direction': search.direction,
                'view': self.view,
                'city': search.city
            };
        });

        INIT.get(this)();
    }

    /**
     * Change transation type
     * @param transactionType
     * @constructor
     */
    transactionType(transactionType) {
        $.each(self.transactions, function (name, transation) {
            if (transation.active == true && name == transactionType) {
                return false;
            }
            if (transactionType == transation.type) {
                transation.active = true;
                self.updateFilter('subtype', transation.type);
            } else {
                transation.active = false;
            }
        });

        ROOTSCOPE.get(this).$broadcast('transactionTypeUpdate', transactionType);
    }

    /**
     * Change type of displayed building
     * @param buildingType
     * @constructor
     */
    buildingType(buildingType) {
        $.each(self.buildings, function (name, type) {
            if (name == buildingType) {
                type.active = true;
                self.building = buildingType;

                var typeOfBuildingFilter = self.buildings[self.building].filter;

                ROOTSCOPE.get(self).$broadcast('filterUpdate', _.assign({}, typeOfBuildingFilter, self.filter));
            } else {
                type.active = false;
            }
        });

        ROOTSCOPE.get(this).$broadcast('buildingTypeUpdate', buildingType);
    }

    /**
     * Change type of view
     * @param viewType
     * @constructor
     */
    viewType(viewType) {
        $.each(self.views, function (name, view) {
            if (view.active == true && name == viewType) {
                return false;
            }
            if (name == viewType) {
                view.active = true;
                self.view = name;
            } else {
                view.active = false;
            }
        });

        if (viewType == 'map') {
            ROOTSCOPE.get(self).$broadcast('showMap');
        } else {
            ROOTSCOPE.get(self).$broadcast('hideMap');
        }

        self.updateFilter('view', viewType);
        ROOTSCOPE.get(self).$broadcast('viewTypeUpdate', viewType);
    }

    /**
     * Get data from service
     * @param key
     * @returns {*}
     * @constructor
     */
    getData(key) {
        return self[key];
    }

    /**
     * Set data to service
     * @param key
     * @param value
     */
    setData(key, value) {
        self[key] = value;
    }

    /**
     * Update building search filter
     * @param building
     * @param key
     * @param value
     * @param state
     * @returns {boolean}
     * @constructor
     */
    updateBuildingFilter(building, data, state = "stop") {
        if (state === "start")
            return false;

        _.assign(self.buildings[building].filter, data);

        if (self.building === building) {
            self.updateFilter();
        }
    }


    /**
     * Update all values in building filet
     * @param building
     * @param data
     * @returns {boolean}
     */
    updateBuildingFilterGlobal(building, data) {
        if(building == null) return false;

        self.buildings[building].filter = data;
        self.updateFilter();
    }

    /**
     * Update search global filter
     * @param key
     * @param value
     * @constructor
     */
    updateFilter(key = null, value = null) {
        if (key != null || value != null) self.filter[key] = value;

        var filter =
            _.assign(
                {},
                self.buildings[self.building].filter,
                self.filter);

        ROOTSCOPE.get(this).$broadcast('filterUpdate', filter);
    }

    /**
     * sort data in model
     * @param params
     * @constructor
     */
    sort(params = {}) {
        params.page = params.page || '1';
        params.direction = params.direction || 'asc';
        params.sort = params.sort || 'cost';

        var direction = self.sorts[params.sort].direction;

        $.each(self.sorts, function (key) {
            self.sorts[key].direction = params.direction == 'asc' ? 'asc' : 'desc';
            if (params.sort == key) {
                self.sorts[key].direction = params.direction == 'asc' ? 'desc' : 'asc';
            }
        });

        self.updateFilter('sort', params.sort);
        self.updateFilter('direction', params.direction);
    }

    isFavorite(uid) {
        return FAVORITESERVICE.get(self).isFavorite(uid);
    }

    updateFavoriteCounter() {
        FAVORITESERVICE.get(self).updateCounter();
    }

    /**
     * Load data from IMMOVABLESSERVICE
     */
    loadData() {
        ROOTSCOPE.get(self).infoText = "Идёт загрузка";

        TIMEOUT.get(this).cancel(CACHESERVICE.get(this).timeout.get('loadData'));

        CACHESERVICE.get(this).timeout.set('loadData', TIMEOUT.get(this)(() => {
            IMMOVABLESSERVICE
                .get(self)
                .get(LOCATIONSERVICE.get(self).get())
                .then(data => {
                    self.applyData(data);
                    if (data.view === 'map')  ROOTSCOPE.get(self).$broadcast('updateMap', data);
                    NProgress.done();
                    console.log(`loading items count: ${data.items.length}`);
                });
        }, 0));
    }

    /**
     * Apply data to model
     * @param data
     */
    applyData(data) {
        console.log(`loading item type: ${data.view}`);
        self[data.view].items = data.items;
        self[data.view].pages = data.pages;
        self.tableHeaders = data.tableHeaders || self.tableHeaders;
        self.gridSorts = data.gridSorts || self.gridSorts;

        ROOTSCOPE.get(self).infoText = "Нет подходящих вариантов";
    }
}