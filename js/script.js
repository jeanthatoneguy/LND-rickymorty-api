/* ============================
   CONFIGURACIÓN SUPERHERO API
============================ */

const token = "7b7958c28b5621be92919e3989ef05dd";  // <-- pega aquí tu token (CAMBIAR CADA VEZ QUE ENTRAS A LA PAGINA)

/* ============================
   FUNCIÓN: Obtener datos del personaje
============================ */

async function getCharacterData(id) {
    const url = `https://superheroapi.com/api.php/${token}/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

/* ============================
   FUNCIÓN: Obtener imágenes
============================ */

async function getCharacterImages(id) {
    const url = `https://superheroapi.com/api.php/${token}/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    return [data.image.url]; // solo 1 imagen
}

/* ============================
   BOTÓN: Ampliar detalles
============================ */

document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-details")) {

        const card = event.target.closest(".item-card");
        const characterId = card.getAttribute("data-id");

        const character = await getCharacterData(characterId);

        openModal(character);
    }
});

/* ============================
   BOTÓN: Ver galería
============================ */

document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-gallery")) {

        const card = event.target.closest(".item-card");
        const characterId = card.getAttribute("data-id");

        const images = await getCharacterImages(characterId);

        openGallery(images);
    }
});

/* ============================
   FUNCIÓN: Abrir modal con detalles
============================ */

function openModal(character) {
    const modal = document.getElementById("item-modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image.url}" 
             style="width:100%; border-radius:8px; margin-top:10px;">
        <p style="margin-top:10px;">
            <strong>Ocupación:</strong> ${character.work.occupation}<br>
            <strong>Altura:</strong> ${character.appearance.height.join(", ")}<br>
            <strong>Peso:</strong> ${character.appearance.weight.join(", ")}<br>
        </p>
    `;

    modal.style.display = "flex";
}

/* ============================
   FUNCIÓN: Abrir modal como galería
============================ */

function openGallery(images) {
    const modal = document.getElementById("item-modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <h2>Galería del personaje</h2>
        <div class="gallery-grid">
            ${images.map(img => `<img src="${img}" class="gallery-img">`).join("")}
        </div>
    `;

    modal.style.display = "flex";
}

/* ============================
   CERRAR MODAL
============================ */

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-close-button")) {
        document.getElementById("item-modal").style.display = "none";
    }
});

/* ============================
CLICKAR TARJETA, SALTA MENU
============================ */
document.addEventListener("click", async (e) => {
  const card = e.target.closest(".character-card");
  if (!card) return;

});