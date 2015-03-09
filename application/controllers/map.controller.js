const INIT = new WeakMap();
const ROOTSCOPE = new WeakMap();
const TIMEOUT = new WeakMap();
const MAPSERVICE = new WeakMap();

/**
 * ViewModal
 */
var vm = {};

export class MapController {
    /*@ngInject*/
    constructor($rootScope, $timeout,mapService) {
        ROOTSCOPE.set(this, $rootScope);
        TIMEOUT.set(this, $timeout);
        MAPSERVICE.set(this, mapService);
        /**
         * ViewModal init
         * @type {MapController}
         */
        vm = this;

        INIT.set(this, () => {
            /**
             * Events list
             */
            ROOTSCOPE.get(this).$on('updateMap', (event, data) => {
                console.log('map: try update');
                vm.showMap().then(() => {
                    console.log('map: updating');
                    vm.updateMap(data);
                }).then(() => {
                    vm.resizeMap();
                }).catch(error => {
                    throw (new Error(error));
                });
                ROOTSCOPE.get(this).$applyAsync();
            });

            ROOTSCOPE.get(this).$on('showMap', (event, data) => {
                vm.showMap();
                ROOTSCOPE.get(this).$applyAsync();
            });

            ROOTSCOPE.get(this).$on('hideMap', (event, data) => {
                vm.hideMap();
                ROOTSCOPE.get(this).$applyAsync();
            });
        });
        INIT.get(this)();
    }

    hideMap() {
        MAPSERVICE.get(vm).hideMap();
    }

    showMap() {
        return vm.loadMap().then((resolve) => {
            console.log(resolve);

            MAPSERVICE.get(vm).showMap();
        });
    }

    updateMap(data) {
        MAPSERVICE.get(vm).updateMap(data);
    }

    resizeMap() {
        MAPSERVICE.get(vm).resizeMap();
    }

    loadMap() {
        return new Promise(resolve => {
            function action() {
                if(MAPSERVICE.get(vm).isLoad) {
                    resolve('map: is load');
                } else {
                    //LOAD MAP
                    console.log('map: try load');
                    MAPSERVICE.get(vm).loadMap();
                    TIMEOUT.get(vm)(() => { action(); }, 50);
                }
            }
            action();
        });
    }
}