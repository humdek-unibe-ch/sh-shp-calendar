<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<div id="calendar-holder">
    <div id="calendar-view" class="<?php echo $this->css; ?>" data-data='<?php echo json_encode($calendar_values); ?>' data-events="<?php echo htmlspecialchars(json_encode($this->model->get_events()), ENT_QUOTES, 'UTF-8'); ?>"> </div>
    <?php $this->output_edit_event_modal(); ?>
    <?php $this->output_add_event_modal(); ?>
</div>