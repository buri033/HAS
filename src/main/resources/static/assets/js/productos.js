cargarProductos();
$(document).ready(function () {
    cargarProductos();
    $('#productos').DataTable();
    actualizarEmailDelUsuario();
});
function actualizarEmailDelUsuario() {
    document.getElementById("txt-email-usuario").outerHTML = localStorage.email;
}

async function cargarProductos() {
    try {
        const request = await fetch('api/productos', );


        const productos = await request.json();
        let listadoHtml = '';
        for (let producto of productos) {
            let botonEliminar = '<a href="#" onclick="eliminarProducto(' + producto.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonEditar = '<a href="#" onclick="editarProducto(' + producto.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a>';

            let productoHtml = '<tr><td>' + producto.id + '</td><td>' + producto.nombre + '</td><td>' + producto.marca + '</td><td>' + producto.tipo + '</td><td>' + producto.precio + '</td><td>' + producto.cantidad + '</td><td>'+ botonEditar + " " + botonEliminar + '</td></tr>';


            listadoHtml += productoHtml;
        }


        document.querySelector("#productos tbody").outerHTML = listadoHtml;
    } catch (error) {
        alert('Error al cargar los productos');
    }
}



function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function eliminarProducto(id) {

    Swal.fire({
        title: '¿Quieres eliminar el producto?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire('Eliminado!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Tú producto sigue intacto!', '', 'info')
        }


        if (!result.isConfirmed) {
            return
        }

        const request = await fetch('api/productos/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        cargarProductos()
    })

}

async function buscarProducto() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarProductos(busqueda);
}

async function editarProducto(id) {
    // obtener información del usuario
    const request = await fetch('api/productos/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const producto = await request.json();

    const { value: formValues } = await Swal.fire({
        title: 'Editar producto',
        html:
            '<label for="swal-input1">Nombre: &#160</label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + (producto.nombre || '') + '">' +
            '<label for="swal-input2">Marca:</label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="Marca" value="' + (producto.marca || '') + '">' +
            '<label for="swal-input3">Tipo:&#160 &#160 &#160</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Tipo" value="' + (producto.tipo || '') + '">' +
            '<label for="swal-input4">Precio:</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="Precio" value="' + (producto.precio || '') + '">' +
            '<label for="swal-input5">Cantidad:</label>' +
            '<input id="swal-input5" class="swal2-input" placeholder="Cantidad" value="' + (producto.cantidad || '') + '">',

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    });

    // Aquí puedes acceder a los valores ingresados por el usuario en formValues
    // formValues.swal-input1 contendrá el nuevo valor del nombre, y así sucesivamente
    if (formValues) {
        // Procesar los valores ingresados aquí
        const nombre = document.getElementById("swal-input1").value;
        const marca = document.getElementById("swal-input2").value;
        const tipo = document.getElementById("swal-input3").value;
        const precio = document.getElementById("swal-input4").value;
        const cantidad = document.getElementById("swal-input5").value;


        // Crear un objeto con los datos actualizados del usuario
        const datosActualizados = {
            nombre,
            marca,
            tipo,
            precio,
            cantidad
        };

        // Realizar la solicitud AJAX para actualizar los datos del usuario
        const actualizarUsuarioRequest = await fetch('api/productos/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify(datosActualizados) // Convertir el objeto a JSON
        });

        if (actualizarUsuarioRequest.status === 200) {
            Swal.fire('Producto actualizado correctamente', '', 'success');
            cargarProductos();
            // Puedes realizar alguna acción adicional si la actualización fue exitosa
        } else {
            Swal.fire('Error al actualizar el producto', '', 'error');
            // Puedes manejar errores aquí
            cargarProductos();
        }
    }



}



