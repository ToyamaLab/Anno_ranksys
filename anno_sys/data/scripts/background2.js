chrome.contextMenus.create({
	"title": "saeki",
	"type": "normal",
	"contexts": ["selection"],
	"onclick": hoge
	},
	function(){
	alert("コンテキストメニュー登録完了");
});

function hoge(info, tab){
	//alert("選択した単語は「"+info.selectionText+"」です")
	//alert("URLは「"+info.pageUrl+"」です")
	var word = info.selectionText;
	var htmlurl = info.pageUrl;
	chrome.storage.sync.get("userid", function(data){
		window.open('https://trezia.db.ics.keio.ac.jp/saeki/annotation2.php?word='+word+'&htmlurl='+htmlurl+'&userid='+data.userid, null, 'width=300, height=400');
	});
};

var d = 'no';
  chrome.storage.sync.set({ "user" : d }, function() {});
