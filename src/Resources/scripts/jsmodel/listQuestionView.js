define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faqQuestionCollection',
], function ($, _, Backbone, templating, FaqQuestionColection) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/questionList.twig';

    var View = Backbone.view.extend({
        template: templating.get(viewId),

        initialize: function () {
            var collection = new FaqQuestionColection();
            collection.fetch();
            this.model = collection;
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