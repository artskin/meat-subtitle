/**
 * Created by meathill on 16/2/20.
 */
import * as Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Handlebars from 'handlebars';
import template from '../template/list';

class List extends Backbone.View {
  constructor(init) {
    super(_.extend(init, {
      events: {
        'click list-group-item': 'clickHandler'
      }
    }));

    this._fragment = '';
    this.container = this.$('ul');
    this.template = template;
    this.collection.on('add', this.collection_addHandler, this);
    this.collection.on('remove', this.collection_removeHandler, this);
    this.collection.on('reset', this.collection_resetHandler, this);
    this.collection.on('change', this.collection_changeHandler, this);
  }

  /**
   *
   * @param model Backbone.Model
   * @param [options] object 附加参数
   * @param [options.immediately] Boolean 是否立刻插入列表
   */
  collection_addHandler(model, collection, options) {
    this._fragment += this.template(model.toJSON());
    if (options.immediately) {
      this.container.append(this._fragment);
      this._fragment = '';
    }
  }
  collection_changeHandler(model) {
    this.$('#' + model.id).replaceWith(this.template(model.toJSON()));
  }
  collection_removeHandler(model) {
    let item = document.getElementById(model.id);
    $(item).remove();
  }
  collection_resetHandler() {
    this.container.html(this._fragment);
    this._fragment = '';
  }
  clickHandler(event) {
    let target = $(event.currentTarget)
      , id = event.currentTarget.id;
    if (target.hasClass('active')) {
      return;
    }
    this.collection.get(id).set('active', true);
  }
}

export default List;