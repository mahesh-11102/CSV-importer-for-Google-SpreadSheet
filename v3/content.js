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

        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
            console.log(`CSV file detected: ${file.name}`);

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (event) {
                const csvData = event.target.result;
                const rows = csvData.split("\n").map(row => row.split(","));
                const columnHeaders = rows[0];

                console.log(`Column Headers: ${JSON.stringify(columnHeaders)}`);

                // Create popup for column selection with checkboxes and blue background
                let popup = document.createElement('div');
                popup.style.position = 'fixed';
                popup.style.left = '50%';
                popup.style.top = '50%';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.style.background = 'blue'; // Set the background color to blue
                popup.style.padding = '20px';
                popup.style.zIndex = '1000000';  // High z-index to make it appear on top

                columnHeaders.forEach((header, index) => {
                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `columnCheckbox${index}`;
                    checkbox.value = header;

                    let label = document.createElement('label');
                    label.htmlFor = `columnCheckbox${index}`;
                    label.appendChild(document.createTextNode(header));

                    popup.appendChild(checkbox);
                    popup.appendChild(label);
                });

                let submitButton = document.createElement('button');
                submitButton.innerHTML = 'Submit';
                submitButton.onclick = function () {
                    let selectedColumns = [];
                    columnHeaders.forEach((header, index) => {
                        let checkbox = document.getElementById(`columnCheckbox${index}`);
                        if (checkbox.checked) {
                            selectedColumns.push(checkbox.value);
                        }
                    });

                    console.log(`Selected columns: ${JSON.stringify(selectedColumns)}`);

                    // Send selected columns to Google Sheets using fetch
                    fetch("https://script.google.com/macros/s/<Add your own Script Id>lT-4lZMImjDSXIKSd65naPFEAHLUgnu9UD9/exec", {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            fileName: file.name,
                            columns: selectedColumns,  // Sending selected columns
                            rows: rows,  // Sending all rows
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
                            } else {
                                console.log(`Error in uploading data: ${data.message}`);
                            }
                        })
                        .catch(err => {
                            console.log(`Error: ${err}`);
                        });

                    // Remove popup after selection
                    document.body.removeChild(popup);
                };

                popup.appendChild(submitButton);

                // Append popup to body
                document.body.appendChild(popup);
            };
        } else {
            console.log("The dropped file is not a CSV.");
        }
    }
});
