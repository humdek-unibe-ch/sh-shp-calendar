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
                __DIR__ . "/js/calendars.js"
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
            __DIR__ . "/css/calendar.css"
        );
        return parent::get_css_includes($local);
    }

    /**
     * Render the style view.
     */
    public function output_content()
    {
        if (
            method_exists($this->model, "is_cms_page") && $this->model->is_cms_page() &&
            method_exists($this->model, "is_cms_page_editing") && $this->model->is_cms_page_editing()
        ) {
            // show the children in edit mode only. 
            $this->output_children();
        }
        require __DIR__ . "/tpl_calendars.php";
    }

    /**
     * render calendars list
     */
    public function output_calendars()
    {
        $calendars = $this->model->get_calendars();
        $children = array();
        foreach ($calendars as $key => $value) {
            $div = new BaseStyleComponent("div", array(
                "css" => "calendar-row border-bottom mb-1 p-2 d-flex justify-content-between",
                "children" => array(
                    new BaseStyleComponent("markdownInline", array(
                        "css" => "calendar-name",
                        "text_md_inline" => $value['name']
                    )),
                    new BaseStyleComponent("button", array(
                        "css" => "calendar-edit-btn btn-sm",
                        "label" => $this->get_field_value('label_edit_calendar'),
                        "data" => $value,
                        "url" => "#"
                    ))
                )
            ));
            $children[] = $div;
        };
        $calendars_card = new BaseStyleComponent("card", array(
            "title" => $this->get_field_value('label_card_title_calendars'),
            "is_expanded" => true,
            "is_collapsible" => false,
            "url_edit" => "#",
            "children" => $children
        ));
        $calendars_card->output_content();
    }

    /**
     * render modal form in a card view for the event
     */
    public function output_calendar_modal()
    {
        $this->propagate_input_field_settings($this->form_children, false);
        $children = $this->form_children;
        $delete_calendar = new BaseStyleComponent("form", array(
            "label" => $this->get_field_value('label_delete_calendar'),
            "type" => 'danger',
            "url" => $_SERVER['REQUEST_URI'] . '#section-' . $this->id_section,
            "children" => array(
                new BaseStyleComponent("input", array(
                    "type_input" => "hidden",
                    "name" => "__form_name",
                    "value" => htmlentities($this->name),
                )),
                new BaseStyleComponent("input", array(
                    "type_input" => "hidden",
                    "name" => DELETE_RECORD_ID,
                    "value" => null,
                ))
            ),
            "css" => "delete-calendar-form d-none",
            "id" => $this->id_section,
        ));
        $children[] = new BaseStyleComponent("input", array(
            "type_input" => "hidden",
            "name" => "__form_name",
            "value" => htmlentities($this->name),
        ));
        $children[] = new BaseStyleComponent("input", array(
            "type_input" => "hidden",
            "name" => SELECTED_RECORD_ID,
            "value" => null,
        ));
        $form = new BaseStyleComponent("form", array(
            "label" => "Save",
            "type" => $this->type,
            "url" => $_SERVER['REQUEST_URI'] . '#section-' . $this->id_section,
            "children" => $children,
            "css" => "calendar-form",
            "id" => $this->id_section,
        ));
        $modal = new BaseStyleComponent('modal', array(
            'id' => 'calendar',
            'title' => $this->get_field_value('label_calendar'),
            'children' => array(
                $form, $delete_calendar
            ),
        ));

        $modal->output_content();
    }
}
?>
