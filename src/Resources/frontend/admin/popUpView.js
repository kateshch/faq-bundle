define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    'jquery.fancybox',
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
                "width": 600,
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
                if(view.model.get('answer')){
                    view.model.get('answer').get('translations').findLocale(lang);
                }
            });
        },


        "destroy": function () {
            $.fancybox.close();
            this.undelegateEvents();
            this.stopListening();
        }
    });
});