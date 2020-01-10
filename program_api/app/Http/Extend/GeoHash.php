<?php
/**
 * Created by PhpStorm.
 * User: ifehrim@gmail.com
 * Date: 1/8/2018
 * Time: 3:45 PM
 */

namespace App\Http\Extend;


class GeoHash
{


    /**
     * @var string
     *
     *
     *
     *
     * geohash length width
            height
            1 5,009.4km  4,992.6km
            2 1,252.3km  624.1km
            3 156.5km  156km
            4 39.1km  19.5km
            5 4.9km  4.9km
            6 1.2km  609.4m
            7 152.9m  152.4m
            8 38.2m  19m
            9 4.8m  4.8m
            10 1.2m  59.5cm
            11 14.9cm  14.9cm
            12 3.7cm  1.9cm
     * https://en.wikipedia.org/wiki/Geohash#Cell_Dimensions
     */

    CONST GEO_NUM_1=1;
    CONST GEO_NUM_2=2;
    CONST GEO_NUM_3=3;
    CONST GEO_NUM_4=4;
    CONST GEO_NUM_5=5;
    CONST GEO_NUM_6=6;
    CONST GEO_NUM_7=7;
    CONST GEO_NUM_8=8;
    CONST GEO_NUM_9=9;
    CONST GEO_NUM_10=10;
    CONST GEO_NUM_11=11;
    CONST GEO_NUM_12=12;

    private $coding = "0123456789bcdefghjkmnpqrstuvwxyz";
    private $codingMap = array();

    public function __construct()
    {
        for ($i = 0; $i < 32; $i++) {
            $this->codingMap[substr($this->coding, $i, 1)] = str_pad(decbin($i), 5, "0", STR_PAD_LEFT);
        }
    }

    public static function decode($hash)
    {
        $self = new static();

        $binary = "";
        $hl = strlen($hash);
        for ($i = 0; $i < $hl; $i++) {
            $binary .= $self->codingMap[substr($hash, $i, 1)];
        }

        $bl = strlen($binary);
        $blat = "";
        $blong = "";
        for ($i = 0; $i < $bl; $i++) {
            if ($i % 2) {
                $blat = $blat . substr($binary, $i, 1);
            } else {
                $blong = $blong . substr($binary, $i, 1);
            }
        }

        $lat = $self->binDecode($blat, -90, 90);
        $long = $self->binDecode($blong, -180, 180);

        $latErr = $self->calcError(strlen($blat), -90, 90);
        $longErr = $self->calcError(strlen($blong), -180, 180);

        $latPlaces = max(1, -round(log10($latErr))) - 1;
        $longPlaces = max(1, -round(log10($longErr))) - 1;

        $lat = round($lat, $latPlaces);
        $long = round($long, $longPlaces);

        return array($lat, $long);
    }

    public static function encode($lat, $long)
    {
        $self = new static();
        $plat = $self->precision($lat);
        $latbits = 1;
        $err = 45;
        while ($err > $plat) {
            $latbits++;
            $err /= 2;
        }

        $plong = $self->precision($long);
        $longbits = 1;
        $err = 90;
        while ($err > $plong) {
            $longbits++;
            $err /= 2;
        }
        $bits = max($latbits, $longbits);
        $longbits = $bits;
        $latbits = $bits;
        $addlong = 1;
        while (($longbits + $latbits) % 5 != 0) {
            $longbits += $addlong;
            $latbits += !$addlong;
            $addlong = !$addlong;
        }
        $blat = $self->binEncode($lat, -90, 90, $latbits);
        $blong = $self->binEncode($long, -180, 180, $longbits);
        $binary = "";
        $uselong = 1;
        while (strlen($blat) + strlen($blong)) {
            if ($uselong) {
                $binary = $binary . substr($blong, 0, 1);
                $blong = substr($blong, 1);
            } else {
                $binary = $binary . substr($blat, 0, 1);
                $blat = substr($blat, 1);
            }
            $uselong = !$uselong;
        }
        $hash = "";
        for ($i = 0; $i < strlen($binary); $i += 5) {
            $n = bindec(substr($binary, $i, 5));
            $hash = $hash . $self->coding[$n];
        }
        return $hash;
    }

    private function calcError($bits, $min, $max)
    {
        $err = ($max - $min) / 2;
        while ($bits--) {
            $err /= 2;
        }
        return $err;
    }

    private function precision($number)
    {
        $precision = 0;
        $pt = strpos($number, '.');
        if ($pt !== false) {
            $precision = -(strlen($number) - $pt - 1);
        }
        return pow(10, $precision) / 2;
    }

    private function binEncode($number, $min, $max, $bitcount)
    {
        if ($bitcount == 0) {
            return "";
        }
        $mid = ($min + $max) / 2;
        if ($number > $mid) {
            return "1" . $this->binEncode($number, $mid, $max, $bitcount - 1);
        } else {
            return "0" . $this->binEncode($number, $min, $mid, $bitcount - 1);
        }
    }

    private function binDecode($binary, $min, $max)
    {
        $mid = ($min + $max) / 2;

        if (strlen($binary) == 0) {
            return $mid;
        }
        $bit = substr($binary, 0, 1);
        $binary = substr($binary, 1);

        if ($bit == 1) {
            return $this->binDecode($binary, $mid, $max);
        } else {
            return $this->binDecode($binary, $min, $mid);
        }
    }

}