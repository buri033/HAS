async function sumarSaldo() {
    let datos = {};
    datos.saldo = document.getElementById("saldo").value;
    datos.operacion = document.getElementById("operacion").value;


    const request = await fetch('api/transacciones', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:{
            "id_usuario":datos.id_usuario,
            "monto":datos.saldo,
            "transaccion":datos.operacion
        }
    });


}