-- update plugin entry in the plugin table
UPDATE `plugins`
SET version = 'v1.1.0'
WHERE `name` = 'calendar';



-- add new field label_calendar_add_event
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_calendar_add_event', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_calendar_add_event'), 'Add event', 'Label for the button to add new event to the calendar');

-- add new field label_calendar_delete_event
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_calendar_delete_event', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_calendar_delete_event'), 'Delete', 'Label for the button to delete an event');

-- add new field label_add_calendar
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_add_calendar', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_add_calendar'), 'Add calendar', 'Label for the button to add new calendar');

-- add new field label_list
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_list', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_list'), 'List', 'Label for the button to show the events as list in the calendar');

-- add new field label_today
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_today', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_today'), 'Today', 'Label for the button to reset the calendat view to `today`');

-- add new field label_add_event
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_add_event', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_add_event'), 'Add', 'Label for adding new event');

-- add new field label_edit_event
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_edit_event', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_edit_event'), 'Edit', 'Label for editing an exisitng event');

-- add new field label_calendar_event
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_calendar_event', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_calendar_event'), 'Calendar Event', 'Label for the calendar event modal form');

-- add field children to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `help`) VALUES (get_style_id('calendar'), get_field_id('children'), 'Children that can be added to the style. It is used to design how the calendar entry form will work. It does not require a form.');

-- add field name to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `help`) VALUES (get_style_id('calendar'), get_field_id('name'), 'The name of the form where the calendar events will be stored.');

-- add field css_mobile
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('css_mobile'), NULL, 'Allows to assign CSS classes to the root item of the style for the mobile version.');

-- add field is_log to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`, `hidden`) VALUES (get_style_id('calendar'), get_field_id('is_log'), 1, 'This field allows to control how the data is saved in the database:
 - `disabled`: The submission of data will always overwrite prior submissions of the same user. This means that the user will be able to continously update the data that was submitted here. Any input field that is used within this form will always show the current value stored in the database (if nothing has been submitted as of yet, the input field will be empty or set to a default).
 - `enabled`: Each submission will create a new entry in the database. Once entered, an entry cannot be removed or modified. Any input field within this form will always be empty or set to a default value (nothing will be read from the database).', 1);

UPDATE styles
SET id_type = 2
WHERE `name` = 'calendar';

UPDATE styles_fields
SET `help` = 'Define the configuration of the calendar. Refer to the documentation of [Calendar Style](http://phhum-a209-cp.unibe.ch:10012/SLP/plugins/calendar/blob/master/README.md) for more information'
WHERE id_styles = get_style_id('calendar') AND id_fields = get_field_id('config');

-- add field redirect_at_end to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('redirect_at_end'), '#', 'Redirect to this url once the calendar entry is added');

UPDATE styles
SET id_group = (SELECT id FROM styleGroup WHERE `name` = 'Form' LIMIT 1)
WHERE `name` = 'calendar';

-- Add new style calendars
INSERT IGNORE INTO `styles` (`name`, `id_type`, id_group, description) VALUES ('calendars', '2', (SELECT id FROM styleGroup WHERE `name` = 'Form' LIMIT 1), 'Calendars style. View and add calendars.');

-- add field css to style calendars
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('css'), NULL, 'Allows to assign CSS classes to the root item of the style.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('css_mobile'), NULL, 'Allows to assign CSS classes to the root item of the style for the mobile version.');

-- add new field label_delete_calendar
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_delete_calendar', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('label_delete_calendar'), 'Delete', 'Label for the calendar delete button');

-- add new field label_calendar
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_calendar', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('label_calendar'), 'Calendar', 'Label for the calendar modal form');

-- add field children to style calendars
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `help`) VALUES (get_style_id('calendars'), get_field_id('children'), 'Children that can be added to the style. It is used to design how the calendars entry form will work. It does not require a form.');

-- add field name to style calendars
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `help`) VALUES (get_style_id('calendars'), get_field_id('name'), 'The name of the form where the calendars will be stored.');

-- add field is_log to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`, `hidden`) VALUES (get_style_id('calendars'), get_field_id('is_log'), 1, 'This field allows to control how the data is saved in the database:
 - `disabled`: The submission of data will always overwrite prior submissions of the same user. This means that the user will be able to continously update the data that was submitted here. Any input field that is used within this form will always show the current value stored in the database (if nothing has been submitted as of yet, the input field will be empty or set to a default).
 - `enabled`: Each submission will create a new entry in the database. Once entered, an entry cannot be removed or modified. Any input field within this form will always be empty or set to a default value (nothing will be read from the database).', 1);
 
 -- add new field label_card_title_calendars
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_card_title_calendars', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('label_card_title_calendars'), 'Calendars', 'Label for the card title for the calendars');

 -- add new field label_edit_calendar
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_edit_calendar', get_field_type_id('text'), '1');
-- add field label_edit_calendar to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('label_edit_calendar'), 'Edit', 'Label for the button for editing the calendar');

INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('condition'), NULL, 'The field `condition` allows to specify a condition. Note that the field `condition` is of type `json` and requires\n1. valid json syntax (see https://www.json.org/)\n2. a valid condition structure (see https://github.com/jwadhams/json-logic-php/)\n\nOnly if a condition resolves to true the sections added to the field `children` will be rendered.\n\nIn order to refer to a form-field use the syntax `"@__form_name__#__from_field_name__"` (the quotes are necessary to make it valid json syntax) where `__form_name__` is the value of the field `name` of the style `formUserInput` and `__form_field_name__` is the value of the field `name` of any form-field style.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('data_config'), '', 
'In this ***JSON*** field we can configure a data retrieve params from the DB, either `static` or `dynamic` data. Example: 
 ```
 [
	{
		"type": "static|dynamic",
		"table": "table_name | #url_param1",
        "retrieve": "first | last | all",
		"fields": [
			{
				"field_name": "name | #url_param2",
				"field_holder": "@field_1",
				"not_found_text": "my field was not found"				
			}
		]
	}
]
```
If the page supports parameters, then the parameter can be accessed with `#` and the name of the parameter. Example `#url_param_name`. 

In order to include the retrieved data in the input `value`, include the `field_holder` that wa defined in the markdown text.

We can access multiple tables by adding another element to the array. The retrieve data from the column can be: `first` entry, `last` entry or `all` entries (concatenated with ;);

`It is used for prefill of the default value`');

INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('condition'), NULL, 'The field `condition` allows to specify a condition. Note that the field `condition` is of type `json` and requires\n1. valid json syntax (see https://www.json.org/)\n2. a valid condition structure (see https://github.com/jwadhams/json-logic-php/)\n\nOnly if a condition resolves to true the sections added to the field `children` will be rendered.\n\nIn order to refer to a form-field use the syntax `"@__form_name__#__from_field_name__"` (the quotes are necessary to make it valid json syntax) where `__form_name__` is the value of the field `name` of the style `formUserInput` and `__form_field_name__` is the value of the field `name` of any form-field style.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('data_config'), '', 
'In this ***JSON*** field we can configure a data retrieve params from the DB, either `static` or `dynamic` data. Example: 
 ```
 [
	{
		"type": "static|dynamic",
		"table": "table_name | #url_param1",
        "retrieve": "first | last | all",
		"fields": [
			{
				"field_name": "name | #url_param2",
				"field_holder": "@field_1",
				"not_found_text": "my field was not found"				
			}
		]
	}
]
```
If the page supports parameters, then the parameter can be accessed with `#` and the name of the parameter. Example `#url_param_name`. 

In order to include the retrieved data in the input `value`, include the `field_holder` that wa defined in the markdown text.

We can access multiple tables by adding another element to the array. The retrieve data from the column can be: `first` entry, `last` entry or `all` entries (concatenated with ;);

