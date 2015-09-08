define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faqQuestion',
    'backbone.modelbinder'
], function ($, _, Backbone, templating, FaqQuestion) {
    'use strict';

    var View = Backbone.View.extend({
        "template": '@KateshchFaq/Widgets/Faq/askQuestion.twig',

        initialize: function () {
            this.template = templating.get(this.template);

            this.model = new FaqQuestion();
            this.modelBinder = new Backbone.ModelBinder();
            this.model.set('errors', null);
            this.model.on('change:errors', this.render, this);
            this.langIndex = this.model.get('translations').findLocale(window.$lang);
        },

        "events": {
            "click .save-question": "saveQuestion"
        },

        "saveQuestion": function (e) {
            e.preventDefault();
            this.model.save({}, {
                success: function (model, response) {
                    if (response.errors) {
                        _.each(response.errors, function (error) {
                            alert(error);
                        });
                    }

                }cd
            });
        },

        render: function () {
            this.$el.html(this.template({
                "model": this.model,
                "categories": this.categories,
                "lang": this.langIndex,
            }));

            this.modelBinder.bind(this.model, this.el);
        },
    });

    return View;
});
