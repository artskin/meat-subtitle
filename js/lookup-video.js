/**
 * Created by meathill on 16/1/14.
 */

chrome.runtime.sendMessage({
  action: 'getPageContent',
  source: document.body
});