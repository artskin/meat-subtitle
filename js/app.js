/**
 * Created by meathill on 16/1/11.
 */
var page;

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action === 'getPageContent') {
    page = $(request.body);

    if (page.find('video').length === 0) {
      $('.btn').addClass('disabled');
      $('form').addClass('no-video');
    }
  }
});

$(function () {
  chrome.tabs.executeScript(null, {
    file: 'js/lookup-video.js'
  });
});