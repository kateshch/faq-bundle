define([
  'backbone',
  'routing',
  'kateshch-faq/model/faqCategory'
], function (Backbone, Routing, FaqCategory) {
  'use strict';

  return Backbone.Collection.extend({

    "url": Routing.generate("faq_bundle.categories"),
    "model": FaqCategory
  });
});