// This is your Google API initialization code
// ...

// Handle Google Sheets interactions
function appendToSheet(sheetId, parsedCsv) {
    // Assuming gapi.client.sheets API is initialized and authenticated
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1",  // Update this to your specific sheet name
        valueInputOption: "RAW",
        resource: {
            values: parsedCsv
        }
    }).then((response) => {
        console.log(`Data appended to sheet ID ${sheetId}`);
    }, (reason) => {
        console.error(`Error appending to sheet: ${reason}`);
    });
}
