const ROOTSCOPE = new WeakMap();
const TIMEOUT = new WeakMap();
const MAPMARKERSERVICE = new WeakMap();
const MAPPOPUPSERVICE = new WeakMap();
const LOCATIONSERVICE = new WeakMap();

var self;

export class MapService {

    /*@ngInject*/
    constructor($rootScope, $timeout, locationService ,mapPopupService, mapMarkerService) {
        //inject private
        ROOTSCOPE.set(this, $rootScope);
        TIMEOUT.set(this, $timeout);
        MAPMARKERSERVICE.set(this, mapMarkerService);
        MAPPOPUPSERVICE.set(this, mapPopupService);
        LOCATIONSERVICE.set(this, locationService);

        self = this;
        self.listOfApartment = {};
        self.isLoad = false;
    }

    updateMap(data) {
        if (!self.markers) {
            self.markers = new PruneClusterForLeaflet();

            self.markers.BuildLeafletClusterIcon = function (cluster) {
                return MAPPOPUPSERVICE.get(self).createClusterMarker(cluster);
            };

            self.markers.PrepareLeafletMarker = function (marker, data, category) {
                if (data.icon) {
                    if (typeof data.icon === 'function') {
                        marker.setIcon(data.icon(data, category));
                    } else {
                        marker.setIcon(data.icon);
                    }
                }

                if (data.popup) {
                    var content = typeof data.popup === 'function' ? data.popup(data, category) : data.popup;
                    if (marker.getPopup()) {
                        marker.setPopupContent(content, data.popupOptions);
                    } else {
                        marker.bindPopup(content, data.popupOptions)
                            .on('click', function (e) {
                                TIMEOUT.get(self)(function () {
                                    $('.balloon-title').click(function () {
                                        document.location.href = $(this).prop("href");
                                    });
                                }, 50);
                            });
                    }
                }
            };

            self.markers.spiderfier.Spiderfy = function (data) {
                var headerHtml =
                        '<div class="search__map-catalog-wrapper"> ' +
                        '<table class="search__map-catalog">' +
                        '<table class="search__map-catalog-header"> ' +
                        '<tr> ' +
                        '<th class="search__map-catalog-header-field"></th> ' +
                        '<th class="search__map-catalog-header-field address">Адресс</th> ' +
                        '<th class="search__map-catalog-header-field">Этаж</th> ' +
                        '<th class="search__map-catalog-header-field">Площадь</th> ' +
                        '<th class="search__map-catalog-header-field"> Цена, р. <br/> <span class="search__map-catalog-header-field-small"> Цена за м<sup>2</sup> </span> </th> ' +
                        '</tr>' +
                        '</table> ' +
                        '<div class="search__map-catalog-body-wrapper"> ' +
                        '<table class="search__map-catalog-body">',
                    footerHtml =
                        '</table> ' +
                        '</div>' +
                        '</table> ' +
                        '</div>',
                    itemsHtml = '';

                $.each(data.markers, function (index, item) {
                    var favorite = item.data.favorite ? "active" : "",
                        special = item.data.special ? "special" : "",
                        favoriteHtml = '<div class="' + favorite + ' search__map-catalog-item-favorite item-favorite popup-favorite" data-id="' + item.data.id + '" data-value="' + item.data.favorite + '"">',
                        specialHtml = '<tr class="search__map-catalog-row ' + special + '">',
                        icons = "";

                    if (item.data.rassrochka === '1') icons += '<a href="/" class="search__table-line-icons-icon prosent popup-rasr"></a> ';
                    if (item.data.matcapital === '1') icons += '<a href="/" class="search__table-line-icons-icon baby popup-mother"></a> ';
                    if (item.data.mortagage === '1') icons += '<a href="/" class="search__table-line-icons-icon credit popup-ipo"></a> </span>';

                    itemsHtml +=
                        specialHtml +
                        '<td class="search__map-catalog-item-favorite-call"> ' +
                        favoriteHtml +
                        '</div> ' +
                        '</td>' +
                        '<td class="search__map-catalog-item-address"> ' +
                        '<a class="search__map-catalog-item-address-link" href="' +
                        item.data.url +
                        '">' +
                        item.data.address +
                        '</a> ' +
                        '</td>' +
                        '<td class="search__map-catalog-item-floor"> ' +
                        item.data.floor + '/' +
                        item.data.top_floor +
                        '</td>' +
                        '<td class="search__map-catalog-item-area">' +
                        item.data.square +
                        ' м<sup>2</sup> </td>' +
                        '<td class="search__map-catalog-item-cost"> ' +
                        item.data.cost +
                        '<span class="search__table-line-icons"> ' +
                        icons +
                        '<span class="search__table-cell-cost-mini">~' + item.data.square_price + 'т.р. </span>' +
                        ' </td>' +
                        '</tr>';
                });


                var html = headerHtml + itemsHtml + footerHtml;

                var myIcon = new L.DivIcon({
                    html: html,
                    className: 'search__map-catalog-wrapper',
                    iconAnchor: L.point(235, 297)
                });
                self.markers.spiderfier.Unspiderfy();
                self.listOfApartment = L.marker([data.center.lat, data.center.lng], {
                    icon: myIcon
                }).addTo(self.map);

                (function () {
                    $(".search__map-catalog-body-wrapper").mCustomScrollbar({
                        scrollInertia: 0
                    });

                    $('.search__map-catalog-wrapper').click(function () {
                        return false;
                    }).bind('mousewheel DOMMouseScroll', function () {
                        return false;
                    });

                    var $cols = $('.search__map-catalog-row:first td', '.search__map-catalog-wrapper');
                    var $headers = $('.search__map-catalog-header-field', '.search__map-catalog-wrapper');

                    $.each($headers, function (index, item) {
                        var width = $($cols[index]).width();
                        $(item).width(width);
                    });
                })();

                //TIMEOUT.get(service)(function () {
                //    window.popup();
                //    window.favorite();
                //    $('.search__map-catalog-header-address, .search__map-catalog-item-address-link').click(function () {
                //        var href = $(this).attr('href');
                //        if (href) window.location.href = href;
                //    });
                //}, 50);
            };

            self.markers.spiderfier.Unspiderfy = function (data) {
                console.log('close map window');
                if (self.listOfApartment.removeFrom) self.listOfApartment.removeFrom(self.map);
            };
        }

        self.markers.RemoveMarkers();

        if (data.items) {
            $.each(data.items, function (index, value) {
                if (value.lat != 0 && value.long != 0) {

                    var marker = MAPMARKERSERVICE.get(self).createMarker(value);
                    //var marker = new PruneCluster.Marker(value.lat, value.long);

                    marker.data.title = value.title;
                    marker.data.url = value.uri;
                    marker.data.address = value.address;
                    marker.data.floor = value.floor;
                    marker.data.top_floor = value.top_floor;
                    marker.data.square = value.square;
                    marker.data.cost = value.cost;
                    marker.data.special = value.special;
                    marker.data.image = value.image;
                    marker.data.id = value.uid;
                    marker.data.favorite = value.favorite;
                    marker.data.square_price = value.square_price;
                    marker.data.rassrochka = value.rassrochka;
                    marker.data.matcapital = value.matcapital;
                    marker.data.mortagage = value.mortagage;

                    self.markers.RegisterMarker(marker);
                }
            });
        }
        self.map.removeLayer(self.markers);
        self.map.addLayer(self.markers);
    }

