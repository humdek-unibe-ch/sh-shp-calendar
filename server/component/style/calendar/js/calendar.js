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
    console.log(calendar_data);
    var calendarOptions = {
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
        height: calendar_data['config']['height'] ? calendar_data['config']['height'] : 'auto',
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
            console.log(entryValues);
            $('#calendar-event-edit-mode input[type="radio"]').prop('checked', false); //remove all set checked values
            $('#calendar-event-edit-mode input[type="checkbox"]').prop('checked', false); //remove all set checked values
            $('#calendar-event-edit-mode select').selectpicker('deselectAll').selectpicker('render');
            Object.keys(entryValues).forEach(key => {
                if (key.startsWith("_")) {
                    // set the value from the event
                    var fieldName = key.replace('_', '');
                    var fieldNameSearch = '#calendar-event-edit-mode input[name="' + fieldName + '[value]"]:not([type="radio"]):not([type="checkbox"]):not([type="select"]), #calendar-event-edit-mode textarea[name="' + fieldName + '[value]"]';
                    $(fieldNameSearch).val(entryValues[key]);
                    $('#calendar-event-edit-mode select[name^="' + fieldName + '[value]"]').selectpicker('val', entryValues[key]);
                    try {
                        var decodedArray = JSON.parse(entryValues[key].replace(/&quot;/g, '"'));
                        $('#calendar-event-edit-mode select[name^="' + fieldName + '[value]"]').selectpicker('val', decodedArray);
                    } catch (error) {

                    }
                    // Search for radio input and textarea elements
                    var fieldNameSearchRadioCheck = '#calendar-event-edit-mode input[name="' + fieldName + '[value]"][type="radio"], #calendar-event-edit-mode input[name="' + fieldName + '[value]"][type="checkbox"]';
                    $(fieldNameSearchRadioCheck).each(function () {
                        if ($(this).is(':radio') || $(this).is(':checkbox')) { // Check if it's a radio or check input
                            if ($(this).val() == entryValues[key]) {
                                $(this).prop('checked', true); // Set the "checked" property to true
                            }
                        } else { // It's a textarea element
                            $(this).val(entryValues[key]); // Set the value for textarea elements
                        }
                    });
                }
            });
            $('#calendar-event-edit-mode input[name="selected_record_id"]').val(entryValues['_record_id']);
            $('#calendar-event-edit-mode input[name="delete_record_id"]').val(entryValues['_record_id']);
            $("#calendar-event-edit-mode").modal();
        },
        // eventContent: function (info) {
        //     var dot = document.createElement('div');
        //     $(dot).addClass('fc-daygrid-event-dot');
        //     var time = document.createElement('div');
        //     $(time).addClass('fc-event-time');
        //     time.innerHTML = info.event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }) + " <span>[" + info.event.extendedProps.type_code + "]</span>";
        //     var title = document.createElement('div');
        //     $(title).addClass('fc-event-title');
        //     title.innerHTML = info.event.title;
        //     return { domNodes: [dot, time, title] }
        // },
    }
    if (calendar_data['config']['initialView']) {
        calendarOptions['initialView'] = calendar_data['config']['initialView'];
    }
    calendar = new FullCalendar.Calendar($('#calendar-view')[0], calendarOptions);
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
        if (!event['className']) {
            event['className'] = [];
        } else {
            event['className'] = [event['className']];
        }
        if (config['css']) {
            // there is a global css for the event object
            event['className'].push(config['css']);
        }
        if (config['form_calendars']) {
            // there is calendars setup, check for colors
            if (event['calendar_info'] && event['calendar_info']['color']) {
                event['backgroundColor'] = event['calendar_info']['color'];
                event['borderColor'] = event['calendar_info']['color'];
                if (isColorLight(event['calendar_info']['color'])) {
                    event['textColor'] = "black";
                    event['borderColor'] = "black";
                }
            }
        }
        event['className'].push(event['record_id']);
        if (!event['start']) {
            event['start'] = event['edit_time'];
        }
        if (event['end']) {
            var timePattern = /\d{2} \d{2}/;
            if (!timePattern.test(event['end'])) {
                // there is no time add extra date because the end date is exclusive
                var parsedDate = moment(event['end'], 'YYYY-MM-DD');
                var updatedDate = parsedDate.add(1, 'days');
                event['end'] = updatedDate.format('YYYY-MM-DD');
            }
        }
    });
    return events;
}

/**
 * Check if the color is light
 * @function
 * @param {String} color - The color code
 * @returns {Boolean} - True if light color
 */
function isColorLight(color) {
    // Remove any whitespace and convert to lowercase for consistent formatting
    color = color.replace(/\s/g, '').toLowerCase();

    // Check if the color starts with '#' (hexadecimal notation)
    if (color.charAt(0) === '#') {
        // Extract the hex values for red, green, and blue
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Calculate the perceived brightness using the YIQ formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // You can adjust this threshold to your preference (e.g., 128 for a mid-level threshold)
        return brightness > 128;
    }

    // Check if the color starts with 'rgb' (RGB notation)
    if (color.startsWith('rgb(')) {
        // Extract the RGB values using regular expressions
        const rgb = color.match(/\d+/g);
        if (rgb && rgb.length === 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);

            // Calculate the perceived brightness using the YIQ formula
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // You can adjust this threshold to your preference (e.g., 128 for a mid-level threshold)
            return brightness > 128;
        }
    }

    // If the color format is not recognized, assume it's not light
    return false;
}