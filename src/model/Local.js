/**
 * Created by meathill on 16/2/20.
 */
import * as Backbone from 'backbone';

class Local extends Backbone.Collection {
  constructor(url) {
    super();

    this.fetch(url);
    this.on('add', this.addHandler, this);
    this.on('remove', this.removeHandler, this);
  }
  fetch(url) {
    this._url = url;
    chrome.storage.local.get(url, function (items) {
      if (_.isArray(items[url])) {
        this.set(items[url]);
        this.trigger('reset');
      }
    }.bind(this));
  }
  get url() {
    return this._url;
  }
  save() {
    let storage = {};
    storage[this.url] = this.toJSON();
    chrome.storage.local.set(storage, function () {
      console.log('subtitle saved');
    });
  }
  addHandler() {
    this.save();
  }
  removeHandler() {
    this.save();
  }
}

export default Local;