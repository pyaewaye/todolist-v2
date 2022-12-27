# To Do List App
This is a To Do List app to maintain your day-to-day tasks. Other than the main to-do page, you can also create custom to-do pages simply by appending /list/YourCustomListName in the url. Fill in the task and click + button to add, check it out to remove. For every new page, suggested 3 default tasks for you!

#Try it out online
Start planning your daily tasks and get organised anytime, anywhere at the following link. This service uses free plan hosting and can cause a delay of up to 30 seconds on first load. Multi-users feature currently not available.
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
