define([
    'backbone',
    'router',
    '../util/basemodel',
    './faqCategory',
    '../translation/translation',
    '../translation/translationCollection',
    './file',
], function (Backbone, Routing, BaseModel, CategoryModel, TranslationModel, TranslationCollection, FileModel) {
    'use strict';

    var Model = BaseModel.extend({
        "defaults": function () {
            return {
                "translations": new TranslationCollection(),
            };
        },
        "url": function () {
            if (this.isNew()) {
                return Routing.generate('faq_new_question');
            }
        },
        "relations": [
            {
                "type": Backbone.HasOne,
                "key": 'category',
                "relatedModel": CategoryModel,
            },
            {
                "type": Backbone.HasOne,
                "key": 'file',
                "relatedModel": FileModel,
            },
            {
                "type": Backbone.HasMany,
                "key": 'translations',
                "relatedModel": TranslationModel,
                "collectionType": TranslationCollection
            }
        ],
    });

    return Model;
});
