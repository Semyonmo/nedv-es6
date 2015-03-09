export default {
    "filter": {
        'subtype': 'buy',
        'sort': 'cost',
        'direction': 'asc'
    },
    "views": {
        'map': {
            text: 'Карта',
            value: 'map',
            active: false
        },
        'table': {
            text: 'Список',
            value: 'table',
            active: false
        },
        'grid': {
            text: 'Плитка',
            value: 'grid',
            active: false
        }
    },
    "transactions": {
        'buy': {
            name: 'Купить',
            type: 'buy',
            active: true
        },
        'rent': {
            name: 'Снять',
            type: 'rent',
            active: false
        }
    },
    "buildings": {
        'new': {
            active: true,
            filter: {
                'type': 'new'
            }
        },
        'flat': {
            active: false,
            filter: {
                'type': 'flat'
            }
        },
        'house': {
            active: false,
            filter: {
                'type': 'house'
            }
        },
        'commercial': {
            active: false,
            filter: {
                'type': 'commercial'
            }
        },
        'land': {
            active: false,
            filter: {
                'type': 'land'
            }
        }
    },
    "sort": {
        "table": {
            'rooms': {
                name: 'Количеству комнат',
                value: 'rooms',
                direction: 'asc'
            },
            'floor': {
                name: 'Этажу',
                value: 'floor',
                direction: 'asc'
            },
            'square': {
                name: 'Площади',
                value: 'square',
                direction: 'asc'
            },
            'cost': {
                name: 'Цене',
                value: 'cost',
                direction: 'asc'
            },
            'square_land': {
                value: 'square_land',
                direction: 'asc'
            },
            'top_floor': {
                value: 'top_floor',
                direction: 'asc'
            }
        },
        "grid": [
            {
                name: 'Количеству комнат',
                value: 'rooms'
            },
            {
                name: 'Этажу',
                value: 'floor'
            },
            {
                name: 'Площади',
                value: 'square'
            },
            {
                name: 'Цене',
                value: 'cost'
            }
        ]
    },
    "sorts" : {
        'rooms': {
            name: 'Количеству комнат',
            value: 'rooms',
            direction: 'asc'
        },
        'floor': {
            name: 'Этажу',
            value: 'floor',
            direction: 'asc'
        },
        'square': {
            name: 'Площади',
            value: 'square',
            direction: 'asc'
        },
        'cost': {
            name: 'Цене',
            value: 'cost',
            direction: 'asc'
        },
        'square_land': {
            value: 'square_land',
            direction: 'asc'
        },
        'top_floor': {
            value: 'top_floor',
            direction: 'asc'
        }
    },
    "table": {
        "headers": [
            {
                name: 'Фото',
                class: 'search__table-line-box-img',
                sort: false
            },
            {
                name: 'Комнат',
                class: '',
                sort: true,
                sortField: 'rooms'
            },
            {
                name: 'Адрес',
                class: 'search__table-line-box-address',
                sort: false
            },
            {
                name: 'Этаж',
                additional: 'Материал',
                class: 'search__table-line-box-floor',
                sort: true,
                sortField: 'floor'
            },
            {
                name: 'Площадь',
                class: '',
                sort: true,
                sortField: 'square'
            },
            {
                name: 'Тип жилья',
                additional: 'Год сдачи',
                class: 'search__table-line-box-type',
                sort: false
            },
            {
                name: 'Цена, р.',
                class: 'search__table-line-box-cost',
                additional: 'Цена за м<sup>2</sup>',
                sort: true,
                sortField: 'cost'
            }
        ]
    },
    'subtype': 'buy',
    'sortvalue': 'cost',
    'direction': 'asc',
    'view': 'grid',
    'building': 'new'
}