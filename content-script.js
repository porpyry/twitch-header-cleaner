(() => {
  const HIGHLIGHT_BACKLOG = 'community-highlight-stack__backlog-card';
  const CHATROOM_CONTENT = 'chat-room__content';
  const STREAM_HEADER = 'stream-chat-header';
  const VIDEO_HEADER = 'video-chat__header';
  const LEADERBOARD = 'channel-leaderboard-container';
  const HIGHLIGHT = 'community-highlight';
  const PINNED_CHAT = 'paid-pinned-chat-message-list';
  const LEADERBOARD2 = 'chat-room__content > div:first-child > div';

  const getDiv = (className) => document.querySelector('div.' + className);
  const getDiv2 = (attr, value) => document.querySelector('div[' + attr + '="' + value + '"]');
  const isShown = (el) => el && el.offsetParent !== null;
  const forceShow = (el) => el && el.classList.add('force-show');
  const forceShowRemove = (el) => el && el.classList.remove('force-show');
  const forceHide = (el) => el && el.classList.add('force-hide');
  const forceHideRemove = (el) => el && el.classList.remove('force-hide');

  function toggleChatHeader() {
    const dS = getDiv(STREAM_HEADER);
    if (dS) {
      const dL = getDiv2("data-test-selector", LEADERBOARD);
      const dB = getDiv(HIGHLIGHT_BACKLOG);
      const dH = getDiv(HIGHLIGHT);
      const dP = getDiv(PINNED_CHAT);
      const dL2 = getDiv(LEADERBOARD2);
      if (
        isShown(dS) ||
        isShown(dB) ||
        isShown(dL) ||
        isShown(dH) ||
        isShown(dP) ||
        isShown(dL2)
      ) {
        forceShowRemove(dS);
        forceShowRemove(dB);
        forceShowRemove(dL);
        forceShowRemove(dH);
        forceShowRemove(dP);
        forceShowRemove(dL2);
      } else {
        forceShow(dS);
        forceShow(dB);
        forceShow(dL);
        forceShow(dH);
        forceShow(dP);
        forceShow(dL2);
      }
    }

    const dV = getDiv(VIDEO_HEADER);
    if (dV) {
      if (isShown(dV)) {
        forceShowRemove(dV);
      } else {
        forceShow(dV);
      }
      return;
    }
  }

  chrome.runtime.onMessage.addListener(
    (message, _sender, _sendResponse) => {
      if (message.event == 'click') {
        console.log('Toggle chat header.');
        toggleChatHeader();
      }
      return true;
    }
  );
})();
console.log('Twitch-chat-header-cleaner script loaded.');
