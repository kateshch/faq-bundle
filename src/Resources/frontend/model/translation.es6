'use strict';
import Backbone from 'backbone';
import Router from 'router';
import 'backbone.relational';


export default Collection;


export class Model extends Backbone.RelationalModel {

    static get defaults() {
        return {
            "locale":           null
        };
    }
}

export class Collection extends Backbone.Collection {

    findLocale(locale, createNew) {
        var index = _.find(this.toArray(), function (model) {
            return model.get('locale') === locale;
        });
        if (index !== undefined) {
            return this.indexOf(index);
        }
        if (createNew === undefined || createNew === true) {
            this.add(new Model({locale: locale}));
            return this.findLocale(locale, false);
        }
    }

    @property
    static model = Model;
}
