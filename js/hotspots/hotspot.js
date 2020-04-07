function sendHotspots() {
    return $.ajax({
        url: "php/main/main_hotspot.php",
        type: "POST",
        dataType: 'json',
        data: Object.assign({}, addHotspot)
    });
}

function getMaxValueId() {
    return $.ajax({
        url: "php/main/main_hotspot.php",
        dataType: 'json',
        type: "GET",
        data: { function_get: 'getMaxValueID' }
    });
}

function getAllHotspots() {
    return $.ajax({
        url: "php/main/main_hotspot.php",
        dataType: 'json',
        type: "GET",
        data: { function_get: 'getAllHotspots' }
    });
}

function sendUpdatedCoordinates() {
    return $.ajax({
        url: "php/main/main_hotspot.php",
        dataType: 'json',
        type: "POST",
        data: Object.assign({}, listHospotUpdate)
    });
}

function sendUpdatedSize() {
    return $.ajax({
        url: "php/main/main_hotspot.php",
        dataType: 'json',
        type: "POST",
        data: Object.assign({}, listHotspotSize)
    });
}

function sendRemovedHotspot() {
    return $.ajax({
        url: "php/main/main_hotspot.php",
        dataType: 'json',
        type: "POST",
        data: Object.assign({}, listRemoveHotspot)
    });
}

//FUNCTIONS ICONS DRAGGABLES
var $startCounter = $('.start-event');
var $dragCounter = $('.drag-event');
var $stopCounter = $('.stop-event');

var counts = {
    start: 0,
    drag: 0,
    stop: 0
};

function onDragStart() {
    counts.start++;
    updateCounter($startCounter, counts.start);
}

function onDrag() {
    counts.drag++;
    updateCounter($dragCounter, counts.drag);
}

function onDragStop() {
    let hotspot, imgID;
    counts.stop++;
    updateCounter($stopCounter, counts.stop);
    //idDraggable obtiene el id del draggable-event
    imgID = $(this).attr('id');
    console.log('img', imgID);
    if (isOnTheUpdateList(imgID, listHospotUpdate)) {
        console.log('TRUE_');
        let coordinates, position;
        coordinates = getCoordinatesHotspot(imgID);
        position = listHospotUpdate.map(function (e) { return e.name }).indexOf(imgID);
        listHospotUpdate[position].coordinate_x = coordinates.coordinate_x;
        listHospotUpdate[position].coordinate_y = coordinates.coordinate_y;
    } else {
        hotspot = getCoordinatesHotspot(imgID);
        hotspot.function_post = 'updatedCoordinates';
        listHospotUpdate.push(hotspot);
    }
}

function updateCounter(selector, value) {
    $(selector).text(value);
}

function createHotspot() {
    $('.isDisabled').off('click');
    $('body').off('mousedown');
    $('#btn_newIcon').click(function () {
        isSaved = true;
        listHospotUpdate = [];
        $('#btn_back').removeClass('isDisabled');

        $('#btn_saveHotspot').addClass('isDisabled');
        $('#btn_newIcon').addClass('isDisabled');
        $('#btn_moveDraggable').addClass('isDisabled');
        $('#btn_menuFlat').addClass('isDisabled');
        $('#btn_menuHotspot').addClass('isDisabled');

        getMaxValueId().done(function (response) {
            console.log('%c response: ', 'color: green', response);
            if (response != null) {
                console.log('typeof: ', typeof response);
                let id = response;
                count++;
                numID = id + count;
                console.log('numID_: ', numID);
                console.log('%c value count_ : ', 'color: purple', count);
                var img = 'img_flat' + numID;
                $('body').mousedown(function () {
                    var x = window.event.clientX;
                    var y = window.event.clientY;
                    console.log(x, y);
                    $('.draggable').append('<img src="assets/images/extinguisher32.png" class="hotspot" id=' + img + '>');
                    $('#' + img).offset({ left: x, top: y });
                    $('#' + img).draggable({
                        start: onDragStart,
                        drag: onDrag,
                        stop: onDragStop
                    });
                    $('body').off('mousedown');
                    resetBodyEvent();
                })

            } else {
                console.log('no hay datos en BDD');
            }

        }).fail(function (err) {
            console.log('fail err_: ', err);
        })

    })


}

