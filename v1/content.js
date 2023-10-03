console.log("Content script loaded");

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function csvToJson(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {});
    });
}

function callGAS(action, jsonString) {
    // Replace this with your Google Apps Script API endpoint
    const apiUrl = "https://script.google.com/macros/s/AKfycbyQcl_Gr8hfk6bQn9ihA7Dfq663-Pvo0pIAyMCFj_iGo8jbtf566U6l2fXvO95yfpJ7/exec";
    const token = getOAuthToken();

    fetch(apiUrl, {
        method: 'POST',
        mode: "no-cors",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "function": action,
            "parameters": jsonString
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Google Apps Script returned: ", data);
        })
        .catch(error => {
            console.error("Error calling Google Apps Script: ", error);
        });
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, preventDefaults, false);
    console.log(`Event listener attached: ${eventName}`);
});

document.body.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const csvData = e.target.result;
                    const jsonString = JSON.stringify(csvToJson(csvData));
                    callGAS("openDialog", jsonString);
                };
                reader.readAsText(file);
            }
        }
    }
});
