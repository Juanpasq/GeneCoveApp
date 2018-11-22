
///funcion btn cancelar ////
function clean() {
    document.getElementById("input-csv").value = "";
    location.reload();
}

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

///declaramos el array afuera, lo llenamos asi despues lo leemos con funcion url()//////
var array = [];
$(document).ready(function () {

    ///usamos el array que declaramos afuera//////
    $('#selectKit').change(function () {
        // Obtener valor del las opciones selecionadas
        var selectValue = $("#selectKit").val();
        //  $("#resultadoValue").text(selectValue);
        // ver como queda el array de seleccionados final/////
        //console.log("asdasdads" + selectValue);
        array = selectValue;
    });

    /* otra forma de traer y usar un tooltip
    $('th').tooltip({title: "Click to sort", trigger: "hover"}); */
    ///toolip diseño globo///
    $('[data-toggle="tooltip"]').tooltip();   

    /////render necesario para refrescar el select //////
    var mySelect = $('#selectKit');

    $('#btn-render').on('click', function () {

        // alert("render del select dinamico");
        // mySelect.find('option:selected').prop('disabled', true);
        mySelect.find('option:selected');
        mySelect.selectpicker('refresh');
        mySelect.selectpicker('render');

    });
    ////armar array con los kit seleccionados//////      

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

    document.getElementById('file-input').addEventListener('change', leerArchivo, false);

});

