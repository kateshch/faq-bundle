define([
    'lodash',
    'backbone',
    './translation',
    'util/basemodel',
], function (_, Backbone, TranslationModel, BaseModle) {
    'use strict';

    var Model = Backbone.Collection.extend({
        "model": TranslationModel,

        findLocale: function (locale, createNew) {
            var index = _.find(this.toArray(), function (model) {
                return model.get('locale') === locale;
            });
            if (index !== undefined) {
                return _.indexOf(this.toArray(),index);
            }
            if (createNew === undefined || createNew === true) {
                this.add(new TranslationModel({locale: locale}));
                return this.findLocale(locale, false);
            }
        }
    });

    return Model;
});
