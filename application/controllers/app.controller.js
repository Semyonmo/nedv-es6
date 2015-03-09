const TIMEOUT = new WeakMap();
const INIT = new WeakMap();
const DATASERVICE = new WeakMap();
const VIEWCONFIG = new WeakMap();
const ROOTSCOPE = new WeakMap();
const SCE = new WeakMap();
const COMPONENTSERVICE = new WeakMap();
const LOCATIONSERVICE = new WeakMap();

/**
 * ViewModal
 */
var vm = {};

export class AppController {
    /*@ngInject*/
    constructor($timeout, $sce, $rootScope, appViewConfig, dataService, componentService, locationService) {
        TIMEOUT.set(this, $timeout);
        DATASERVICE.set(this, dataService);
        VIEWCONFIG.set(this, appViewConfig);
        COMPONENTSERVICE.set(this, componentService);
        LOCATIONSERVICE.set(this, locationService);
        ROOTSCOPE.set(this, $rootScope);
        SCE.set(this, $sce);
        /**
         * ViewModal init
         * @type {MapController}
         */
        vm = this;

        INIT.set(this, () => {
            /**
             * Get data from DataService
             */
            vm.table = DATASERVICE.get(this).getData('table');
            vm.tableHeaders = DATASERVICE.get(this).getData('tableHeaders');
            vm.gridSorts = DATASERVICE.get(this).getData('gridSorts');
            vm.grid = DATASERVICE.get(this).getData('grid');
            vm.map = DATASERVICE.get(this).getData('map');
            vm.transactions = DATASERVICE.get(this).getData('transactions');
            vm.buildings = DATASERVICE.get(this).getData('buildings');
            vm.building = DATASERVICE.get(this).getData('building');
            vm.views = DATASERVICE.get(this).getData('views');
            vm.view = DATASERVICE.get(this).getData('view');
            vm.sorts = DATASERVICE.get(this).getData('sorts');

            /**
             * Events list
             */
            ROOTSCOPE.get(this).$on('filterUpdate', (event, data) => {
                LOCATIONSERVICE.get(this).set(data);
                ROOTSCOPE.get(this).$applyAsync();
            });

            ROOTSCOPE.get(this).$on('transactionTypeUpdate', (event, data) => {
                vm.transactions = DATASERVICE.get(this).getData('transactions');
                ROOTSCOPE.get(this).$applyAsync();
            });

            ROOTSCOPE.get(this).$on('buildingTypeUpdate', (event, data) => {
                vm.buildings = DATASERVICE.get(this).getData('buildings');
                vm.building = DATASERVICE.get(this).getData('building');
                ROOTSCOPE.get(this).$applyAsync();
            });

            ROOTSCOPE.get(this).$on('viewTypeUpdate', (event, data) => {
                vm.views = DATASERVICE.get(this).getData('views');
                vm.view = DATASERVICE.get(this).getData('view');
                vm[vm.view] = DATASERVICE.get(this).getData(vm.view);
                vm.tableHeaders = DATASERVICE.get(this).getData('tableHeaders');
                vm.gridSorts = DATASERVICE.get(this).getData('gridSorts');


                ROOTSCOPE.get(this).$applyAsync();
            });

            /**
             * Set vm update on location cahnge event
             */
            window.onhashchange = () => {
                vm.update();
            };

            vm.update();
        });
        INIT.get(this)();
    }

    trustDangerousSnippet(snippet) {
        return SCE.get(this).trustAsHtml(snippet);
    }

    selectViewType(type) {
        DATASERVICE.get(this).viewType(type);
    }

    selectTransactionType(type) {
        DATASERVICE.get(this).transactionType(type);
    }

    selectBuildingType(type) {
        DATASERVICE.get(this).buildingType(type);
    }

    sort(params) {
        DATASERVICE.get(this).sort(params);
    }

    goPage(value) {
        if (value != "...") {
            var data = {};
            data['page'] = value;
            DATASERVICE.get(vm).updateBuildingFilter(vm.building, data);
        }
    }

    goLink(value) {
        window.location.href = value;
    }

    isFavorite(uid) {
        return DATASERVICE.get(vm).isFavorite(uid);
    }

    update() {
        /**
         * Get curent url
         */
        var search = LOCATIONSERVICE.get(vm).get();

        DATASERVICE.get(vm).updateBuildingFilterGlobal(search.type, search);
        /**
         * Update viewModel sates with data taken in url
         */
        vm.sort({sort: search.sort, direction: search.direction});
        vm.selectViewType(search.view);
        vm.selectBuildingType(search.type);
        vm.selectTransactionType(search.subtype);

        DATASERVICE.get(vm).updateFavoriteCounter();
        /**
         * Update data in components
         */
        COMPONENTSERVICE.get(vm).update(search);
        console.log('update visual components finish');
        /**
         * Load
         */
        DATASERVICE.get(vm).loadData();
    }
}

