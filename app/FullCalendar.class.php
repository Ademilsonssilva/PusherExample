<?php
/**
 * @developer: Ademilson
 */

namespace PHP\PusherExample\App;
require("connection.php");

class FullCalendar
{
	public static $randomEventId = 1;
	private $conn;

	public function __construct()
	{
		global $conn;
		$this->conn = $conn;
	}

	public function addEvent ($json)
	{
		$event = json_decode($json);

		$stmt = $this->conn->Prepare("INSERT INTO event (patient, startDate, endDate) VALUES (:patient, :start, :end)");

		$stmt->bindValue(":patient", $event->title);
		$stmt->bindValue(":start", $event->start);
		$stmt->bindValue(":end", $event->end);

		if ($stmt->execute()) {
			return true;
		}
		else {
			print_r($stmt->errorInfo());
		}
		
	}

	public function generateTestEvent ($fullDay = true)
	{
		if (!$fullDay) {
			$minHour = 8;
			$maxHour = 17;
		}
		$event = [
			title => "evento" . self::randomEventId,
			// start => rand($minHour)
		];
	}
}