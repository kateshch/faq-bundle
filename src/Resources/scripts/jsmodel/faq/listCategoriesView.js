define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'routing',
    './faqCategoryCollection',
    './faqCategory',
], function ($, _, Backbone, templating,Routing, FaqCategoriesCollection, FaqCategory) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/Faq/listCategories.twig';

    var View = Backbone.View.extend({
        template: templating.get(viewId),

        initialize: function () {
            this.model.on('sync', this.render, this);
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