# Sprint 2 Plan

Product name: Portfolio Tracker
Team name: The Portfolio Trackers

## Goal:
Goal for sprint 2 is to finish up some user stories from sprint 1 as well as tackle new user stories we had planned previously.
The new user stories for sprint 2 will mostly be focused on trying to figure out what company our visitors are associated with and visualize it to the user. 

## Tasks:
 - (1) As a user, I want to be able to visualize how much traffic my portfolio has received.
    - Write a simple UI that generate a line chart using data from database JSON data query (3 hours)
 - (1) As a user, I want to be able to select a range and see my website traffic within that date.
    - Add date picker fields to UI and enable rest calls with date ranges (1.5 hours)
 - (3) As a customer, I want to be able to embed the tracker into my website without causing HTML validation errors.
    - Convert endpoint to return PNG (15 minutes)
    - Setup pytest (1 hour)
    - Test that endpoint returns PNG and that adds db row (1 hour)
 - (5) As a user, I want to be able to find out what companies viewed which pages.
    - Use IP Address to lookup company from a DNS query (1 hour)
    - Filter return for unwanted domains (1 hour)
    - Simplify domain (2 hours)
    - Call IP lookup sequence from the view endpoint (1 hour)
    - Creating some form of testing to make sure we get the correct company on visit (3 hours)
 - (3) As a user, I want to be able to visualize which companies viewed which pages.
    - Make API endpoint to get JSON file by company names and views made by that company (3 hours)
    - Visualize company visits with a table with amount of unique views from each company (3 hours)

## Spikes:
 - As a developer, I will need to learn how to use a DNS pointer in order to track which companies visited my portfolio.


## Team Roles:
Jesus : Back end developer

Michael : Back end developer

Herbert : Front end developer

Kenneth : Back end developer

Timothy : Front end developer

## Initial Task Assignment:
Jesus : 

Michael : Convert endpoint to return PNG

Herbert : Finish up the line chart that plots JSON data from the database

Kenneth : Look up DNS pointer record for IP

Timothy : Add date range selector to UI

## Initial Burnup Chart:
https://resume-tracker.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=PT&view=reporting&chart=burnupChart&sprint=7&estimate=field_customfield_10028

## Initial Scrum Board:
https://resume-tracker.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=PT

## Scrum Times:
Monday - 10:30am
Wednesday - 10:30am
Friday - 4:00pm

