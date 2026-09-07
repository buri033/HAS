cargarUsuarios();
$(document).ready(function () {
    cargarUsuarios();
    $('#transacciones').DataTable();
    actualizarEmailDelUsuario();
});


function actualizarEmailDelUsuario() {
    document.getElementById("txt-email-usuario").outerHTML = localStorage.email;
}

async function cargarUsuarioPorContraseña() {
    const contraseña = document.getElementById("txtContra").value;

    try {
        // Realiza una solicitud al servidor para buscar un usuario por contraseña
        const request = await fetch('api/transacciones' + contraseña);
        const usuarioEncontrado = await request.json();

        if (usuarioEncontrado) {
            // El usuario fue encontrado, puedes mostrar los detalles en tu interfaz
            const usuarioHtml = '<tr><td>' + usuarioEncontrado.id_transaccion + '</td><td>' + usuarioEncontrado.nombre + '</td><td>' + usuarioEncontrado.password + '</td><td>' + usuarioEncontrado.email + '</td><td>' + usuarioEncontrado.telefono + '</td></tr>';

            document.querySelector("#transacciones tbody").innerHTML = usuarioHtml;
        } else {
            // No se encontró ningún usuario con la contraseña proporcionada
            alert('No se encontró ningún usuario con esa contraseña.');
        }
    } catch (error) {
        alert('Error al cargar el usuario: ' + error);
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
