/** Inicializar Firebase **/
function InicializarFb() {
    var config = {
        apiKey: "AIzaSyDpXnzjfjIhmd43nUbV_DOZH4hWqLxM-wQ",
        authDomain: "escuela-p1.firebaseapp.com",
        databaseURL: "https://escuela-p1.firebaseio.com",
        storageBucket: "escuela-p1.appspot.com",
        messagingSenderId: "1038538624822"
    };
    firebase.initializeApp(config);
} // Inicializar Firebase

function ObtenerDatos(ruta, callback) {
    var datosRef = firebase.database().ref(ruta);
    datosRef.on('value', function(snap) {
        callback(snap.val());
    });
} // Obtener datos de la ruta

function AgregarDatos(ruta, dato) {
    var datosRef = firebase.database().ref(ruta);
    datosRef.push(dato);
} // Agregar dato

function EliminarDato(ruta, dato) {
    var datosRef = firebase.database().ref(ruta);
    var datoAEliminar = datosRef.child(dato);
    datoAEliminar.remove();
} // Eliminar dato

function ObtenerCantidadRegistros(ruta, callback) {
    var datosRef = firebase.database().ref(ruta);
    datosRef.on('value', function(snap) {
        callback(snap.numChildren());
    });
}

InicializarFb();