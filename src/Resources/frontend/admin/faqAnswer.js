define([
    'backbone',
    '../util/basemodel',
    '../translation/translation',
    '../translation/translationCollection',
    'router',
], function (Backbone, BaseModel, TrModel, TrCollection) {
    'use strict';


    var Model = BaseModel.extend({
        "defaults": function () {
            return {
                "translations": new TrCollection(),
            };
        },

        "relations": [
            {
                "type": Backbone.HasMany,
                "key": 'translations',
                "relatedModel": TrModel,
                "collectionType": TrCollection
            }
        ],
    });

    return Model;
});
