(() => {
  let handlers = {};

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
      const h1 = getElement('channel-leaderboard'); // leaderboard (supporter)
      const h2 = getElement('community-highlight'); // highlight (toto)
      const h3 = getElement('community-highlight-stack__backlog-card'); // train
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

  // check leaderboard for count n
  function clearElement(n, name) {
    if (n > 0) {
      handlers[name] = setTimeout(() => {
        const el = getElement(name);
        if (el) {
          hide(el);
          handlers[name] = 0;
        } else {
          clearElement(n - 1, name);
        }
      }, 500);
    } else {
      handlers[name] = 0;
    }
  }

  function clearHandler() {
    for (const name in handlers) {
      if (Object.hasOwnProperty.call(handlers, name)) {
        const handler = handlers[name];
        if (handler) {
          clearTimeout(handler);
        }
        handlers[name] = 0;
      }
    }
  }

  chrome.runtime.onMessage.addListener(
    (message, _sender, _sendResponse) => {
      if (message.event == 'click') {
        console.log('chat header toggle');
        clearHandler();
        toggleChatHeader();
      } else if (message.event == 'load') {
        console.log('chat header clear');
        clearHandler();
        clearElement(30, 'video-chat__header'); // header (recent video)
        clearElement(30, 'stream-chat-header'); // header (stream video)
        clearElement(30, 'channel-leaderboard'); // leaderboard (supporter)
        clearElement(30, 'community-highlight'); // highlight (toto)
        clearElement(30, 'community-highlight-stack__backlog-card'); // train
      }
    }
  );
})();

// todo
// 1. mutation observer -> check highlight, train
// 2. on/off button
