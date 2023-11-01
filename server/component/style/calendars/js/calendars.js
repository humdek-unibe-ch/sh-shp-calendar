$(document).ready(function () {
    initCalendars();
});

//show modal for edit calendar and adjust the values before show
function initCalendars() {
    $('#calendars-holder .card-header a').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of the link (e.g., navigating to a new page)
        addNewCalendar();
    });
    $('#calendars-holder .calendar-edit-btn').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of the link (e.g., navigating to a new page)
        var calendarRecord = $(this).data('data');
        $('#edit-calendar input[name="selected_record_id"]').val(calendarRecord['record_id']);
        $('#edit-calendar input[name="delete_record_id"]').val(calendarRecord['record_id']);
        Object.keys(calendarRecord).forEach(key => {
            $('#edit-calendar input[name="' + key + '[value]"]').val(calendarRecord[key]); //check if there is an input with that name
        });
        $("#edit-calendar").modal();
    });
}

// show modal for new calendar
function addNewCalendar() {
    $("#new-calendar").modal();
}