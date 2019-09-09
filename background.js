var contextMenuItem = {
    "id": "sendToAnki",
    "title": "Send to Anki",
    "contexts": ["selection"]
}
var bkr=chrome.extension.getBackgroundPage()

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(targetWord){
    if (targetWord.menuItemId =="sendToAnki"){
        alert(targetWord.selectionText)
    }
})
