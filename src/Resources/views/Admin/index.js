requirejs([
    'jquery',
    'lodash',
    'backbone',
    'router',
    'kateshch-faq/admin/indexView',
    'twig',
    'domReady!',
], function ($, _, Backbone, Routing, IndexView, Twig) {
    'use strict';


    var cont = $('.content');

    Twig.extendFunction('path', function () {
        var args = Array.prototype.slice.call(arguments, 0);
        _.each(args, function (arg) {
            if (_.isObject(arg)) {
                delete arg._keys;
            }
        });
        return Routing.generate.apply(Routing, args);
    });

    var view = new IndexView({el: cont});
    view.render();


});
