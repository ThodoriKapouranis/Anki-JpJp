var background = chrome.extension.getBackgroundPage();
background.transfer;

background.console.log('hello');
background.console.log(document);

function fetch(){
    chrome.runtime.sendMessage({method:"getWeblioInfo"},function(response){
        background.console.log(response);
        document.getElementById("word").innerHTML=response[0]
        document.getElementById("reading").innerHTML=response[1]
        document.getElementById("definition").innerHTML=response[2]
    })
}


window.onload = function(){
    fetch()
    document.getElementsByClassName('retry')[0].addEventListener("click",fetch);

}



