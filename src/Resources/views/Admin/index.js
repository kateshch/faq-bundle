requirejs([
    'jquery',
    'lodash',
    'backbone',
    'routing',
    'kateshch-faq/admin/listQuestionView',
    'kateshch-faq/admin/listCategoriesView',
    'templating',
    'domReady!',
], function ($, _, Backbone,Routing, ListQuestionView, ListCategoriesView, templating ) {
    'use strict';


    var cont = $('.content');

    var View = Backbone.View.extend({
        el: $('#wrapper'),
        "currentTab": "questions",

        "initialize": function(){
            this.views = {
                "questions":  new ListQuestionView(),
                "categories": new ListCategoriesView(),
            };
        },

        "events": {
            "click .questionstab": function(e){
                e.preventDefault();
                this.currentTab = "questions";

                this.render();
            },
            "click .categoriestab": function(e){
                e.preventDefault();
                this.currentTab = "categories";
                this.render();
            },
        },

        render: function () {
            window.history.pushState(false,"", Routing.generate('faq_admin_index', {'tab': this.currentTab}));
            var view = this.views[this.currentTab];
            view.setElement(cont);
            view.render();
            return this;
        },
    });

    var view = new View();





});