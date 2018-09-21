<?php
$data = file_get_contents('img.json');
$data2 = json_encode($data);
echo $data2;