const inputBusca = document.querySelector(".input-busca");
const btnBusca = document.querySelector(".btn-busca");
const btnFilter = document.querySelector(".btn-header-fav");


btnBusca.addEventListener("click", function() {
    if(inputBusca.value === "") {
        alert("Prencha o campo!")
    } else {
        window.location.href = `./pagePokemon.html?id=${inputBusca.value}`
    }
})

document.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        if(inputBusca.value === "") {
            alert("Preencha o campo!")
        } else {
            window.location.href = `./pagePokemon.html?id=${inputBusca.value}`
        }
    }
})

btnFilter.addEventListener("click", function() { 
    const containerDropdown = document.querySelector(".container-dropdown");

    if(containerDropdown.classList.contains('hide')){
        containerDropdown.classList.remove("hide")
    } else {
        containerDropdown.classList.add("hide")
    }

})