////armardo de la url con el id kit seleccionado y los valores genes////// 
function url() {

    var idTabla = 0;
    //////validamos que no esten vacios los campos de ingreso////////
    var inpGen = document.getElementById("input-csv");
    var inpKit = document.getElementById("selectKit");
    if (inpGen.value == "") {
        /// alert("Please insert Gene code");
        var errorGen = document.getElementById("alertGen");
        errorGen.style.display = "block";
    } else if (inpKit.value == "") {
        ///alert("Please select Kitname coverage");
        var errorKit = document.getElementById("alertKit");
        errorKit.style.display = "block";
    } else {
        //////ejecutamos accion para poner el modal + pantalla block + spinner///////
        modal.style.display = "block";
        ////////IP SERVER////////////////
        var ipServer = "apps.bitgenia.com/genecovapp";
        var kitsSeleccionados = array.toString();
        //////traemos los valores de los genes introducidos en el input/////////
        var csvValues3 = document.getElementById('input-csv').value;
        csvValues3 = csvValues3.split(",");
        csvValues3.sort();
        csvValues2 = csvValues3.toString();
        // console.log("CSV"+csvValues);
        csvValues = csvValues2.replace(/\s/g, "");
        //console.log("VALORES ORDENADOS:  " + csvValues.length)
        ///prueba para ver como sale el url para procesar////
        //console.log(csvValues+"  -- URL PRUEBA");
        console.log("https://" + ipServer + "/getGeneStats/" + kitsSeleccionados + "/" + csvValues + "");
        //window.open("http://"+ipServer+"/genecovapp/getGeneStats/" + kitsSeleccionados + "/" + csvValues + "");                  
        //window.open("tabla.html");
        /////armamos una variable para traer el archivo json/////
        var urlProcesada = "https://" + ipServer + "/getGeneStats/" + kitsSeleccionados + "/" + csvValues + "";
        ///buscamos las propiedades de los genes seleccionados en la url resultado///
        $.getJSON(urlProcesada, function (genesjson) {
            /*   console.log("entro >>> " + genesjson[0]["genes"][0].symbol);
                 console.log("longitud array KIT >>> " + genesjson.length);
                 console.log("longitud array GENES >>> " + genesjson[0]["genes"].length);*/
            ////recorremos para buscar el KIT////
            for (k = 0; k < genesjson.length; k++) {
                //cantidad genes array seleccionado////
                var cantidadGenes = genesjson[k]["genes"].length;
                ////////titulo de la barra kitname en tabla////////
                var kitname = genesjson[k].name + " (" + cantidadGenes + ")";
                var texto = document.createTextNode(kitname);
                var tablaGeneral = document.getElementById("divTabla");
                var div = document.createElement("div");
                //tablaGeneral.className += "table-responsive";
                var tabla = document.createElement("table");
                tabla.className += "table";
                //tabla.setAttribute = ("id", "table")
                ////creamos todos los elementos/////////
                var trKitname = document.createElement("tr");
                var tr = document.createElement("tr");
                var thKitname = document.createElement("th");
                var th = document.createElement("th");
                th.style.verticalAlign = "middle";
                var th2 = document.createElement("th");
                th2.style.verticalAlign = "middle";
                var th3 = document.createElement("th");
                th3.style.verticalAlign = "middle";
                var th4 = document.createElement("th");
                th4.style.verticalAlign = "middle";
                var th5 = document.createElement("th");
                th5.style.verticalAlign = "middle";
                var th6 = document.createElement("th");
                th6.style.verticalAlign = "middle";
                var th7 = document.createElement("th");
                th7.style.verticalAlign = "middle";
                var th8 = document.createElement("th");
                th8.style.verticalAlign = "middle";
                //////creamos los textos contenidos de cada celda cabecera//////////
                var texto1 = document.createTextNode("Symbol   ");
                var texto2 = document.createTextNode("Coding Region Coverage   ");
                var texto3 = document.createTextNode("Region Coverage UTR   ");
                var texto4 = document.createTextNode("Pathogenic variants");
                var texto5 = document.createTextNode("Covered Pathogenic variants");
                var texto6 = document.createTextNode("Pathogenic variants not covered");
                var texto7 = document.createTextNode("Detail Pathogenic variants not covered");
                var texto8 = document.createTextNode("Synonyms");
                /////añadimos los textos//////
                thKitname.appendChild(texto);
                thKitname.setAttribute("colSpan", 8);
                thKitname.className += "kitnameRow";
                th.appendChild(texto1);
                th2.appendChild(texto2);
                th3.appendChild(texto3);
                th4.appendChild(texto4);
                th5.appendChild(texto5);
                th6.appendChild(texto6);
                th7.appendChild(texto7);
                th8.appendChild(texto8);

                /*
                    var span =document.createElement("span");
                    span.className += "glyphicon glyphicon-sort";

                    var span2 =document.createElement("span");
                    span2.className += "glyphicon glyphicon-sort";

                    var span3 =document.createElement("span");
                    span3.className += "glyphicon glyphicon-sort";

                    th.appendChild(span);
                    th2.appendChild(span2);
                    th3.appendChild(span3);
                */

                /////pegamos las celdas al row////
                trKitname.appendChild(thKitname);
                tr.appendChild(th);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
                tr.appendChild(th6);
                tr.appendChild(th7);
                tr.appendChild(th8);
                var cabecera = document.createElement("thead");
                var tbody = document.createElement("tbody");
                cabecera.appendChild(trKitname);
                cabecera.appendChild(tr);
                ////armamos la funcion click con forma de string para que lo pueda leer/////
                idTabla++;

                /////////armamos los 3 ordenamientos para las 3 col necesarias///////////
                var idTablaString = "sortTable" + "(" + idTabla + ")";
                idTablaString = String(idTablaString);

                var idTablaString2 = "sortTable2" + "(" + idTabla + ")";
                idTablaString2 = String(idTablaString2);

                var idTablaString3 = "sortTable3" + "(" + idTabla + ")";
                idTablaString3 = String(idTablaString3);

                th.setAttribute("onclick", idTablaString);
                th2.setAttribute("onclick", idTablaString2);
                th3.setAttribute("onclick", idTablaString3);

                th.setAttribute("data-toggle", "tooltip");
                th.setAttribute("title", "Click to sort");
                th2.setAttribute("data-toggle", "tooltip");
                th2.setAttribute("title", "Click to sort");
                th3.setAttribute("data-toggle", "tooltip");
                th3.setAttribute("title", "Click to sort");

                //////agregamos id solo a los 3 col que tienen sort para manipularlos mejor/////////
                th.setAttribute("id", "th");
                th2.setAttribute("id", "th2");
                th3.setAttribute("id", "th3");

                // console.log("ID TABLA PASADO A STRING PARA LA FUNCION ORDENAR : "+idTablaString)
                //cabecera.setAttribute("onclick", idTablaString);
                tabla.appendChild(cabecera);
                ///subrecorrido para encontrar los genes dentro de ese kit de cover//////
                // console.log("GENES DENTRO DEL KIT :  " + genesjson[k]["genes"].length);
                for (g = 0; g < genesjson[k]["genes"].length; g++) {
                    // console.log(genesjson[k]["genes"][g].symbol);
                    var symbol = genesjson[k]["genes"][g].symbol;
                    //    console.log(genesjson[k]["genes"][g].coverageCDS);
                    var coverageCDS = genesjson[k]["genes"][g].coverageCDS;
                    coverageCDS = (coverageCDS * 100).toFixed(1) + "%";
                    //   console.log(genesjson[k]["genes"][g].coverageCDSUTR);
                    var coverageCDSUTR = genesjson[k]["genes"][g].coverageCDSUTR;
                    coverageCDSUTR = (coverageCDSUTR * 100).toFixed(1) + "%";
                    //   console.log(genesjson[k]["genes"][g].pathogenicVariants);
                    var pathogenicVariants = genesjson[k]["genes"][g].pathogenicVariants;
                    //   console.log(genesjson[k]["genes"][g].pathogenicVariantsCover);
                    var pathogenicVariantsCover = genesjson[k]["genes"][g].pathogenicVariantsCover;
                    /////columna agregada diferencia entre patg cubiertos y no cubiertos (no json)////
                    var diferenciaPatog = (pathogenicVariants - pathogenicVariantsCover);
                    //  console.log(genesjson[k]["genes"][g].variantNotCovered);
                    var variantNotCovered2 = genesjson[k]["genes"][g].variantNotCovered;
                    ///validamos que si es null que dibuje cero///
                    if (variantNotCovered2 == "") {
                        var variantNotCovered = 0;
                    } else {
                        var variantNotCovered = variantNotCovered2
                    };
                    //console.log(genesjson[k]["genes"][g].synonyms);
                    var synonyms = genesjson[k]["genes"][g].synonyms;
                    /////////traemos la tabla y creamos las celdas//////////
                    // var tabla = document.getElementById("contenidoTabla");
                    //una fila//
                    var fila = document.createElement("tr")
                    var celda1 = document.createElement("td");
                    var celda2 = document.createElement("td");
                    var celda3 = document.createElement("td");
                    var celda4 = document.createElement("td");
                    var celda5 = document.createElement("td");
                    var celda6 = document.createElement("td");
                    var celda7 = document.createElement("td");
                    var celda8 = document.createElement("td");
                    //textos de las 8 celdas//
                    var texto1 = document.createTextNode(symbol);
                    var texto2 = document.createTextNode(coverageCDS);
                    var texto3 = document.createTextNode(coverageCDSUTR);
                    var texto4 = document.createTextNode(pathogenicVariants);
                    var texto5 = document.createTextNode(pathogenicVariantsCover);
                    var texto6 = document.createTextNode(diferenciaPatog);
                    var texto7 = document.createTextNode(variantNotCovered);
                    var texto8 = document.createTextNode(synonyms);
                    //pegamos los componentes a sus padres//
                    celda1.appendChild(texto1);
                    celda2.appendChild(texto2);
                    celda3.appendChild(texto3);
                    celda4.appendChild(texto4);
                    celda5.appendChild(texto5);
                    celda6.appendChild(texto6);
                    celda7.appendChild(texto7);
                    celda8.appendChild(texto8);
                    fila.appendChild(celda1);
                    fila.appendChild(celda2);
                    fila.appendChild(celda3);
                    fila.appendChild(celda4);
                    fila.appendChild(celda5);
                    fila.appendChild(celda6);
                    fila.appendChild(celda7);
                    fila.appendChild(celda8);
                    //var tbody = document.createElement("tbody");
                    tbody.appendChild(fila);
                    // tbody.setAttribute("id", "tbody")
                    tabla.appendChild(tbody);
                    tabla.setAttribute("id", idTabla);
                    div.appendChild(tabla);
                    div.classList.add("table-responsive");
                    tablaGeneral.appendChild(div);

                    ///FIN traemos la tabla y creamos las celdas///
                    ///mostramos la tabla al finalizar la obtencion de datos///
                    var divTabla = document.getElementById("divTabla");
                    divTabla.style.display = "block";
                    //////// sacamos el spinner con el modal screen////////////
                    var modal = document.getElementById('myModal');
                    modal.style.display = "none";
                    ////////////cerramos los alert de los inpt/////////////////
                    var a = document.getElementById("alertGen");
                    a.style.display = "none";
                    var b = document.getElementById("alertKit");
                    b.style.display = "none";

                    //////escondemos la parte superior para subir la tabla//////
                    var containerBusqueda = document.getElementById("containerBusqueda");
                    containerBusqueda.style.display = "none";

                }
            }
        });
    }

} /////fin funcion url ()/////////////

