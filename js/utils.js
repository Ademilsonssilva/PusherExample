/**
 * @developer: Ademilson
 */
function showMessage(style, message)
{

	div = $("<div class='alert alert-"+style+" alert-dismissible fade show' role='alert'></div>");
	button = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
	button += "<span aria-hidden='true'>&times;</span></button>";
	message = "<span>"+message+"</span>";
				  		
	div.append(button).append(message);

	$("#messageContainer").html("");
	$("#messageContainer").append(div).fadeIn(500).fadeOut(4500);
}

function showNewNotification (message) 
{
	row = $("<div class='row'></div>");
	row_content = $("<div class='col-sm-12'></div>");
	content = $("<p class='bg-success'>"+message+"</p>");

	row.append(row_content.append(content));
	$("#notificationContainer").append(row);
}

function testConnection() 
{
	var passou = false;
	$.ajax({
		url: "http://localhost:8080/app/server.php",
		async: false,
		type: "POST",
		data: {
			action: "testconnection",
		},
		success: function (response) {
			if (response != 1) {
				errors = JSON.parse(response);
				for(i = 0; i < errors.length; i++) {
					$("#errorContainer").append($("<p class='p-3 m-2 bg-danger text-white'> " + errors[i] + " </p>")).show();	
				}
			}
			else {
				passou = true;
			}
		},
		error: function (response){
			$("#errorContainer").append($("<p class='p-3 m-2 bg-danger text-white'> Caminho do Servidor não foi encontrado! </p>")).show();
		},
	});

	return passou;
}