<?php
/**
 * @developer: Ademilson
 */

namespace Ademilson\PusherExample\App;
require("connection.php");

class FullCalendar
{
	private $conn;
	private $pusher;

	public function __construct()
	{
		global $conn, $pusher;
		$this->conn = $conn;
		$this->pusher = $pusher;
	}

	public function addEvent ($json)
	{
		$event = json_decode($json);

		$stmt = $this->conn->Prepare("INSERT INTO event (patient, startDate, endDate) VALUES (:patient, :start, :end)");

		$stmt->bindValue(":patient", $event->title);
		$stmt->bindValue(":start", $event->start);
		$stmt->bindValue(":end", $event->end);

		if ($stmt->execute()) {
			$data["message"] = "Paciente {$event->title} cadastrado com sucesso!";
			$this->pusher->trigger("my-channel", "my-event", $data);
			return true;
		}
		else {
			print_r($stmt->errorInfo());
		}
		
	}

	public function getEventsAsJson()
	{
		$stmt = $this->conn->query(" SELECT * FROM event");
		$results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

		$formattedArrayResult = [];
		foreach ($results as $result) {
			$arr = [
				"id" => $result["id"],
				"title" => $result["patient"],
				"start" => $result["startdate"],
				"end" => $result["enddate"],
			];
			$formattedArrayResult[] = $arr;
		}
		return $formattedArrayResult;
	}

	public function generateRandomEvents ()
	{
		$minHour = 8;
		$maxHour = 17;
		$minutesArray = ['00', '15', '30', '45'];

		$actualDay = \Date("d");
		$events = [];

		for ($i = 0; $i < 5; $i++) {
			$validDate = false;
			while (!$validDate) {
				$day = rand($actualDay -3, $actualDay + 3);
				if (checkdate(\Date("m"), $day, \Date("Y"))) {
					$validDate = true;
				}
			}
			$newDate = \Date("Y-m-") . str_pad($day, 2, "0", STR_PAD_LEFT);
			$newDate .= " ". rand($minHour, $maxHour) . ":" . $minutesArray[array_rand($minutesArray, 1)];
			
			$endDate = date("Y-m-d H:i:s", strtotime("+" . $minutesArray[array_rand($minutesArray, 1)]. " minutes", strtotime($newDate)));

			$event = new \stdClass();
			$event->title = "random_event_".rand(0, 99999);
			$event->start = $newDate;
			$event->end = $endDate;

			$events[] = json_encode($event);
		}
		return $events;
	}

	public function deleteEvents()
	{
		
		return $this->conn->query("DELETE FROM event");

	}
}