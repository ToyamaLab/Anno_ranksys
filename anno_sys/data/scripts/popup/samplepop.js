var word = decodeURIComponent(location.search);
word = word.substring(6);

chrome.storage.local.get("loginid", function(value){
  var loginid = value.loginid;
});

document.write("word: \"");
document.write(word.bold());
document.write("\"");
document.write("<br>\n");
