/**
 * Created by meathill on 16/1/11.
 */
chrome.runtime.onMessage.addListener(function (requrest, sender) {
  if (requrest.action === 'getPageContent') {
    alert(requrest.source);
  }
});

$(function () {
  chrome.tabs.executeScript(null, {
    file: 'js/lookup-video.js'
  }, function () {
    $(document.body).append(JSON.stringify(arguments));
  });
});