$(document).ready(function () {
    // Call the dataTables jQuery plugin
    // Aquí puedes inicializar el plugin dataTables si lo necesitas
});

async function registrarUsuario() {
    try {
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

        const response = await fetch('api/usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }

        const responseData = await response.json();

        if (responseData && responseData.success !== undefined) {
            if (responseData.success) {
                alert("Usuario registrado con éxito");
                window.location.href = "login.html";
            } else {
                alert(responseData.message || "Error al registrar el usuario");
            }
        } else {
            throw new Error('Respuesta JSON inválida');
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un error en el registro de usuario. Por favor, intenta nuevamente.");
    }
}
