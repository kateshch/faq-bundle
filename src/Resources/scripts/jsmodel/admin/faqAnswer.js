define([
    'backbone',
    '../../util/basemodel',
    '../translation/translation',
    '../translation/translationCollection',
    'routing',
], function (Backbone, BaseModel,TrModel,TrCollection) {
    'use strict';

    
    var Model = BaseModel.extend({
        "defaults":  {
            "translations": new TrCollection(),
        },

        "relations": [
            {
                "type":           Backbone.HasMany,
                "key":            'translations',
                "relatedModel":   TrModel,
                "collectionType": TrCollection
            }
        ],
    });

    return Model;
});