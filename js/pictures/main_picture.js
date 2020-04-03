$(document).ready(function () {
    console.log('%c ___Document Ready___', 'color: green');

    $('#btn_editPicture').click(function () {
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

    $('#btn_addIcon').click(function () {
        location.href = 'flat.html';
    })




})