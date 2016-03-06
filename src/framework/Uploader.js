/**
 * Created by meathill on 16/1/14.
 */
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import reader from '../tools/PromiseFileReader';
import SparkMD5 from 'SparkMD5';

class Uploader extends Backbone.View {
  constructor(init) {
    _.extend(init, {
      events: {
        'change input': 'file_selectHandler'
      }
    });
    super(init);
    this.fileField = this.$('[type=file]');
  }
  disabled() {
    this.$('input, button').prop('disabled', true);
    this.$('label').addClass('disabled');
    this.$el.addClass('no-video');
  }
  file_selectHandler(event) {
    let files = event.target.files;
    if (files.length === 0) {
      return;
    }
    let file = files[0];
    var collection = this.collection;
    reader(file)
      .then(function (reader) {
        let spark = new SparkMD5.ArrayBuffer();
        spark.append(reader.result);
        let md5 = spark.end(false);
        if (collection.get(md5)) {
          return;
        }
        let isActive = collection.length === 1;
        collection.add({
          id: md5,
          filename: file.name,
          size: file.size,
          content: reader.result,
          active: isActive
        }, {
          immediately: true
        });
      });
  }
}

export default Uploader;