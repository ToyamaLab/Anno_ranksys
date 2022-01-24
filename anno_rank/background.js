var textContents = '';

chrome.contextMenus.create({
    "title" : "アノテーション共有システム",
    "type":"normal",
    "contexts": ["all"],
    "onclick": hoge
});

function hoge(info, tab){
	// alert("URLは「"+info.pageUrl+"」です")
    var htmlurl = info.pageUrl;
	var word = info.selectionText;
	window.open('http://trezia2.db.ics.keio.ac.jp/Annosys/register1.php?word='+word+'&htmlurl='+htmlurl, null, 'width=300, height=400');
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        textContents = request.value;
    }
);

// chrome.tabs.query({}, tabs => {
//     for(let i=0; i<tabs.length; i++){
//         console.log(tabs[i].url);
//     }
// });