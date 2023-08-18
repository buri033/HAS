// Call the dataTables jQuery plugin
$(document).ready(function () {
    // Aquí puedes inicializar el plugin dataTables si lo necesitas
});

async function registrarUsuario() {
    let datos = {};
    datos.nombre = document.getElementById("txtNombre").value;
    datos.telefono = document.getElementById("txtTelefono").value;
    datos.email = document.getElementById("txtEmail").value;
    datos.password = document.getElementById("txtPassword").value;

    let repetirPassword = document.getElementById("txtRepetirPassword").value;

    if (repetirPassword !== datos.password) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    if (request.ok) {
        alert("Usuario registrado con éxito");
        document.location.href = "login.html";
    } else {
        alert("Hubo un error en el registro de usuario. Por favor, intenta nuevamente.");
    }
}
