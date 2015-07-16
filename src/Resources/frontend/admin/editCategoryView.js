define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'backbone.modelbinder',
    'jquery.tabslet'
], function ($, _, Backbone, templating) {
    'use strict';

    var View = Backbone.View.extend({
        "template": '@KateshchFaq/Widgets/Admin/editCategory.twig',

        initialize: function () {
            this.template = templating.get(this.template);
            this.modelBinder = new Backbone.ModelBinder();
        },

        "events": {
            "click .save-question": "saveCategory"
        },

        "saveCategory": function (e) {
            e.preventDefault();
            this.model.save();
            this.trigger('newModel');
        },

        render: function () {
            this.$el.html(this.template({
                "model": this.model,
                "langs": window.$langs
            }));
            _.each(this.$('.tabs'), function(obj){
                $(obj).tabslet();
            });

            this.delegateEvents();

            this.modelBinder.bind(this.model, this.el);

            return this;
        },
    });

    return View;
});
