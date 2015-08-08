define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'jquery.fancybox'
], function ($, _, Backbone, templating) {
    'use strict';


    return Backbone.View.extend({
        "initialize": function (opts) {
            _.extend(this, _.pick(opts, ['user']));

            if (_.isString(this.template)) {
                this.template = templating.get(this.template);
            }

            this.modelBinder = new Backbone.ModelBinder();
        },

        "popup": function () {
            $.fancybox({
                "href": this.elPopup,
                "afterShow": _.bind(function () {
                    this.setElement(this.elPopup);
                    this.render();
                }, this)
            });
        },


        "initialLanguage": function(){
            var view =this;
            _.each(window.$langs, function (lang) {
                view.model.get('translations').findLocale(lang);
            });
        },


        "destroy": function () {
            $.fancybox.close();
            this.undelegateEvents();
            this.stopListening();
        }
    });
});