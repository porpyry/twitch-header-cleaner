(() => {
  const HIGHLIGHT_BACKLOG = 'community-highlight-stack__backlog-card';
  const STREAM_HEADER = 'stream-chat-header';
  const VIDEO_HEADER = 'video-chat__header';
  const LEADERBOARD = 'channel-leaderboard';
  const HIGHLIGHT = 'community-highlight';

  const getDiv = (className) => document.querySelector('div.' + className);
  const isShown = (el) => el && el.offsetParent !== null;
  const forceShow = (el) => el && el.classList.add('force-show');
  const forceShowRemove = (el) => el && el.classList.remove('force-show');
  const forceHide = (el) => el && el.classList.add('force-hide');
  const forceHideRemove = (el) => el && el.classList.remove('force-hide');

  function toggleChatHeader() {
    const dS = getDiv(STREAM_HEADER);
    if (dS) {
      const dL = getDiv(LEADERBOARD);
      const dB = getDiv(HIGHLIGHT_BACKLOG);
      const dH = getDiv(HIGHLIGHT);
      if (
        isShown(dS) ||
        isShown(dB) ||
        isShown(dL) ||
        isShown(dH)
      ) {
        forceShowRemove(dS);
        forceShowRemove(dB);
        forceShowRemove(dL);
        forceShowRemove(dH);
        //forceHide(dH);
      } else {
        forceShow(dS);
        forceShow(dB);
        forceShow(dL);
        forceShow(dH);
        //forceHideRemove(dH);
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
