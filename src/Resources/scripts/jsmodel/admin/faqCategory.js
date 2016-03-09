define([
    'backbone',
    '../../util/basemodel',
    './translation',
    './translationCollection',
    './faqQuestion',
    './faqQuestionCollection',
    'routing'
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