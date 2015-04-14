requirejs([
    'jquery',
    'lodash',
    'kateshch-faq/listQuestionView',
    'kateshch-faq/listCategoriesView',
    'templating',
    'domReady!',
], function ($, _, ListQuestionView, ListCategoriesView, templating ) {
    'use strict';


    var cont = $('.question-list');


    var view = new ListQuestionView({
        "el":    cont,
    });

    view.render();


    var conta = $('.category-list');


    var viewCa = new ListCategoriesView({
        "el":    conta,
    });

    viewCa.render();


});