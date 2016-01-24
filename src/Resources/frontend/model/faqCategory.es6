'use strict';
import Backbone from 'backbone';
import Router from 'router';
import 'backbone.relational';
import BaseModel from 'util/basemodel';
import {Model as QuestionModel, Collection as QuestionCollection} from 'kateshch-faq/model/faqQuestion';
import {AdminModel as AdminQuestionModel, AdminCollection as AdminQuestionCollection} from 'kateshch-faq/model/faqQuestion';
import {Model as Translation, Collection as TranslationCollection} from 'kateshch-faq/model/translation';


export class Model extends BaseModel {

    @property
    static idAttribute = 'class';

    get relations() {
        return [{
            "type": Backbone.HasMany,
            "key": 'activeQuestions',
            "relatedModel": QuestionModel,
            "collectionType": QuestionCollection
        }, {
            "type": Backbone.HasMany,
            "key": 'questions',
            "relatedModel": AdminQuestionModel,
            "collectionType": AdminQuestionCollection
        }, {
            "type": Backbone.HasMany,
            "key": 'translations',
            "relatedModel": Translation,
            "collectionType": TranslationCollection
        }
        ];
    }

    url() {
        return Router.generate('faq_bundle.category', {
            category: this.get('class')
        });
    };

}

export class AdminModel extends Model {

    @property
    static idAttribute = 'id';

    url() {
        return this.isNew() ?
            Router.generate('faq_bundle.category_api') :
        Router.generate('faq_bundle.category_api') + '/' + this.get('id');
    };

}

export class Collection extends Backbone.Collection {
    @property
    static model = Model;

    @property
    static url = Router.generate('faq_bundle.categories');
}

export class AdminCollection extends Collection {
    @property
    static model = AdminModel;
}