define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faqQuestion',
    './faqCategoryCollection',
    'backbone/modelbinder'
], function ($, _, Backbone, templating, FaqQuestion, FaqCategoryCollection) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/Faq/askQuestion.twig';

    var View = Backbone.View.extend({
        "template": templating.get(viewId),


        initialize: function () {
            this.model = new FaqQuestion();
            this.modelBinder = new Backbone.ModelBinder();
            this.model.set('errors',null);
            this.model.on('change:errors', this.render,this);
        },

        "events": {
            "click .save-question": "saveQuestion"
        },

        "saveQuestion": function (e) {
            e.preventDefault();
            this.model.save({},{
                success: function(model, response){
                    if(response.errors){
                        _.each(response.errors, function(error){
                            alert(error);
                        });
                    }

                }
            });
        },

        render: function () {
            this.$el.html(this.template({
                "model":      this.model,
                "categories": this.categories
            }));

            this.modelBinder.bind(this.model, this.el);
        },
    });

    return View;
});