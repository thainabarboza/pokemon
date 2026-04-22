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

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${myParam}`);
    const data = await response.json();

    containerPage.innerHTML = `
        <div class="image-page">
            <img src="${data.sprites.other['official-artwork'].front_default}" class="image-pokemon">
        </div>
        <div class="content-page">
            <p>00${data.id}</p>
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
                    <p>Altura: 10cm</p>
                    <p>Peso: 20kg</p>
                    <p>Gênero:</p>
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

}
getPokemon()




