define([
    'backbone',
    'routing',
    '../../util/basemodel',
    './faqCategory',
    '../translation/translation',
    '../translation/translationCollection',
    './file',
], function (Backbone, Routing,BaseModel, CategoryModel,TrModel,TrCollection,FileModel) {
    'use strict';

    var Model = BaseModel.extend({

        "defaults":  {
            "translations": new TrCollection(),
        },

        "relations": [
            {
                "type":         Backbone.HasOne,
                "key":          'category',
                "relatedModel": CategoryModel,
            },
            {
                "type":         Backbone.HasOne,
                "key":          'file',
                "relatedModel": FileModel,
            },
            {
                "type":         Backbone.HasMany,
                "key":          'translations',
                "relatedModel": TrModel,
                "collectionType": TrCollection
            }
        ],


        "url":       function () {
            if (this.isNew()) {
                return Routing.generate('faq_new_question');
            }
        },
    });

    return Model;
});