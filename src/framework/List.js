/**
 * Created by meathill on 16/2/20.
 */
import * as Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';

class List extends Backbone.View {
  constructor(init) {
    _.extend(init, {
      _fragment: ''
    });
    super(init);

    this.container = this.$('ul');
    this.template = this.$('script').html();
    this.collection.on('add', this.collection_addHandler, this);
    this.collection.on('remove', this.collection_removeHandler, this);
    this.collection.on('reset', this.collection_resetHandler, this);
  }

  collection_addHandler(model, options) {
    this._fragment = this.template(model.toJSON());
    if (options.immediately) {
      this.container.append(this._fragment);
    }
  }
  collection_removeHandler(model) {
    let item = document.getElementById(model.id);
    $(item).remove();
  }
  collection_resetHandler() {
    this.container.html(this._fragment);
    this._fragment = '';
  }
}

export default List;