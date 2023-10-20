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