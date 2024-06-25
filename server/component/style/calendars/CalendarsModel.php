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
class CalendarsModel extends FormUserInputModel
{
    /* Private Properties *****************************************************/

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
    }

    /* Private Methods *********************************************************/

    /* Public Methods *********************************************************/

    /**
     * Get the calendars
     * @return array
     * Return array with the calendars
     */
    public function get_calendars()
    {
        return $this->user_input->get_data($this->section_id, '', true);
    }
}
