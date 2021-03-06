// hace que el codigo es ejecutado solamente despues que la pagina termina de cargarse y protege toda varible contenida dentro del script para prevenir que no se hagan variables globales
$(function() {
    // indica el modo en que el navegador debe ejecutar el código JavaScript
    // El modo estricto elimina algunos errores silenciosos de JavaScript haciendo que lancen excepciones, corrige errores que hacen que sea difícil para los motores de JavaScript realizar optimizaciones y  prohibe cierta sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
    "use strict";

/** BEGIN Eventos **/
    // Crear Evento para eliminar un estudiante, cuando el usuario hace clic sobre el boton de eliminar
    document.getElementById('list-table').addEventListener('click', function(event) {
        if (event.target.name =='btn-delete'){
            EliminarDato('alumnos', event.target.value);
            //console.log(event.target.value);
        } else if (event.target.parentElement.name =='btn-delete') {
            EliminarDato('alumnos',event.target.parentElement.value);
            //console.log(event.target.parentElement.value);
        }
    },false);// Evento que elimina al estudiante al hacer clic sobre el boton de eliminar

    // Crear Evento para agregar un estudiante cuando el usuario ingresa datos en el formulario de registro
    document.getElementById('formulario-registro').addEventListener('submit', function(event) {
        event.preventDefault();
        var formulario = document.formularioRegistro;
        if (DatosValidos(formulario['nombre'].value, formulario['apellido'].value)) {
            var nombre = TransformarPrimerCaracterEnMayuscula(formulario['nombre'].value);
            var apellido = TransformarPrimerCaracterEnMayuscula(formulario['apellido'].value);
            var nuevoEstudiante = {
                'nombre' : nombre,
                'apellido' : apellido
            };
            AgregarDatos('alumnos', nuevoEstudiante);
            $('#modal-form-registration').modal('toggle');
        }
    }, false);// Evento que agrega al estudiante al hacer clic sobre el boton de Ingresar en el Formulario de Registro
/** END Events **/


    function DatosValidos(nombre, apellido) {
       if (nombre == null || nombre.length == 0 || /^\s*$/.test(nombre) || apellido == null || apellido.length == 0 || /^\s*$/.test(apellido)) {
           return false;
       } else {
           return true;
       }
    } // Verificar si los datos ingresados son validos

    function TransformarPrimerCaracterEnMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    } // Cambiar a mayuscula el primer caracter de la cadena de caracteres

    var MostarEstudiantes = function(estudiantes) {
        var listaAlumnos = document.getElementById('lista-alumnos');
        if (listaAlumnos != null ) {
            listaAlumnos.innerHTML = '';
            var contador = 1;
            for (var key in estudiantes) {
                listaAlumnos.innerHTML += '<tr>'+
                    '<td>'+ contador +'</td>'+
                    '<td>'+ key +'</td>'+
                    '<td>'+ estudiantes[key].nombre +'</td>'+
                    '<td>'+ estudiantes[key].apellido +'</td>'+
                    '<td>'+ '<button name="btn-edit" type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-form-modification" value="' + key + '"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></button>' + '<button type="button" name="btn-delete" class="btn btn-danger btn-sm" value="' + key + '"><i name="icon-delete" class="fa fa-trash-o fa-lg" aria-hidden="true"></i></button>'+'</td>' +
                    '</tr>';
                contador++;
            }
        }
    } // Mostrar Estudiantes

    var MostrarCantidadEstudiantes = function(cantidadEstudiantes) {
        var numeroTotalEstudiantes = document.getElementById('numero-total-estudiantes');
        if (cantidadEstudiantes >0) {
            numeroTotalEstudiantes.innerHTML = cantidadEstudiantes;
        } else {
            numeroTotalEstudiantes.innerHTML = 0;
        }
    }

    ObtenerDatos('alumnos', MostarEstudiantes);
    ObtenerCantidadRegistros('alumnos', MostrarCantidadEstudiantes);

});
