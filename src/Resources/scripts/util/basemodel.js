define([
    'lodash',
    'backbone',
    'backbone.relational',
    'backbone.modelbinder',
], function (_, Backbone) {
    'use strict';

    //// Это позволяет корректно работать с select2
    //void function (obj, name) {
    //    var old = obj[name];
    //    obj[name] = function (el, convertedValue) {
    //        old.apply(this, arguments);
    //        if (el.data('select2')) {
    //            el.select2('val', convertedValue);
    //        }
    //    };
    //}(Backbone.ModelBinder.prototype, '_setElValue');

    //Backbone.Relational.store.removeModelScope();
    //Backbone.Relational.store.currentScope = {};
    //Backbone.Relational.store.addModelScope(
    //    Backbone.Relational.store.currentScope
    //);
    //
    //var oldBackboneSync = Backbone.sync;
    //Backbone.sync = function (method, model, options) {
    //
    //    // Ensure that we have a URL.
    //    if (!options.url) {
    //        var dbg = window.$debug ? '?XDEBUG_SESSION_START=IDEA' : '';
    //        options.url = _.result(model, 'url') + dbg || null;
    //    }
    //
    //    return oldBackboneSync.apply(this, [method, model, options]);
    //};

    return Backbone.RelationalModel;
});