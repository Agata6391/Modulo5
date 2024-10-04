class Producto{
    constructor (nombre, precio, cantidad , descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }
    calcularTotal(cantidad){
        return this.precio * cantidad;
    }
}
    class Facturador{
        constructor(){
            this.carrito = [];
            this.subtotal=0;
            this.taxRate=0.13;
            this.facturaID=1;

        }
        agregarAlCarrito(producto, cantidad){
            const totalProducto=producto.calcularTotal(cantidad);
            this.carrito.push({producto,cantidad,totalProducto});
            this.actualizarSubtotal();
        }
     
        actualizarSubtotal(){
            this.subtotal = this.carrito.reduce((acc, item) => acc + item.totalProducto,0);
            this.mostrarTotales();
        }
        mostrarTotales(){
            const impuesto = this.subtotal*this.taxRate;
            const total = this.subtotal + impuesto;
            document.getElementById('subtotal').innerText=this.subtotal.toFixed(2);
            document.getElementById('tax').innerText=impuesto.toFixed(2);
            document.getElementById('total').innerText= total.toFixed(2);
        }
        generarFactura(){
            const numerofactura= this.facturaID++;
            const factura = `
            Factura #: ${numerofactura}\n
            Productos: ${this.carrito.map(item=>`${item.product.nombre}(X${item.cantidad})`).join(', ')}\n
            Subtotal: ${this.subtotal.toFixed(2)}\n
            Impuesto: ${this.subtotal*this.taxRate.toFixed(2)}\n
            Total: ${(this.subtotal + this.subtotal*this.taxRate).toFixed(2)}\n          
            `
            return factura;
        
    } 
}       

    //Inicializar el programa
    const facturador = new Facturador();
    function mostraInvenatrio(){
        const tablaInventario = document.getElementById('inventory-table').querySelector('tbody');
        inventario.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.precio.toFixed(2)}</td>
            <td>${item.cantidad}</td>
            <td><button onClick="agregarProducto('${item.nombre}')"> Add to cart</button></td>
    
            `
            tablaInventario.appendChild(fila);            
        }); 
    }
    function agregarProducto(nombreProducto){
        const productoSeleccionado = inventario.find(item => item.nombre === nombreProducto);
        const producto= new Producto(productoSeleccionado.nombre, productoSeleccionado.precio, productoSeleccionado.cantidad,productoSeleccionado.descripcion);
        facturador.agregarAlCarrito(producto, 1);
        mostrarCarrito(); 
    }
    function mostrarCarrito(){
        const tablaCarrito=document.getElementById('cart-table').querySelector('tbody');
        tablaCarrito.innerHTML='';
        facturador.carrito.forEach(item=>{
            const fila=document.createElement('tr');
            fila.innerHTML=`
            <td>${item.producto.nombre}</td>
            <td>${item.producto.precio.toFixed(2)}</td>
            <td>${item.cantidad}</td>
            <td>${item.totalProducto.toFixed(2)}</td>
            <td><button onClick="eliminarProducto(${item.producto.nombre})">Eliminar</button></
            `;
            tablaCarrito.appendChild(fila);

        });
    }
    document.getElementById('generate-invoice').addEventListener('click',()=>{
            const factura = facturador.generarFactura();
            console.log(factura)
    });


    window.onload = mostraInvenatrio

   

