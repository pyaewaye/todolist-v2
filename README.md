# To Do List App
This is a To Do List app to maintain your day-to-day tasks. You can also create custom to-do-list simply by appending /list/YourCustomListName in the url. Fill in the item and click + button to add, tick the checkbox to remove the item. 

# Try it out online 
This service uses free plan hosting and can cause a delay of up to 30 seconds on first load.
https://todolist-ut3j.onrender.com

### Dependencies
To run the project on the local machine, set up database on MongoDB Atlas, create .env file, install and require dotenv package in app.js or host and connect to MongoDB database locally by installing the MongoDB Community Server Edition.

## Version History

* 0.2
    * Custom list route fix (added /list before the custom list name to not automatically match with any top level http request and create unwanted custom lists in the database) and updated about page.
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## Acknowledgments

This is my practice-project from Dr.Angela Yu's Web Developer Bootcamp.
