define([
    'backbone',
    'util/basemodel',
    'kateshch-faq/translation/translation',
    'kateshch-faq/translation/translationCollection',
    './faqQuestion',
    './faqQuestionCollection',
    'router'
], function (Backbone, BaseModel,TrModel,TrCollection, FaqModel, FaqCollection, Routing) {
    'use strict';


    var Model = BaseModel.extend({

        "defaults":  {
            "translations": new TrCollection(),
        },

        "relations": [
            {
                "type":           Backbone.HasMany,
                "key":            'translations',
                "relatedModel":   TrModel,
                "collectionType": TrCollection,
            },
        ],

        "url":       function () {
            if (this.isNew()) {
                return Routing.generate('faq_category_api');
            } else {
                return Routing.generate('faq_category_api') + '/' + (this.id || '');
            }
        },
    });

    return Model;
});