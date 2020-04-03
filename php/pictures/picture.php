<?php
include '../database/connectDB.php';

class Picture
{

    function savePicture($picture)
    {
        $conn = DataBase::connection();
        $link = $picture['link'];
        $img_base64 = $picture['img_base64'];
        $sql = 'INSERT INTO `pictures` (`link`,`img_base64`) VALUES ("' . $link . '", "' . $img_base64 . '")';

        if ($conn->query($sql) === TRUE) {
            return true;
        } else {
            return 'Error insert in database_________: ' . $link . '________: ' . $img_base64;
        }

        $conn->close();
    }

    function getPictureById($picture)
    {
        $conn = DataBase::connection();
        $id = $picture['id'];
        $sql = 'SELECT `img_base64` FROM `pictures` WHERE `id` = "' . $id . '"';
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                return $row['img_base64'];
                // return $this->base64_to_jpeg($row['img_base64'], 'flat.jpg');
            }
        }
        $conn->close();
        return false;
    }

    function updatePictureByID($picture)
    {
        $conn = DataBase::connection();
        $id = $picture['id'];
        $img_base64 = $picture['img_base64'];
        $sql = 'UPDATE `pictures` SET `img_base64` = "' . $img_base64 . '" WHERE `id` = "' . $id . '"';
        if ($conn->query($sql) === TRUE) {
            return true;
        }
        $conn->close();
        return false;
    }

    function removePictureByID($picture)
    {
        $conn = DataBase::connection();
        $id = $picture['id'];
        $sql = 'DELETE FROM `pictures` WHERE `id` = "' . $id . '"';
        if ($conn->query($sql) === TRUE) {
            return true;
        }
        $conn->close();
        return false;
    }

    function base64_to_jpeg($base64_string, $output_file)
    {
        // open the output file for writing
        $ifp = fopen($output_file, 'wb');
        $data = explode(',', $base64_string);

        // we could add validation here with ensuring count( $data ) > 1
        fwrite($ifp, base64_decode($data[1]));

        // clean up the file resource
        fclose($ifp);

        return $output_file;
    }
}
