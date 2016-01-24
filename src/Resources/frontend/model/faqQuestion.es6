'use strict';
import Backbone from 'backbone';
import Router from 'router';
import BaseModel from 'util/basemodel';
import {Model as AnswerModel} from 'kateshch-faq/model/faqAnswer';
import {Model as Translation, Collection as TranslationCollection} from 'kateshch-faq/model/translation';
import 'backbone.relational';


export class Model extends BaseModel {


    get relations() {
        return [{
            "type": Backbone.HasOne,
            "key": 'answer',
            "relatedModel": AnswerModel
        },
            {
                "type": Backbone.HasMany,
                "key": 'translations',
                "relatedModel": Translation,
                "collectionType": TranslationCollection
            }
        ];
    }

    @property
    static url = Router.generate('faq_bundle.new_question');

}

export class AdminModel extends Model {

    initialize(...args) {
        this.set('answer', new AnswerModel());
        super.initialize(...args);
    }

    @property
    static url = function () {
        return this.isNew() ?
            Router.generate('faq_bundle.question_api') :
        Router.generate('faq_bundle.question_api') + '/' + this.get('id');
    };

}


export class Collection extends Backbone.Collection {
    @property
    static model = Model;

}

export class AdminCollection extends Backbone.Collection {
    @property
    static model = AdminModel;

}