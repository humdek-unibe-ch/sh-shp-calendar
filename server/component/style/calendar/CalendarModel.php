<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<?php
require_once __DIR__ . "/../../../../../../component/style/formUserInput/FormUserInputModel.php";
require_once __DIR__ . "/../../../../../../component/style/StyleComponent.php";

/**
 * This class is used to prepare all data related to the calendar style
 * components such that the data can easily be displayed in the view of the
 * component.
 */
class CalendarModel extends FormUserInputModel
{
    /* Private Properties *****************************************************/

    /**
     * All events in the calendar
     */
    private $events;

    /* Constructors ***********************************************************/

    /**
     * The constructor fetches all session related fields from the database.
     *
     * @param array $services
     *  An associative array holding the different available services. See the
     *  class definition base page for a list of all services.
     * @param int $id
     *  The section id of the navigation wrapper.
     * @param array $params
     *  The list of get parameters to propagate.
     * @param number $id_page
     *  The id of the parent page
     * @param array $entry_record
     *  An array that contains the entry record information.
     */
    public function __construct($services, $id, $params, $id_page, $entry_record)
    {
        parent::__construct($services, $id, $params, $id_page, $entry_record);
        $this->fetch_events();
    }

    /* Private Methods *********************************************************/

    /**
     * Fetch events from DB
     * @return array
     * Return array with the events
     */
    private function fetch_events()
    {
        $this->events = $this->user_input->get_data($this->section_id, 'AND deleted = 0', true, FORM_INTERNAL);
        $calendars = array();
        $config = $this->get_db_field('config');
        if (isset($config['form_calendars'])) {
            $form_calendars = $config['form_calendars'];
            $form_id = $this->user_input->get_form_id($form_calendars);
            if ($form_id) {
                $calendars = $this->user_input->get_data($form_id, 'AND deleted = 0');
            }
        }

        foreach ($this->events as $key => $event) {
            foreach ($event as $event_key => $value) {
                // add all values with _ and they will be added to the extended properties of the calendar
                $this->events[$key]['_' . $event_key] = $value;
                if ($event_key == 'calendar' && $value) {
                    foreach ($calendars as $item) {
                        if (isset($item['record_id']) && $item['record_id'] == $value) {
                            // Found the matching item
                            $this->events[$key]['calendar_info'] = $item;
                            break; // Exit the loop since we found the item
                        }
                    }
                }
            }
        }
    }

    /* Public Methods *********************************************************/

    /**
     * Get the events
     * @return array
     * Return array with the events
     */
    public function get_events()
    {
        return $this->events;
    }
}
