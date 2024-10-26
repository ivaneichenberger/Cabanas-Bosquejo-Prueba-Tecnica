document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");

    // Cargar los datos desde el archivo JSON
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <h3>${item.nombre}</h3>
                    <p>${item.descripcion}</p>
                    <a href="${item.whatsapp}" target="_blank" class="whatsapp-button">Consultar por WhatsApp</a>
                    <div class="extra-info" style="display: none;">
                        <p><strong>Fecha de nacimiento:</strong> ${item.fechaNacimiento}</p>
                        <p><strong>Registro:</strong> ${item.registro}</p>
                        <p><strong>Familia:</strong> ${item.familia}</p>
                    </div>
                `;

                // Evento de clic para expandir o colapsar la card
                card.addEventListener("click", () => {
                    if (card.classList.contains("expanded")) {
                        card.classList.remove("expanded");
                        card.querySelector(".extra-info").style.display = "none";
                    } else {
                        // Cerrar cualquier otra card expandida
                        document.querySelectorAll(".card.expanded").forEach(expandedCard => {
                            expandedCard.classList.remove("expanded");
                            expandedCard.querySelector(".extra-info").style.display = "none";
                        });
                        // Expandir la card seleccionada y mostrar detalles extra
                        card.classList.add("expanded");
                        card.querySelector(".extra-info").style.display = "block";
                    }
                });

                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});
