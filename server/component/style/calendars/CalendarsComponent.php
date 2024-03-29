<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<?php
require_once __DIR__ . "/../../../../../../component/BaseComponent.php";
require_once __DIR__ . "/../../../../../../component/style/formUserInput/FormUserInputController.php";

/**
 * A component class for a Calendar style component. This style is intended
 * to handle user input.
 *
 * - Persistent user input is stored to the database and made available to the
 * user for continuous modification.
 * - Journal user input is stored to the database together with a timestamp and
 * cannot be changed afterwards.
 */
class CalendarsComponent extends BaseComponent
{
    /* Constructors ***********************************************************/

    /**
     * The constructor creates an instance of the Model class and the View
     * class and passes the view instance to the constructor of the parent
     * class.
     *
     * @param array $services
     *  An associative array holding the different available services. See the
     *  class definition base page for a list of all services.
     * @param int $id
     *  The section id of this navigation component.
     * @param array $params
     *  The list of get parameters to propagate.
     * @param number $id_page
     *  The id of the parent page
     * @param array $entry_record
     *  An array that contains the entry record information.
     */
    public function __construct($services, $id, $params, $id_page, $entry_record)
    {
        $model = new CalendarsModel($services, $id, $params, $id_page, $entry_record);
        $controller = null;
        if(!$model->is_cms_page())
            $controller = new FormUserInputController($model, -1);
        $view = new CalendarsView($model, $controller);

        parent::__construct($model, $view, $controller);
        if ($this->controller && !isset($_POST[ENTRY_RECORD_ID])) {
            // dont execute it if it is from entry; It will be handled later
            $this->controller->execute();            
        }
    }
}
?>
