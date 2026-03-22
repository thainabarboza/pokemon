
let containerCard = document.querySelector(".container-card");

async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0");
    const data = await response.json();

    for(let i = 0; i < data.results.length; i++){
        const infoPokemons = await fetch(`${data.results[i].url}`);
        const pokemon = await infoPokemons.json();

        containerCard.innerHTML += `
            <div class="flip-card">
                <div class="card-back">
                    <img src="img/Rectangle 5.png" alt="">
                </div>
                <div class="card-front">
                    <div class="topo-card">
                        <p>00${pokemon.id}</p>
                    <button class="btn-favorito">
                        <img src="svg/material-symbols_favorite-outline-rounded.svg">
                    </button> 
                    </div>
                    <div class="img-card">
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                    </div>
                    <h3>${pokemon.name}</h3>
                    <div class="elements">
                        ${pokemon.types.map(elemento => `<div class="tag-element ${elemento.type.name}">
                            <span>${elemento.type.name}</span>
                        </div>`).join('')}
                    </div>
                </div> 
            </div>`

        console.log(pokemon)
        //${pokemon.types[0].type.name}
    }

}

getPokemons()















// let btnFavorito = document.querySelector(".btn-favorito");

// function verificaFavorito() {
//     if(localStorage.getItem('favorito') === 'true') {
//         btnFavorito.innerHTML = `<img src="svg/coracaopreenchido.svg">`   
//     } else {  
//         btnFavorito.innerHTML = `<img src="svg/material-symbols_favorite-outline-rounded.svg">`   
//     }
// }

// verificaFavorito()

// btnFavorito.addEventListener("click", function(){
//     if(localStorage.getItem('favorito') === 'true') {
//         localStorage.setItem('favorito', false)
//     } else {
//         localStorage.setItem('favorito', true)     
//     }
//     verificaFavorito()
//     console.log("cliquei")
// })

