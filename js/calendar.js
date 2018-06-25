/**
 * @developer: Ademilson
 */
$(document).ready(function () {
	

	$("#calendar").fullCalendar({
		header: {
			left: "prev,today,next",
			center: "title",
			right: "agendaDay,agendaWeek",
		},
		defaultView: "agendaWeek",
		allDaySlot: false,
		height: "auto",
		minTime: "09:00:00",
		maxTime: "18:00:00",
		selectable: true,
		events: {
			url: "http://localhost:8080/app/server.php",
			type: 'POST',
			data: {
				action: "getevents",
			},
			success: function (response) {
				// alterações no carregamento dos eventos
			}
		},
		select: function (start, end) {
			patientName = window.prompt("Informe o nome do paciente");
			
			if ( patientName != '' && patientName != null) {

				var newEvent = {
					title: patientName,
					start: moment(start).format("YYYY-MM-DD HH:mm"),
					end: moment(end).format("YYYY-MM-DD HH:mm"),
				}
				
				$.ajax({
					url: "http://localhost:8080/app/server.php",
					type: "post",
					data: {
						action: "addevent",
						event: JSON.stringify(newEvent),
					},
					success: function (response) {
						if (response == "true") {
							showMessage("success", "Paciente "+newEvent.title+" inserido com sucesso");
							$("#calendar").fullCalendar("renderEvent", newEvent, true);
						}
						else {
							showMessage("danger", "Ops! Algo deu errado!");
							console.log(response);
						}
					},
				});
			}
		},
	});

});