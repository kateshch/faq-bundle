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

    idAttribute: 'id',
    "relations": [
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
      return this.isNew() ?
        Routing.generate('faq_bundle.category_api') :
      Routing.generate('faq_bundle.category_api') + '/' + this.get('id');
    }

  });

});