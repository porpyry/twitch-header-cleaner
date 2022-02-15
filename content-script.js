(() => {
  let handler = 0;

  function getElement(c) {
    return document.querySelector('div.' + c);
  }

  function isShown(e) {
    if (e) {
      return e.style.display != 'none';
    }
    return false;
  }

  function hide(e) {
    if (e && isShown(e)) {
      e.setAttribute('_display', e.style.display);
      e.style.setProperty('display', 'none', 'important');
    }
  }

  function show(e) {
    if (e && !isShown(e)) {
      e.style = e.getAttribute('_display');
      e.removeAttribute('_display');
    }
  }

  function toggleChatHeader() {
    // video header
    const vh = getElement('video-chat__header');
    if (vh) {
      if (!isShown(vh)) {
        show(vh);
      } else {
        hide(vh);
      }
      return;
    }

    // stream header
    const sh = getElement('stream-chat-header');
    if (sh) {
      const h1 = getElement('channel-leaderboard');
      const h2 = getElement('community-highlight');
      const h3 = getElement(
        'community-highlight-stack__backlog-card'
      );
      if (
        !isShown(sh) &&
        !isShown(h1) &&
        !isShown(h2) &&
        !isShown(h3)
      ) {
        show(sh);
        show(h1);
        show(h2);
        show(h3);
      } else {
        hide(sh);
        hide(h1);
        hide(h2);
        hide(h3);
      }
    }
  }

  function clearChatHeader() {
    // video header
    const vh = getElement('video-chat__header');
    if (vh) {
      hide(vh);
      return;
    }

    // stream header
    const sh = getElement('stream-chat-header');
    if (sh) {
      const h1 = getElement('channel-leaderboard');
      const h2 = getElement('community-highlight');
      const h3 = getElement(
        'community-highlight-stack__backlog-card'
      );
      hide(sh);
      hide(h1);
      hide(h2);
      hide(h3);
    }
  }

  // check leaderboard for count n
  function clearLeaderboard(n) {
    if (n > 0) {
      handler = setTimeout(() => {
        const h1 = getElement('channel-leaderboard');
        if (h1) {
          hide(h1);
          handler = 0;
        } else {
          clearLeaderboard(n - 1);
        }
      }, 100);
    } else {
      handler = 0;
    }
  }

  function clearHandler() {
    if (handler) {
      clearTimeout(handler);
      handler = 0;
    }
  }

  chrome.runtime.onMessage.addListener(
    (message, _sender, _sendResponse) => {
      if (message.event == 'click') {
        console.log('chat header toggle');
        toggleChatHeader();
        clearHandler();
      } else if (message.event == 'load') {
        console.log('chat header clear');
        clearChatHeader();
        clearHandler();
        clearLeaderboard(150);
      }
    }
  );
})();
