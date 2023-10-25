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
    initCalendar();
});

/**
 * Initialize the fullcalendar.js calendar.
 * @function
 * @returns {void}
 */
function initCalendar() {
    var calendar_data = $('#calendar-view').data('data');
    var events = $('#calendar-view').data('events');
    $('#calendar-view').removeAttr('data-events');
    $('#calendar-view').removeAttr('data-data');
    console.log(events);
    calendar = new FullCalendar.Calendar($('#calendar-view')[0], {
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap',
        locale: calendar_data['locale'],
        headerToolbar: {
            left: 'prev,next,today,addEventButton',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        },
        buttonText: {
            today: calendar_data['label_today'],
            day: calendar_data['label_day'],
            week: calendar_data['label_week'],
            month: calendar_data['label_month'],
            list: calendar_data['label_list']
        },
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
        },
        weekNumbers: true,
        weekNumberFormat: {
            week: 'long'
        },
        height: 'auto',
        firstDay: 1,
        events: prepare_events(events),
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
        eventDidMount: function(info) {
            $(info.el).attr('data-toggle', 'popover');
            $(info.el).attr('data-content', info.event.extendedProps.description);
            $(info.el).attr('data-trigger', 'hover focus');
            $(info.el).attr('data-placement', 'top');
          },
        customButtons: {
            addEventButton: {
                text: calendar_data['label_calendar_add_event'],
                click: function () {
                    $("#modal").modal();
                }
            }
        }
    });
    calendar.render();
}

/**
 * Prepare the  events for display in the calendar.
 * @function
 * @param {Array} events - The  events to be displayed in the calendar.
 * @returns {Array} - The formatted events.
 */
function prepare_events(events) {
    events.forEach(event => {
        // event.url = event.url.replace(':sjid', event.id);
        // event['classNames'] = 'scheduled-jobs-calendar-event scheduled-jobs-calendar-' + event.status_code + ' scheduled-jobs-calendar-' + event.type_code;
        if (!event['start'] || event['start'] == '') {
            // if start date is not set use edit_time            
            event['start'] = event['edit_time'];
        }
        // event['display'] = 'background';
    });    
    console.log(events);
    return events;
}