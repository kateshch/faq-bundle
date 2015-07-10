define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'router',
    './faqQuestionCollection',
    './editQuestionView',
    './faqQuestion',
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
            "click .add-question": 'newQuest',
            "click .edit-question": 'editQuest',
            "click .remove-question": 'removeQuest'
        },

        "newQuest": function (e) {
            e.preventDefault();
            var model = new FaqQuestion(),
                that = this;
            model.fetch({
                success: function () {
                    this.newQuestionView = new EditQuestionView(
                        {
                            model: new FaqQuestion(),
                            el: this.$el.find('.new-question')
                        });
                    this.newQuestionView.render();
                    this.newQuestionView.on('newModel', function () {
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
            this.editQuestionView[index] = new EditQuestionView(
                {
                    model: model,
                    el: this.$el.find('.edit-question-' + index)
                });
            this.editQuestionView[index].render();

        },

        "removeQuest": function (e) {
            e.preventDefault();
            var obj = this.$(e.currentTarget),
                id = obj.data('id');
            $.ajax({
                type: 'put',
                url: Routing.generate('faq_question_delete', {"question": id}),
                success: _.bind(function () {
                    this.model.fetch();
                }, this)
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
