var contextMenuItem = {
    "id": "sendToAnki",
    "title": "Send to Anki",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

function formatDefinition(string){
    let detect=['①','②','③','④','⑤','⑥','⑦','⑧','⑨'];
    let initial=0;
    var newString=string
    for(i=0;i<detect.length;i++){
        newString = newString.replace(detect[i], "\n"+detect[i]);
    }

    return newString;
}

var vocab;
var def;
var acc;

chrome.contextMenus.onClicked.addListener(function(targetWord){
    if (targetWord.menuItemId =="sendToAnki"){
        console.log("Highlighted Word: "+targetWord.selectionText)

        async function getWordInfo(word){
            let response = await fetch("https://www.weblio.jp/content/+"+word)
            let data = await response.text();
            let parser = new DOMParser();

             vocab=word;
             doc = parser.parseFromString(data, "text/html");
             def = doc.getElementsByClassName("NetDicBody")[0];
             acc = doc.getElementsByClassName("midashigo")[0];
            
            if (def==undefined){
                console.log("ERROR WITH DEFINITION, NetDicBody")
                console.log(doc);
            }

            console.log(def);
            console.log("Word: "+word)
            console.log("Definition: "+ formatDefinition(def.innerText))
            console.log("Pitch accent: "+acc.innerText);

        }

        getWordInfo(targetWord.selectionText);
            
    }
})

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method =="getWeblioInfo"){
        let info=[vocab,acc.innerText,formatDefinition(def.innerText)];
        sendResponse(info);
    }  
})
