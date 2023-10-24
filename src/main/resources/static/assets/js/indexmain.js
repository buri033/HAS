document.addEventListener('DOMContentLoaded', function () {
    let saldoInput = document.getElementById('saldo');
    let addSaldoButton = document.getElementById('addSaldo');
    let subtractSaldoButton = document.getElementById('subtractSaldo');
    let progressBar = document.querySelector('#progressBar .progress-bar');
    let emojiDiv = document.getElementById('emojiDiv');
    let ingresosTotalesDisplay = document.getElementById('ingresosTotalesDisplay');
    let saldoDisponibleDisplay = document.getElementById('saldoDisponibleDisplay');
    let operacionInput = document.getElementById('operacion');
    let deudaDisplay = document.getElementById('deudaDisplay');

    let deuda = 0;
    let saldoTotal = 0;
    let saldoDisponible = 0;

    addSaldoButton.addEventListener('click', function () {
        const saldoToAdd = parseFloat(saldoInput.value);
        const operacion = operacionInput.value.trim();
        if (!isNaN(saldoToAdd) && operacion !== '') {
            saldoTotal += saldoToAdd;
            saldoDisponible += saldoToAdd;
            updateValues();
            addToHistorial(`[Agregado ${operacion} +${saldoToAdd}]`);
        }
    });

    subtractSaldoButton.addEventListener('click', function () {
        const saldoToSubtract = parseFloat(saldoInput.value);
        const operacion = operacionInput.value.trim();
        if (!isNaN(saldoToSubtract) && operacion !== '') {
            deuda += saldoToSubtract;
            saldoDisponible -= saldoToSubtract;
            updateValues();
            addToHistorial(`[Disminuido ${operacion} -${saldoToSubtract}]`);
        }
    });

    function updateValues() {
        const totalDeuda1 = deuda * 1.5;
        const totalDeuda2 = deuda * 2;
        const totalDeuda3 = deuda * 2.5;

        let color = '';
        let progress = 0;
        let emoji = '';
        let backgroundColor = '';

        if (deuda > saldoTotal) {
            color = 'bg-danger';
            progress = 100;
            emoji = '😟';
            backgroundColor = 'gray';
        } else if (totalDeuda3 <= saldoTotal) {
            color = 'bg-success';
            progress = 100;
            emoji = '😄';
            backgroundColor = 'green';
        } else if (totalDeuda1 >= saldoTotal) {
            color = 'bg-danger';
            progress = 33;
            emoji = '😡';
            backgroundColor = 'orange';
        } else {
            color = 'bg-warning';
            progress = 66;
            emoji = '😐';
            backgroundColor = 'yellow';
        }

        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress.toString());
        progressBar.className = `progress-bar ${color}`;
        emojiDiv.innerHTML = `<div style="width: 20px; height: 20px; border-radius: 5%; display: flex; justify-content: center; align-items: center; background-color: white;">${emoji}</div>`;
        emojiDiv.style.backgroundColor = backgroundColor;
        ingresosTotalesDisplay.textContent = saldoTotal;
        saldoDisponibleDisplay.textContent = saldoDisponible;
        deudaDisplay.textContent = deuda;
    }


    function addToHistorial(operacion) {
        const historialList = document.getElementById('historialList');
        const li = document.createElement('li');
        li.textContent = operacion;
        historialList.appendChild(li);
    }

    updateValues();
});