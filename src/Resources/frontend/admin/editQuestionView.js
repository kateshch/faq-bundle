define([
    'jquery',
    'lodash',
    'backbone',
    'router',
    'templating',
    'kateshch-faq/admin/models/faqCategoryCollection',
    './popUpView',
    'backbone.modelbinder',
    'jquery.tabslet',
    'wysiwyg',
], function ($, _, Backbone, Routing, templating, FaqCategoryCollection, PopUpView) {
    'use strict';

    var View = PopUpView.extend({
        "template": '@KateshchFaq/Widgets/Admin/editQuestion.twig',
        "elPopup": '#popup-edit-question',

        initialize: function () {
            this.template = templating.get(this.template);

            if (!this.categories) {
                this.categories = new FaqCategoryCollection();
            }

            if(this.model){
                this.modelBackup = this.model.toJSON();
            }

            this.modelBinder = new Backbone.ModelBinder();
            this.categories.fetch();
            this.categories.on('sync', this.render, this);
        },

        "events": {
            "click .save-question": "saveQuestion",
            "click .cancel": function (e) {
                e.preventDefault();
                this.model = this.modelBackup;
                this.trigger('stopEdit');
                this.destroy();
            },
        },

        "saveQuestion": function (e) {
            e.preventDefault();
            this.model.set('__needUpdate', !this.model.get('__needUpdate'));
            this.model.save(null, {
                success: function () {
                    this.trigger('stopEdit');
                    this.destroy();
                }.bind(this)
            });
        },

        render: function () {
            var view = this;
            this.initialLanguage();
            this.$el.html(this.template({
                "model":      this.model,
                "categories": this.categories,
                "langs":      window.$langs
            }));
            _.each(this.$('.tabs'), function (obj) {
                $(obj).tabslet();
            });
            this.delegateEvents();

            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

            _.extend(bindings.category, {
                "converter": _.bind(function (direction, value) {
                    return direction === 'ModelToView' ?
                        (value ? value.id : null) :
                        this.categories.get(value);
                }, this),
            });
p
            this.modelBinder.bind(this.model, this.el, bindings);
            this.$('textarea.answer-textarea').each(function (ind, el) {
                view.addWysiwyg(el);
            });

            return this;
        },

        "addWysiwyg": function (element) {
            $(element).wysiwyg({
                classes:          'some-more-classes',
                toolbar:          'top-selection',
                buttons:          {
                    insertimage: {
                        title:         'Insert image',
                        image:         '\uf030', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: true    // wanted on selection
                    },
                    insertlink:  {
                        title: 'Insert link',
                        image: '\uf08e' // <img src="path/to/image.png" width="16" height="16" alt="" />
                    },
                    // Fontname plugin
                    fontname:    false,

                    // Fontsize plugin
                    fontsize:      false,
                    // Header plugin
                    header:        {
                        title: 'Header',
                        image: '\uf1dc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        popup: function ($popup, $button) {
                            var list_headers = {
                                // Name : Font
                                'Header 1': '<h1>',
                                'Header 2': '<h2>',
                                'Header 3': '<h3>',
                                'Header 4': '<h4>',
                                'Header 5': '<h5>',
                                'Header 6': '<h6>',
                                'Code':     '<pre>'
                            };
                            var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                .attr('unselectable', 'on');
                            $.each(list_headers, function (name, format) {
                                var $link = $('<a/>').attr('href', '#')
                                    .css('font-family', format)
                                    .html(name)
                                    .click(function (event) {
                                        $(element).wysiwyg('shell').format(format).closePopup();
                                        // prevent link-href-#
                                        event.stopPropagation();
                                        event.preventDefault();
                                        return false;
                                    }.bind(this));
                                $list.append($link);
                            });
                            $popup.append($list);
                        }
                        //showstatic: true,    // wanted on the toolbar
                        //showselection: false    // wanted on selection
                    },
                    bold:          {
                        title:  'Bold (Ctrl+B)',
                        image:  '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        hotkey: 'b'
                    },
                    italic:        {
                        title:  'Italic (Ctrl+I)',
                        image:  '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        hotkey: 'i'
                    },
                    underline:     {
                        title:  'Underline (Ctrl+U)',
                        image:  '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        hotkey: 'u'
                    },
                    strikethrough: {
                        title:  'Strikethrough (Ctrl+S)',
                        image:  '\uf0cc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        hotkey: 's'
                    },
                    forecolor:     {
                        title: 'Text color',
                        image: '\uf1fc' // <img src="path/to/image.png" width="16" height="16" alt="" />
                    },
                    highlight:     {
                        title: 'Background color',
                        image: '\uf043' // <img src="path/to/image.png" width="16" height="16" alt="" />
                    },
                    alignleft:     {
                        title:         'Left',
                        image:         '\uf036', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: false    // wanted on selection
                    },
                    aligncenter:   {
                        title:         'Center',
                        image:         '\uf037', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: false    // wanted on selection
                    },
                    alignright:    {
                        title:         'Right',
                        image:         '\uf038', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: false    // wanted on selection
                    },
                    alignjustify:  {
                        title:         'Justify',
                        image:         '\uf039', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: false    // wanted on selection
                    },
                    orderedList:   {
                        title:         'Ordered list',
                        image:         '\uf0cb', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: false    // wanted on selection
                    },
                    unorderedList: {
                        title:         'Unordered list',
                        image:         '\uf0ca', // <img src="path/to/image.png" width="16" height="16" alt="" />
                        //showstatic: true,    // wanted on the toolbar
                        showselection: false    // wanted on selection
                    },
                },
                submit:           {
                    title: 'Submit',
                    image: '\uf00c' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                selectImage:      'Click or drop image',
                placeholderUrl:   'www.example.com',
                placeholderEmbed: '<embed/>',
                maxImageSize:     [600, 200],
                imageUrl:         Routing.generate('_uploader_upload_faq'),
                forceImageUpload: true,
            });
        },
    });

    return View;
});
