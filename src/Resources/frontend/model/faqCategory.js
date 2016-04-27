define([
  'backbone',
  'routing',
  'util/basemodel',
  'kateshch-faq/model/faqQuestion',
  'kateshch-faq/model/faqQuestionCollection',
  'kateshch-faq/model/admin/faqQuestion',
  'kateshch-faq/model/admin/faqQuestionCollection',
  'kateshch-faq/model/translation',
  'kateshch-faq/model/translationCollection'
], function (Backbone, Routing, BaseModel, QuestionModel, QuestionCollection, AdminQuestionModel, AdminQuestionCollection, Translation, TranslationCollection) {
  'use strict';

  return BaseModel.extend({

    idAttribute: 'class',
    relations: [
      {
        "type": Backbone.HasMany,
        "key": 'activeQuestions',
        "relatedModel": QuestionModel,
        "collectionType": QuestionCollection
      }, {
        "type": Backbone.HasMany,
        "key": 'questions',
        "relatedModel": AdminQuestionModel,
        "collectionType": AdminQuestionCollection
      }, {
        "type": Backbone.HasMany,
        "key": 'translations',
        "relatedModel": Translation,
        "collectionType": TranslationCollection
      }
    ],

    "url": function () {
      return Routing.generate('faq_bundle.category', {
        category: this.get('class')
      });
    }

  });
});