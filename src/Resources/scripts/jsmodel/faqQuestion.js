define([
    'backbone',
    'routing',
    './faqAnswer',
    './faqCategory'
], function (Backbone, Routing, AnswerModel, CategoryModel) {
    'use strict';


    var Model = Backbone.Model.extend({
        "defaults": {
            "translation":     [],
        },

        "relations": [
            {
                "type":              Backbone.HasOne,
                "key":               'answers',
                "relatedModel":      AnswerModel,
            },
            {
                "type":         Backbone.HasOne,
                "key":          'category',
                "relatedModel": CategoryModel,
            }
        ],

    });

    return Model;
});