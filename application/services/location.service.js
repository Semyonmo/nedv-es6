const LOCATION = new WeakMap();
const VIEWCONFIG = new WeakMap();
var self;

export class LocationService {

    /*@ngInject*/
    constructor($location, appViewConfig) {
        //inject private
        LOCATION.set(this, $location);
        VIEWCONFIG.set(this, appViewConfig);

        self = this;
    }

    set(data) {
        LOCATION.get(self).search(data);
    }

    get() {
        var search = LOCATION.get(self).search();

        search.view = search.view || VIEWCONFIG.get(self).view;
        search.type = search.type || VIEWCONFIG.get(self).building;
        search.subtype = search.subtype || VIEWCONFIG.get(self).subtype;
        search.sort = search.sort || VIEWCONFIG.get(self).sortvalue;
        search.direction = search.direction || VIEWCONFIG.get(self).direction;
        search.city = search.city || VIEWCONFIG.get(self).city;

        return search;
    }
}

