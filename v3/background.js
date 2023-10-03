console.log("Background script running");

chrome.runtime.onInstalled.addListener(function () {
    console.log("CSV File Detector extension installed");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "showPopup") {
        console.log("Showing popup with headers:", request.headers);

        // Set the headers in storage for the popup to retrieve
        chrome.storage.local.set({ headers: request.headers }, function () {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log("Headers stored successfully");

                // Open the popup
                chrome.action.setPopup({ popup: "popup.html" }, function () {
                    console.log("Popup set");
                });
            }
        });
    } else if (request.action === "selectedColumns") {
        console.log("Received selected columns:", request.selectedColumns);

        // For Manifest V3 use chrome.action
        if (chrome.action) {
            chrome.action.setPopup({ popup: "popup.html" }, function () {
                console.log("Popup set");
            });
        } else {
            console.error("chrome.action is not available");
        }

        sendResponse({ status: "ok" });
    }
});


/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showPopup") {
        chrome.storage.local.set({ 'csvHeaders': request.headers }, function () {
            chrome.action.openPopup();
        });
    } else if (request.action === "processSelectedColumns") {
        const selectedCols = request.selectedCols;

        fetch("https://script.google.com/macros/s/AKfycbz2_TzE7XHxkP_SjQ7kLfPeCQN_Ytqb-lT-4lZMImjDSXIKSd65naPFEAHLUgnu9UD9/exec", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "processSelectedColumns",
                selectedCols: selectedCols
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(`Received from GAS: ${data}`);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
    }
});


*/