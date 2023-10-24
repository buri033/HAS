async function regisProducto() {
    let datos = {};
    datos.nombre = document.getElementById("txtnombre").value;
    datos.marca = document.getElementById("txtmarca").value;
    datos.tipo = document.getElementById("txttipo").value;
    datos.precio = document.getElementById("txtprecio").value;
    datos.cantidad = document.getElementById("txtcantidad").value;

// Validar que ningún campo esté en blanco
    if (datos.nombre === "" || datos.marca === "" || datos.tipo === "" || datos.precio === "" || datos.cantidad === "") {
        alert("Por favor, completa todos los campos antes de registrar el producto.");
        return; // Detiene la función si hay campos en blanco
    }


    const request = await fetch('api/productos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    if (request.ok) {
        alert("Producto creado con éxito");
        document.location.href = "product.html";
    } else {
        alert("Hubo un error en el registro del produto. Por favor, intenta nuevamente :).");
    }
}
