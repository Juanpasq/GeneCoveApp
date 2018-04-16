
$(document).ready(function () {

    // alert("document ready - prueba de carga document ready!");

    ////// funcion para leer un archivo via remoto http ////////


    $(function () {
        $("#button").click(function () {
            alert('boton clickeado');
            //       var TXT_URL = 'https://www.mozilla.org/media/MPL/2.0/index.815ca599c9df.txt';
            var TXT_URL = $("#input-url").val();

            $.ajax
                (
                {
                    url: TXT_URL,
                    dataType: "text",
                    success: function (data) {
                        $(".text").html("<pre>" + data + "</pre>");
                    }
                }
                );
        });
    });


    //// Leer un archivo TXT Local /////////

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
        alert("File content:  " + contenido);
        document.getElementById('input-csv').value = contenido;

    }

    document.getElementById('file-input')
        .addEventListener('change', leerArchivo, false);

    ////////////////////////////////////////////////////


}); ////cierre documentReady////////  







