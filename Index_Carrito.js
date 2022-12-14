  //Objeto base de todos los objetos del carrito
  //Con sus respectivos atributos y metodos
  class objetoFactura{
    nombre;
    precio;
    cantidad;
    total;
    id;
    padre;
    control;

    //Funcion para crear un objeto de tipo objetoFactura
    constructor(nombre,precio,cant,id,padre,control){
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cant;
      this.id = id;
      this.padre = padre;
      this.total = precio * cant;
      this.control = control;
    }
    //Setters y getters
    set cantidad(cant){
      this.cantidad = cant;
    }

    get cantidad(){
      return this.cantidad;
    }

    get nombre(){
      return this.nombre;
    }

    get precio(){
      return this.precio;
    }

    get id(){
      return this.id;
    }

    //Generar un producto y visualizarlo en la pantalla
    generarProducto(){
      
      let contenedor = document.createElement("div");
      contenedor.setAttribute("class","contenedor");
      padre.appendChild(contenedor);

      let p = document.createElement("p");
      p = document.createTextNode("Nombre: "+this.nombre + " Total: ");
      contenedor.appendChild(p);

      let aPagar = document.createElement("p");
      let texto = document.createTextNode(this.total);
      aPagar.setAttribute("id",this.id);
      aPagar.appendChild(texto);
      contenedor.appendChild(aPagar);

      let cantidad = document.createElement("input");
      cantidad.type = "number";
      cantidad.value = this.cantidad; 
      cantidad.id = "cant" + this.id
      cantidad.addEventListener("change",() => this.verificarValor(this.id));
      cantidad.addEventListener("change", () => this.modificarCantidad(cantidad.value));
      
      contenedor.appendChild(cantidad);

      let eliminar = document.createElement("input");
      eliminar.type = "button"  
      eliminar.value = "X"
      eliminar.setAttribute("class","eliminar");
      eliminar.setAttribute("class","btn btn-dark");
      eliminar.addEventListener("click",() => this.eliminarDelCarrito(contenedor,p,aPagar,cantidad,eliminar));
      contenedor.appendChild(eliminar);

      let salto = document.createElement("br");
      contenedor.appendChild(salto);
    }

    //Funcion para verificar que la cantidad   no pueda ser menor a 1
    verificarValor(id){
      let cant = document.getElementById("cant"+id);
      if (cant.value < 1){
          cant.value = 1;
      }
    }
    //Funcion que actualiza el total y modifica el mostrado en pantalla para que coincida con el nuevo
    actualizarTotal(){
      this.total = this.precio*this.cantidad;
      let aPagar = document.getElementById(this.id);
      aPagar.innerHTML = this.total;
    }

    //Funcion que modifica la cantidad y llama al control para que actualize los valores de la lista de objetos
    modificarCantidad(cant){
      this.cantidad = cant;
      this.actualizarTotal();
      control.modificarCant(this.id);
    }

    //Funcion que elimina todos los elementos creados y luego llama al control para que lo elimine de la lista de objetos
    eliminarDelCarrito(contenedor,p,aPagar,cantidad,eliminar){
      eliminar.remove();
      cantidad.remove();
      aPagar.remove();
      p.remove();
      contenedor.remove();
      control.eliminarDelVector(this.id);
    }
   }




   //Objeto carrito
   //Metodos para controlar los elementos dentro del carrito(actualizacion,eliminacion,etc)

   class objetoCarrito{
        carrito;
        objetos;
        padre;
   
        //Funcion para crear un objeto del tipo objetoCarrito
      constructor(carro,padre) {
        this.carrito = [];
        this.objetos = [];
        this.padre = padre;
        this.carrito = carro;
        

        if (this.carrito != null) {
          for (let i = 0; i < this.carrito.length; i++) {
            let nuevo = new objetoFactura(this.carrito[i].nombre,this.carrito[i].precio,this.carrito[i].cantidad,i,this.padre,this);
            this.objetos.push(nuevo);
            nuevo.generarProducto();
            }
          this.calcularTotal();
      }
      }
      //Funcion que permite calcular el total de todos los elementos del carrito
      calcularTotal(){
        let sumaTotal = 0;
        for(let i = 0; i<this.objetos.length;i++){
          sumaTotal += this.objetos[i].total;
        }
        let valorTotal = document.getElementById("valorTotal");
        valorTotal.innerHTML = sumaTotal;
      }

      //Funcion que permite modificar la cantidad del objeto representado en el vector carrito(Posee datos) 
      //dependiendo del mismo objeto en el vecor de objetos(Posee metodos)
      modificarCant(id){
        this.carrito[id].cantidad = this.objetos[id].cantidad;
        this.actualizarCarrito();
        this.calcularTotal();
      }

      //Funcion para eliminar un elemento de ambos vecores
      eliminarDelVector(id){
        this.carrito.splice(id,1);
        for(let i = id +1; i < this.objetos.length;i++){
          this.objetos[i].id = this.objetos[i].id - 1;
        }
        this.objetos.splice(id,1);
        this.actualizarCarrito();
        this.calcularTotal();
      }

      //Funcion para actualizar el localStorage
      actualizarCarrito(){
        localStorage.clear();
        localStorage.setItem("Lista_Carrito", JSON.stringify(this.carrito));
      }
      }

  //Inicializacion de la pagina
  const padre = document.getElementById("factura");
  let carrito = [];
  carrito = JSON.parse(localStorage.getItem("Lista_Carrito"));
  let control = new objetoCarrito(carrito,padre)
    
    
  //Funcion para limpiar el carrito
  //Usada por el boton limpiar
  function limpiar() {
    localStorage.clear();  
    location.reload();
   }
 
  //Funcion que emite una alerta agradeciendo por el pedido
  //Usadopor el boton comprar
  function comprar(){
    alert("Gracias por su reserva en Madero Madera. Su pedido se ha registrado por favor comuniquese con alguno de los medios de contacto para acordar los ultimos detalles de su pedido");
  }