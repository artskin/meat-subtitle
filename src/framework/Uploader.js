/**
 * Created by meathill on 16/1/14.
 */
var _ = require('underscore');

import reader from '../tools/PromiseFileReader';

var events = {
  'change input': 'file_selectHandler'
};

class Uploader {
  constructor(el) {
    this.el = el;
    this.$el = $(el);
    this.fileField = this.$('[type=file]');
    this._subtitles = {};
  }
  get subtitles() {
    return this._subtitles;
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
    this.$el.addClass('no-video');
  }
  start() {
    this._delegateEvents();
  }
  file_selectHandler(event) {
    let files = event.target.files;
    if (files.length === 0) {
      return;
    }
    let file = files[0];
    var self = this;
    reader(file)
      .then(function (reader) {
        return new Promise(function (resolve) {
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, function (tabs) {
            let url = tabs[0].url
              , value = {};
            self.subtitles[url] = value[url] = reader.result;
            resolve(value);
          });
        })
      })
      .then(function (value) {
        return new Promise(function (resolve) {
          chrome.storage.local.set(value, function () {
            console.log('subtitle saved');
            resolve();
          });
        });
      })
      .then(function () {
        console.log('everything is done');
        console.log(self.subtitles);
      });
  }

  _delegateEvents() {
    _.each(events, function (handler, event) {
      let arr = event.split(/\s+/)
        , selector = arr.length > 1 ? arr.slice(1).join(' ') : '';
      event = arr[0];
      this.$el.on(event, selector, this[handler].bind(this));
    }, this);
  }
}

export default Uploader;