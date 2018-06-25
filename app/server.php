<?php
/**
 * @developer: Ademilson
 */
namespace Ademilson\PusherExample;

require("fullCalendar.class.php");
require("../vendor/autoload.php");
use \Ademilson\PusherExample\App\FullCalendar;	

header('Access-Control-Allow-Origin: *');

$fullCalendar = new FullCalendar();

if (!isset($_POST["action"])){
	echo "Ação não informada";
	exit;
}

if ($_POST["action"] == "addevent"){

	if (!isset($_POST["event"])){
		echo "Evento não informado!";
		exit;
	}
		
	if ( $fullCalendar->addEvent($_POST["event"]) ) {
		echo "true";
	}
	else {
		echo "Ops! Ocorreu um erro!";
	}

}
else if ($_POST["action"] == "getevents") {

	print_r( json_encode( $fullCalendar->getEventsAsJson() ) );

}

else if ($_POST["action"] == "generateevents") {

	$events = $fullCalendar->generateRandomEvents();

	foreach ($events as $event) {
		$fullCalendar->addEvent($event);
	}

	echo "true";
}

else if ($_POST["action"] == "deleteevents") {
	
	$fullCalendar->deleteEvents();
	echo "true";

}

else {
	echo "Ação inexistente";
}