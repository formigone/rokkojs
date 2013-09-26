<?php

$sequences = array(
    "demo" => array(
        "standing" => array(
            "img" => "/img/8bitmm.gif",
            "frames" => array(
                array(
                    "pos" => array(
                        "x" => 105,
                        "y" => 11
                    ),
                    "size" => array(
                        "w" => 21,
                        "h" => 24
                    ),
                    "freq" => 1500
                ),
                array(
                    "pos" => array(
                        "x" => 135,
                        "y" => 11
                    ),
                    "size" => array(
                        "w" => 21,
                        "h" => 24
                    ),
                    "freq" => 100
                ),
                array(
                    "pos" => array(
                        "x" => 105,
                        "y" => 11
                    ),
                    "size" => array(
                        "w" => 21,
                        "h" => 24
                    ),
                    "freq" => 1500
                )
            ),
            "freq" => 100,
            "currFrame" => 0
        )
    )
);

$type = $_GET["type"];

if (array_key_exists($type, $sequences)) {
    header("Content-Type: application/json");
    echo json_encode($sequences[$type]);
    exit;
}
