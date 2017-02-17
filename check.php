<?php 

$file = fopen("waldocoordinates.csv","r");
$line = fgetcsv($file);
fclose($file);

$xcoord = intval($line[0]);
$ycoord = intval($line[1]);

$xMin = $xcoord - ($xcoord*0.02);
$xMax = $xcoord + ($xcoord*0.02);
$yMin = $ycoord - ($ycoord*0.1);
$yMax = $ycoord + ($ycoord*0.1);

if (($xMin <= $_GET["valueX"]) && ($_GET["valueX"] <= $xMax)){
	if (($yMin <= $_GET["valueY"]) && ($_GET["valueY"] <= $yMax)) {
		$guess = "true";
	}
	else {
		$guess = "false";
	}
}
else {
	$guess = "false";
}


echo $guess;

?>