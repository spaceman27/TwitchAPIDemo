var page = 1;
var mpp = 10;
var tp = null;
function getResult() {
  var queryname = document.getElementsByName("searchText")[0].value;
  jsonp.fetch("https://api.twitch.tv/kraken/search/streams/?limit=" + mpp + "&offset=" + (page * mpp - mpp) + "&q="+queryname+"&callback=JSONPCallback", function(data) {
    console.log(data);
    document.getElementById("total").innerText = data._total;
    document.getElementById("cp").innerText = page;
    tp = Math.round(data._total / mpp);
    document.getElementById("tp").innerText = tp;
    //load content div
    var docFragment = document.createDocumentFragment();
    for(var i=0, len= data.streams.length;i<len;i++){
      var element = document.createElement('p');
      var spanl = document.createElement('span');
      spanl.className = "cl-left";
      var img = document.createElement("img");
      img.setAttribute("src", data.streams[i].channel.logo);
      spanl.appendChild(img);
      var spanr = document.createElement('span');
      spanr.className = "cl-right";
      var displayname = document.createElement("b");
      displayname.innerText = data.streams[i].channel.display_name;
      spanr.appendChild(document.createElement("span").appendChild(displayname));
      spanr.appendChild(document.createElement("br"));
      var gamename = document.createElement("span");
      gamename.innerText = data.streams[i].game + " viewer " + data.streams[i].viewers;
      spanr.appendChild(gamename);
      var content = document.createElement("span");
      content.innerText = data.streams[i].channel.status;
      spanr.appendChild(document.createElement("br"));
      spanr.appendChild(content);
      
      element.appendChild(spanl);
      element.appendChild(spanr);
      docFragment.appendChild(element);
    }
    var mycontent = document.getElementById("content");
    while (mycontent.firstChild) {
        mycontent.removeChild(mycontent.firstChild);
    }
    
    document.getElementById("content").appendChild(docFragment);
  });
}
function next(){
  if(page<tp){
    page++;
    getResult();
  }
}
function previous(){
  if(page>1){
    page--;
    getResult();
  }
}
window.onload = function(){
  getResult();
}