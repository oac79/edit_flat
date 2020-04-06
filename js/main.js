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
    /**********************************PUNTOS*************************** */
    createHotspot();
    saveHotspot();
    showHotspot();
    moveDraggable();
    updateCoordinates();
    resizeHotspot();
    updateSized();
    removeSelectedHotspot();
    deleteHotspot();
    /******************************************************************* */
    console.log('%c ___Document Ready___', 'color: green');
    /***********************************PICTURES************************ */
    createPicture();

    $('#btn_showPicture').click(function () {
        var picture = {
            'id': 56
        }
        picture.function_get = 'getPicture';
        showPictureByID(picture);
    });

    $('#btn_editPicture').click(function () {
        $('#btn_createPicture').addClass('isDisabled');
        $('#btn_saveHotspot').addClass('isDisabled');
        $('#btn_editPicture').addClass('isDisabled');
        $('#btn_deleteFlat').addClass('isDisabled');
        $('#btn_menuHotspot').addClass('isDisabled');
        $('#btn_menuHotspot').attr("data-toggle", "");
        $('#btn_moveDraggable').addClass('isDisabled');
        $('#btn_moveDraggable').off('click');
        $('#btn_newIcon').addClass('isDisabled');
        $('#btn_newIcon').off('click');
        $('#btn_back').removeClass('isDisabled');
        $('.hotspot').toggle();
        $('.isDisabled').off('click');
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
/************************************************************************ */