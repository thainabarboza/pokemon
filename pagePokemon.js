const vantagens = {
    "normal" : ["None"],
    "water" : ["Fire", "Stone", "Ground"],
    "grass" : ["Water", "stone", "Earth"],
    "fire" : ["Plant", "Ice", "Steel", "Insect"],
    "fighting" : ["Normal", "Steel", "Dark", "Stone"],
    "psychic" : ["Venomous", "Fighting"],
    "ghost" : ["Ghost", "Psychic"],
    "dark" : ["Ghost", "Psychic"],
    "fairy" : ["Dragon", "Fighting", "Dark"],
    "flying": ["Fighting", "Plant", "Bug"],
    "bug" : ["Psychic", "Dark", "Plant"],
    "rock" : ["Fire", "Ice", "Flying"],
    "ground" : ["Fire", "Electric", "Poison"],
    "ice" : ["Grass", "Flying", "Ground", "Dragon"],
    "Steel" : ["Fairy", "Rock", "Ice"],
    "poison" : ["Fairy", "Plant"],
    "electric" : ["Water", "Flying"],
    "dragon" : ["Dragon"]
};

const fraquezas = {
    "normal" : ["Fighting"],
    "water" : ["Electric", "Plant"],
    "grass" : ["Fire", "Ice", "Flying", "Poison", "Bug"],
    "fire" : ["Water", "Ground", "Rock"],
    "fighting" : ["Flying", "Psychic", "Fairy"],
    "psychic" : ["Ghost", "Dark", "Bug"],
    "ghost" : ["Ghost", "Dark"],
    "dark" : ["Fighting", "Fairy", "Bug"],
    "fairy" : ["Steel", "Poison"],
    "flying": ["Electric", "Rock", "Ice"],
    "bug" : ["Fire", "Flying"],
    "rock" : ["Fighting", "Water", "Grass", "Ground", "Steel"],
    "ground" : ["Water", "Plant", "Ice"],
    "ice" : ["Fighting", "Fire", "Rock", "Steel"],
    "Steel" : ["Fire", "Fighting", "Ground"],
    "poison" : ["Psychic", "Ground"],
    "electric" : ["Earth"],
    "dragon" : ["Dragon", "Fairy", "Ice"]
};

let containerPage = document.querySelector(".container-page");

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');


if (!myParam) {
    window.location.replace("./allPokemons.html");
}

async function getPokemon() {
 
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${myParam}`);
        const data = await response.json();

        let weightHectograms = data.weight;
        let weightKg = weightHectograms / 10;

        let heightCm = data.height;
        let heightMetros = heightCm / 10
    
        console.log(response)
        containerPage.innerHTML = `
            <div class="image-page">
                <img src="${data.sprites.other['official-artwork'].front_default}" class="image-pokemon">
            </div>
            <div class="content-page">
                <p>0${data.id}</p>
                <div class="name-pokemon">
                    <h2>${data.name}</h2> 
                    <button class="btn-sound"><img src="svg/som.svg"></button>
                </div>
                <div class="elements">
                    ${data.types.map(elemento =>` 
                    <div class="tag-element ${elemento.type.name}">
                        <span>${elemento.type.name}</span>
                    </div>`).join('')}
                </div>

                <div class="container-info-pokemon">
                    <div class="info-pokemon">
                        <p>Height: ${heightMetros}m</p>
                        <p>Weight: ${weightKg}kg</p>
                    </div>
                    <ul class="skills-pokemon">Abilities:
                    <li>${data.abilities[0].ability.name}</li>
                    </ul>
                    <ul class="weakness-pokemon">Weakness:
                        ${data.types.map(elemento => 
                            fraquezas[`${elemento.type.name}`].map(tipo => `
                                <li>${tipo}</li>
                            `).join('')
                    ).join('')}
                    </ul>
                    <ul class="weakness-pokemon">Advantages:
                        ${data.types.map(elemento =>
                            vantagens[`${elemento.type.name}`].map(tipo => `
                                <li>${tipo}</li>`).join('')
                        ).join('')}
                    </ul>
                </div>
            </div>
        </div>`
         
    } catch(error) {
        console.log(error)
        containerPage.innerHTML = `<h1>ERRO</h1>`
    }
    
}
getPokemon()

async function verificaEvolucao(chain) {

    const urlSpecie = chain.species.url.split('/').filter(Boolean);
    const speciePokemon = urlSpecie [urlSpecie.length - 1 ];
    
    const responseThree = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciePokemon}`)
    const pokeEvol = await responseThree.json()
    
    let containerEvolution = document.querySelector(".container-evolution");

    containerEvolution.innerHTML += 
        `<div class="img-pk">
            <a href="./pagePokemon.html?id=${pokeEvol.id}">
                <img src="${pokeEvol.sprites.other["official-artwork"].front_default}" class="image-evolition"/>
            </a>
            <p>0${pokeEvol.id}</p>
            <p>${pokeEvol.name}</p>
        </div>`



    if(chain.evolves_to.length > 0) {
        verificaEvolucao(chain.evolves_to[0])
    }
    
}


async function getEvolution() {
    const responseTwo = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${myParam}`);
    const dataTwo = await responseTwo.json();
    const infoEvolution = (await fetch(`${dataTwo.evolution_chain.url}`));
    const infoUrlEvolution = await infoEvolution.json();

    verificaEvolucao(infoUrlEvolution.chain)

    
}

getEvolution()





