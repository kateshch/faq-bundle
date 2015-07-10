define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
], function ($, _, Backbone, templating) {
    'use strict';

    var View = Backbone.View.extend({
        template: '@KateshchFaq/Widgets/Faq/listCategories.twig',

        initialize: function () {
            this.template = templating.get(this.template);
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
