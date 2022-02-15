chrome.action.onClicked.addListener((tab) => {
  console.log(tab);
  const message = { event: 'click' };
  chrome.tabs.sendMessage(tab.id, message);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.startsWith('https://www.twitch.tv/')) {
    if (changeInfo.status == 'complete') {
      const message = { event: 'load' };
      chrome.tabs.sendMessage(tabId, message);
    }
  }
});
