define([
  'backbone',
  'routing',
  'kateshch-faq/model/faqQuestion'
], function (Backbone, Routing, FaqQuestion) {
  'use strict';

  return Backbone.Collection.extend({
    "model": FaqQuestion
  });
});