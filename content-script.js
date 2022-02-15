(() => {
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
      const h3 = getElement('community-highlight-stack__backlog-card');
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
      const h3 = getElement('community-highlight-stack__backlog-card');
      hide(sh);
      hide(h1);
      hide(h2);
      hide(h3);
    }
  }

  chrome.runtime.onMessage.addListener(
    (message, _sender, _sendResponse) => {
      if (message.event == 'click') {
        toggleChatHeader();
        console.log('chat header toggle');
      } else if (message.event == 'load') {
        clearChatHeader();
        console.log('chat header clear');
      }
    }
  );
})();
