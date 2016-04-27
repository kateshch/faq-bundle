define([
  'backbone',
  'routing',
  'kateshch-faq/model/faqAnswer'
], function (Backbone, Routing, FaqAnswer) {
  'use strict';

  return Backbone.Collection.extend({

    "url": Routing.generate("faq_bundle.save_answer"),
    "model": FaqAnswer
  });
});