 

////////botones close de alert /////////
function closeAlerGen(){
    
    var a = document.getElementById("alertGen");
    a.style.display = "none";
}

function closeAlerKit(){
    
    var b = document.getElementById("alertKit");
    b.style.display = "none";
}


$(document).ready(function () {
    /* otra forma de traer y usar un tooltip
    $('th').tooltip({title: "Click to sort", trigger: "hover"}); */
    ///toolip diseño globo///
    $('[data-toggle="tooltip"]').tooltip();   


    ////////traer el json de kitnames/////////// 
    var ipServer = "apps.bitgenia.com/genecovapp";
    $.getJSON("http://" + ipServer + "/getAllKit", function (kitjson) {

        for (i = 0; i < kitjson.length; i++) {

            var valorKitname = kitjson[i].id;
            var kitname = kitjson[i].kitname;
            var x = document.getElementById("selectKit");
            var option = document.createElement("option");
            option.text = kitname;
            //obtenemos el valor de la option para poderlo meter en el array de preseleccion///
            option.value = valorKitname;
            x.appendChild(option);
            // console.log("ID - " + valorKitname + " >  Kitname - " + kitname);

        }
    });

    /////render necesario para refrescar el select //////

    var mySelect = $('#selectKit');

    $('#btn-render').on('click', function () {

        // alert("render del select dinamico");
        // mySelect.find('option:selected').prop('disabled', true);
        mySelect.find('option:selected');
        mySelect.selectpicker('refresh');
        mySelect.selectpicker('render');

    });

    ////// funcion para leer un archivo via remoto http ////////

    /* $(function () {
         $("#button").click(function () {
             alert('boton clickeado');
             //       var TXT_URL = 'https://www.mozilla.org/media/MPL/2.0/index.815ca599c9df.txt';
             var TXT_URL = $("#input-url").val();

             $.ajax({
                 url: TXT_URL,
                 dataType: "text",
                 success: function (data) {
                     $(".text").html("<pre>" + data + "</pre>");
                 }
             });
         });
     });*/

    //// Leer un archivo TXT Local (usado para leer csv y bed en input)/////////

    function leerArchivo(e) {

        var archivo = e.target.files[0];
        if (!archivo) {
            return;
        }
        var lector = new FileReader();
        lector.onload = function (e) {
            var contenido = e.target.result;
            mostrarContenido(contenido);
        };

        lector.readAsText(archivo);
    }

    function mostrarContenido(contenido) {
        var elemento = document.getElementById('input-csv');
        elemento.innerHTML = contenido;
        //    alert("File content:  " + contenido);
        document.getElementById('input-csv').value = contenido;

    }

    document.getElementById('file-input')
        .addEventListener('change', leerArchivo, false);

}); ////cierre documentReady////////
