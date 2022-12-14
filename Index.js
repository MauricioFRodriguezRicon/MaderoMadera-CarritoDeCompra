//Clase producto donde se almacenan todos los datos
class Producto {
    nombre;
    precio;
    cantidad;
    foto;
    //Constructor para generar objeros de clase Producto
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    //Setters y getters
    get nombre() {
        return this.nombre;
    }

    get precio() {
        return this.precio;
    }

    get cantidad() {
        return this.cantidad;
    }
    set cant(cantidad) {
        this.cantidad = cantidad;
    }
}


//Inicializacion
let repetido;
let carrito = [];

//Funcion para agregar elementos al carrito(Evalua si ya existen, si es asi suma las cantidades,sino lo agrega al final)
function agregarAlCarrito(nuevoNom, precio, idCant) {
    let cantidad = parseInt(document.getElementById(idCant).value);
    nuevo = new Producto(nuevoNom, precio, cantidad);
    if (carrito != null) {
        repetido = carrito.findIndex(nom => nom.nombre == nuevoNom);
        if (repetido == -1) {
            carrito.push(nuevo);
        } else {
            carrito[repetido].cantidad += cantidad;
        }
    } else {
        carrito.push(nuevo);
    }
    localStorage.setItem("Lista_Carrito", JSON.stringify(carrito));
}

//Funcion que verifica que la cantidad de un producto no puede ser menor a 1
function verificarValor(id){
    let input = document.getElementById(id);
    if (input.value < 1){
        input.value = 1;
    }
}