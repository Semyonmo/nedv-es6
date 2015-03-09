const HTTP = new WeakMap();
const Q = new WeakMap();
const CACHESERVICE = new WeakMap();
const LOCATIONSERVICE = new WeakMap();
var self;

export class ImmovablesService {

    /*@ngInject*/
    constructor($http, $q, cacheService, locationService) {
        //inject private
        HTTP.set(this, $http);
        LOCATIONSERVICE.set(this, locationService);
        Q.set(this, $q);
        CACHESERVICE.set(this, cacheService);

        self = this;
    }

    /**
     * Get data from server with query content curent url location data
     * @returns {*}
     */
    get(search = {}) {
        var cachedData = self.getFromCache(search);

        if(cachedData != null) {
            var deferred = Q.get(self).defer();
            deferred.resolve(cachedData);
            return deferred.promise;
        } else {
            /**
             * Get data from server
             */
            return HTTP
                .get(self)
                ({
                    method: 'get',
                    url: '/site/search',
                    params: search
                })
                .then(result => {
                    let sample = {
                        "pages": result.data.paginate || [],
                        "items": result.data.items || [],
                        "tableHeaders": result.data.table_fields,
                        "gridSorts": result.data.grid_sorts,
                        "view": result.data.view || "list"
                    };

                    let key = JSON.stringify(search);
                    CACHESERVICE.get(self).immovables.set(key, sample);

                    /**
                     * Return format data
                     */
                    return sample;
                });
        }
    }

    /**
     * Get data from cache
     * @returns {*}
     */
    getFromCache(search) {
        let key = JSON.stringify(search);
        return CACHESERVICE.get(self).immovables.get(key);
    }
}

