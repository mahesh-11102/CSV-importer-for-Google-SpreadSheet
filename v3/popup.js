chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'COLUMN_HEADERS') {
        const form = document.getElementById('column-form');
        message.columnHeaders.forEach((header) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = header;
            checkbox.id = header;
            const label = document.createElement('label');
            label.htmlFor = header;
            label.appendChild(document.createTextNode(header));
            form.appendChild(checkbox);
            form.appendChild(label);
            form.appendChild(document.createElement('br'));
        });
    }
});

document.getElementById('submit-button').addEventListener('click', function () {
    const form = document.getElementById('column-form');
    const selectedColumns = [];
    for (const input of form.querySelectorAll('input[type=checkbox]:checked')) {
        selectedColumns.push(input.value);
    }
    chrome.runtime.sendMessage({ type: 'SELECTED_COLUMNS', selectedColumns });
});
