<?php
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
?>
<div id="calendars-holder" class="<?php echo $this->css; ?>">
    <?php $this->output_calendars(); ?>
    <?php $this->output_new_calendar_modal() ?>        
    <?php $this->output_edit_calendar_modal() ?>   
</div>