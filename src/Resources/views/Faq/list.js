requirejs([
    'jquery',
    'lodash',
    'backbone',
    'routing',
    'faq/faq/faq',
    'faq/faq/faqView',
    'jquery/openclose',
    'jquery/tabslet',
    'domReady!',
], function ($, _, Backbone, Routing, FaqModel, FaqView) {
    'use strict';

    console.log('sdf');
    //var cont = $('.faq-request');
    //
    //var model = new FaqModel();
    //model.url = Routing.generate('iwin_faq_message_save');
    //
    //
    //var view = new FaqView({
    //    "model": model,
    //    "el":    cont,
    //});
    //
    //view.render();
    //$('.tabs').tabslet();
    //
    //// Init list answer-questions
    //$('.faq-list ul li a').on('click', function () {
    //    $(this).parent().parent().find('li').removeClass('active');
    //    $(this).parent().addClass('active');
    //
    //    var tabID = $(this).attr('href');
    //    tabID = tabID.replace('#', '');
    //
    //
    //    $(this).parent().parent().parent().find('div.tab-content div[id^="tabs_"]').hide();
    //    $(this).parent().parent().parent().find('div.tab-content div[id="' + tabID + '"]').show();
    //
    //    return false;
    //});
    //$('.faq-list ul li:first a:first').trigger('click');
    //
    //$('div.open-close').each(function () {
    //    //TODO: dirty hack, remove
    //    if (!this.dataset.sliderInitialized) {
    //        var openClose;
    //        if (openClose = jQuery(this).data('OpenClose')){
    //            openClose.destroy();
    //        }
    //        jQuery(this).openClose({
    //            activeClass: 'active',
    //            opener:      '.opener',
    //            slider:      '.slide',
    //            animSpeed:   400,
    //            effect:      'slide'
    //        });
    //        this.dataset.sliderInitialized = 'true';
    //    }
    //});
});