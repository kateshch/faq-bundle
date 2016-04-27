define([
  'jquery',
  'lodash',
  'routing',
  'backbone',
  'templating',
  'kateshch-faq/model/admin/faqCategoryCollection',
  'kateshch-faq/admin/editQuestion'
], function ($, _, Routing, Backbone, Templating, CategoryCollection, EditQuestionView) {
  'use strict';

  return Backbone.View.extend({

    "template": 'kateshch-faq/admin/listQuestions.twig',
    "render": function () {
      this.$el.html(this.template({
        questions: this.category.get('questions').toArray()
      }));
      this.delegateEvents();
      return this;
    },

    "initialize": function (options) {
      this.template = Templating.get(this.template);
      this.category = options.category;
    },


    "events": {
      "click .remove-question": function (event) {
        event.stopPropagation();
        var obj = $(event.currentTarget),
          modelClass = obj.data('id'),
          model = this.category.get('questions').findWhere({id: modelClass});
        this.category.get('questions').remove(model);
        model.destroy({
          success: function () {
            this.render();
          }
        });
      },
      "click .edit-question": function (event) {
        event.stopPropagation();
        var obj = $(event.currentTarget),
          modelId = obj.data('id'),
          model = this.category.get('questions').findWhere({id: modelId});
        this.editView = new EditQuestionView({category: this.category, model: model});
        this.editView.setElement(this.$('.container-edit'));
        this.editView.render();
      }
      ,
      "click .new-question": function (event) {
        event.stopPropagation();
        this.editView = new EditQuestionView({category: this.category});
        this.editView.setElement(this.$('.container-edit'));
        this.editView.render();
      }
    }

  })
});

