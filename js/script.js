//*********** TARJETAS PERSONAJES API*******************//
export const getAllHeroes = async () => {
    const heroes = await fetch("https://akabab.github.io/superhero-api/api/all.json").catch(() => null);
    const data = await heroes?.json();
    console.log(data);
    return data; // devuelve todo el array
}

const personajes = await getAllHeroes();
const lista = document.getElementById("item-list");
lista.innerHTML = ""; // limpiamos el deadpool de prueba
const primeros = personajes?.slice(0, 12);

const heroesData = {};

for (let i = 0; i < primeros.length; i++) {
    const hero = primeros[i];
    heroesData[hero.id] = hero;

    lista.innerHTML += `
    <li class="list__item item item-card col-12 col-sm-4 col-lg-3 col-xl-2 d-flex flex-row justify-content-center flex-wrap mb-3">
        <div class="card" id="deadpool_prueba" onclick="showModal(${hero.id})">
            <img src="${hero.images.sm}" class="card-img-top" alt="${hero.name}">
            <div class="card-body align-items-center">
                <h5 class="card-title">${hero.name}</h5>
            </div>
        </div>
    </li>
    `;
}
//*********** TARJETAS MODAL CLICKAR Y BOTONES*******************//
// Función que inyecta info al modal principal y sub-modales
window.showModal = (id) => {
    const hero = heroesData[id];
    if (!hero) return;

    // Modal principal
    const modalImg = document.querySelector("#deadpool-modal img");
    modalImg.src = hero.images.sm;
    modalImg.alt = hero.name;

    const modalInfo = document.querySelector("#tarjetamodaldeadpool1 .col-md-7");
    modalInfo.querySelector("p:nth-of-type(1)").innerHTML = `<strong>Nombre:</strong> ${hero.name}`;
    modalInfo.querySelector("p:nth-of-type(2)").innerHTML = `<strong>Bibliografía:</strong> ${hero.biography?.fullName || "Desconocido"}`;

    // Sub-modales
    const modalStats = document.querySelector("#tarjetamodaldeadpool2 .modal-body p");
    modalStats.innerHTML = `
        <strong>Inteligencia:</strong> ${hero.powerstats.intelligence}<br>
        <strong>Fuerza:</strong> ${hero.powerstats.strength}<br>
        <strong>Velocidad:</strong> ${hero.powerstats.speed}<br>
        <strong>Durabilidad:</strong> ${hero.powerstats.durability}<br>
        <strong>Poder:</strong> ${hero.powerstats.power}<br>
        <strong>Combate:</strong> ${hero.powerstats.combat}
    `;

    const modalGaleria = document.querySelector("#tarjetamodaldeadpool3 .modal-body p");
    modalGaleria.innerHTML = `
        <img src="${hero.images.sm}" class="img-fluid mb-2">
        <img src="${hero.images.md}" class="img-fluid mb-2">
        <img src="${hero.images.lg}" class="img-fluid mb-2">
        <img src="${hero.images.xl}" class="img-fluid mb-2">
    `;

    const modalHistoria = document.querySelector("#tarjetamodaldeadpool4 .modal-body p");
    modalHistoria.innerHTML = `
        <strong>Nombre Completo:</strong> ${hero.biography.fullName || "Desconocido"}<br>
        <strong>Lugar de Nacimiento:</strong> ${hero.biography.placeOfBirth || "Desconocido"}<br>
        <strong>Primera Aparición:</strong> ${hero.biography.firstAppearance || "Desconocido"}<br>
        <strong>Editorial:</strong> ${hero.biography.publisher || "Desconocido"}<br>
        <strong>Aliados:</strong> ${hero.connections?.groupAffiliation || "Desconocido"}
    `;

    // Abrimos el modal principal
    const myModal = new bootstrap.Modal(document.getElementById('tarjetamodaldeadpool1'));
    myModal.show();
}

//***********BUSCADOR PERSONAJES*******************//
// Input de búsqueda
const searchInput = document.querySelector(".search-group input");

// Función para filtrar y mostrar la tarjeta
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    lista.innerHTML = ""; // Limpiamos la lista

    // Si no hay texto, mostramos los primeros 12 como antes
    if (!query) {
        const primeros = personajes?.slice(0, 12);
        primeros.forEach(hero => {
            lista.innerHTML += `
            <li class="list__item item item-card col-12 col-sm-4 col-lg-3 col-xl-2 d-flex flex-row justify-content-center flex-wrap mb-3">
                <div class="card" id="deadpool_prueba" onclick="showModal(${hero.id})">
                    <img src="${hero.images.sm}" class="card-img-top" alt="${hero.name}">
                    <div class="card-body align-items-center">
                        <h5 class="card-title">${hero.name}</h5>
                    </div>
                </div>
            </li>
            `;
        });
        return;
    }

    // Filtramos todos los personajes según el nombre
    const filtered = personajes.filter(hero => hero.name.toLowerCase().includes(query));

    filtered.forEach(hero => {
        lista.innerHTML += `
        <li class="list__item item item-card col-12 col-sm-4 col-lg-3 col-xl-2 d-flex flex-row justify-content-center flex-wrap mb-3">
            <div class="card" id="deadpool_prueba" onclick="showModal(${hero.id})">
                <img src="${hero.images.sm}" class="card-img-top" alt="${hero.name}">
                <div class="card-body align-items-center">
                    <h5 class="card-title">${hero.name}</h5>
                </div>
            </div>
        </li>
        `;
    });
});