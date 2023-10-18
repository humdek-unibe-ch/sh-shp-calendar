/**
 * The calendar object for fullcalendar.js.
 * @type {object}
 */
var calendar;

/**
 * Initialize the fullcalendar.js calendar on document ready.
 * @function
 * @returns {void}
 */
$(document).ready(function () {
    init_calendar_tasks();
});

/**
 * Initialize the fullcalendar.js calendar.
 * @function
 * @returns {void}
 */
function init_calendar_tasks() {
    var scheduled_events = $("#scheduled-jobs-events").data('scheduled-jobs');
    calendar = new FullCalendar.Calendar($('.scheduled-jobs-calendar-view')[0], {
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap',
        headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        },
        weekNumbers: true,
        weekNumberFormat: {
            week: 'long'
        },
        height: 'auto',
        firstDay: 1,
        eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
        // events: prepare_scheduled_events(scheduled_events),
        eventContent: function (info) {
            var dot = document.createElement('div');
            $(dot).addClass('fc-daygrid-event-dot');
            var time = document.createElement('div');
            $(time).addClass('fc-event-time');
            time.innerHTML = info.event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }) + " <span>[" + info.event.extendedProps.type_code + "]</span>";
            var title = document.createElement('div');
            $(title).addClass('fc-event-title');
            title.innerHTML = info.event.title;
            return { domNodes: [dot, time, title] }
        },
        eventDidMount: (info) => {
            info.el.className = info.el.className + " context-menu-event";
            $(info.el).attr("data-event", JSON.stringify(info.event));
        }
    });
    calendar.render();
}