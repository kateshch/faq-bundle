define([
  'jquery',
  'lodash',
  'routing',
  'backbone',
  'templating',
  'kateshch-faq/model/admin/faqCategoryCollection',
  'kateshch-faq/admin/editCategory'
], function ($, _, Routing, Backbone, Templating, CategoryCollection, EditCategoryView) {
  'use strict';

  return Backbone.View.extend({

    "template": '@KateshchFaq/admin/index.twig',

    "render": function () {
      this.$el.html(this.template({
        categories: this.collection.toArray()
      }));

      if (this.editView) {
        this.editView.setElement(this.$('.edit-box'));
        this.editView.render();
      }
      this.delegateEvents();
      return this;
    },

    "initialize": function (options) {
      this.template = Templating.get(this.template);
      this.collection = new CategoryCollection();
      $.when(this.collection.fetch()).then(function () {
        this.render()
      }.bind(this));
    },


    "events": {
      "click .add-category": "addCategory",
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
    },

    "addCategory": function (event) {
      event.stopPropagation();
      this.editView = new EditCategoryView({
        'type': 'new'
      });
      this.render();
    }

  })
});

