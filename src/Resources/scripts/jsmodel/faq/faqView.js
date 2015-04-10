define([
    'jquery',
    'lodash',
    'backbone',
    'templating',
    './faq',
    'routing',
    'backbone/modelbinder',
], function ($, _, Backbone, templating, FaqModel, Routing) {
    'use strict';

    var viewId = '@FaqBundle/Widgets/faqform.twig';

    var View = Backbone.View.extend({
        "relatedModel": FaqModel,
        "dropzone":     null,
        "modelBinder":  undefined,
        "template":     templating.get(viewId),

        "initialize": function () {
            this.modelBinder = new Backbone.ModelBinder();

        },

        "events": {
            "click .btn-small-green": 'saveModel',
            "click .link-add-file":   'addfile'
        },

        "addfile": function (e) {
            e.preventDefault();
            this.$('.drop').click();

        },

        "render": function () {
            this.$el.html(this.template(this.model));
            this.modelBinder.bind(this.model, this.el);
            this.$('.drop').each(_.bind(function (ind, el) {
                this.dropzone = new Dropzone(el, {
                    "url": Routing.generate('_uploader_upload_faq_messages'),
                });
            }, this));
            this.dropzone.on('success', _.bind(function (event, data) {
                this.model.set('file', data.id);
                this.render();
            }, this));

            return this;
        },

        "saveModel": function () {
            var errorCont = this.$('.errors'),
                answer = this.$('.answer'),
                form = this.$('.faq-request-form');
            errorCont.html('');

            this.model.save(null, {
                success: function (response) {
                    if (_.size((response.get('error')))) {
                        _.each(response.get('error'), function (error) {
                            errorCont.append($('<p />').text(error));
                        });
                    }
                    else {
                        form.hide();
                        errorCont.hide();
                        answer.show();
                    }
                },
            });
        }
    });

    return View;
});