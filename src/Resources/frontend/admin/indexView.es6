'use strict';
import $ from 'jquery';
import _ from 'lodash';
import Router from 'router';
import Q from 'q';
import Backbone from 'backbone';
import {AdminModel as CategoryModel, AdminCollection as CategoryCollection} from 'kateshch-faq/model/faqCategory';
import ListQuestionView from 'kateshch-faq/admin/listQuestions';
import template from 'kateshch-faq/admin/index.twig';

@asyncView()
export default class extends Backbone.View {


    indexAction() {
        this.trigger('meta:title', 'вопросы и ответы');
        return this.render();
    }

    showAction(id) {
        var defer = Q.defer();
        var model = CategoryModel.findOrCreate({id: id});
        $.when(model.fetch()).done(()=> {
            this.listView = new ListQuestionView({
                category: model,
            });
            defer.resolve();
        });

        return defer.promise
            .then(() => {
                this.render();
            });


    }

    render() {
        this.$el.html(this.template({
            categories: this.collection.toArray(),
        }));

        if (this.listView) {

            this.listView.setElement(this.$('.list-questions'));
            this.listView.render();
        }
        this.delegateEvents();
        return this;
    }

    tearUp(...args) {
        const defer = Q.defer();

        this.collection = new CategoryCollection();
        this.collection.on('sync', () => {
            defer.resolve();
        });
        this.collection.fetch();
        return defer.promise
            .then(() => {
                super.tearUp(...args);
            });
    }


    @property
    static template = template;

    @property
    static events = function () {
        return {
            "click .remove-category": (event) => {
                event.stopPropagation();
                var obj = $(event.currentTarget),
                    modelClass = obj.data('id'),
                    model = this.collection.findWhere({id: modelClass});
                this.collection.remove(model);
                model.destroy({
                    success: ()=> {
                        this.render();
                    }
                });
            }


        };
    };

}

