/**
 * Created by meathill on 16/2/20.
 */
import * as Backbone from 'backbone';

class Local extends Backbone.View {
  constructor(url) {
    super();

    this.fetch(url);
  }
  fetch(url) {
    this._url = url;
    chrome.storage.local.get(url, function (items) {
      this.set(items);
    });
  }
  get url() {
    return this._url;
  }
}

export default Local;