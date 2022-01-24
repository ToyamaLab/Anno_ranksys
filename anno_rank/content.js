chrome.runtime.sendMessage({
    value: document.getElementsByTagName('title')[0].outerText
});

