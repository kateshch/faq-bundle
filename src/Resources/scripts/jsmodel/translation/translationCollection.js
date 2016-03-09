define([
    'lodash',
    'backbone',
    './translation',
    'util/basemodel',
], function (_, Backbone, TranslationModel, BaseModle) {
    'use strict';

    var languages = window.$langs;
    //TODO: все гавно
    var Model = Backbone.Collection.extend({
        "model": TranslationModel,
        "initialize": function () {
            var fillLanguages = _.bind(function (rawLangs) {
                var newTranslations = [];
                _.each(languages, _.bind(function (language, el) {
                    var old = this.find(function (obj) {
                        return obj.get('locale') === el;
                    });

                    if (!old) {
                        var translation = new TranslationModel({
                            "locale": el
                        });

                        if (rawLangs && rawLangs.length) {
                            var rawLang = _.find(rawLangs, function (lang) {
                                return lang.get('locale') === el;
                            });
                            if (rawLang) {
                                _.each(rawLang.attributes, function (obj, key) {
                                    translation.set(key, obj);
                                });
                            }
                        }
                        newTranslations.push(translation);
                    } else {
                        newTranslations.push(old);
                    }
                }, this));

                this.reset(newTranslations);
            }, this);

            fillLanguages();

            this.spikeMe = function () {
                var rawLangs = this.models;
                fillLanguages(rawLangs);
            };

            this.on('remove', this.spikeMe);

            this.on('change', this.spikeMe);
        },

    });

    var oldTrigger = Backbone.Model.prototype.trigger;
    var newTrigger = function (name) {
        var len = name.length;
        if (!len || this instanceof Model) {
            return oldTrigger.apply(this, arguments);
        }
        if (len) {
            var args = arguments;//slice relational:change:FIELD
            if (args && args[2] && args[2] instanceof Model) {
                args[2].spikeMe();
            }
        }
        var res = oldTrigger.apply(this, arguments),
            field = name.match(/relational:change:([^:]+)$/);
        if (field && field.length === 2 && field[1]) {
            field = this.get(field[1]);
            if (field instanceof Model) {
                field.spikeMe();
            }
        }
        return res;
    };
    Backbone.Model.prototype.trigger = newTrigger;


    return Model;
});
