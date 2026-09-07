async function sumarSaldo() {
    let datos = {};
    datos.monto = document.getElementById("saldo").value;
    datos.transaccion = document.getElementById("operacion").value;
    datos.id_usuario = document.getElementById("id_usuario").value;


    if (operacion && monto) {
        // Realiza una solicitud GET para obtener el saldo actual del usuario
        const saldoRequest = await fetch('api/usuarios/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const usuario = await saldoRequest.json();

        if (usuario) {
            // Actualiza el saldo del usuario
            usuario.saldo += monto;

            // Realiza una solicitud PUT para actualizar el saldo del usuario
            const actualizarSaldoRequest = await fetch('api/{id}/saldo', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            // Verifica si la actualización fue exitosa y muestra un mensaje adecuado
            if (actualizarSaldoRequest.status === 200) {
                alert('Saldo actualizado exitosamente.');
            } else {
                alert('Error al actualizar el saldo.');
            }
        } else {
            alert('Usuario no encontrado.');
        }
    } else {
        alert('Por favor, ingresa un valor de operación y un monto válido.');
    }
}