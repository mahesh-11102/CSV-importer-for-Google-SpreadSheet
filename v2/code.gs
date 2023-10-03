function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    // Handle the error
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": "Invalid request"}))
      .setMimeType(ContentService.MimeType.JSON);
  } else {
    const params = JSON.parse(e.postData.contents);
        // Log the params object for debugging
    Logger.log('Received Params:');
    Logger.log(params);
    // Create a new Spreadsheet with the file name
    const newSpreadsheet = SpreadsheetApp.create(params.fileName);
    const newSheet = newSpreadsheet.getSheets()[0];  // Gets the first sheet in the new spreadsheet

    // Append rows to the new sheet
    params.rows.forEach((row, index) => {
      newSheet.getRange(index + 1, 1, 1, row.length).setValues([row]);
    });

    // Create output and set MIME type to JSON
    const output = ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "newSheetId": newSpreadsheet.getId()  // Sending the new Spreadsheet ID
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');  // This line is important


    return output;
  }
}
