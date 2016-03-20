/**
 * Created by meathill on 16/3/7.
 */

import * as Handlebars from 'handlebars';

function fileSize(value) {
  let count = 0
    , units = ['B', 'KB', 'MB'];
  while (value > 1) {
    value = value / 1000;
    count++;
  }
  return Math.round(value * 100000) / 100 + units[count - 1];
}

Handlebars.registerHelper('fileSize', fileSize);

export default fileSize;