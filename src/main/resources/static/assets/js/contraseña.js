async function verificarcontra() {
    let datos = {};
    datos.id = document.getElementById("Cedula").value;


    const request = await fetch('api/contra', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const respuesta = await request.text();
    console.log(respuesta)
    if (respuesta === "ENCONTRADO") {
        alert("Usuario encontrado")
        localStorage.password = datos.password;

    } else {
        alert("Contraseña incorrecta, intente de nuevo");
    }

}
