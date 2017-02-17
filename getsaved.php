<?php

$dataArray = array();

$file = fopen("savedtimes.csv","r");
while(! feof($file)){
	$line = fgetcsv($file);
	$newArrayElement = array(
		"time" => $line[1],
		"name" => $line[0],
	);
	array_push($dataArray,$newArrayElement);
}
fclose($file);

array_pop($dataArray);
$jsondata = json_encode($dataArray);

echo $jsondata;

?>