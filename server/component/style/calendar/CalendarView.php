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
class CalendarView extends FormUserInputView
{
    /* Private Properties *****************************************************/

    /**
     * the children fields for the modal view
     */
    private $form_children;

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
        $this->form_children = $this->model->get_children();
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

    public function output_event_entry()
    {
        $res = new BaseStyleComponent(
            "div",
            array(
                "children" => array(
                    new BaseStyleComponent("button", array(
                        "label" => "View",
                        "css" => "flex-grow-0 mb-3",
                        "id" => "scheduled-jobs-view-calendar-btn",
                        "url" => $this->model->get_link_url("moduleScheduledJobsCalendar", array("uid" => ":uid", "aid" => ":aid")),
                        "type" => "primary",
                    ))
                )
            )
        );
    }

    /**
     * Render the style view.
     */
    public function output_content()
    {
        $calendar_values = [];
        $calendar_values['label_calendar_add_event'] = $this->get_field_value('label_calendar_add_event');
        $calendar_values['label_month'] = $this->get_field_value('label_month');
        $calendar_values['label_week'] = $this->get_field_value('label_week');
        $calendar_values['label_day'] = $this->get_field_value('label_day');
        $calendar_values['label_today'] = $this->get_field_value('label_today');
        $calendar_values['locale'] = isset($_SESSION['user_language_locale']) ? substr($_SESSION['user_language_locale'], 0, 2) : 'de';
        require __DIR__ . "/tpl_calendar.php";

        $this->output_children();
        $this->output_modal();
    }

    /**
     * render modal form in a card view
     */
    private function output_modal()
    {
        $this->propagate_input_field_settings($this->form_children, true);
        $children = $this->form_children;
        $children[] = new BaseStyleComponent("input", array(
            "type_input" => "hidden",
            "name" => "__form_name",
            "value" => htmlentities($this->name),
        ));
        $form = new BaseStyleComponent("form", array(
            "label" => "Save",
            "type" => $this->type,
            "url" => $_SERVER['REQUEST_URI'] . '#section-' . $this->id_section,
            "children" => $children,
            "css" => "",
            "id" => $this->id_section,
        ));
        $modal = new BaseStyleComponent('modal', array(
            'id' => 'modal',
            'title' => "Please enter your input",
            'children' => array($form),
        ));

        $modal->output_content();
    }
}
?>