`It is used for prefill of the default value`');

INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('debug'), 0, 'If *checked*, debug messages will be rendered to the screen. These might help to understand the result of a condition evaluation. **Make sure that this field is *unchecked* once the page is productive**.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendars'), get_field_id('debug'), 0, 'If *checked*, debug messages will be rendered to the screen. These might help to understand the result of a condition evaluation. **Make sure that this field is *unchecked* once the page is productive**.');

 -- add new field show_add_calendar_button
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'show_add_calendar_button', get_field_type_id('checkbox'), '0');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('show_add_calendar_button'), 0, 'If *checked*, it will show the button for add calendar. It requires style `calendars` to be loaded on the same page.');

-- Add new style selectCalendar
INSERT IGNORE INTO `styles` (`name`, `id_type`, id_group, description) VALUES ('selectCalendar', '2', (SELECT id FROM styleGroup WHERE `name` = 'Input' LIMIT 1), 'Expand select style and load calendar list for calendar selection');

-- add field css to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('css'), NULL, 'Allows to assign CSS classes to the root item of the style.');
-- add field css_mobile
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('css_mobile'), NULL, 'Allows to assign CSS classes to the root item of the style for the mobile version.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('condition'), NULL, 'The field `condition` allows to specify a condition. Note that the field `condition` is of type `json` and requires\n1. valid json syntax (see https://www.json.org/)\n2. a valid condition structure (see https://github.com/jwadhams/json-logic-php/)\n\nOnly if a condition resolves to true the sections added to the field `children` will be rendered.\n\nIn order to refer to a form-field use the syntax `"@__form_name__#__from_field_name__"` (the quotes are necessary to make it valid json syntax) where `__form_name__` is the value of the field `name` of the style `formUserInput` and `__form_field_name__` is the value of the field `name` of any form-field style.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('data_config'), '', 
'In this ***JSON*** field we can configure a data retrieve params from the DB, either `static` or `dynamic` data. Example: 
 ```
 [
	{
		"type": "static|dynamic",
		"table": "table_name | #url_param1",
        "retrieve": "first | last | all",
		"fields": [
			{
				"field_name": "name | #url_param2",
				"field_holder": "@field_1",
				"not_found_text": "my field was not found"				
			}
		]
	}
]
```
If the page supports parameters, then the parameter can be accessed with `#` and the name of the parameter. Example `#url_param_name`. 

In order to include the retrieved data in the input `value`, include the `field_holder` that wa defined in the markdown text.

We can access multiple tables by adding another element to the array. The retrieve data from the column can be: `first` entry, `last` entry or `all` entries (concatenated with ;);

`It is used for prefill of the default value`');

INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`)  VALUES (get_style_id('selectCalendar'), get_field_id('label'), '', 'Label for the select');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`)  VALUES (get_style_id('selectCalendar'), get_field_id('formName'), '', 'Select the form from where the calendars will be loaded.');
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('own_entries_only'), '1', 'If enabled the select list will load only the calendars entered by the user.');
-- add field name to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`, `hidden`) VALUES (get_style_id('selectCalendar'), get_field_id('name'),'calendar', 'The input name where the selected calendar will be stored. It is set by default to `calendar`', 1);
-- add field items to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`, `hidden`) VALUES (get_style_id('selectCalendar'), get_field_id('items'), NULL, 'The value is set by the system automatically!', 1);
-- add field is_required to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('is_required'),0 , 'If enabled the form can only be submitted if a value is entered in this input field.');
-- add field items to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`, `hidden`) VALUES (get_style_id('selectCalendar'), get_field_id('items'), NULL, 'The value is set by the system automatically!', 1);
-- add field allow_clear to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('allow_clear'), 0, 'If checked the select value can be cleared once set');
-- add field live_search to style selectCalendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('selectCalendar'), get_field_id('live_search'), 0, 'If checked the select component will have a live search text box which can filter the values');