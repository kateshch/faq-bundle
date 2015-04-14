define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'routing',
    './faqCategoryCollection',
    './editCategoryView',
    './faqCategory',
], function ($, _, Backbone, templating,Routing, FaqCategoriesCollection,EditCategoryView, FaqCategory) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/listCategories.twig';

    var View = Backbone.View.extend({
        template: templating.get(viewId),

        initialize: function () {
            var collection = new FaqCategoriesCollection();
            collection.fetch();
            this.model = collection;
            this.model.on('sync', this.render, this);
        },

        "events": {
            "click .add": 'newQuest',
            "click .edit": 'editQuest',
            "click .remove": 'removeQuest'
        },

        "newQuest": function (e) {
            e.preventDefault();
            var model = new FaqCategory();
            model.fetch({
                success: function () {
                    this.newQuestionView = new EditCategoryView(
                        {
                            model: new FaqCategory(),
                            el:    this.$el.find('.new-category')
                        });
                    this.newQuestionView.render();
                }.bind(this)
            });

        },

        "editQuest": function (e) {
            e.preventDefault();
            var obj = this.$(e.currentTarget),
                index = obj.data('ordinal');
            var model = this.model.at(index);
            this.editQuestionView = new EditCategoryView(
                {
                    model: model,
                    el:    this.$el.find('.new-category')
                });
            this.editQuestionView.render();

        },

        "removeQuest": function (e) {
            e.preventDefault();
            var obj = this.$(e.currentTarget),
                id = obj.data('id');
            $.ajax({
                type:'put',
                url: Routing.generate('faq_delete_category',{"category": id}),
                success:_.bind(function () {
                    this.model.fetch();
                }, this)
            });
        },



        render: function () {
            if (this.model) {
                this.$el.html(this.template({
                    model: this.model
                }));
            }
        },
    });

    return View;
});