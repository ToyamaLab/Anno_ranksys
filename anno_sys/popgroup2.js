document.body.onload = function() {
  chrome.storage.sync.get("user", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      if(items.user == 'no'){
        document.getElementById("data").innerHTML = '<h3>please register username</h3>';
        document.getElementById("disp").style.display = "block";
      }else{
        document.getElementById("data").innerHTML = '<h3>' +items.user+' さん</h3>';
        document.getElementById("disp").style.display = "none";
        chrome.storage.sync.get("userid", function(data){
          var userid = data.userid;
          // $.ajax({
          //     type: 'POST',
          //     url: 'https://trezia.db.ics.keio.ac.jp/saeki/joinsearch.php',
          //     data: {
          //       'userid' : userid
          //     },
          //     success: function(data){
          //       chrome.storage.sync.set({"groupname":data}, function(){});
          //       alert(userid);
          //     }
          //   });
          $.ajax({
              type: 'POST',
              url: 'https://trezia.db.ics.keio.ac.jp/saeki/joinsearch.php',
              data: {
                'userid' : userid
              },
              dataType: 'json'
            }).done(function(data){
               document.getElementById("group").innerHTML = "<h4>参加グループ</h4>";
               document.getElementById("groupA").innerHTML = '<p>①: ' + data[0].name +'</p>';
               document.getElementById("groupB").innerHTML = '<p>②: ' + data[1].name +'</p>';
               document.getElementById("groupC").innerHTML = '<p>③: ' + data[2].name +'</p>';
               document.getElementById("groupD").innerHTML = '<p>④: ' + data[3].name +'</p>';
               document.getElementById("groupE").innerHTML = '<p>⑤: ' + data[4].name +'</p>';
               chrome.storage.sync.set({"group0": data[0].name}, function(){});
               chrome.storage.sync.set({"group1": data[1].name}, function(){});
               chrome.storage.sync.set({"group2": data[2].name}, function(){});
               chrome.storage.sync.set({"group3": data[3].name}, function(){});
               chrome.storage.sync.set({"group4": data[4].name}, function(){});
               chrome.storage.sync.set({"id0": String(data[0].id)}, function(){});
               chrome.storage.sync.set({"id1": String(data[1].id)}, function(){});
               chrome.storage.sync.set({"id2": String(data[2].id)}, function(){});
               chrome.storage.sync.set({"id3": String(data[3].id)}, function(){});
               chrome.storage.sync.set({"id4": String(data[4].id)}, function(){});
              }
            ).fail(function(XMLHttpRequest, textStatus, error){
              alert(error);
            });
        });
      }
    }
  });
}

document.getElementById("set").onclick = function() {
  var d = document.getElementById("text").value;
  chrome.storage.sync.set({ "user" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
    $.ajax({
      type: 'POST',
      url: 'https://trezia.db.ics.keio.ac.jp/saeki/username.php',
      data: {
        'username' : d
      },
      success: function(data){
        chrome.storage.sync.set({"userid" : Number(data)}, function(){});
        alert("complete!")
      }
    });
  });
  //chrome.windows.create({url:'https://trezia.db.ics.keio.ac.jp/saeki/username.php',width:300, height:400, type:'popup'});
  //window.close();
}
