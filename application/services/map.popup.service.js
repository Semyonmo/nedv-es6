var self;

export class MapPopupService {

    /*@ngInject*/
    constructor($rootScope, $timeout) {
        //inject private

        self = this;
    }

    createPopup(marker, data) {
        var img = '';

        var icons = "";

        if (data.rassrochka === '1') icons += '<a href="/" class="search__list-item-icons-icon search__map-list-item-icon prosent popup-rasr"></a> ';
        if (data.mortagage === '1') icons += '<a href="/" class="search__list-item-icons-icon search__map-list-item-icon credit popup-ipo"></a> ';
        if (data.matcapital === '1') icons += '<a href="/" class="search__list-item-icons-icon search__map-list-item-icon baby popup-mother"></a> ';

        var html =
            '<div class=""> '
            + icons +
            '</div>' +
            '<a href="' + data.uri + '" class="balloon-title">' + data.title + '</a>' +
            '<p class=""><span class="balloon-field-name">Адрес: </span>' +
            '<span class="balloon-field-value">' + data.address + ' </span></p>' +
            '<p class=""><span class="balloon-field-name">Этаж: </span>' +
            '<span class="balloon-field-value"> ' + data.floor + '/' + data.top_floor + ' </span></p>' +
            '<p class=""><span class="balloon-field-name">Площадь: </span>' +
            '<span class="balloon-field-value"> ' + data.square + ' м<sup>2</sup></span></p>' +
            '<p class="balloon-cost">' + data.cost + ' руб.</p>';

        if (data.special) img = '<img class="img img-responsive balloon-img" src="' + data.image + '" alt=""/>';

//        img += '<div class="search__list-item-icons"> <a href="/" class="search__list-item-icons-icon prosent popup-rasr"></a> <a href="/" class="search__list-item-icons-icon credit popup-ipo"></a> <a href="/" class="search__list-item-icons-icon baby popup-mother"></a> </div>';

        var content = img + html;

        marker.data.popup = content;
    }

    createClusterMarker(cluster) {
        var c = 'search__map-bullet-',
            html = "",
            size = {
                height: 0,
                width: 0
            },
            anchor = {
                top: 0,
                left: 0
            };

        if(cluster.stats[1] === 0) {
            c += "normal";
            size = {
                height: 50,
                width:28
            };
            anchor = {
                top: 50,
                left: 14
            };
            html = "<div><span>" + cluster.stats[0] + "</span></div>";
        }
        //if special + nomal
        else if(cluster.stats[1] > 0 && cluster.stats[0] > 0) {
            c += "small";
            size = {
                height: 64,
                width: 38
            };
            anchor = {
                top: 64,
                left: 19
            };
            html = "<div>" +
            "<span class='special'>" + cluster.stats[1] + "</span>" +
            "<span class='normal'>" + cluster.stats[0] + "</span>" +
            "</div>";
        }
        //if only special
        else if(cluster.stats[1] > 0) {
            c += "special";
            size = {
                height: 64,
                width: 38
            };
            anchor = {
                top: 64,
                left: 19
            };
            html = "<div>" +
            "<span>" + cluster.stats[1] + "</span>" +
            "</div>";
        }

        return new L.DivIcon({
            html: html,
            className: c,
            iconSize: L.point(size.width, size.height),
            iconAnchor: L.point(anchor.left, anchor.top)
        });
    }
}