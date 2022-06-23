-- add plugin entry in the plugin table
INSERT IGNORE INTO plugins (name, version) 
VALUES ('calendar', 'v1.0.0');

-- Crate new style group
INSERT IGNORE INTO `styleGroup` (`id`, `name`, `description`, `position`) VALUES (NULL, 'Mobile', 'Styles that are only used by the mobile application', '79');

-- Add new style calendar
INSERT IGNORE INTO `styles` (`name`, `id_type`, id_group, description) VALUES ('calendar', '1', (select id from styleGroup where `name` = 'Mobile' limit 1), 'Calendar style');
-- add field css to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('css'), NULL, 'Allows to assign CSS classes to the root item of the style.');
-- add field config to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('config'), NULL, 'Define the configuration of the calendar. Refer to the documentation of [Ionic2-Calendar](https://github.com/twinssbc/Ionic2-Calendar) for more information');
-- add field title to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('title'), NULL, 'Title of the calendar component');
-- add new field label_month
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_month', get_field_type_id('text'), '1');
-- add new field label_week
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_week', get_field_type_id('text'), '1');
-- add new field label_day
INSERT IGNORE INTO `fields` (`id`, `name`, `id_type`, `display`) VALUES (NULL, 'label_day', get_field_type_id('text'), '1');
-- add field label_month to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_month'), NULL, 'Label for the month button');
-- add field label_week to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_week'), NULL, 'Label for the week button');
-- add field label_day to style calendar
INSERT IGNORE INTO `styles_fields` (`id_styles`, `id_fields`, `default_value`, `help`) VALUES (get_style_id('calendar'), get_field_id('label_day'), NULL, 'Label for the day button');