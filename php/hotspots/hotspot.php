<?php
include '../database/connectDB.php';

/**********include test.php******** */
// include 'database/connectDB.php';
/********************************** */

class Hotspot
{
    function createListHotspots($hotspots)
    {
        $list = [];
        $conn = DataBase::connection();

        for ($i = 0; $i < sizeof($hotspots); $i++) {
            $name = $hotspots[$i]['name'];
            $coordinate_x = $hotspots[$i]['coordinate_x'];
            $coordinate_y = $hotspots[$i]['coordinate_y'];

            $sql = 'INSERT INTO  `hotspots`(`name`,`coordinate_x`, `coordinate_y`)
            VALUES ("' . $name . '","' . $coordinate_x . '","' . $coordinate_y . '")';

            if ($conn->query($sql) === TRUE) {
                array_push($list, $i + 1);
            } else {
                return 'ERROR: ' . $sql . ' ' . $conn->error;
            }
        }
        return $list;
        $conn->close();
    }

    function createHotspot($hotspot)
    {
        $conn = DataBase::connection();

        $name = $hotspot['name'];
        $coordinate_x = $hotspot['coordinate_x'];
        $coordinate_y = $hotspot['coordinate_y'];

        $sql = 'INSERT INTO  `hotspots`(`name`,`coordinate_x`, `coordinate_y`)
            VALUES ("' . $name . '","' . $coordinate_x . '","' . $coordinate_y . '")';

        if ($conn->query($sql) === TRUE) {
            return TRUE;
        } else {
            return 'ERROR: ' . $sql . ' ' . $conn->error;
        }
        $conn->close();
    }

    function getAllHotspots()
    {
        $conn = DataBase::connection();
        $listHotspots = [];
        $sql = 'SELECT * FROM `hotspots`';
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($listHotspots, $row);
            }
        } else {
            return 0;
        }
        $conn->close();
        return $listHotspots;
    }

    function getMaxValueID()
    {
        $conn = DataBase::connection();

        $sql = 'SELECT max(`id`) FROM `hotspots`';
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_row();
            $numID = (int) $row[0];
            return  $numID;
        }
    }

    function updateCoordinates($listHotspots)
    {
        $updated = false;
        $conn = DataBase::connection();

        for ($i = 0; $i < sizeof($listHotspots); $i++) {
            $name = $listHotspots[$i]['name'];
            $coordinate_x = $listHotspots[$i]['coordinate_x'];
            $coordinate_y = $listHotspots[$i]['coordinate_y'];

            $sql = 'UPDATE `hotspots`
                    SET `coordinate_x` = "' . $coordinate_x . '" , 
                    `coordinate_y` = "' . $coordinate_y . '"
                    WHERE `name` = "' . $name . '" ';
            if ($conn->query($sql) === TRUE) {
                $updated = true;
            } else {
                return "Error updated: " . $conn->error;
            }
        }
        $conn->close();
        return $updated;
    }

    function sizeUpdate($listHotspots)
    {
        $updated = false;
        $conn = DataBase::connection();

        for ($i = 0; $i < sizeof($listHotspots); $i++) {
            $name = $listHotspots[$i]['name'];
            $size = $listHotspots[$i]['size'];

            $sql = 'UPDATE `hotspots`
                    SET `size` = "' . $size . '" 
                    WHERE `name` = "' . $name . '" ';
            if ($conn->query($sql) === TRUE) {
                $updated = true;
            } else {
                return "Error updated: " . $conn->error;
            }
        }
        $conn->close();
        return $updated;
    }

    function deleteHotspotByName($listHotspots)
    {
        $deleted = false;
        $conn = DataBase::connection();

        for ($i = 0; $i < sizeof($listHotspots); $i++) {
            $name = $listHotspots[$i]['name'];
        
            $sql = 'DELETE FROM `hotspots`
                    WHERE `name` = "' . $name . '" ';
            if ($conn->query($sql) === TRUE) {
                $deleted = true;
            } else {
                return "Error deleted: " . $conn->error;
            }
        }
        $conn->close();
        return $deleted;
    }
}
