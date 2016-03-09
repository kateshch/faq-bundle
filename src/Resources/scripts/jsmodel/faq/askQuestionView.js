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
    var langs = window.$langs,
        langDefault = window.$lang_default;

    var View = Backbone.View.extend({
        "template": templating.get(viewId),
        "langsSelected": langDefault,


        initialize: function () {
            this.model = new FaqQuestion();
            this.modelBinder = new Backbone.ModelBinder();
            this.model.set('errors',null);
            this.model.on('change:errors', this.render,this);
        },

        "events": {
            "click .save-question": "saveQuestion",
            "click .tabset a": 'selectTab',
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
                "categories": this.categories,
                "langs":         langs,
                "langsDef":      langDefault,
                "langsSelected": this.langsSelected
            }));

            this.$('.not-cyrillic').on('keyup', function (event) {
                var reg = /[а-яА-ЯёЁ]/g;
                if (this.value.search(reg) !=  -1) {
                    this.value  =  this.value.replace(reg, '');
                    alert('Enter only Latin characters!');
                }
            });

            this.modelBinder.bind(this.model, this.el);
        },

        "selectTab": function (e) {
            e.preventDefault();
            var obj = $(e.currentTarget);

            this.langsSelected = obj.data('lang');
            this.render();
        },
    });

    return View;
});