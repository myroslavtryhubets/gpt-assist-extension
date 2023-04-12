chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ openaiToken: '' });
});
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});