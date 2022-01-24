// const url = chrome.extension.getBackgroundPage().textContents;
var textContents = chrome.extension.getBackgroundPage().textContents;
var div = document.getElementById('textView');
div.textContent = textContents;
var pageurl = [];


chrome.tabs.query({active: true, lastFocusedWindow:true}, tabs => {
    const results = document.getElementById('results');
    const url = [];

    for(let i=0; i<tabs.length; i++){
      pageurl[i] = tabs[i].url;
    }
  });

window.addEventListener('DOMContentLoaded', function(){
    $('#link1').on('click',(e) => {
        chrome.windows.create({url:$(e.target).attr('href')+'?contents='+textContents+'&pageurl='+pageurl[0],width:300, height:400, type:'popup'});
    });
  });