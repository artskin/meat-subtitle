/**
 * Created by meathill on 16/1/14.
 */
'use strict';

class Uploader {
  constructor(el) {
    this.el = el;
    this.$el = $(el);
  }
  $(selector) {
    return this.$el.find(selector);
  }
  disabled() {
    this.$('input, button').prop('disabled', true);
    this.$('label').addClass('disabled');
  }
}

export default Uploader;