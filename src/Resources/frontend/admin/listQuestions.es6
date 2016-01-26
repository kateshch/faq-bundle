'use strict';
import $ from 'jquery';
import _ from 'lodash';
import Router from 'router';
import Q from 'q';
import Backbone from 'backbone';
import {AdminCollection as CategoryCollection} from 'kateshch-faq/model/faqCategory';
import EditQuestionView from 'kateshch-faq/admin/editQuestion';
import template from 'kateshch-faq/admin/listQuestions.twig';

export default class extends Backbone.View {

    render() {
        this.$el.html(this.template({
            questions: this.category.get('questions').toArray(),
        }));
        this.delegateEvents();
        return this;
    }

    initialize(options) {
        this.category = options.category;
    }


    @property
    static template = template;

    @property
    static events = function () {
        return {
            "click .remove-question": (event) => {
                event.stopPropagation();
                var obj = $(event.currentTarget),
                    modelClass = obj.data('id'),
                    model = this.category.get('questions').findWhere({id: modelClass});
                this.category.get('questions').remove(model);
                model.destroy({
                    success: ()=> {
                        this.render();
                    }
                });
            },
            "click .edit-question": (event) => {
                event.stopPropagation();
                var obj = $(event.currentTarget),
                    modelId = obj.data('id'),
                    model = this.category.get('questions').findWhere({id: modelId});
                this.editView = new EditQuestionView({category: this.category, model: model});
                this.editView.setElement(this.$('.container-edit'));
                this.editView.render();
            },
            "click .new-question": (event) => {
                event.stopPropagation();
                this.editView = new EditQuestionView({category: this.category});
                this.editView.setElement(this.$('.container-edit'));
                this.editView.render();
            }


        };
    }

}

