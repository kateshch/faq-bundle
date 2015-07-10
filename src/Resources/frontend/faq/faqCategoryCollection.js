define([
    'backbone',
    './faqCategory',
    'router'
], function (Backbone, FaqCategory, Routing) {
    'use strict';

    var Model = Backbone.Collection.extend({
        "model": FaqCategory,
        "url": Routing.generate('faq_categories'),
    });

    return Model;

});
