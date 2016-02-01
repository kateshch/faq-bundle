'use strict';
import {View, Radio} from 'backbone';
import AppRouter from 'app/router';
import template from 'kateshch-faq/layout/index.twig';
import MenuView from './menuView';
import $ from 'jquery';
import _ from 'lodash';
import Q from 'q';
import location from 'location';
import 'bootstrap.inspinia';
import Ply from 'ply';

@asyncView()
export default class extends View {
    indexAction() {
        $('body').addClass('top-navigation gray-bg');

        if (!this.rendered) {
            this.render();
        }

        return this.routerPromise
            .then(() => {
                const title = this.popups.title || this.router.title;

                this.trigger('meta:title', 'Админка' + (title ? ': ' + title : ''));
            });
    }

    tearOff(...args) {
        $('body').removeClass('top-navigation gray-bg');

        return super.tearOff(...args);
    }

    tearUp(...args) {
        Radio.channel('popup').reply('open', el => {
            if (this.asyncInitialized) {
                this.togglePopup(true, el);
            }
        });
        Radio.channel('popup').reply('close', () => {
            if (this.asyncInitialized) {
                this.togglePopup(false);
            }
        });
        Radio.channel('popup').reply('back', () => {
            if (this.asyncInitialized) {
                Backbone.history.navigate(this.lastPage, true);
            }
        });

        this.router = new AppRouter(this.routes);
        this.router.on('start', () => this.menuView.render());
        this.router.start();

        this.popups = new AppRouter(this.routesPopups);
        this.popups.on('end', () => {
            Radio.channel('popup').request('open', this.popups.el);
        });
        this.popups.on('404', () => {
            Radio.channel('popup').request('close');
        });
        this.popups.start();

        this.menuView = new MenuView();

        return super.tearUp(...args);
    }

    tearDown(...args) {
        this.menuView.remove();

        this.togglePopup(false);

        const defer = {
            router: Q.defer(),
            popups: Q.defer(),
        };

        this.router.remove({}, this.deferCallback(defer.router));
        this.popups.remove({}, this.deferCallback(defer.popups));

        return Q.all([defer.router.promise, defer.popups.promise])
            .then(() => super.tearDown(...args));
    }

    render() {
        this.$el.html(this.template());

        this.$('.wrapper-content').append(this.router.el);

        this.menuView.setElement($('.navbar-container'));
        this.menuView.render();

        this.rendered = true;

        return this;
    }

    setElement(el) {
        if (this.el) {
            $(el).append(this.el);
            return this;
        }

        return super.setElement(el);
    }

    togglePopup(status, el) {
        if (status) {
            if (!this.lastPage) {
                this.lastPage = location.pathname;
            }

            this.popup = new Ply({
                el: '<div class="ply-form ply-ui"><div class="ply-header ply-ui"></div><div class="ply-content ply-ui"></div></div>',
                onopen: ply => {
                    $(ply.context.el).find('.ply-header').text(this.popups.title);
                    $(ply.context.el).find('.ply-content').append(el);
                },
                onclose: () => {
                    Radio.channel('popup').request('back');
                },
                flags: {
                    closeBtn: true,
                    closeByEsc: true,
                    closeByOverlay: true,
                    visibleOverlayInStack: true,
                },
            });
            this.popup.open();
        } else {
            this.lastPage = null;

            if (this.popup) {
                this.popup.destroy();
            }
        }
    }

    get routerPromise() {
        const loading = Q.defer();
        _.defer(() => Q.all([this.router.loadingPromise, this.popups.loadingPromise])
            .then(() => loading.resolve())
            .done());

        return loading.promise;
    }

    @property
    static routes = {
        '': 'kateshch-faq/faq/indexView:index',
        ':category': 'kateshch-faq/faq/indexView:show'
    };

    @property
    static routesPopups = {
        '?new/category': 'kateshch-faq/admin/editCategory:new',
        '?edit/category/:id': 'kateshch-faq/admin/editCategory:index',
    };

    @property
    static template = template;
}
