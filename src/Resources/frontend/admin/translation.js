define([
    'backbone',
    '../util/basemodel',
    'router',
], function (Backbone, BaseModel) {
    'use strict';

    var TrModel = BaseModel.extend({
        "defaults": {
            "locale": null
        }
    });

    return TrModel;
});
