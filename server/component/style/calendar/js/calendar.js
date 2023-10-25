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
    console.log(calendar_data);
    if (!calendar_data) {
        return;
    }
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
            hourCycle: 'h23'
        },
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
        customButtons: {
            addEventButton: {
                text: calendar_data['label_calendar_add_event'],
                click: function () {
                    $('#modal input[type="radio"]').prop('checked', false); //remove all set checked values
                    $('#modal input[type="checkbox"]').prop('checked', false); //remove all set checked values
                    $('#modal input[type!="hidden"]:not([type="radio"]):not([type="checkbox"])').val('');
                    $('#modal textarea[type!="hidden"]').val('');
                    $('input[name="selected_record_id"]').remove(); // remove the selected record if it is there
                    $('#modal select').selectpicker('deselectAll').selectpicker('render');
                    $("#modal").modal();
                }
            }
        },
        eventClick: function (info) {
            console.log(info.event.extendedProps);
            $('#modal input[type="radio"]').prop('checked', false); //remove all set checked values
            $('#modal input[type="checkbox"]').prop('checked', false); //remove all set checked values
            $('#modal select').selectpicker('deselectAll').selectpicker('render');
            if ($('input[name="selected_record_id"]').length === 0) {
                // if the selected input record is not added, add it
                var selectedRecord = $('<input>').attr({
                    type: 'hidden',
                    name: 'selected_record_id',
                });
                $('input[name="__form_name"]').after(selectedRecord);
            }
            var entryValues = info.event.extendedProps;
            Object.keys(entryValues).forEach(key => {
                if (key.startsWith("_")) {
                    // set the value from the event
                    if (entryValues[key]) {
                        var fieldName = key.replace('_', '');
                        var fieldNameSearch = 'input[name="' + fieldName + '[value]"]:not([type="radio"]):not([type="checkbox"]):not([type="select"]), textarea[name="' + fieldName + '[value]"]';
                        $(fieldNameSearch).val(entryValues[key]);
                        try {
                            var decodedArray = JSON.parse(entryValues[key].replace(/&quot;/g, '"'));   
                            $('select[name^="' + fieldName + '[value]"]').selectpicker('val', decodedArray);                            
                        } catch (error) {
                            
                        }                                                
                        // Search for radio input and textarea elements
                        var fieldNameSearchRadioCheck = 'input[name="' + fieldName + '[value]"][type="radio"], input[name="' + fieldName + '[value]"][type="checkbox"]';
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
            $('input[name="selected_record_id"]').val(entryValues['_record_id']);
            $("#modal").modal();
        }
    });
    calendar.render();
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
    });
    return events;
}