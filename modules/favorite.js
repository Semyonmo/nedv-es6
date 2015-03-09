var _this;

export class favorite {
    static init() {
        _this = this;

        /**
         * Set settings to cookie plugin
         * @type {boolean}
         */
        $.cookie.json = true;

        /**
         * one time update on load for static pages
         */
        _this.update();

        /**
         * Set global as to module
         * @type {update}
         */
        window.favorite = _this.update;
    }

    /**
     * Update favorite for new elements
     */
    static update(element) {
        /**
         * Bind event on all favorite elements
         */

        $(element || '.item-favorite').click(e => {
            var $element = $(e.currentTarget),
                id = $element.data('id'),
                value = $element.hasClass('active');

            _this.changeFavoriteStatus(id, value, $element);
        });
    }

    /**
     * Set favorite item on server
     * @param id
     * @param value
     * @returns {*}
     */
    static changeFavoriteStatus(id, value, $element) {
        //change value
        value = !value;
        //log
        console.log(`set favorite id: ${id}, value: ${value}`);
        //update favorite status anyware
        _this.setFavoriteToBrowser(id, value, $element);
        _this.setFavoriteToCookie(id, value);
        _this.setFavoriteToServer(id, value);
        _this.updateCounter();
    }

    /**
     * Set favorite status in browser
     * @param id
     * @param value
     */
    static setFavoriteToBrowser(id, value, $element, $counterElement) {
        if (value) {
            $element.addClass('active');
        } else {
            $element.removeClass('active');
        }
    }

    /**
     * Save favorite item to cookie
     * @param id
     * @param value
     */
    static setFavoriteToCookie(id, value) {
        //get favorite from cookie or crate new cookie object
        var favorite = $.cookie('favorite') || {};
        //update favorite status
        favorite[id] = value;
        //update cookie
        $.cookie('favorite', favorite);
    }

    /**
     * Update favorite status on server
     * @param id
     * @param value
     */
    static setFavoriteToServer(id, value) {
        $.ajax({
            url: "/site/favorite/",
            dataType: "json",
            data: {
                id: id,
                value: value,
                format: 'json'
            }
        });
    }


    /**
     * Update favorite counter status
     */
    static updateCounter() {
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

        $.get("http://domscan.ru/site/favorite", function (result) {
            var resultCount = result.count || false;

            if(resultCount) {
                $('.favorite-counter').text(result.count);
            } else {
                $('.favorite-counter').text(countFavoriteCookie);
            }
        });
    }
}