function resetBodyEvent() {

    $("body").keyup(function (event) {
        console.log('%c click keyCode === 13', 'color: brown');
        // $('body').off('mousedown');

        if (event.keyCode === 13) {
            $('#img_flat' + numID).draggable('disable');
            $('#btn_newIcon').removeClass('isDisabled');
            $('#btn_saveHotspot').removeClass('isDisabled');

            var element = document.getElementById('img_flat' + numID);
            // console.log('%c element_: ', 'color: red', element.id);
            var position = element.getBoundingClientRect();
            console.log('position_: ', position);
            var hotspot = {
                name: element.id,
                coordinate_x: position.x,
                coordinate_y: position.y,
                function_post: 'saveHotspot'
            }
            $("body").off("keyup");//quita el evento al pulsar enter 
            // $("body").unbind(); >>>>DEPRECATED<<<<<
            addHotspot.push(hotspot);
            console.log('%c new hotspot_: ', 'color: orange', addHotspot);
            console.log('%c position_x: ', 'color: green', position.x, 'position_y: ', position.y);
        }
    });
}

//Function que envía a la BDD los nuevos Hotspots creado al hacer click en el button save hotspot
function saveHotspot() {
    $('#btn_saveHotspot').click(function () {
        console.log('click saveHotspot_:')
        if (isSaved && addHotspot.length > 0) {
            sendHotspots().done(function (response) {
                if (response.length === addHotspot.length) {
                    console.log('%c response_: ', 'color: green', response);
                    // setTimeout(function () {
                    location.reload();
                    // }, 2000);
                }
            }).fail(function (error) {
                console.log('%c err_: ', 'color: red', error);
            })
        }
    })
}

//Obtiene de la BDD todos los Hotspots de la scene y los muestra en sus coordenadas
function showHotspot() {
    getAllHotspots().done(function (response) {
        listHotspots = response;
        let name, coordinate_x, coordinate_y, size;
        for (var i = 0; i < listHotspots.length; i++) {
            name = listHotspots[i].name;
            coordinate_x = listHotspots[i].coordinate_x;
            coordinate_y = listHotspots[i].coordinate_y;
            size = listHotspots[i].size;
            if (size != 0) {
                $('.draggable').append('<img src="assets/images/extinguisher32.png" class="hotspot" id="' + name + '" width="' + size + '">');
            } else {
                $('.draggable').append('<img src="assets/images/extinguisher32.png" class="hotspot" id="' + name + '">');
            }
            $('#' + name).offset({ left: coordinate_x, top: coordinate_y });
        }
        showInfoHotspot();
    }).fail(function (err) {
        console.log('%c err_: ', 'color: red', err);
    })
}

//Mover hotspot para actualizar la posición
function moveDraggable() {
    $('#btn_moveDraggable').click(function () {
        isDraggable = true;

        $('#btn_menuFlat').addClass('isDisabled');
        $('#btn_menuFlat').attr('data-toggle', '');
        $('#btn_menuHotspot').attr('data-toggle', '');

        $('#btn_back').removeClass('isDisabled');
        // $('#btn_saveHotspot').prop('disabled', false);
        $('#btn_moveDraggable').addClass('isDisabled');


        $('#btn_newIcon').addClass('isDisabled');
        $('#btn_newIcon').off('click');

        /****************not found click off***************/
        $('#btn_menuHotspot').addClass('isDisabled');
        $('#btn_menuFlat').addClass('isDisabled')
        $('#btn_saveHotspot').removeClass('isDisabled');

        $('.isDisabled').off('click');
        // $('#btn_moveDraggable').prop('disabled', true);
        // $('#btn_resizeHotspot').prop('disabled', true);
        // $('#btn_deleteHotspot').prop('disabled', true);
        for (var i = 0; i < listHotspots.length; i++) {
            $('#' + listHotspots[i].name).off('click');
            $('#' + listHotspots[i].name + '').draggable({
                start: onDragStart,
                drag: onDrag,
                stop: onDragStop
            });
        }
    })
}

