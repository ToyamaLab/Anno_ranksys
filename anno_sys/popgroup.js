window.addEventListener('DOMContentLoaded', function(){
  chrome.storage.sync.get("userid", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      var user_id = items.userid
    }
  });
});

window.addEventListener('DOMContentLoaded', function(){
  $('#link3').on('click',(e) => {
    chrome.storage.sync.get("userid", function(items) {
      if (!chrome.runtime.error) {
        var user_id = items.userid
        chrome.windows.create({url:$(e.target).attr('href')+'?userid='+user_id,width:300, height:400, type:'popup'});
      }
    });
  });
});
window.addEventListener('DOMContentLoaded', function(){
  $('#link4').on('click',(e) => {
    chrome.windows.create({url:$(e.target).attr('href'),width:300, height:400, type:'popup'});
  });
});
window.addEventListener('DOMContentLoaded', function(){
  $('#link2').on('click',(e) => {
    chrome.storage.sync.get("userid", function(items) {
      if (!chrome.runtime.error) {
        var user_id = items.userid
        chrome.windows.create({url:$(e.target).attr('href')+'?userid='+user_id,width:300, height:400, type:'popup'});
      }
    });
  });
});
window.addEventListener('DOMContentLoaded', function(){
  $('#link5').on('click',(e) => {
    chrome.storage.sync.get("userid", function(items) {
      if (!chrome.runtime.error) {
        var user_id = items.userid
        chrome.windows.create({url:$(e.target).attr('href')+'?userid='+user_id,width:300, height:400, type:'popup'});
      }
    });
  });
});
window.addEventListener('DOMContentLoaded', function(){
  $('#link6').on('click',(e) => {
    chrome.storage.sync.get("userid", function(items) {
      if (!chrome.runtime.error) {
        var user_id = items.userid
        chrome.windows.create({url:$(e.target).attr('href')+'?userid='+user_id,width:300, height:400, type:'popup'});
      }
    });
  });
});
window.addEventListener('DOMContentLoaded', function(){
  $('#link7').on('click',(e) => {
    chrome.windows.create({url:$(e.target).attr('href'),width:300, height:400, type:'popup'});
  });
});
