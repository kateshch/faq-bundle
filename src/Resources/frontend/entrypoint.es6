'use strict';
import SiteView from './entrypointView';
import $ from 'jquery';
import 'domReady!';

const view = new SiteView({}, err => {
  if (err) {
    throw new Error(err);
  }

  view.setElement($('body'));
  view.startAction();
});
