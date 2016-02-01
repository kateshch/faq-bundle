'use strict';
import Backbone,{View} from 'backbone';
import template from 'kateshch-faq/admin/editCategory.twig';
import {AdminModel as CategoryModel} from 'kateshch-faq/model/faqCategory';
import Q from 'q';
import _ from 'lodash';
import 'backbone.modelbinder';

@asyncView()
export default class extends View {
    indexAction(id) {
        const defer = Q.defer();

        this.model = CategoryModel.findOrCreate({id: id});
        this.model.once('sync', () => {
            this.langs = [];
            _.each(window.$langs, (lang)=> {
                this.langs[this.model.get('translations').findLocale(lang)] = lang;
            });
            defer.resolve();
        });
        this.model.fetch();

        return defer.promise
            .then(() => this.render());
    }

    newAction() {
        const defer = Q.defer();
        this.model = new CategoryModel();
        this.langs = [];
        _.each(window.$langs, (lang)=> {
            this.langs[this.model.get('translations').findLocale(lang)] = lang;
        });
        defer.resolve();

        return defer.promise
            .then(() => this.render());
    }

    tearUp() {
        this.modelBinder = new Backbone.ModelBinder();

        return super.tearUp();
    }

    tearDown(...args) {
        this.off('model:change');
        return super.tearDown(...args);
    }

    render() {

        this.$el.html(this.template({
            model: this.model,
            languages: this.langs
        }));

        this.modelBinder.bind(this.model, this.el);

        return this;
    }


    @property
    static template = template;

    @property
    static events = function () {
        return {
            "click .save-category": (event) => {
                event.preventDefault();
                this.model.save({
                    success: (response)=> {
                        alert('Категория успешно сохранена!')
                    }
                });

            }
        };
    }
}