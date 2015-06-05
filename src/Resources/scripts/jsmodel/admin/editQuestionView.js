define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faqCategoryCollection',
    'backbone.modelbinder'
], function ($, _, Backbone, templating, FaqCategoryCollection) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/Admin/editQuestion.twig';

    var View = Backbone.View.extend({
        "template": templating.get(viewId),

        "categories": new FaqCategoryCollection(),

        initialize: function () {
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
                "model":      this.model,
                "categories": this.categories
            }));

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