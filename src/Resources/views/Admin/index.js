requirejs([
    'jquery',
    'lodash',
    'backbone',
    'routing',
    'templating',
    'kateshch-faq/listQuestionView',
    'domReady!',
], function ($, _, ListQuestionView ) {
    'use strict';


    var cont = $('.question-list');


    var view = new ListQuestionView({
        "el":    cont,
    });

    view.render();

});