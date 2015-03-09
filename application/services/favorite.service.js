const HTTP = new WeakMap();
var self;

export class FavoriteService {

    /*@ngInject*/
    constructor($http) {
        //inject private
        HTTP.set(this, $http);

        self = this;
    }

    /**
     * Get data from server with query content curent url location data
     * @returns {*}
     */
    get() {
        return HTTP
            .get(self)
        ({
            url: '/site/favorite',
            method: 'get'
        })
            .then(result => {
                /**
                 * Return format data
                 */
                return {
                    count: result.count || false
                };
            });
    }

    isFavorite(uid) {
        let favoriteCookie = $.cookie('favorite') || {};
        return favoriteCookie[uid];
    }

    updateCounter() {
        let favoriteCookie = $.cookie('favorite') || {};
        let countFavoriteCookie = 0;

        if(typeof favoriteCookie === 'string') {
            favoriteCookie = JSON.parse(favoriteCookie);
        }

        _.forOwn(favoriteCookie, (value) => {
            if(value === true) {
                countFavoriteCookie++;
            }
        });



        self.get().then(result => {
           if(result.count !== false) {
               $('.favorite-counter').text(result.count);
           } else {
               $('.favorite-counter').text(countFavoriteCookie);
           }
        });
    }
}

