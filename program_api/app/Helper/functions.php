<?php

//全局方法


/**
 * @param string $geoHash
 * @param int $radius
 * @return string
 */
if (!function_exists("getScope")) {
    function getScope($geoHash, $radius)
    {
        return $geoHash = substr($geoHash, 0, $radius);
    }
}