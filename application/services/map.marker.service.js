const MAPPOPUPSERVICE = new WeakMap();
var self;

export class MapMarkerService {

    /*@ngInject*/
    constructor(mapPopupService) {
        //inject private
        MAPPOPUPSERVICE.set(this, mapPopupService);

        self = this;
    }

    specialMarker(data) {
        var specialMarkerIcon = DG.icon({
            iconUrl: '/img/icon-map-special.png',
            iconRetinaUrl: '/img/icon-map-special@2x.png',
            iconSize: [38, 65],
            iconAnchor: [19, 65],
            shadowUrl: '/img/icon-map-special-shadow.png',
            shadowRetinaUrl: '/img/icon-map-special-shadow@2x.png',
            shadowSize: [53, 26],
            shadowAnchor: [3, 23]
        });

        var marker = new PruneCluster.Marker(data.lat, data.long, {
            icon: specialMarkerIcon
        });

        MAPPOPUPSERVICE.get(self).createPopup(marker, data);

        return marker;
    }

    defaultMarker(data) {
        var markerIcon = DG.icon({
            iconUrl: '/img/icon-map.png',
            iconRetinaUrl: '/img/icon-map@2x.png',
            iconSize: [29, 50],
            iconAnchor: [15, 50],
            shadowUrl: '/img/icon-map-shadow.png',
            shadowRetinaUrl: '/img/icon-map-shadow@2x.png',
            shadowSize: [40, 19],
            shadowAnchor: [3, 18]
        });

        var marker = new PruneCluster.Marker(data.lat, data.long, {
            icon: markerIcon
        });


        MAPPOPUPSERVICE.get(self).createPopup(marker, data);

        return marker;
    }

    createMarker(data) {
        var marker;
        if (data.special === false) {
            marker = self.defaultMarker(data);
            marker.category = 0;
            return marker;
        } else {
            marker = self.specialMarker(data);
            marker.category = 1;
            return marker;
        }
    }
}