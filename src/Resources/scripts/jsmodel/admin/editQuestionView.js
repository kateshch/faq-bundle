define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faqCategoryCollection',
    'backbone/modelbinder'
], function ($, _, Backbone, templating, FaqCategoryCollection) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/Admin/editQuestion.twig';

    var langs = window.$langs,
        langDefault = window.$lang_default;

    var View = Backbone.View.extend({
        "template": templating.get(viewId),
        "langsSelected": langDefault,

        "categories": new FaqCategoryCollection(),

        initialize: function () {
            this.modelBinder = new Backbone.ModelBinder();
            this.categories.fetch();
            this.categories.on('sync', this.render, this);
        },

        "events": {
            "click .save-question": "saveQuestion",
            "click .tabset a": 'selectTab',
        },

        "saveQuestion": function (e) {
            e.preventDefault();
            this.model.save(null, {
                "success": _.bind(function(){
                    this.trigger('newModel');
                }, this)
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

            this.delegateEvents();

            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');


            this.$('.not-cyrillic').on('keyup', function (event) {
                var reg = /[а-яА-ЯёЁ]/g;
                if (this.value.search(reg) !=  -1) {
                    this.value  =  this.value.replace(reg, '');
                    alert('Enter only Latin characters!');
                }
            });

            _.extend(bindings.category, {
                "converter": _.bind(function (direction, value) {
                    return direction === 'ModelToView' ?
                        (value ? value.id : null) :
                        this.categories.get(value);
                }, this),
            });

            this.modelBinder.bind(this.model, this.el, bindings);
            return this;
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