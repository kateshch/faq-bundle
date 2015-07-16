define([
    'lodash',
    'backbone',
    './translation',
    'router',
], function (_, Backbone, TrModel) {
    'use strict';


    var TrCollection = Backbone.Collection.extend({
        'model': TrModel,

        "initialize": function () {

            var old = this;
            var newTranslations = [];
            _.each(window.$langs, _.bind(function (language, el) {
                var old = this.find(function (obj) {
                    return obj.get('locale') === language;
                });
                if (!old) {
                    var translation = new TrModel({
                        "locale": language
                    });
                    newTranslations.push(translation);
                } else {
                    newTranslations.push(old);
                }
            },this));
            this.reset(newTranslations);

        },

        "findIndex": function(lang){
            var model = this.find(function (obj) {
                return obj.get('locale') === lang;
            });
            return this.indexOf(model);
        }
    });




    return TrCollection;
});
