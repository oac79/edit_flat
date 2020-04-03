var listHotspots = new Array();//get all hotspots BDD
var addHotspot = new Array();//add hotspot insert BDD
var listHospotUpdate = new Array();//add hotspot update coordinates
var listHotspotSize = new Array();//add hotspot update size
var listRemoveHotspot = new Array();//add hotspot delete
var value = true;
var isSaved = false, isDraggable = false, isResized = false, isDeleted = false;
var count = 0;
var numID = 0;
$(document).ready(function () {
    console.log('%c ____document flat.html ready____', 'color: blue');
    $('.isDisabled').off('click');
    createHotspot();
    saveHotspot();
    showHotspot();
    moveDraggable();
    updateCoordinates();
    resizeHotspot();
    updateSized();
    removeSelectedHotspot();
    deleteHotspot();

    console.log('%c ___Document Ready___', 'color: green');

    $('#btn_editPicture').click(function () {
        $('.hotspot').toggle();
        var linkPicture = 'assets/images/flat.jpg';
        saveEditedPicture(linkPicture);
    });

    $('#btn_showPicture').click(function () {
        var picture = {
            'id': 56
        }
        picture.function_get = 'getPicture';
        showPictureByID(picture);
    });

    $('#btn_updatePicture').click(function () {
        var picture = {
            'id': 53
        }
        picture.function_get = 'getPicture';
        updatePicture(picture);
    });

    $('#btn_removePicture').click(function () {
        var picture = {
            'id': 57
        }
        picture.function_post = 'removePicture';
        removePictureByID(picture);
    });

})