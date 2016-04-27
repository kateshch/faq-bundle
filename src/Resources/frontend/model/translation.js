define([
  'backbone',
  'backbone.relational'
], function (Backbone) {
  'use strict';

  var Model = Backbone.RelationalModel.extend({
    defaults: {
      "locale": null
    }
  });

  return Model;
});