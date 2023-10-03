## V1-Google Chrome Extension which Detects when user drops a CSV file into Google spreadsheet
- I've developed a chrome extension which gets triggered when a user drops a csv file
- I've observed that google spreadsheet open a popup window which saves the dropped file locally, restricted the pop up window.
-  logged whether the extension is able to detects when a file is drop or not 
### Content.js
```
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, preventDefaults, false);
    console.log(`Event listener attached: ${eventName}`); 
});
```

- The above snippet blocks the default popup of the google spreadhseets
