var contextMenuItem = {
    "id": "sendToAnki",
    "title": "Send to Anki",
    "contexts": ["selection"]
}
chrome.contextMenus.create(contextMenuItem);


chrome.contextMenus.onClicked.addListener(function(targetWord){
    if (targetWord.menuItemId =="sendToAnki"){
        console.log("Highlighted Word: "+targetWord.selectionText)
//no-cors cause weblio doesn't allow basic/cor
        fetch("https://www.weblio.jp/content/+"+targetWord.selectionText, {mode: "cors"})
            .then(
                function(response){
                   // console.log(response.status);
                   // console.log(response.statusText);
                   // console.log(response.type);
                   // console.log(response.url);
                    //200 response means GOOD, strange
                    if (response.status !== 200){
                        console.log("Error code: "+ response.status);
                        return;
                    }
                    
                    return response.text();
                }
            )

            // note that the return of last .then() is the parameter here
            .then(function(html){
                var parser = new DOMParser();
                var doc = parser.parseFromString(html,"text/html");
                var def = doc.getElementsByClassName("NetDicBody")[0]
              /*  var defContainer = def.childNodes[1]
                console.log("Type: "+defContainer.childNodes[0].wholeText + defContainer.childNodes[1].innerText)
                defContainer.removeChild(defContainer.childNodes[0]);
                defContainer.removeChild(defContainer.childNodes[0]);*/
                console.log("Definition: "+def.innerText)
                console.log("Pitch Accent: "+doc.getElementsByClassName('midashigo')[0].childNodes[4].innerText)
            }

            /*To get pitch accent we can do something really stupid and go through every thing under midashigo class and check if style="margin:0.1em" lol */
            )
            .catch(function(err){
                console.log('FETCH ERROR:', err);
            })


            
    }
})

