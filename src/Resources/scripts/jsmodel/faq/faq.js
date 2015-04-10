define([
    'backbone',
    'routing'
], function (Backbone, Routing) {
    'use strict';

    var Model = Backbone.Model.extend({
        "url":      Routing.generate('faq_question_save'),
    });

    return Model;
});