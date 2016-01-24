'use strict';
import Backbone from 'backbone';
import Router from 'router';
import BaseModel from 'util/basemodel';
import {Model as QuestionModel} from 'kateshch-faq/model/faqQuestion';
import {Model as Translation, Collection as TranslationCollection} from 'kateshch-faq/model/translation';
import 'backbone.relational';

export class Model extends BaseModel {

    get relations() {
        return [{
            "type": Backbone.HasOne,
            "key": 'question',
            "relatedModel": QuestionModel
        },
            {
                "type": Backbone.HasMany,
                "key": 'translations',
                "relatedModel": Translation,
                "collectionType": TranslationCollection
            }
        ];
    }
}


export class AdminModel extends Model {

    get url(){
        return Router.generate('faq_bundle.save_answer');
    }

}


export class Collection extends Backbone.Collection {
    @property
    static model = Model;
}