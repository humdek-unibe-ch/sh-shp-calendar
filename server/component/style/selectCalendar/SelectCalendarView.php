<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<?php
require_once __DIR__ . "/../../../../../../component/style/select/SelectView.php";

/**
 * The view class of the select form style component.
 * See SelectComponent for more details.
 */
class SelectCalendarView extends SelectView
{
    /* Private Properties *****************************************************/

    /* Constructors ***********************************************************/

    /**
     * The constructor.
     *
     * @param object $model
     *  The model instance of a base style component.
     */
    public function __construct($model)
    {
        parent::__construct($model);
    }

    /* Private Methods ********************************************************/

    /* Public Methods ********************************************************/

    public function output_content_mobile()
    {
        $style = parent::output_content_mobile();
        $style['style_name'] = 'select';
        $style['disabled']['content'] = 0;
        return $style;
    }
}
?>
