define([
    'backbone',
    '../../util/basemodel',
    'routing',
], function (Backbone, BaseModel) {
    'use strict';


    var TrModel = BaseModel.extend({
        "defaults": {
            "locale": null
        }
    });

    return TrModel;
});