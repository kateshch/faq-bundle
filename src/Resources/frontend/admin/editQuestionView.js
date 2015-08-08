define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'kateshch-faq/admin/models/faqCategoryCollection',
    './popUpView',
    'backbone.modelbinder',
    'jquery.tabslet'
], function ($, _, Backbone, templating, FaqCategoryCollection, PopUpView) {
    'use strict';

    var View = PopUpView.extend({
        "template": '@KateshchFaq/Widgets/Admin/editQuestion.twig',
        "elPopup": '#popup-edit-question',

        initialize: function () {
            this.template = templating.get(this.template);

            if (!this.categories) {
                this.categories = new FaqCategoryCollection();
            }

            if(this.model){
                this.modelBackup = this.model.toJSON();
            }

            this.modelBinder = new Backbone.ModelBinder();
            this.categories.fetch();
            this.categories.on('sync', this.render, this);
        },

        "events": {
            "click .save-question": "saveQuestion",
            "click .cancel": function (e) {
                e.preventDefault();
                this.model = this.modelBackup;
                this.trigger('stopEdit');
                this.destroy();
            },
        },

        "saveQuestion": function (e) {
            e.preventDefault();
            this.model.save(null, {
                success: function () {
                    this.trigger('stopEdit');
                    this.destroy();
                }.bind(this)
            });
        },

        render: function () {
            this.initialLanguage();
            this.$el.html(this.template({
                "model":      this.model,
                "categories": this.categories,
                "langs":      window.$langs
            }));
            _.each(this.$('.tabs'), function (obj) {
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
