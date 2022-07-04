let carrito = [];
let productosJSON = [];

  window.onload=()=>{
      document.querySelector("#miSeleccion option[value='pordefecto']").setAttribute("selected", true);
      document.querySelector("#miSeleccion").onchange=()=>ordenar();
  };




function renderizarProductos() {
    //renderizamos los productos 
   console.log(productosJSON)
    for (const prod of productosJSON) {
        document.getElementById("miLista").innerHTML+=`<li class="  col-sm-3 list-group-item">
        <img src="${prod.img}"width="250px" height="250px">
        <p>Producto:${prod.nombre}</p>
        <p>Precio:${prod.precio}</p>
        <button class="btn css-button-fully-rounded--sky" id="btn${prod.id}">COMPRAR</button>
        </li>`;
    }
    //EVENTOS
    for (const prod of productosJSON) {
         //Evento para cada boton
         document.getElementById(`btn${prod.id}`).onclick= function() {
            agregarACarrito(prod);
        };
    }
}



class ProductoCarrito {
    constructor(objProd) {
        this.id = objProd.id;
        this.img = objProd.foto;
        this.nombre = objProd.nombre;
        this.precio = objProd.precio;
        this.cantidad = 1;
    }
}

function agregarACarrito(productoNuevo) {
    let encontrado =carrito.find(p =>p.id == productoNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let prodACarrito = new ProductoCarrito(productoNuevo);
        carrito.push(prodACarrito);
        console.log(carrito);
        Swal.fire(
            'Nuevo producto agregado al carro',
            productoNuevo.nombre,
            'success'
        );
        //agregamos una nueva fila a la tabla de carrito
        document.querySelector("#tablabody").innerHTML+=(`
            <tr id='fila${prodACarrito.id}'>
            <td> ${prodACarrito.id} </td>
            <td> ${prodACarrito.nombre}</td>
            <td id='${prodACarrito.id}'> ${prodACarrito.cantidad}</td>
            <td> ${prodACarrito.precio}</td>
            <td> <button class='btn btn-light' onclick='eliminar(${prodACarrito.id})'>🗑️</button>`);
    } else {
        //pido al carro la posicion del producto 
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        //con querySelector falla
        document.getElementById(productoNuevo.id).innerHTML=carrito[posicion].cantidad;
    }
    document.querySelector("#gastoTotal").innerText=(`Total: $ ${CalcularTotal()}`);

}

function CalcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (elemento.precio*elemento.cantidad);
    }
    return suma;
}

function eliminar(id){
    let indice=carrito.findIndex(prod => prod.id==id);
    carrito.splice(indice,1);
    let fila=document.getElementById(`fila${id}`);
    document.getElementById("tablabody").removeChild(fila);
    document.querySelector("#gastoTotal").innerText=(`Total: $ ${CalcularTotal()}`);
}

 function ordenar() {
     let seleccion = document.querySelector("#miSeleccion").value;
     console.log(seleccion)
     if (seleccion == "menor") {
         productosJSON.sort(function(a, b) {
             return a.precio - b.precio
         });
     } else if (seleccion == "mayor") {
         productosJSON.sort(function(a, b) {
             return b.precio - a.precio
         });
     } else if (seleccion == "alfabetico") {
         productosJSON.sort(function(a, b) {
             return a.nombre.localeCompare(b.nombre);
         });
     }
     document.getElementById("miLista").innerHTML="";
     renderizarProductos()
 } 
   

//GETJSON de productos.json         
async function obtenerJSON() {
    const URLJSON="/productos.json"
    const resp=await fetch("/productos.json")
    const data= await resp.json()
    productosJSON = data;
    renderizarProductos();
}
obtenerJSON();


/* EFECTOS JS */
  var typed = new Typed('.typed', {
    /**
     * @property {array} strings strings to be typed
     * @property {string} stringsElement ID of element containing string children
     */
    strings: [
      '<i class"mascota"> E commerce Javascript </i>',
     
     
    ],
    stringsElement: null,
  
    /**
     * @property {number} typeSpeed type speed in milliseconds
     */
    typeSpeed: 100,
  
  
  
  });