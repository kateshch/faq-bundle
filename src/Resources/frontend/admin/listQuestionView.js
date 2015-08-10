define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'router',
    'kateshch-faq/admin/models/faqQuestionCollection',
    './editQuestionView',
    'kateshch-faq/admin/models/faqQuestion',
], function ($, _, Backbone, templating, Routing, FaqQuestionCollection, EditQuestionView, FaqQuestion) {
    'use strict';

    var View = Backbone.View.extend({
        template: '@KateshchFaq/Widgets/Admin/listQuestions.twig',

        initialize: function () {
            this.template = templating.get(this.template);

            this.editQuestionView = [];
            var collection = new FaqQuestionCollection();
            collection.fetch();
            this.model = collection;

            this.model.on('sync', this.render, this);
        },

        "events": {
            "click .add-question":    'newQuest',
            "click .edit-question":   'editQuest',
            "click .remove-question": 'removeQuest'
        },

        "newQuest": function (e) {
            e.preventDefault();
            var model = new FaqQuestion(),
                that = this;
            model.fetch({
                success: function () {
                    var view = new EditQuestionView(
                        {
                            model: model,
                        });
                    view.popup();
                    view.on('stopEdit', function () {
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
            var view = new EditQuestionView(
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
                index = obj.data('ordinal'),
                view = this;
            var model = this.model.at(index);
            model.destroy(
                {
                    success: function () {
                        view.model.fetch();
                    }
                });
        },


        render: function () {
            this.$el.html(this.template({
                model: this.model
            }));
            this.delegateEvents();
            return this;
        }
    });

    return View;
});
