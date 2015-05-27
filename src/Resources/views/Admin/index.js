requirejs([
    'jquery',
    'lodash',
    'backbone',
    'routing',
    'kateshch-faq/admin/indexView',
    'domReady!',
], function ($, _, Backbone,Routing, IndexView) {
    'use strict';


    var cont = $('.content');


    var view = new IndexView({el: cont});
    view.render();





});