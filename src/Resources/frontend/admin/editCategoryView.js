define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './popUpView',
    'backbone.modelbinder',
    'jquery.tabslet'
], function ($, _, Backbone, templating, PopUpView) {
    'use strict';

    var View = PopUpView.extend({
            "template": '@KateshchFaq/Widgets/Admin/editCategory.twig',
            "elPopup":  '#popup-edit-category',

            initialize: function () {
                this.template = templating.get(this.template);
                this.modelBinder = new Backbone.ModelBinder();
                if (this.model) {
                    this.modelbackup = this.model.toJSON();
                }
            },

            "events": {
                "click .save-question": "saveCategory",
                "click .cancel":        function (e) {
                    e.preventDefault();
                    this.model = this.modelbackup;
                    this.trigger('stopEdit');
                    this.destroy();
                },
            },

            "saveCategory": function (e) {
                e.preventDefault();
                this.model.save(null, {
                    success: function () {
                        this.trigger('stopEdit');
                        this.destroy();
                    }.bind(this)
                });

            },

            render: function () {
                this.initialLanguage;
                this.$el.html(this.template({
                    "model": this.model,
                    "langs": window.$langs
                }));
                _.each(this.$('.tabs'), function (obj) {
                    $(obj).tabslet();
                });

                this.delegateEvents();

                this.modelBinder.bind(this.model, this.el);

                return this;
            }
            ,
        })
        ;

    return View;
})
;