////por el momento 3 funciones de ordenamiento de las 3 col necesarias enviando parametro a cada una//////
    //////////codigo ordenamiento tabla////////////////////
    function sortTable(idTabla) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById(idTabla);
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 2; i < (rows.length); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
                //check if the two rows should switch place:
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    //////////codigo ordenamiento cover ////////////////////
    function sortTable2(idTabla) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById(idTabla);
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 2; i < (rows.length); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[1];
                y = rows[i + 1].getElementsByTagName("TD")[1];
                //check if the two rows should switch place:
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    //////////codigo ordenamiento cover crt////////////////////
    function sortTable3(idTabla) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById(idTabla);
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 2; i < (rows.length); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];
                //check if the two rows should switch place:
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
    /////fin sortTable///////
    
    /////2 funciones para generar el csv y descarga////////////
    function downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;
        // CSV file
        csvFile = new Blob([csv], {
            type: "text/csv"
        });
        // Download link
        downloadLink = document.createElement("a");
        // File name
        downloadLink.download = filename;
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
        // Hide download link
        downloadLink.style.display = "none";
        // Add the link to DOM
        document.body.appendChild(downloadLink);
        // Click download link
        downloadLink.click();
    }

    function exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [],
                cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);
            csv.push(row.join(","));
        }
        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }
    //////fin de 2 funciones para csv//////////////////

////////botones close de alert /////////
function closeAlerGen(){
    var a = document.getElementById("alertGen");
    a.style.display = "none";
}

function closeAlerKit(){
    var b = document.getElementById("alertKit");
    b.style.display = "none";
}

