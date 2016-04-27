define([
  'backbone',
  'routing',
  'util/basemodel',
  'kateshch-faq/model/faqAnswer',
  'kateshch-faq/model/translation',
  'kateshch-faq/model/translationCollection'
], function (Backbone, Routing, BaseModel, AnswerModel, Translation, TranslationCollection) {
  'use strict';

  return BaseModel.extend({

    "relations": [
      {
        "type": Backbone.HasOne,
        "key": 'answer',
        "relatedModel": AnswerModel
      },
      {
        "type": Backbone.HasMany,
        "key": 'translations',
        "relatedModel": Translation,
        "collectionType": TranslationCollection
      }
    ],

    "initialize": function () {
      this.set('answer', new AnswerModel());
    },

    "url": function () {
      return this.isNew() ?
        Routing.generate('faq_bundle.question_api') :
      Routing.generate('faq_bundle.question_api') + '/' + this.get('id');
    }

  });
});