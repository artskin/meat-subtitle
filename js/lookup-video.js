/**
 * Created by meathill on 16/1/14.
 */
'use strict';

chrome.runtime.sendMessage({
  action: 'getPageContent',
  body: document.body.innerHTML
});

chrome.runtime.onMessage.addListener(function (request) {

});