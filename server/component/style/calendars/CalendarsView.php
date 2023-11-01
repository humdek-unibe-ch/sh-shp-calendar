<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<?php
require_once __DIR__ . "/../../../../../../component/style/formUserInput/FormUserInputView.php";

/**
 * The view class of the button style component.
 * This style components allows to represent a link as a button.
 */
class CalendarsView extends FormUserInputView
{
    /* Private Properties *****************************************************/

    /* Constructors ***********************************************************/

    /**
     * The constructor.
     *
     * @param object $model
     *  The model instance of the component.
     */
    public function __construct($model, $controller)
    {
        parent::__construct($model, $controller);
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
                // __DIR__ . "/js/01_full-calendar-v6-1-5.min.js",
                // __DIR__ . "/js/02_bootstrap-full-calendar-v6-1-5.global.min.js",
                // __DIR__ . "/js/calendar.js"
            );
        }
        return parent::get_js_includes($local);
    }

    /**
     * Get css include files required for this component. This overrides the
     * parent implementation.
     *
     * @return array
     *  An array of css include files the component requires.
     */
    public function get_css_includes($local = array())
    {
        $local = array(
            // __DIR__ . "/css/event-calendar.min.css",
            // __DIR__ . "/css/calendar.css"
        );
        return parent::get_css_includes($local);
    }

    /**
     * Render the style view.
     */
    public function output_content()
    {
        require __DIR__ . "/tpl_calendars.php";
    }

    /**
     * render calendars list
     */
    public function output_calendars()
    {
        $calendars_card = new BaseStyleComponent("card", array(
            "title" => "Calendars",
            "is_expanded" => true,
            "is_collapsible" => false
        ));
        $calendars_card->output_content();
    }

    /**
     * render modal form in a card view for the event
     */
    public function output_event_modal()
    {
        // $this->propagate_input_field_settings($this->form_children, false);
        // $children = $this->form_children;
        // $delete_event = new BaseStyleComponent("form", array(
        //     "label" => $this->get_field_value('label_calendar_delete_event'),
        //     "type" => 'danger',
        //     "url" => $_SERVER['REQUEST_URI'] . '#section-' . $this->id_section,
        //     "children" => array(
        //         new BaseStyleComponent("input", array(
        //             "type_input" => "hidden",
        //             "name" => "__form_name",
        //             "value" => htmlentities($this->name),
        //         )),
        //         new BaseStyleComponent("input", array(
        //             "type_input" => "hidden",
        //             "name" => 'delete_record_id',
        //             "value" => null,
        //         ))
        //     ),
        //     "css" => "delete-event-form",
        //     "id" => $this->id_section,
        // ));
        // $children[] = new BaseStyleComponent("input", array(
        //     "type_input" => "hidden",
        //     "name" => "__form_name",
        //     "value" => htmlentities($this->name),
        // ));
        // $children[] = new BaseStyleComponent("input", array(
        //     "type_input" => "hidden",
        //     "name" => SELECTED_RECORD_ID,
        //     "value" => null,
        // ));
        // $form = new BaseStyleComponent("form", array(
        //     "label" => "Save",
        //     "type" => $this->type,
        //     "url" => $_SERVER['REQUEST_URI'] . '#section-' . $this->id_section,
        //     "children" => $children,
        //     "css" => "event-form",
        //     "id" => $this->id_section,
        // ));
        // $modal = new BaseStyleComponent('modal', array(
        //     'id' => 'calendar-event',
        //     'title' => $this->get_field_value('label_calendar_event'),
        //     'children' => array(
        //         $form, $delete_event
        //     ),
        // ));

        // $modal->output_content();
    }
}
?>