function getCoordinatesHotspot(imgId) {
    let coordinates = $('#' + imgId).position();
    let hotspot = {
        name: imgId,
        coordinate_x: coordinates.left,
        coordinate_y: coordinates.top
    }
    return hotspot;
}

//verificamos si se ha añadido a la lista para posteriormente actualizar la posición del Hotspot
//importante pasar como parámetro la lista global que queremos verificar
function isOnTheUpdateList(imgID, list) {
    var updated = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i].name === imgID) {
            return updated = true;
        }
    }
    return updated;
}

function updateCoordinates() {
    $('#btn_saveHotspot').click(function () {
        console.log('isDraggable_: ', isDraggable);
        console.log('listHospotUpdate.length', listHospotUpdate.length);
        if (isDraggable === true && listHospotUpdate.length > 0) {
            console.log('before send update: coordinate_x', listHospotUpdate);
            sendUpdatedCoordinates().done(function (response) {
                if (response === true) {
                    location.reload();
                    console.log('%c update_response_: ', 'color: green', response);
                } else {
                    console.log('response_: ', response);
                }
            }).fail(function (err) {
                console.log('%c update_err_:', 'color: red', err);
            })
        }
    })
}

// Creamos el modal para cambiar el tamaño del Hotspot
function showModalResize() {
    $('<div class="modal fade modalResizeClass" id="modalResize" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<a href="#" class="close" id="closeResize" data-dismiss="modal" aria-label="close">&times;</a>' +
        '<h4 align="center"><font color="black">Cambiar Tamaño</font></h4>' +
        '<div id="modalNewBtn" class="row">' +
        '</div>' +
        '<div class="d-flex justify-content-center my-4">' +
        '<span class="font-weight-bold blue-text mr-2 mt-1">1</span>' +
        '<form class="range-field w-50">' +
        ' <input class="border-0 sliderIn" type="range" min="1" max="64" step="1" />' +
        '</form>' +
        '<span class="font-weight-bold blue-text ml-2 mt-1">64</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>').appendTo("body");
    $('#modalResize').modal();
}

function resizeHotspot() {

    $('#btn_resizeHotspot').click(function () {
        isResized = true;
        $('.hotspot-info').off('click');//deshabilitar el click del button para que no nos muestre info

        $('#btn_newIcon').addClass('isDisabled');

        $('#btn_saveHotspot').removeClass('isDisabled');
        $('#btn_saveHotspot').prop('disabled', false);

        $('#btn_moveDraggable').addClass('isDisabled');

        $('#btn_resizeHotspot').prop('disabled', true);
        $('#btn_deleteHotspot').prop('disabled', true);

        $('.isDisabled').off('click');

        let imgID, size, hotspot;
        $('.hotspot').click(function () {
            showModalResize();
            imgID = $(this).attr('id');
            $('input').change(function () {
                // console.log('INPUT id _: ', imgID);
                size = $('.sliderIn').val();
                // console.log('size_: ', size);
                // console.log('hotspot_: ', hotspot);
                $('#' + imgID).css('width', size);
            });
            $('#closeResize').off('click');
            $('#closeResize').click(function () {
                hotspot = {
                    'name': imgID,
                    'size': size,
                    'function_post': "sizeUpdate"
                }
                // console.log('%c hotspot.name_: ', 'color: blue', hotspot.name, imgID);
                if (isOnTheUpdateList(imgID, listHotspotSize)) {
                    // console.log('%c ha entrado en el if_ isOnTheList', 'color: orange');
                    let position = listHotspotSize.map(function (e) { return e.name }).indexOf(imgID);
                    // console.log('before', listHotspotSize[position].size);
                    listHotspotSize[position].size = size;
                    // console.log('after', listHotspotSize[position].size);
                    // console.log('position_: ', position);
                } else {
                    // console.log('%c ha entrado en el else isOnTheList', 'color: purple');
                    // console.log('isOnTheList==false');
                    listHotspotSize.push(hotspot);
                }
            });
        });
    });
}

