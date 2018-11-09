window.bears = {}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    bears[request.url] = request.count

})

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url:'popup.htl'})
})
