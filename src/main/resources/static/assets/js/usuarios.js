// Call the dataTables jQuery plugin
cargarUsuarios();

/*
$(document).ready(function () {
    cargarUsuarios();
    $('#usuarios').DataTable();
    actualizarEmailDelUsuario();

});
*/
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

            let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + '</td><td>' + '</td><td>' + usuario.email + '</td><td>' +
                usuario.telefono + '</td><td>' + usuario.password + '</td><td>'  + botonEditar + " " + botonEliminar + '</td>' + '</tr>'

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
        window.location.reload();

    })

}

async function buscarUsuario() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarUsuarios(busqueda);
}