function updateSized() {
    $('#btn_saveHotspot').click(function () {
        if (isResized === true && listHotspotSize.length > 0) {
            sendUpdatedSize().done(function (response) {
                if (response === true) {
                    location.reload();
                }
                console.log('response_: ', response);
            }).fail(function (err) {
                console.log('err_: ', err);
            })
        }
    })
}

function controllerSaveHotspot() {
    console.log('ha entrado controllerSaveHotspot', isSaved);
    if (isSaved) {
        console.log('isSaved');
        saveHotspot();
        isSaved = false;
    } if (isDraggable) {
        console.log('isDraggable');
    } if (isResized) {
        console.log('isResized');
    } if (isDeleted) {
        console.log('isDeleled');
    } else {
        console.log('%c No hay eventos', 'color: orange');
    }
}

function removeSelectedHotspot() {
    $('#btn_deleteHotspot').click(function () {
        value = false;
        isDeleted = true;
        let hotspot, imgID;
        $('.hotspot-info').off('click');//deshabilitar el click del button para que no nos muestre info
        $('#btn_saveHotspot').prop('disabled', false);
        $('#btn_newIcon').prop('disabled', true);
        $('#btn_moveDraggable').prop('disabled', true);
        $('#btn_resizeHotspot').prop('disabled', true);
        $('#btn_deleteHotspot').prop('disabled', true);
        changeTheBtnText();//function que cambia el texto del button guardar
        $('.hotspot').click(function () {
            console.log('click hotspot_:');
            imgID = $(this).attr('id');
            $('#' + imgID).addClass('opClass');
            console.log('imgID_: ', imgID);
            if (isOnTheUpdateList(imgID, listRemoveHotspot)) {
                let position = listRemoveHotspot.map(function (e) { return e.name }).indexOf(imgID);
                listRemoveHotspot.splice(position, 1);
                $('#' + imgID).removeClass('opClass');
            } else {
                console.log('else');
                hotspot = {
                    'name': imgID,
                    'function_post': 'deleteHotspotByName'
                }
                listRemoveHotspot.push(hotspot);
            }

        })
    })
}

function deleteHotspot() {
    $('#btn_saveHotspot').click(function () {
        if (isDeleted === true && listRemoveHotspot.length > 0) {
            sendRemovedHotspot().done(function (response) {
                location.reload();
                console.log('response_: ', response);
            }).fail(function (err) {
                console.log('err_: ', err);
            })
        }
    })
}

function changeTheBtnText() {
    var btn = document.getElementById('btn_saveHotspot');
    console.log('btn', btn);
    value ? btn.innerText = "GUARDAR PUNTO" : btn.innerText = "ELIMINAR";
    value = !value;

}

function showInfoHotspot() {
    console.log('showInfoHotspot');
    $('.hotspot').addClass('hotspot-info');
    $('.hotspot-info').click(function () {
        let imgID = $(this).attr('id');
        console.log('click punto!!!!', imgID);
        $('.modalSpotTitle').text('PDF PRL');
        $('<iframe id="myframe" class="embed-responsive-item" src="https://www.diba.cat/documents/467843/48867524/CROEM_Guia_NT_Prevencion.pdf/b0e08073-7614-4589-bae1-8b3ac26beeb2" height="700px" width="100%" allowfullscreen></iframe>').appendTo('.modalSpotBody');
        $('#modalSpot').modal();
    });
}
