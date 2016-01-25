/**
 * Created by meathill on 16/1/11.
 */
import Uploader from './framework/Uploader';

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'getPageContent') {
    let page = $(request.body);

    let uploader = new Uploader('#upload-form');

    if (page.find('video').length === 0) {
      uploader.disabled();
    }
  }
});

$(function () {
  chrome.tabs.executeScript(null, {
    file: 'js/lookup-video.js'
  });
});