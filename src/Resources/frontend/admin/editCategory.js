define([
  'jquery',
  'lodash',
  'routing',
  'backbone',
  'templating',
  'kateshch-faq/model/admin/faqCategory',
  'backbone.modelbinder'
], function ($, _, Routing, Backbone, Templating, CategoryModel) {
  'use strict';

  return Backbone.View.extend({

    "template": '@KateshchFaq/admin/editCategory.twig',
    "render": function () {
      this.$el.html(this.template({
        model: this.model,
        languages: this.langs
      }));
      this.modelBinder.bind(this.model, this.el);
      this.delegateEvents();
      return this;
    },

    "initialize": function (options) {
      this.template = Templating.get(this.template);
      this.modelBinder = new Backbone.ModelBinder();
      if (options.type && options.type == 'new') {
        this.newAction()
      }
      else {
        this.editAction(options.model);
      }
    },

    newAction: function () {
      this.model = new CategoryModel();
      this.langs = [];
      _.each(window.$langs, function (lang) {
        this.langs[this.model.get('translations').findLocale(lang)] = lang;
      }, this);
    },

    "events": {
      "click .save-category": function (event) {
        event.preventDefault();
        this.model.save({}, {
          success: function () {
            alert('Категория успешно сохранена!');
          }
        });

      },
      "click .remove-category": function (event) {
        event.stopPropagation();
        var obj = $(event.currentTarget),
          modelClass = obj.data('id'),
          model = this.collection.findWhere({id: modelClass});
        this.collection.remove(model);
        model.destroy({
          success: function () {
            this.render();
          }
        });
      }
    }

  })
});

