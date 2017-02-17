<?php

$line = [$_GET["name"],$_GET["time"]];

$file = fopen("savedtimes.csv","a");
fputcsv($file, $line);
fclose($file);


?>