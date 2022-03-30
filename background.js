chrome.action.onClicked.addListener((tab) => {
  if (tab.url) {
    const host = new URL(tab.url).hostname;
    if (host == 'www.twitch.tv') {
      const message = { event: 'click' };
      chrome.tabs.sendMessage(tab.id, message);
    }
  }
});
