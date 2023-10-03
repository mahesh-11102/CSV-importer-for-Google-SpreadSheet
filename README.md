[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/_IojtdoU)
# StackIt Hiring Assignment

### Welcome to StackIt's hiring assignment! 🚀

**If you didn't get here through github classroom, are you sure you're supposed to be here? 🤨**


We are glad to have you here, but before you read what you're going to beat your head over for the next few hours (maybe days?), let's get a few things straight:
- We really appreciate honesty. Don't copy anyone else's assignment, it'll only sabotage your chances :P
- You're free to use any stack, and library of your choice. Use whatever you can get your hands on, on the internet!
- We love out of the box solutions. We prefer to call it *Jugaad* 
- This might be just the first round, but carries the most importance of all. Give your best, and we hope you have a fun time solving this problem.

## ✨ **Problem Statement: Crafting a CSV Importer for Google Sheets** ✨

**Context**:
Data analysts around the world 🌍, handle massive amounts of data to derive meaningful insights for their organization 📊. Among the tools they use, Google Sheets 📈 stands out due to its ease of use, accessibility, and collaborative features. However, many analysts have identified a recurring pain point: the cumbersome process of importing CSV files into Google Sheets repeatedly.

A typical week of an analyst in an e-commerce company 🛒 involves receiving multiple CSV files 📁 containing sales, inventory, customer feedback, and more. The data from these files needs to be meticulously analyzed and presented in the company’s weekly meetings. However, instead of diving directly into analysis, most analysts need to spend an inordinate amount of time just importing and structuring these CSV files into Google Sheets ⏳. This repetitive, time-consuming task reduces the efficiency of these professionals and delays the extraction of crucial insights 😫.

**Today, you are going to make their lives better.**

**Problem Statement**:
Make a CSV Importer for Google Sheets that lets users drag and drop CSV files onto the Google Sheet. The moment they drop the CSV file, allow them to select which columns to import 🗂️.

You get brownie points 🍪 if you can make it even easier by allowing them to filter the data as well before importing it into Google Sheets 🔍.
# Develoepd a Google Chrome extension which detects when user tries to draga  fiel and uplaods in the google spreadsheet
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

## Version-II: adding more featrues tot he extension by saving the dropped CSv file
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
**Other pointers**:
- Import to Sheet – After validation and mapping, devise a method to populate the data into a chosen Google Sheet, either appending to existing data or creating a new sheet 📥📋.
- Optimize for Large Files – Large datasets are common in analytics. Your solution should effectively handle large CSV files (~15MB CSV file) without causing performance issues or prolonged waiting times 📈📦.

## Submission ⏰
The timeline for this submission is: **9AM, 30th Sept, 2023 - 12PM, 2nd Oct, 2023**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [ ] My code's working just fine! 🥳
- [ ] I have recorded a video showing it working and embedded it in the README ▶️
- [ ] I have tested all the normal working cases 😎
- [ ] I have even solved some edge cases (brownie points) 💪
- [ ] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get something of help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore 😛

## Developer's Section
*Add your video here, and your approach to the problem (optional). Leave some comments for us here if you want, we will be reading this :)*
