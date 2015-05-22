define([
    'lodash',
    'backbone',
    './translation',
    'routing',
], function (_, Backbone, TrModel) {
    'use strict';


    var TrCollection = Backbone.Collection.extend({
        'model': TrModel,

        "initialize": function () {

            var old = this.find(function (obj) {
                return obj.get('locale') === 'en';
            });
            var newTranslations = [];
            if (!old) {
                var translation = new TrModel({
                    "locale": 'en'
                });
                newTranslations.push(translation);
            } else {
                newTranslations.push(old);
            }
            this.reset();
            this.add(newTranslations);

        },
    });


    return TrCollection;
});