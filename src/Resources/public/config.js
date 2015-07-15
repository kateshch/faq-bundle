(function () {
    'use strict';

    requirejs.config({
        'waitSeconds': 30,
        'urlArgs':     'bust=' + window.$assets_version,
        "baseUrl":     '/assets/js',

        "map": {
            "*":           {
                "twig":            "config/twig",
            },
            "config/twig": {
                "twig": "twig",
            },
        },

        "shim": {
            "jquery.elastic": ["jquery"]
        },

        "config": {},
    });
    requirejs([
        'jquery',
        'domReady!'
    ], function ($, document) {

        $(document).ready(function () {
            $(document).find('html').removeClass('no-js');
        });
    });
}());