let containerCard = document.querySelector(".container-card");
let loading = false;
let offset = 0;
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');


async function getPokemons() {

    if (!loading) {
      if(!type) {
        loading = true;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`);
        const data = await response.json();

        let pokemons = []

        for (let i = 0; i < data.results.length; i++) {
            const infoPokemons = await fetch(`${data.results[i].url}`);
            pokemons.push(await infoPokemons.json());
        }

        for (let i = 0; i < pokemons.length; i++) {
            containerCard.innerHTML += `
                <div class="flip-card">
                    <div class="flip-inner">
                        <div class="card-front">
                            <div class="topo-card">
                                <p>00${pokemons[i].id}</p>
                                <button id="${pokemons[i].name}" class="btn-favorito" onclick="handleFavourite('${pokemons[i].name}', this)">
                                    <img src="svg/material-symbols_favorite-outline-rounded.svg">
                                </button> 
                            </div>
                            <button class="img-card">
                                <a href="./pagePokemon.html?id=${pokemons[i].id}">
                                    <img src="${pokemons[i].sprites.other["official-artwork"].front_default}" alt="">
                                </a>
                            </button>
                            <h3>${pokemons[i].name}</h3>
                            <div class="elements">
                                ${pokemons[i].types.map(elemento => `
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

            checkFavourite(pokemons[i].name);
        }
        loading = false;
        offset += 24
      } else {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();

        for(let i = 0; i < data.pokemon.length; i++){
            const infoType = await fetch(`${data.pokemon[i].pokemon.url}`)
            const responseType = await infoType.json();
            
       
            containerCard.innerHTML += `
                <div class="flip-card">
                    <div class="flip-inner">
                        <div class="card-front">
                            <div class="topo-card">
                                <p>${responseType.id}</p>
                                <button id="${responseType.name}" class="btn-favorito" onclick="handleFavourite('${responseType.name}', this)">
                                    <img src="svg/material-symbols_favorite-outline-rounded.svg">
                                </button> 
                            </div>
                            <button class="img-card">
                                <a href="./pagePokemon.html?id=${responseType.id}">
                                    <img src="${responseType.sprites.other["official-artwork"].front_default}" alt="">
                                </a>
                            </button>
                            <h3>${responseType.name}</h3>
                            <div class="elements">
                                ${responseType.types.map(elemento => `
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

            checkFavourite(responseType.name);
        }
     
      }
    } 

}  

getPokemons();


window.addEventListener("scroll", () => {
    if(!type){
        if (window.scrollY + window.innerHeight + 5 > document.body.scrollHeight - 500) {
            getPokemons();        
        }
    }
})

function handleFavourite(nome, botao) {
    const flipCard = botao.closest(".flip-card");
    const flipInner = flipCard.querySelector(".flip-inner");

    if (localStorage.getItem(nome) === 'true') {
        botao.innerHTML = `<img src="svg/material-symbols_favorite-outline-rounded.svg">`;
        localStorage.removeItem(nome);
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

const keys = Object.keys(localStorage);
