<?php
include '../hotspots/hotspot.php';

$hotspot = new Hotspot();
if (isset($_POST[0]['function_post']) && !empty($_POST[0]['function_post'])) {
    $function_post = $_POST[0]['function_post'];
    switch ($function_post) {
        case 'saveHotspot':
            echo json_encode($hotspot->createListHotspots($_POST));
            break;
        case 'updatedCoordinates':
            echo json_encode($hotspot->updateCoordinates($_POST));
            break;
        case 'sizeUpdate':
            echo json_encode($hotspot->sizeUpdate($_POST));
            break;
        case 'deleteHotspotByName':
            echo json_encode($hotspot->deleteHotspotByName($_POST));
            break;
        default:
            'function not found';
            break;
    }
} else if (isset($_GET['function_get']) && !empty($_GET['function_get'])) {
    $function_get = $_GET['function_get'];

    switch ($function_get) {
        case 'getMaxValueID':
            echo json_encode($hotspot->getMaxValueID($_GET));
            break;
        case 'getAllHotspots':
            echo json_encode($hotspot->getAllHotspots($_GET));
            break;
        default:
            return 'function not found';
    }
} else {
    return 'ERROR function not found';
}
