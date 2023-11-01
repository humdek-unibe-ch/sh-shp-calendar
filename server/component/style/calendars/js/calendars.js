$(document).ready(function () {
    initCalendars();
});


function initCalendars() {
    $('#calendars-holder .card-header a').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of the link (e.g., navigating to a new page)
        showCalendarModal();
    });
}

function showCalendarModal(){
    $("#calendar").modal();
}