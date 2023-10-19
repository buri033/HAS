cargarUsuarios();
$(document).ready(function () {
    cargarUsuarios();
    $('#usuarios').DataTable();
    actualizarEmailDelUsuario();
});


function actualizarEmailDelUsuario() {
    document.getElementById("txt-email-usuario").outerHTML = localStorage.email;
}

async function cargarUsuarios() {

    try {

        const request = await fetch('api/usuarios');
        const usuarios = await request.json();


        let listadoHtml = '';
        for (let usuario of usuarios) {
            let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonEditar = '<a href="#" onclick="editarUsuario(' + usuario.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a>';

            let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + '</td><td>' + usuario.password + '</td><td>' + usuario.email + '</td><td>' + usuario.telefono + '</td><td>' + botonEditar + " " + botonEliminar + '</td></tr>';


            listadoHtml += usuarioHtml;
        }

        document.querySelector("#usuarios tbody").outerHTML = listadoHtml;
    } catch (error) {
        alert('Error al cargar los usuarios: ');
    }


}


function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function eliminarUsuario(id) {

    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }


        if (!result.isConfirmed) {
            return
        }

        const request = await fetch('api/usuarios/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        cargarUsuarios()
    })

}

async function buscarUsuario() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarUsuarios(busqueda);
}

async function editarUsuario(id) {
    // obtener información del usuario
    const request = await fetch('api/usuarios/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const usuario = await request.json();

    const { value: formValues } = await Swal.fire({
        title: 'Editar usuario',
        html:
            '<label for="swal-input1">Nombre: &#160</label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + (usuario.nombre || '') + '">' +
            '<label for="swal-input2">Password:</label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="Password" value="' + (usuario.password || '') + '">' +
            '<label for="swal-input3">Email:&#160 &#160 &#160</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + (usuario.email || '') + '">' +
            '<label for="swal-input4">Teléfono:</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" value="' + (usuario.telefono || '') + '">',
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
        const password = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const telefono = document.getElementById("swal-input4").value;

        // Crear un objeto con los datos actualizados del usuario
        const datosActualizados = {
            nombre,
            password,
            email,
            telefono
        };

        // Realizar la solicitud AJAX para actualizar los datos del usuario
        const actualizarUsuarioRequest = await fetch('api/usuarios/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify(datosActualizados) // Convertir el objeto a JSON
        });

        if (actualizarUsuarioRequest.status === 200) {
            Swal.fire('Usuario actualizado correctamente', '', 'success');
            cargarUsuarios();
            // Puedes realizar alguna acción adicional si la actualización fue exitosa
        } else {
            Swal.fire('Error al actualizar el usuario', '', 'error');
            // Puedes manejar errores aquí
            cargarUsuarios();
        }
    }



}


