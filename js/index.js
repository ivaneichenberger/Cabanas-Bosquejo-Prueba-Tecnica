document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    let dataCache = []; 

    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            dataCache = data;  
            renderCards(data); 
        })
        .catch(error => console.error("Error al cargar los datos:", error));

    function renderCards(data) {
        cardContainer.innerHTML = ""
        data.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <div class="card-nombre">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="card-nombre-parrafo">
                    <h3 class="card-h3">${item.nombre}</h3>
                    <h4 class="card-h4">${item.descripcion}</h4>
                    <a href="${item.whatsapp}" target="_blank" class="whatsapp-button">Consultar por WhatsApp</a>
                </div>
                <h3 class="card-h3-imagen">${item.nombrecard}</h3>
            </div>
            <div class="extra-info" style="display: none;">
                <div class="info-row"><strong>Fecha de nacimiento:</strong> ${item.fechaNacimiento}</div>
                <div class="info-row"><strong>Registro:</strong> ${item.registro}</div>
                <div class="info-row"><strong>Familia:</strong> ${item.familia}</div>
                <div class="genealogia-div"> 
                    <h3 class="final-expand-h3">Genealogia</h3>
                    <h2 class="final-expand-h4">${item.genealogia}</h2>
                </div>
            </div>
        `;
            // Expande y colapsa la tarjeta
            card.addEventListener("click", () => {
                const extraInfo = card.querySelector(".extra-info");
                if (card.classList.contains("expanded")) {
                    card.classList.remove("expanded");
                    extraInfo.style.display = "none";
                } else {
                    document.querySelectorAll(".card.expanded").forEach(expandedCard => {
                        expandedCard.classList.remove("expanded");
                        expandedCard.querySelector(".extra-info").style.display = "none";
                    });
                    card.classList.add("expanded");
                    extraInfo.style.display = "block";
                }
            });

            cardContainer.appendChild(card);
        });
    }

    // Función para filtrar y mostrar tarjetas
    window.filterCards = function(family) {
        if (family === "all") {
            renderCards(dataCache);  // Mostrar todos los elementos si se selecciona "Mostrar Todos"
        } else {
            const filteredData = dataCache.filter(item => item.familia === family);
            renderCards(filteredData);
        }
    };
});
