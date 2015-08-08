define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'router',
    './listQuestionView',
    './listCategoriesView',
], function ($, _, Backbone, templating, Routing, ListQuestionView, ListCategoriesView) {
    'use strict';

    var View = Backbone.View.extend({
        template: '@KateshchFaq/Widgets/Admin/indexView.twig',

        initialize: function () {
            this.template = templating.get(this.template);
            this.listQuestionView = new ListQuestionView();
            this.listCategoriesView = new ListCategoriesView();
        },


        render: function () {
            this.$el.html(this.template());
            this.listCategoriesView.setElement(this.$('.list-categories'));
            this.listQuestionView.setElement(this.$('.list-questions'));
            this.listCategoriesView.render();
            this.listQuestionView.render();
            this.delegateEvents();
            return this;
        }
    });

    return View;
});
