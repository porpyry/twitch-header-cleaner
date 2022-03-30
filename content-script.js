(() => {
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
      const dH = getDiv(HIGHLIGHT);
      if (
        isShown(dS) ||
        isShown(dL) ||
        isShown(dH)
      ) {
        forceShowRemove(dS);
        forceShowRemove(dL);
        forceHide(dH);
      } else {
        forceShow(dS);
        forceShow(dL);
        forceHideRemove(dH);
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
