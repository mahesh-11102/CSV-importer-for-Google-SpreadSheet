# Develoepd a Google Chrome extension which detects when user tries to drags a file and uploads in the google spreadsheet
## Version-I: Google Chrome Extension which Detects when user drops a CSV file into Google spreadsheet
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
 

   ## ScreenShot
   <p> 
    
     ![log print](https://github.com/StackItHQ/stackit-hiring-assignment-mahesh-11102/assets/77436328/fa3163e3-efe2-4abe-a83b-5476751e0fe2)
<!--    <img src="https://github.com/StackItHQ/stackit-hiring-assignment-mahesh-11102/assets/77436328/2de9430d-54b3-4b5f-af3d-3de3fbc27fd7" width="900" height="500"> -->
   </p>
   
   <hr>

## Version-II: adding more featrues to the extension by saving the dropped CSV file
- To implement this I've used Google App Scripts to upadte/Add the new Spreadsheet.
- The main issue which i've faced is to create a link between the google chrome extensiona and goole app script.
- when user drops the file the app script gets triggered and start savinging the file into the google spreadsheet.

 ## ScreenShot
   
   <p>

  ### File Selection
  ![file selection](https://github.com/StackItHQ/stackit-hiring-assignment-mahesh-11102/assets/77436328/23bab4c4-5204-4ee4-9fb8-ade74f4a5fe8)
  ### File upload-I
![file upload-1](https://github.com/StackItHQ/stackit-hiring-assignment-mahesh-11102/assets/77436328/d103d4c7-e2b7-47a9-ad79-9c2c8663f468)
### File upload-II
![file upload-2](https://github.com/StackItHQ/stackit-hiring-assignment-mahesh-11102/assets/77436328/e194fe2a-f373-491e-ac27-fe9e612c0534)
### File upload-III
![file upload-3](https://github.com/StackItHQ/stackit-hiring-assignment-mahesh-11102/assets/77436328/75ffd8d5-d2ae-44ae-b744-71d5edafda52)

   </p>





## Version-III: Import the columns Selected by the user
- Allows the user to select the columns to be imported in to the google spreadsheet
- Issue which i faced was to send the selected columns to the Google App Script and make the popup to display on drop

https://github.com/mahesh-11102/CSV-importer-for-Google-SpreadSheet/assets/77436328/ddf0e987-e282-4fc5-aa29-6237cc3d4e15
