'use strict';
import {Radio, View} from 'backbone';
import AppRouter from 'app/router';
import Router from 'router';
import location from 'location';
import Preloader from 'preloader.dash-spinner';
import Translator from 'translator';

import $ from 'jquery';
import Q from 'q';

@asyncView()
export default class extends View {
  startAction() {
    console.log('gd');
    return this.render();
  }

  tearUp() {

    Radio.channel('router').on('start', () => Radio.channel('preloader').request('start'));
    Radio.channel('router').on('end', () => {
      Radio.channel('preloader').request('stop')
    });

    let loaderTick = 0;
    Radio.channel('preloader').reply('start', () => {
      if (++loaderTick > 0) {
        this.preloader(true);
        $('html, body').animate({scrollTop: 0}, 0);
      }
    });
    Radio.channel('preloader').reply('stop', () => {
      if (--loaderTick === 0) {
        this.preloader(false);
      }
    });
    this.initRouter();
    this.updateTitle();
    return super.tearUp();
  }


  initRouter() {
    this.router = new AppRouter(this.routes);
    this.router.on('start', (args)=> {
      var locale = args[0];
      Translator.locale = locale;
      window.$locale = locale;
      this.$el.children('.mycontainer').children().detach();
    })
  }

  updateTitle() {
    document.title = this.router.title || 'loading...';
  }


  start() {
    return this.render();
  }

  render() {
    this.$el.on('click', 'a[href]:not([data-popup-disabled="true"])', function (e) {
      const href =
        $(e.currentTarget).attr('href') ||
        $(e.currentTarget).data('href')
        , link = document.createElement('a');
      link.href = href.substr(0, 2) === '/#' ? href.substr(1) : href;

      const target = link.protocol + '//' + link.host
        , root = location.protocol + '//' + location.host;

      let path = link.pathname;
      if (path === location.pathname && link.hash) {
        path = location.pathname + '?' + link.hash.substr(1);
      }

      if (target === root) {
        e.preventDefault();
        Backbone.history.navigate(path, true);
      }
    });

    this.preloader = (() => {
      const el = $('<div/>', {
        class: 'preloader',
      }).css({
        'z-index': 10000,
        'background-color': '#000',
        opacity: 0.5,
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
      });
      const preloader = new Preloader({
        el: el,
        size: '5',
      });
      preloader.show();
      this.$el.append(el);

      return status => {
        el.show();

        return status || el.hide();
        if (status) {
          preloader.show();
        } else {
          preloader.hide(() => {
            el.hide();
          });
        }
      };
    })();


    this.router.start($('<div/>', {class: 'mycontainer'}).appendTo(this.$el));

    return this;
  }

  preloader() {
    // DO nothing
  }


  @property
  static routes = {
    '^^admin/faq.*$': 'kateshch-faq/layout/indexView:index',
  };
}
