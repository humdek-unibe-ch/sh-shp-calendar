# SelfHelp plugin - calendar

This is a Selfhelp Plugin that is used for presenting a calendar for the mobile app

# Installation

 - Download the code into the `plugin` folder
 - Checkout the latest version 
 - Execute all `.sql` script in the DB folder in their version order

# Config
 - JSON structure for `calendar`:  
 `{
    "css": "class name",
    "events": {
        "title": "your_title_input_name",
        "description": "your_description_input_name",
        "start": "your_start_date_input",
        "class_name": "your_class_name_input"
    }
 }`
 - `show_add_calendar_button` - enable for calendars button. Then a style `calendars` should be loaded on the page
 - style `calendars` requires input with name `calendar_name`


 Full calendar events properties can be seen [here](https://fullcalendar.io/docs/event-object)

# Requirements

 - SelfHelp v6.5.0+
