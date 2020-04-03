
function sendEditedPicture(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "POST",
        dataType: 'json',
        data: picture
    });
}

function sendUpdatedPicture(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "POST",
        dataType: 'json',
        data: picture
    });
}

function getPictureByID(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "GET",
        dataType: 'json',
        data: picture
    });
}

function sendRemovePicture(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "POST",
        dataType: 'json',
        data: picture
    });
}

//ELIMINAR UNA IMAGEN POR SU ID
function removePictureByID(picture) {
    sendRemovePicture(picture).done(function (response) {
        console.log('%c response_remove: ', 'color: blue', response);
        if (response === true) {
            setTimeout(function () {
                location.reload();
            }, 3000);
        } else {
            console.log('error remove picture');
        }
    }).fail(function (err) {
        console.log('%c err_remove: ', 'color: red', err);
    })
}

//FUNCTION QUE MUESTRA LA IMAGEN ALMACENADA EN LA BDD Y LA MUESTRA EN EL BODY DEL HTML COMO PRUEBA
function showPictureByID(picture) {
    getPictureByID(picture).done(function (response) {
        if (response === false) {
            console.log('%c picture not found', 'color: orange', false);
        } else {
            var img = new Image();
            img.src = response;
            document.body.appendChild(img);//agregar img al body del doc
            console.log('%c img.src_: ', 'color: purple', img);
        }
    }).fail(function (err) {
        console.log('%c err_: ', 'color: orange', err);
    })
}

//FUNCTION EN LA QUE EDITAMOS UNA IMAGEN LLAMANDO A UNA FUNCIÓN INTERNA saveHandler DEL PLUGIN PAINTERRO
//LA IMAGEN EDITADA SE GUARDA EN LA BDD
function saveEditedPicture(linkPicture) {
    Painterro({
        saveHandler: function (image) {
            var picture = {
                'img_base64': image.asDataURL(),
                'link': linkPicture,
                'function_post': 'savePicture'
            }
            console.log('%c picture_: ', 'color: purple', picture);
            sendEditedPicture(picture).done(function (response) {
                if (response === true) {
                    console.log('%c response_: ', 'color: green', response);
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
            }).fail(function (err) {
                console.log('%c err_: ', 'color: orange', err);
            });
        }
    }).show(linkPicture);
}

//FUNCTION QUE PERMITE EDITAR UNA IMAGEN YA ALMACENADA EN LA BDD
function updatePicture(picture) {
    console.log('%c Picture updatePicture obj_1: ', 'color: blue', picture);
    //llamada a la BDD para obtener la imagen que queremos actualizar
    getPictureByID(picture).done(function (response) {
        if (response === false) {
            console.log('Image not found');
        } else {
            var img = new Image();
            img.src = response;
            console.log('img _: ', img);
            Painterro({
                saveHandler: function (image) {
                    console.log('%c imageDataURL()_: ', 'color: blue', image.asDataURL());
                    picture.img_base64 = image.asDataURL();
                    picture.function_post = 'updatePicture';
                    console.log('%c Picture updatePicture obj_2: ', 'color: brown', picture);
                    sendUpdatedPicture(picture).done(function (response) {
                        console.log('%c response_: ', 'color: green', response);
                        if (response === true) {
                            setTimeout(function () {//QUITAR Timeout
                                location.reload();
                            }, 3000);
                        } else {
                            alert('Error update !');
                        }
                    }).fail(function (err) {
                        console.log('%c err_: ', 'color: orange', err);
                    });
                }
            }).show(img.src);
        }
    }).fail(function (err) {
        console.log('%c err_: ', 'color: red', err);
    })

}

