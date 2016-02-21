/**
 * Created by meathill on 16/1/11.
 */
import Uploader from './framework/Uploader';
import List from './framework/List';
import Local from './model/Local';
import config from './config';

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'getPageContent') {
    let local = new Local(request.url)
      , uploader = new Uploader({
        el: '#upload-form',
        collection: local
      })
      , list = new List({
        el: '#list',
        collection: local
      });

    if (!request.hasVideo) {
      uploader.disabled();
    }
  }
});

$(function () {
  chrome.tabs.executeScript(null, {
    file: 'js/injector.js'
  });
});

if (config.DEBUG) {
  var button = document.createElement('button');
  button.onclick = function () {
    location.reload(true);
  };
  button.innerText = 'Refresh';
  button.className = 'btn btn-danger';
  document.body.appendChild(button);
}