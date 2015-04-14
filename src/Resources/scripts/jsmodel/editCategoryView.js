define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'backbone/modelbinder'
], function ($, _, Backbone, templating) {
    'use strict';

    var viewId = '@KateshchFaq/Widgets/editCategory.twig';

    var View = Backbone.View.extend({
        "template": templating.get(viewId),


        initialize: function () {
            this.modelBinder = new Backbone.ModelBinder();
        },

        "events": {
            "click .save-question": "saveCategory"
        },

        "saveCategory": function (e) {
            e.preventDefault();
            this.model.save();
        },

        render: function () {
            this.$el.html(this.template({
                "model":      this.model,
            }));

            this.modelBinder.bind(this.model, this.el);
        },
    });

    return View;
});