    //TODO:rename all
    loadMap() {
        DG.then(function () {
            console.log('map: plugin load');
            /**
             * Load plugin for clusterize objects on map
             */
            if (!self.isLoad) return DG.plugin("/bower_components/PruneCluster/dist/PruneCluster.js");
        }).then(function () {
            /**
             * Init 2GIS map
             */
            if (!self.isLoad) {
                self.map = DG.map('map', {
                    zoom: 13,
                    fullscreenControl: false,
                    zoomControl: false
                });
                console.log('map: load');
            }
        }).then(() => {
            self.isLoad = true;
        });
    }

    showMap() {
        if(LOCATIONSERVICE.get(self).get().view === 'map') {
            console.log('map: show');
            $('.map').css('display', 'block');
            $("#accordion-wrapper").height(window.innerHeight - 240);
        }
    }

    hideMap() {
        console.log('map: hide');
        $('.map').css('display', 'none');
        $("#accordion-wrapper").height('auto');
    }

    resizeMap() {
        try {
            var offset = $("#accordion").offset(),
                posX = offset.left + $("#accordion").width(),
                gBounds = self.markers.Cluster.ComputeGlobalBounds(),
                southWest = L.latLng(gBounds.minLat, gBounds.minLng),
                northEast = L.latLng(gBounds.maxLat, gBounds.maxLng),
                bounds = L.latLngBounds(southWest, northEast);

            self.map.invalidateSize();

            self.map.fitBounds(bounds, {
                paddingTopLeft: [posX + 10, 185],
                paddingBottomRight: [offset.left, 200]
            });

            $(".search__map-list-wrapper").css('margin-top', window.innerHeight - 358);
            $("#accordion-wrapper").height(window.innerHeight - 240);

        } catch (e) {
            throw(new Error(e));
        }
    }
}
