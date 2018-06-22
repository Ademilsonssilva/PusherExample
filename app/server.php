<?php
/**
 * @developer: Ademilson
 */
namespace PHP\PusherExample;

require("fullCalendar.class.php");
use \PHP\PusherExample\App\FullCalendar;	

header('Access-Control-Allow-Origin: *');

$fullCalendar = new FullCalendar();

if (!isset($_POST["action"])){
	echo "A��o n�o informada";
	exit;
}

if ($_POST["action"] == "addevent"){

	if (!isset($_POST["event"])){
		echo "Evento n�o informado!";
		exit;
	}
		
	if ( $fullCalendar->addEvent($_POST["event"]) ) {
		echo "true";
	}
	else {
		echo "nao deu nao";
	}

}
else {
	echo "A��o inexistente";
}