/**
 * @developer: Ademilson
 */
$(document).ready(function () {
	
	$("#btn_open_window").bind("click", function (event) {
		open("notification.html", "Notification Screen", "height=450,width=650");
	});

	$("#btn_generate_events").bind("click", function () {
		$.ajax({
			url: "http://localhost:8080/app/server.php",
			type: "POST",
			data: {
				action: "generateevents"
			},
			success: function (response) {
				if (response == "true") {
					$("#calendar").fullCalendar("refetchEvents");
					showMessage("success", "Operação realizada com sucesso!");
				}
				else {
					showMessage("danger", "Ops! Algo deu errado!");
				}
			},
		});
	});

	$("#btn_drop_database").bind("click", function () {
		if (confirm("Deseja realmente excluir todos os eventos?")) {
			$.ajax({
				url: "http://localhost:8080/app/server.php",
				type: "POST",
				data: {
					action: "deleteevents",
				},
				success: function (response){
					if (response == "true") {
						$("#calendar").fullCalendar("removeEvents");
						$("#calendar").fullCalendar("refetchEvents");
						showMessage("success", "Operação realizada com sucesso!");
					}
					else {
						showMessage("danger", "Ops! Algo deu errado!");
					}
				}
			})
		}
	});

});