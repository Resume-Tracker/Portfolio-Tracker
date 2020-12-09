# Sprint 4 Plan

Product name: Portfolio Tracker
Team name: The Portfolio Trackers

## Goal:
Finish up tasks from last sprint
Complete the account system
If there’s time, complete the email tracker

## Tasks:
 - (13) As a user, I want to have my data protected by an account system
   - On each page of the app check if the user is logged in and if not load the login (5h)
   - Create login dialog (5h)
   - Create a users table (2h)
   - Create session table (2h)
   - Create a script to add users (This is a shell script) passwords should be hashed with a good password hash like argon2 (5h)
   - Create an endpoint to check if the user is logged in (2h)
   - Create a login endpoint that accepts usernames and passwords, creates a session row, and sets a session cookie (5h)
   - Create a logout endpoint (2h)
   - Create function that takes a request object and checks for a valid session (5h)
   - Check for logged in session on API endpoints (3h)
 - (8) As a user, I want to be able to know if emails to recruiters have been read.
   - Add main menu page (5h)
   - Add a table for tracking pixels containing uuid, name, and reader (2h)
   - Add endpoint that records when a pixel has been loaded (2h)
   - Add page to create tracking pixel link (5h)
   - Add endpoint to create row in tracking pixel table and give link (2h)
   - API for getting list of tracking pixels (2h)
   - Add page to display list of tracking pixels (5h)
   - API for getting how many times pixel loaded (2h)
   - Add page to display how many times if any the tracking pixel has been loaded (5h)
   
## Spikes:
 - As a developer, I want to learn about cookies and sessions
 - As a developer, I want to learn about Fernet/Branca

## Team Roles:
Jesus : Back end developer
Michael : Back end developer
Herbert : Front end developer
Kenneth : Back end developer
Timothy : Front end developer

## Initial Task Assignment:
Jesus : Create a script to add users
Michael : Create users table
Herbert : Check if user is logged in on each page
Kenneth : Create a sessions table
Timothy : Create login page

## Initial Burnup Chart:
https://resume-tracker.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=PT&view=reporting&chart=burnupChart&sprint=9&estimate=field_customfield_10028

## Initial Scrum Board:
https://resume-tracker.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=PT&selectedIssue=PT-49

## Scrum Times:
Monday - 10:45am
Wednesday - 10:45am
Friday - 4:00pm
