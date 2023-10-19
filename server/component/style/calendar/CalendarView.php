<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<?php
require_once __DIR__ . "/../../../../../../component/style/StyleView.php";

/**
 * The view class of the button style component.
 * This style components allows to represent a link as a button.
 */
class CalendarView extends StyleView
{
    /* Private Properties *****************************************************/

    /* Constructors ***********************************************************/

    /**
     * The constructor.
     *
     * @param object $model
     *  The model instance of the component.
     */
    public function __construct($model)
    {
        parent::__construct($model);
    }

    /* Public Methods *********************************************************/

    /**
     * Get js include files required for this component. This overrides the
     * parent implementation.
     *
     * @return array
     *  An array of js include files the component requires.
     */
    public function get_js_includes($local = array())
    {
        if (empty($local)) {
            $local = array(
                __DIR__ . "/js/01_full-calendar-v6-1-5.min.js",
                __DIR__ . "/js/02_bootstrap-full-calendar-v6-1-5.global.min.js",
                __DIR__ . "/js/03_jquery.contextMenu.min.js",
                __DIR__ . "/js/calendar.js"
            );
        }
        return parent::get_js_includes($local);
    }

    /**
     * Render the style view.
     */
    public function output_content()
    {
        // require __DIR__ . "/tpl_calendar.php";

        $container = new BaseStyleComponent("div", array(
            "css" => "scheduled-jobs-calendar-view"
        ));
        $container->output_content();
    }
}
?>
