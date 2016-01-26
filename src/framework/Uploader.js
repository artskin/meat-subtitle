/**
 * Created by meathill on 16/1/14.
 */
'use strict';

var events = {
  'change input': 'file_selectHandler'
};

class Uploader {
  constructor(el) {
    this.el = el;
    this.$el = $(el);
  }
  set video(value) {
    this._video = value;
  }
  $(selector) {
    return this.$el.find(selector);
  }
  disabled() {
    this.$('input, button').prop('disabled', true);
    this.$('label').addClass('disabled');
  }
  start() {
    this._delegateEvents();
  }

  _delegateEvents() {
    _.each(events, function (handler, event) {
      let arr = event.split(/\s+/)
        , selector = arr.length > 1 ? arr.slice(1).join(' ') : '';
      event = arr[0];
      this.$el.on(event, selector, this[handler].bind(this));
    });
  }
}

export default Uploader;