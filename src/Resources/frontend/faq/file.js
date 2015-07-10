define([
    'backbone',
    'router',
    '../util/basemodel',
], function (Backbone, Routing, BaseModel) {
    'use strict';

    var Model = BaseModel.extend({
        "defaults": {
            "extension": undefined,
            "basename": undefined,
            "uri": undefined,
        },

    });

    return Model;
});
