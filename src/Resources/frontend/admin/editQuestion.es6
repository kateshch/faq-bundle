'use strict';
import Backbone,{View} from 'backbone';
import template from 'kateshch-faq/admin/editQuestion.twig';
import {AdminModel as QuestionModel} from 'kateshch-faq/model/faqQuestion';
import Q from 'q';
import _ from 'lodash';
import 'backbone.modelbinder';

export default class extends View {

    initialize(option) {
        this.category = option.category;
        this.model = option.model ? option.model : new QuestionModel({category: this.category});
        console.log(this.model);
        this.modelBinder = new Backbone.ModelBinder();
    }


    render() {
        this.$el.show();
        this.$el.html(this.template({
            model: this.model,
            languages: window.$langs
        }));


        this.modelBinder.bind(this.model, this.el);

        return this;
    }


    @property
    static template = template;

    @property
    static events = function () {
        return {

            "click .save-question": (event) => {
                event.preventDefault();
                this.model.save({}, {
                    success: (response)=> {
                        console.log(response);
                    }
                });

            },
            "click .cancel": (event) => {
                event.preventDefault();
                this.model.fetch({
                    success: ()=> {
                        this.modelBinder.unbind();
                        this.$el.hide();
                    }
                });


            }
        };
    }
}