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
                    var view  = new EditCategoryView(
                        {
                            model: model,
                        });
                    view.popup();
                    view.on('stopEdit', function () {
                        console.log(this.model);
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
            var view = new EditCategoryView(
                {
                    model: model,
                });
            view.on('stopEdit', function () {
                this.model.fetch();
            }, this);
            view.popup();
        },

        "removeQuest": function (e) {
            e.preventDefault();
            var obj = this.$(e.currentTarget),
                index = obj.data('ordinal');
            var model = this.model.at(index);
            model.destroy();
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
