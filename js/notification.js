/**
 * @developer: Ademilson
 */
$(document).ready(function () {
	
	//chave publica do pusher (deve ser igual a variavel pusher_key do programa connection.php)
	var pusher_key = "df5c559ea7fe32316fcc"; 
	
	Pusher.logToConsole = true;

	var pusher = new Pusher(pusher_key, {
		cluster: 'us2',
		// encrypted: true
	});

	var channel = pusher.subscribe('my-channel');
	channel.bind('my-event', function(data) {
		showNewNotification(data.message);
	});

});