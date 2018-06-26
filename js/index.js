/**
 * @developer: Ademilson
 */
$(document).ready(function () {


	if (testConnection()) {
		$("#buttonsContainer").show();
		startCalendar();
	}
	
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
					swal("Sucesso!", "Eventos aleatórios gerados!", "success");
				}
				else {
					swal("Ops!", "Algo deu errado!", "error");
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
						swal("Sucesso!", "Banco de dados resetado!", "success");
					}
					else {
						swal("Ops!", "Algo deu errado!", "error");
					}
				}
			})
		}
	});

});