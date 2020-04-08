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
    $('.isDisabled').off('click');//no funciona 

    /**********************************PUNTOS*************************** */
    createHotspot();
    saveHotspot();
    showHotspot();
    moveDraggable();
    updateCoordinates();
    resizeHotspot();
    updateSized();
    removeSelectedHotspot();
    /******************************************************************* */
    console.log('%c ___Document Ready___', 'color: green');
    /***********************************PICTURES************************ */
    createPicture();
    editPicture();
    removePicture();
});

