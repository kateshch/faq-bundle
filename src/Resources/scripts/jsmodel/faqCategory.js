define([
    'backbone',
    'routing'
], function (Backbone) {
    'use strict';


    var Model = Backbone.Model.extend({
        "defaults": {
            "translation":     [],
        },
    });

    return Model;
});