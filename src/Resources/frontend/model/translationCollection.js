define([
  'backbone',
  'routing',
  'kateshch-faq/model/translation'
], function (Backbone, Routing, Translation) {
  'use strict';

  return Backbone.Collection.extend({
    "model": Translation,

    "findLocale": function (locale, createNew) {
      var index = _.find(this.toArray(), function (model) {
        return model.get('locale') === locale;
      });
      if (index !== undefined) {
        return this.indexOf(index);
      }
      if (createNew === undefined || createNew === true) {
        this.add(new Translation({locale: locale}));
        return this.findLocale(locale, false);
      }
    }
  });
});