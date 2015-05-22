define([
    'backbone',
    './faqQuestion',
    'routing'
], function (Backbone, FaqQuestion, Routing) {
    'use strict';

    var Model = Backbone.Collection.extend({
        "model": FaqQuestion,
        "url": Routing.generate('faq_questions')
    });

    return Model;

});