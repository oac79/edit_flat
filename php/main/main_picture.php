<?php
include '../pictures/picture.php';

$picture = new Picture();
if (isset($_GET['function_get']) && !empty($_GET['function_get'])) {
    $function_get = $_GET['function_get'];

    switch ($function_get) {
        case 'getPicture':
            echo json_encode($picture->getPictureById($_GET));
            break;
        default:
            return 'function not found';
    }
} else if (isset($_POST['function_post']) && !empty($_POST['function_post'])) {
    $function_post = $_POST['function_post'];

    switch ($function_post) {
        case 'savePicture':
            echo json_encode($picture->savePicture($_POST));
            break;
        case 'updatePicture':
            echo json_encode($picture->updatePictureByID($_POST));
            break;
        case 'removePicture':
            echo json_encode($picture->removePictureByID($_POST));
            break;
        default:
            return 'function not found';
    }
} else {
    return 'function not found';
}
