$(document).ready(function () {
    initCalendars();
});


function initCalendars() {
    $('#calendars-holder .card-header a').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of the link (e.g., navigating to a new page)
        addNewCalendar();
    });
}

function addNewCalendar(){
    $('input[name="selected_record_id"]').remove(); // remove the selected record if it is there
    $('input[name="delete_record_id"]').remove(); // remove the delete record if it is there
    $("#calendar").modal();
}