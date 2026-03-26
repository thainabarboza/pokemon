let containerCard = document.querySelector(".container-card");

async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0");
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        const infoPokemons = await fetch(`${data.results[i].url}`);
        const pokemon = await infoPokemons.json();

        containerCard.innerHTML += `
            <div class="flip-card">
                <div class="flip-inner">
                    <div class="card-front">
                        <div class="topo-card">
                            <p>00${pokemon.id}</p>
                            <button id="${pokemon.name}" class="btn-favorito" onclick="handleFavourite('${pokemon.name}', this)">
                                <img src="svg/material-symbols_favorite-outline-rounded.svg">
                            </button> 
                        </div>
                        <div class="img-card">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                        </div>
                        <h3>${pokemon.name}</h3>
                        <div class="elements">
                            ${pokemon.types.map(elemento => `
                                <div class="tag-element ${elemento.type.name}">
                                    <span>${elemento.type.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div> 

                    <div class="card-back">
                        <img class="img-back" src="img/Rectangle 5.png" alt="">
                    </div>
                </div>
            </div>`;

        checkFavourite(pokemon.name);
    }
}

getPokemons();

function handleFavourite(nome, botao) {
    const flipCard = botao.closest(".flip-card");
    const flipInner = flipCard.querySelector(".flip-inner");

    if (localStorage.getItem(nome) === 'true') {
        botao.innerHTML = `<img src="svg/material-symbols_favorite-outline-rounded.svg">`;
        localStorage.setItem(nome, 'false');
    } else {
        botao.innerHTML = `<img src="svg/coracaopreenchido.svg">`;
        localStorage.setItem(nome, 'true');
    }

    // gira para mostrar o verso
    flipInner.style.transform = "rotateY(180deg)";

    // volta para a frente
    setTimeout(() => {
        flipInner.style.transform = "rotateY(0deg)";
    }, 1000);
}

function checkFavourite(nome) {
    const btn = document.querySelector(`#${nome}`);

    if (localStorage.getItem(nome) === 'true') {
        btn.innerHTML = `<img src="svg/coracaopreenchido.svg">`;
    } else {
        btn.innerHTML = `<img src="svg/material-symbols_favorite-outline-rounded.svg">`;
    }
}