-- update plugin entry in the plugin table
UPDATE `plugins`
SET version = 'v1.1.0'
WHERE `name` = 'calendar';

-- Crate new style group
INSERT IGNORE INTO `styleGroup` (`id`, `name`, `description`, `position`) VALUES (NULL, 'Mobile', 'Styles that are only used by the mobile application', '79');

-- add new field label_calendar_add_event
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_calendar_add_event', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_calendar_add_event'), 'Add event', 'Label for the button to add new event to the calendar');

-- add new field label_list
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_list', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_list'), 'List', 'Label for the button to show the events as list in the calendar');

-- add new field label_today
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_today', get_field_type_id('text'), '1');
-- add field label_calendar_add_event to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_today'), 'Today', 'Label for the button to reset the calendat view to `today`');

-- add field children to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `help`) VALUES (get_style_id('calendar'), get_field_id('children'), 'Children that can be added to the style. It is used to design how the calendar entry form will work. It does not require a form.');

-- add field name to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `help`) VALUES (get_style_id('calendar'), get_field_id('name'), 'The name of the form where the replies will be stored.');

-- add field is_log to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`, `hidden`) VALUES (get_style_id('calendar'), get_field_id('is_log'), 1, 'This field allows to control how the data is saved in the database:
 - `disabled`: The submission of data will always overwrite prior submissions of the same user. This means that the user will be able to continously update the data that was submitted here. Any input field that is used within this form will always show the current value stored in the database (if nothing has been submitted as of yet, the input field will be empty or set to a default).
 - `enabled`: Each submission will create a new entry in the database. Once entered, an entry cannot be removed or modified. Any input field within this form will always be empty or set to a default value (nothing will be read from the database).', 1);

UPDATE styles
SET id_type = 2
WHERE `name` = 'calendar';