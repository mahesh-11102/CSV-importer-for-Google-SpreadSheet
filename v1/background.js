
chrome.runtime.onInstalled.addListener(function () {
    console.log("CSV File Detector extension installed");
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("CSV File Detector extension is updated");
});


console.log("Background script loaded");  

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background.js");  1ee    if (request.action === "uploadCSV") {
        console.log(`CSV file uploaded: ${request.fileName}`); 
    }
});

