// script.js

// Cargar el archivo JSON y mostrar los datos en el HTML
fetch('../json/remates.json')
    .then(response => response.json())
    .then(data => {
        // Mostrar el próximo remate
        const proximoRemateCard = document.getElementById('proximo-remate-card');
        proximoRemateCard.innerHTML = `
        <div class="remate-anual-container">
            <img src="${data.proximoRemate.imagen}" alt="${data.proximoRemate.titulo}" class="remate-imagen">
            <div class="remate-info">
                <h3>${data.proximoRemate.titulo}</h3>
                <p> ${data.proximoRemate.fecha}</p>
            </div>
            </div>
        `;

        // Listar los remates anteriores
        const rematesAnterioresList = document.getElementById('remates-anteriores-list');
        data.rematesAnteriores.forEach(remate => {
            const listItem = document.createElement('li');
            listItem.textContent = `${remate.fecha} - ${remate.titulo}`;
            rematesAnterioresList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error al cargar los remates:', error));
