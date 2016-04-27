define([
  'backbone',
  'routing',
  'util/basemodel',
  'kateshch-faq/model/faqQuestion',
  'kateshch-faq/model/translation',
  'kateshch-faq/model/translationCollection'
], function (Backbone, Routing, BaseModel, QuestionModel, Translation, TranslationCollection) {
  'use strict';

  return BaseModel.extend({

    "relations": [{
      "type": Backbone.HasOne,
      "key": 'question',
      "relatedModel": QuestionModel
    },
      {
        "type": Backbone.HasMany,
        "key": 'translations',
        "relatedModel": Translation,
        "collectionType": TranslationCollection
      }
    ]

  });
});