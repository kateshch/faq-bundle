define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'router',
    './faqCategoryCollection',
    './editCategoryView',
    './faqCategory',
], function ($, _, Backbone, templating, Routing, FaqCategoriesCollection, EditCategoryView, FaqCategory) {
    'use strict';

    var View = Backbone.View.extend({
        template: '@KateshchFaq/Widgets/Admin/listCategories.twig',

        initialize: function () {
            this.template = templating.get(this.template);

            var collection = new FaqCategoriesCollection();
            collection.fetch();
            this.model = collection;
            this.model.on('sync', this.render, this);
        },

        "events": {
            "click .add-category": 'newQuest',
            "click .edit-category": 'editQuest',
            "click .remove-category": 'removeQuest'
        },

        "newQuest": function (e) {
            e.preventDefault();
            var model = new FaqCategory();
            model.fetch({
                success: function () {
                    this.newCategoryView = new EditCategoryView(
                        {
                            model: new FaqCategory(),
                            el: this.$el.find('.new-category')
                        });
                    this.newCategoryView.render();
                    this.newCategoryView.on('newModel', function () {
                        this.model.fetch();
                    }, this);
                }.bind(this)
            });

        },

        "editQuest": function (e) {
            e.preventDefault();

            var obj = this.$(e.currentTarget),
                index = obj.data('ordinal');
            var model = this.model.at(index);
            this.editCategoryView = new EditCategoryView(
                {
                    model: model,
                    el: this.$el.find('.edit-category-' + index)
                });
            this.editCategoryView.render();

        },

        "removeQuest": function (e) {
            e.preventDefault();
            var obj = this.$(e.currentTarget),
                id = obj.data('id');
            $.ajax({
                type: 'put',
                url: Routing.generate('faq_delete_category', {"category": id}),
                success: _.bind(function () {
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
            this.delegateEvents();
            return this;
        },
    });

    return View;
});
