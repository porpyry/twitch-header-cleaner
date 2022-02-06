async function main() {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: script
  });
}

function script() {
  if (location.host != 'www.twitch.tv') {
    return;
  }

  const getE = c => document.querySelector('div.' + c);
  const isShown = e => e ? e.style.display != 'none' : false;
  const hide = e => e ? e.style.setProperty('display', 'none', 'important') : null;
  const show = e => e ? e.style.display = '' : null;

  const vh = getE('video-chat__header');
  if (vh) {
    if (isShown(vh)) hide(vh);
    else show(vh);
    return;
  }

  const sh = getE('stream-chat-header');
  if (!sh) {
    return;
  }

  const l1 = getE('channel-leaderboard');
  const l2 = getE('community-highlight');
  const l3 = getE('community-highlight-stack__backlog-card');
  if (isShown(sh)) {
    hide(sh);
    hide(l1);
    hide(l2);
    hide(l3);
  } else if (isShown(l1) || isShown(l2) || isShown(l3)) {
    hide(l1);
    hide(l2);
    hide(l3);
  } else {
    show(sh);
    show(l1);
    show(l2);
    show(l3);
    document.onkeyup = null;
  }
}

main();
window.close();
