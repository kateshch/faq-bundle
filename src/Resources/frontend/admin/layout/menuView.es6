'use strict';
import {View} from 'backbone';
import template from 'kateshch-faq/layout/menuView.twig';
import Router from 'router';
import location from 'location';
import _ from 'lodash';

@asyncView()
export default class extends View {
  render() {
    this.$el.html(this.template({
      menu: this.menu,
      active: this.active,
    }));

    return this;
  }

  get active() {
    return _.chain(this.menu)
      .filter((element)=> {
        // TODO: очень плохо
        return location.pathname.startsWith(element.href);
      })
      .first()
      .value().href;
  }

  get menu() {
    return [
      {title: 'Вопросы и ответы', href: Router.generate('faq_bundle_admin.faq'), icon: 'dashboard'}
    ];

  }

  @property
  static template = template;
}
