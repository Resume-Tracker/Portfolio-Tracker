# Sprint 3 Plan

Product name: Portfolio Tracker
Team name: The Portfolio Trackers

## Goal:
Main goal for this sprint will be adding rows and columns to our database to track when a visitor has reached the end of the page. Continuation of user story to visualize which companies viewed which pages.

## Tasks:
 - (3) As a user, I want to be able to visualize which companies viewed which pages.
   - Make API endpoint to get JSON file by company names and views made by that company (3 hours)
   - Visualize company visits with a table with amount of unique views from each company (3 hours)
 - (13) As a user, I want to be able to know page viewers got to the end of the page
   - Change “Pageloads” table to use UUIDs for the id column and include an optional column indicating when end of the page was reached (2h)
   - Write an endpoint that alters the end of page column (2h)
   - Write script that sends a constant “{{ ID }}” to an endpoint when the bottom of the page is reached (5h)
   - Alter “/addrows” to use new Pageloads id and send templated script with UUID inserted (2h)
   - Build API for pretty graphs (2h)
   - Build pretty graphs. Add an extra column to companies table containing percentage of users per company that reached the end of the page. (5h)
## Spikes:
 - As a developer, I need to learn how to figure out when a person reaches the end of the page that we want to track.
 - As a developer, I need to learn about DOM events
 - As a developer, I need to learn about UUID’s


## Team Roles:
Jesus : Back end developer
Michael : Back end developer
Herbert : Front end developer
Kenneth : Back end developer
Timothy : Front end developer

## Initial Task Assignment:
Jesus: Make API endpoint to get JSON file by company names and views made by that company 
Michael: Write script that sends id constant on end of page
Herbert: Finish up integrating the table into the website
Kenneth: Change ‘Pageloads’ table to use UUIDs for the id column and include an optional column indicating whether the end of the page was reached.
Timothy: Build pretty graphs. Add an extra column to companies table containing percentage of users per company that reached the end of the page.

## Initial Burnup Chart:
https://resume-tracker.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=PT&view=reporting&chart=burnupChart&sprint=8&estimate=field_customfield_10028

## Initial Scrum Board:
https://resume-tracker.atlassian.net/secure/RapidBoard.jspa?projectKey=PT&rapidView=8

## Scrum Times:
Monday - 10:30am
Wednesday - 10:30am
Friday - 4:00pm
