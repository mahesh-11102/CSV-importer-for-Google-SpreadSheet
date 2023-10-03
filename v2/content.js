console.log("Content script loaded");

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, preventDefaults, false);
    console.log(`Event listener attached: ${eventName}`);
});

document.body.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drop event detected");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        console.log(`Number of files: ${files.length}`);
        const file = files[0];

        console.log(`File type: ${file.type}`);
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
            console.log(`CSV file detected: ${file.name}`);

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (event) {
                const csvData = event.target.result;
                const rows = csvData.split("\n").map(row => row.split(","));

                // Add a console.log to verify that the CSV data is read correctly
                console.log(`CSV Data: ${csvData}`);

                fetch("https://script.google.com/macros/s/AKfycbz_wlfMS5OR7a9IuQNe1CroNwg3ALrVHsUNJeCWxO7zRfP8baA8t6xVZySweDtkwPhQ/exec", {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fileName: file.name,
                        rows: rows,
                    }),
                })
                    .then(response => {
                        if (!response.ok) {
                            console.log(`Error: Network response was not ok (${response.status} - ${response.statusText})`);
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(`Response Data:`, data);
                        if (data.status === "success") {
                            console.log(`Data uploaded to new sheet with name ${file.name}`);
                        }
                    })
                    .catch(err => {
                        console.log(`Error: ${err}`);
                    });
            };

        } else {
            console.log("The dropped file is not a CSV.");
        }
    }
});
