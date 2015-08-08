define([
    'backbone',
    'router',
    'util/basemodel',
    './faqAnswer',
    './faqCategory',
    'kateshch-faq/translation/translation',
    'kateshch-faq/translation/translationCollection',
], function (Backbone, Routing, BaseModel, AnswerModel, CategoryModel, TrModel, TrCollection) {
    'use strict';

    var Model = BaseModel.extend({

        "defaults": function () {
            return {
                "translations": new TrCollection(),
            };
        },

        "relations": [
            {
                "type": Backbone.HasOne,
                "key": 'answer',
                "relatedModel": AnswerModel,
            },
            {
                "type": Backbone.HasOne,
                "key": 'category',
                "relatedModel": CategoryModel,
            },
            {
                "type": Backbone.HasMany,
                "key": 'translations',
                "relatedModel": TrModel,
                "collectionType": TrCollection
            }
        ],

        "initialize": function (options) {
            if (!this.get('answer')) {
                this.set('answer', new AnswerModel());
            }
            if (!this.get('category')) {
                this.set('category', new CategoryModel());
            }
            if (!this.get('translations')) {
                this.set('translations', new TrCollection());
            }
        },

        "url": function () {
            if (this.isNew()) {
                return Routing.generate('faq_question_api');
            } else {
                return Routing.generate('faq_question_api') + '/' + (this.id || '');
            }
        },
    });

    return Model;
});
