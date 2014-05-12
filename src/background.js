chrome.commands.onCommand.addListener(function(command) {
    num = parseInt(command.split('chrome-keys-')[1]) - 1;
    chrome.bookmarks.getChildren('1', function(bkmrks) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var tab = tabs[0];
            var url = bkmrks[num].url;
            if (url.indexOf("javascript:") == 0) {
                url = url.split("javascript:")[1];
                chrome.tabs.executeScript(tab.id, {"code": url});
            } else {
                chrome.tabs.update(tab.id, {"url": url});
            }
        });
    });
});
