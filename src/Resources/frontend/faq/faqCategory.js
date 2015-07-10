define([
    'backbone',
    '../util/basemodel',
    '../translation/translation',
    '../translation/translationCollection',
    './faqQuestion',
    './faqQuestionCollection'
], function (Backbone, BaseModel, TrModel, TrCollection, FaqModel, FaqCollection) {
    'use strict';


    var Model = BaseModel.extend({
        "defaults": function () {
            return {
                "translations": new TrCollection(),
            };
        },

        "relations": [
            {
                "type": Backbone.HasMany,
                "key": 'translations',
                "relatedModel": TrModel,
                "collectionType": TrCollection,
            },
            {
                "type": Backbone.HasMany,
                "key": 'questions',
                "relatedModel": FaqModel,
                "collectionType": FaqCollection,
            },
            {
                "type": Backbone.HasMany,
                "key": 'activeQuestions',
                "relatedModel": FaqModel,
                "collectionType": FaqCollection,
            }
        ],
    });

    return Model;
});
