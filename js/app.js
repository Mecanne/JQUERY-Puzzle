$(function () {

    // Hacemos sortable a la lista.
    $("#sortable").sortable({
        placeholder: 'ui-state-highlight'
    });

    $("#sortable").disableSelection();

    var longitudes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    $("#sortable").children().each(function () {
        let posicion = parseInt(Math.floor(Math.random() * (longitudes.length)));
        $(this).css("background-image", "url('img/r" + longitudes[posicion] + ".jpg')");
        $(this).data('number', longitudes[posicion]);
        longitudes.splice(posicion, 1);
    });

    $("#sortable").toggle();
    $(".time").toggle();

    $("#comenzar").click(function (e) { 
        e.preventDefault();
        $(this).hide();
        $("#menu").hide();
        $(".time").toggle();
        $("#sortable").toggle();
    });

});

function getArrayOrden() {
    var arrayPosiciones = [];
    $("#sortable").children().each(function () {
        var dataNumber = $(this).data('number');
        if (!isNaN(dataNumber)) {
            arrayPosiciones.push(dataNumber);
        }
    });
    return arrayPosiciones;
}

function comprobarArray() {
    var longitudes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var arrayPosiciones = getArrayOrden();
    for (let i = 0; i < 16; i++) {
        if (longitudes[i] !== arrayPosiciones[i]) return false;
    }
    return true;
}

function comprobarVictoria() {
    sumarTiempo();
    if (comprobarArray()) {
        alert('Has ganado');
        clearInterval(intervalo);
        $("#sortable").sortable("disable");
    }
}

function sumarTiempo() {
    tiempo += 100;
    $("#time").html("&nbsp;" + tiempo/1000 + " s");
}

var tiempo = 0;

var intervalo = setInterval(comprobarVictoria, 100);
