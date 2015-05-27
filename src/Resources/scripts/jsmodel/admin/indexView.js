define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'routing',
    './listQuestionView',
    './listCategoriesView',
], function ($, _, Backbone, templating, Routing, ListQuestionView, ListCategoriesView) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/Admin/indexView.twig';

    var View = Backbone.View.extend({
        template: templating.get(viewId),

        initialize: function () {
            this.listQuestionView = new ListQuestionView();
            this.listCategoriesView = new ListCategoriesView();
            this.model.on('sync', this.render, this);
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