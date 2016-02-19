/**
 * Created by meathill on 16/1/11.
 */
import Uploader from './framework/Uploader';
import config from './config';

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'getPageContent') {
    let page = $(request.body);

    let uploader = new Uploader('#upload-form')
      , video = page.find('video');

    if (video.length === 0) {
      uploader.disabled();
    } else {
      uploader.video = video;
      uploader.start();
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