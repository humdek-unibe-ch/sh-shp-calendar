# v1.1.3
### New Features
 - load plugin version using `BaseHook` class

### Bugfix
 - properly load select field inputs in `calendar` modal form for editing.
 - add css class for calendar form in edit mode

# v1.1.2
 - add `initialView` in `config` for style `calendar`. The values can be seen [here](https://fullcalendar.io/docs/initialView). If no value is set, the default one is `dayGridMonth`
 - add `headerToolbar_start`, `headerToolbar_center` and `headerToolbar_end` in `config` for style `calendar`. The values can be seen [here](https://fullcalendar.io/docs/headerToolbar)

# v1.1.1
 - fix css files
 - remove `calendar_source` field from the example: `calendar_and_calendars_example.json`

# v1.1.0 - Requires SelfHelp 6.5.0+
### New Features
 - rework calendar. Now it is based  on [FullCalendar](https://fullcalendar.io) library
 - add new style `calendars`, where the user can set their calendars, later they can be used for entering events on the `calendar` style
 - add new style `selectCalendar`, which can load calendars from forms. It requires input with name `calendar_name`

# v1.0.0

### New Features

 - The calendar style plugin
