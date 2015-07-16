define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faqCategoryCollection',
    'backbone.modelbinder'
], function ($, _, Backbone, templating, FaqCategoryCollection) {
    'use strict';

    var View = Backbone.View.extend({
        "template": '@KateshchFaq/Widgets/Admin/editQuestion.twig',

        initialize: function () {
            this.template = templating.get(this.template);

            if (!this.categories) {
                this.categories = new FaqCategoryCollection();
            }

            this.modelBinder = new Backbone.ModelBinder();
            this.categories.fetch();
            this.categories.on('sync', this.render, this);
        },

        "events": {
            "click .save-question": "saveQuestion"
        },

        "saveQuestion": function (e) {
            e.preventDefault();
            this.model.save();
            this.trigger('newModel');
        },

        render: function () {
            this.$el.html(this.template({
                "model": this.model,
                "categories": this.categories,
                "langs": window.$langs
            }));
            _.each(this.$('.tabs'), function(obj){
                $(obj).tabslet();
            });
            this.delegateEvents();

            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

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
    });

    return View;
});
