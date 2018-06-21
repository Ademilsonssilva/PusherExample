/**
 * @developer: Ademilson
 */
$(document).ready(function () {
	

	$("#calendar").fullCalendar({
		header: {
			left: "prev,today,next",
			center: "title",
			right: "agendaDay,agendaWeek,month",
		},
		allDaySlot: false,
		height: "auto",
		minTime: "08:00:00",
		maxTime: "18:00:00",
		events: function (start, end, timezone, callback) {
			console.log(start);
			console.log(end);
			console.log(timezone);
			console.log(callback);
		}
	});

});