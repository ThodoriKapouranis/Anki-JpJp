chrome.contextMenus.onClicked.addListener(function(targetWord){
    if (targetWord.menuItemId =="sendToAnki"){
        alert("I'm coming from gui.js");
    }
})
