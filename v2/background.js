chrome.runtime.onInstalled.addListener(function () {
    console.log("CSV File Detector extension installed");
});



chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("CSV File Detector extension is updated");
});

const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyQcl_Gr8hfk6bQn9ihA7Dfq663-Pvo0pIAyMCFj_iGo8jbtf566U6l2fXvO95yfpJ7/exec";

function callGAS(action, jsonString) {
    fetch(`${GAS_WEBAPP_URL}?action=${action}&jsonString=${encodeURIComponent(JSON.stringify(jsonString))}`, {
        method: 'POST'
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
}


/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "uploadCSV") {
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            const jsonString = csvToJson(csvData); // Assume csvToJson is your function

            // Fetch OAuth2 access token
            chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
                fetch('https://script.google.com/macros/s/AKfycbyQcl_Gr8hfk6bQn9ihA7Dfq663-Pvo0pIAyMCFj_iGo8jbtf566U6l2fXvO95yfpJ7/exec', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'function': 'openDialog',
                        'parameters': [jsonString]
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        };
        reader.readAsText(request.file);
    }
});
*/

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.action === "fetchFromAppsScript") {
//             fetch(request.url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(request.data)
//             })
//                 .then(response => response.json())
//                 .then(data => sendResponse(data))
//                 .catch(err => console.log(`Error: ${err}`));
//         }
//         return true;
//     });


/*
// OAuth configuration
const clientId = "564973827364-63llc62ftgko1ci7l04hsr9pn3fp8jmb.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = chrome.identity.getRedirectURL("provider_cb");
const authUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `scope=https://www.googleapis.com/auth/spreadsheets&` +
    `redirect_uri=${redirectUri}`;

// Initialize OAuth flow
chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true }, function (responseUrl) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
    }

    const url = new URL(responseUrl);
    const code = url.searchParams.get("code");

    if (!code) {
        console.error("No code obtained from OAuth provider.");
        return;
    }

    // Prepare data for token request
    const body = {
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    };

    // Fetch the access token
    fetch("https://www.googleapis.com/oauth2/v4/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(body)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(`Error during fetching access token: ${data.error}`);
                return;
            }

            const accessToken = data.access_token;
            // Now you have the access token. You can use this to make authorized API calls.
            console.log("Access token:", accessToken);

            // Here you can insert the code for uploading data to Google Sheets or whatever you intend to do.
        })
        .catch(err => {
            console.error("Fetch error:", err);
        });
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "uploadCSV") {
        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError);
                return;
            }
            const accessToken = token;

            const text = request.fileContent;
            const rows = text.split("\n").map(row => row.split(","));
            const sheetId = request.sheetId;
            const sheetName = request.fileName.split('.').slice(0, -1).join('.');  // Removing file extension

            // Create new sheet
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "requests": [
                        {
                            "addSheet": {
                                "properties": {
                                    "title": sheetName
                                }
                            }
                        }
                    ]
                })
            }).then(response => response.json())
                .then(data => {
                    console.log(`New sheet created with name: ${sheetName}`);

                    // Upload data to the new sheet
                    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:append`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "values": rows
                        })
                    }).then(response => response.json())
                        .then(data => {
                            console.log(`Data uploaded to new sheet ${sheetName} in Sheet ID ${sheetId}`);
                        }).catch(err => {
                            console.log(`Error uploading to Google Sheets: ${err}`);
                        });

                }).catch(err => {
                    console.log(`Error creating new sheet: ${err}`);
                });
        });
    }
});
*/