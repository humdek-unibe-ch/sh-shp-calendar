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
    if (!calendar_data) {
        return;
    }
    var buttons = get_custom_buttons(calendar_data);
    calendar = new FullCalendar.Calendar($('#calendar-view')[0], {
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap',
        locale: calendar_data['locale'],
        headerToolbar: {
            left: buttons['buttons'],
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
            hourCycle: 'h23'
        },
        eventOverlap: true,
        weekNumbers: true,
        weekNumberFormat: {
            week: 'long'
        },
        height: 'auto',
        firstDay: 1,
        events: prepare_events(events, calendar_data['config']),
        eventDidMount: function (info) {
            $(info.el).attr('data-toggle', 'popover');
            $(info.el).attr('data-content', info.event.extendedProps.description);
            $(info.el).attr('data-trigger', 'hover focus');
            $(info.el).attr('data-placement', 'top');
        },
        customButtons: buttons['customButtons'],
        eventClick: function (info) {
            var entryValues = info.event.extendedProps;
            Object.keys(entryValues).forEach(key => {
                if (key.startsWith("_")) {
                    // set the value from the event
                    if (entryValues[key]) {
                        var fieldName = key.replace('_', '');
                        var fieldNameSearch = '#calendar-event-edit-mode input[name="' + fieldName + '[value]"]:not([type="radio"]):not([type="checkbox"]):not([type="select"]), textarea[name="' + fieldName + '[value]"]';
                        $(fieldNameSearch).val(entryValues[key]);
                        try {
                            var decodedArray = JSON.parse(entryValues[key].replace(/&quot;/g, '"'));
                            $('#calendar-event-edit-mode select[name^="' + fieldName + '[value]"]').selectpicker('val', decodedArray);
                        } catch (error) {

                        }
                        // Search for radio input and textarea elements
                        var fieldNameSearchRadioCheck = '#calendar-event-edit-mode input[name="' + fieldName + '[value]"][type="radio"], input[name="' + fieldName + '[value]"][type="checkbox"]';
                        $(fieldNameSearchRadioCheck).each(function () {
                            if ($(this).is(':radio') || $(this).is(':checkbox')) { // Check if it's a radio input
                                if ($(this).val() == entryValues[key]) {
                                    $(this).prop('checked', true); // Set the "checked" property to true
                                }
                            } else { // It's a textarea element
                                $(this).val(entryValues[key]); // Set the value for textarea elements
                            }
                        });
                    }
                }
            });
            $('#calendar-event-edit-mode input[name="selected_record_id"]').val(entryValues['_record_id']);
            $('#calendar-event-edit-mode input[name="delete_record_id"]').val(entryValues['_record_id']);
            $("#calendar-event-edit-mode").modal();
        },
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
    });
    calendar.render();
}

/**
 * Prepare the custom buttons
 * @function
 * @param {Object} calendar_data - The  calendar data
 * @returns {Object} - Calendar buttons
 */
function get_custom_buttons(calendar_data) {
    var buttons = 'prev,next,today,addEventButton';
    if (calendar_data['show_add_calendar_button'] == '1') {
        // show add calendar btn if enabled
        buttons = 'prev,next,today,addCalendarButton,addEventButton';
    }
    var res = {
        'customButtons': {
            addEventButton: {
                text: calendar_data['label_calendar_add_event'],
                click: function () {                    
                    $("#calendar-event-add-mode").modal();
                }
            },
            addCalendarButton: {
                text: calendar_data['label_add_calendar'],
                click: function () {
                    addNewCalendar();
                }
            }
        },
        'buttons': buttons
    }
    return res;
}

/**
 * Prepare the  events for display in the calendar.
 * @function
 * @param {Array} events - The  events to be displayed in the calendar.
 * @param {Object} config - The  calendar config
 * @returns {Array} - The formatted events.
 */
function prepare_events(events, config) {
    if (!config) {
        // if no config return events
        return events;
    }
    var configEvents = config['events'];
    events.forEach(event => {
        if (configEvents) {
            Object.keys(configEvents).forEach(key => {
                if (event[configEvents[key]]) {
                    event[key] = event[configEvents[key]];
                }
            });
        }
        if (config['css']) {
            // there is a global css for the event object
            event['className'] = event['className'] + ' ' + config['css'];
        }
        event['overlap'] = "false";
        event['className'] = event['className'] + ' ' + event['record_id'];
    });
    return events;
}