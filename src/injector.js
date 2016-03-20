/**
 * Created by meathill on 16/1/14.
 */
'use strict';

var video = document.getElementsByTagName('video');

chrome.runtime.sendMessage({
  action: 'getPageContent',
  url: location.href,
  hasVideo: !!video
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'selected') {

  }
});