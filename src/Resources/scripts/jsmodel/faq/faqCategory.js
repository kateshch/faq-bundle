define([
    'backbone',
    '../../util/basemodel',
    '../translation/translation',
    '../translation/translationCollection',
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
            {
                "type":           Backbone.HasMany,
                "key":            'questions',
                "relatedModel":   FaqModel,
                "collectionType": FaqCollection,
            }
        ],
    });

    return Model;
});