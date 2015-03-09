//load es6-7 features
require("babelify/polyfill");

/**
 * Angular UTILS
 */
import {register} from "./utils/registr";
/**
 * Angular MODULES
 */
import {ImmovablesService} from "./application/services/immovables.service";
import {CacheService} from './application/services/cache.service';
import AppViewConfig from "./application/config/app.view.config";
import {AppController} from "./application/controllers/app.controller";
import {SelectorDirective} from "./application/directives/selector.directive";
import {DataService} from "./application/services/data.service.js";
import {ComponentService} from "./application/services/component.service";
import {LocationService} from "./application/services/location.service";
import {FilterDirective} from "./application/directives/filter.directive";
import {SliderDirective} from "./application/directives/slider.directive";
import {ToggleDirective} from "./application/directives/toggle.directive";
import {MapController} from "./application/controllers/map.controller";
import {MapService} from "./application/services/map.service";
import {MapMarkerService} from "./application/services/map.marker.service";
import {MapPopupService} from "./application/services/map.popup.service";
import {cut} from "./application/filters/cut.filter.js";
import {FavoriteDirective} from './application/directives/favorite.directive.js';
import {PopupDirective} from './application/directives/popup.directive.js';
import {FavoriteService} from './application/services/favorite.service.js';

/**
 * Suite plugins and modules
 */
import {favorite} from "./modules/favorite.js";
import {gallery} from './modules/gallery.js';
import {menu} from './modules/app.menu.js';
import {background} from './modules/app.background.js';
import {popup} from './modules/popup.js';
import {modal} from './modules/modal.js';
import {header} from './modules/header.js';
import {citySelector} from './modules/selector.city.js';
import {selector} from './modules/selector.js';

var property = require('./property/propertyCtrl');
var onLoad = require('./load');

/**
 * Init suite plugins and modules
 * after page load
 */
$(() => {
    gallery.init();
    favorite.init();
    menu.init();
    background.init();
    popup.init();
    modal.init();
    header.init();
    citySelector.init();
    selector.init();

    onLoad();
});

angular
    .module('app', [
        'ngRoute'
    ]).constant('appViewConfig', AppViewConfig)
    .filter('cut', () => { return cut; });

register('app')
    .service('cacheService', CacheService)
    .service('immovablesService', ImmovablesService)
    .service('componentService', ComponentService)
    .service('favoriteService', FavoriteService)
    .service('locationService', LocationService)
    .service('dataService', DataService)
    .service('mapService', MapService)
    .service('mapPopupService', MapPopupService)
    .service('mapMarkerService', MapMarkerService)
    .directive('selector',SelectorDirective)
    .directive('filter',FilterDirective)
    .directive('slider',SliderDirective)
    .directive('toggle',ToggleDirective)
    .directive('popup', PopupDirective)
    .directive('favorite', FavoriteDirective)
    .controller('MapController', MapController)
    .controller('AppController', AppController);


angular.module('property', [
    property.name
]);


