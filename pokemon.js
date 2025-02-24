const MAX_POKEMON = 151;
const LIST_WRAPPER = document.querySelector(".list-wrapper");
const SEARCH_INPUT = document.querySelector("#search-input");
const NUMBER_FILTER = document.querySelector("#number");
const NAME_FILTER = document.querySelector("#name");
const NOT_FOUND_MESSAGE = document.querySelector(".pokemon-not-found");
const CLOSE_BUTTON = document.querySelector(".search-close-icon")
let allPokemons = [];

// async function main(){

//     async function fetch_first_151_pokemon_from_api(){
//         let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
//         let data = await response.json();
//         return data.results;
        
//     }
    
//     allPokemons = await fetch_first_151_pokemon_from_api()
//     console.log(allPokemons)
// }

// main()

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((response) =>  response.json())
.then((data) => {
    allPokemons = data.results;
    display_pokemons(allPokemons);
    
})

async function fetch_pokemon_data_before_redirect(id){
    try {
        const[pokemon, pokemonSpecies] = await Promise.
        all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) =>  
                response.json()
        ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then((response) =>  response.json()), ])
        return true
    } catch (error) {
        console.error("An error occurred while trying to fetch the data of the Pokemon before redirecting.")
    }
}

function display_pokemons(pokemon){
    LIST_WRAPPER.innerHTML = "";

    pokemon.forEach((pokemon) =>{
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "list_item";
        listItem.innerHTML = `
            <div class = "number-wrap">
                <p class = "caption-fonts">#${pokemonID}</p>
            </div>
            <div class="img-wrap">
                <img src = "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt = "${pokemonID}" />
            </div>
            <div class = "name-wrap">
                <p class = "body3-fonts">#${pokemon.name}</p>
            </div>
        `;

        listItem.addEventListener("click", async () =>{
            const success = await fetch_pokemon_data_before_redirect(pokemonID);
            if(success){
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });

        LIST_WRAPPER.appendChild(listItem);
    });
}

SEARCH_INPUT.addEventListener("keyup", handleSearch)

function handleSearch(){
    const searchTerm = SEARCH_INPUT.value.toLowerCase();
    let filteredPokemons;

    if(NUMBER_FILTER.checked){
        filteredPokemons = allPokemons.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchTerm);
        });
    }else if (NAME_FILTER.checked){
        filteredPokemons = allPokemons.filter((pokemon) => 
            pokemon.name.toLowerCase().startsWith(searchTerm)
        );
    }else{
        filteredPokemons = allPokemons;
    }

    display_pokemons(filteredPokemons);

    if(filteredPokemons.length === 0){
        NOT_FOUND_MESSAGE.style.display = "block";
    }else{
        NOT_FOUND_MESSAGE.style.display = "none";
    }
}

CLOSE_BUTTON.addEventListener("click", clearSearch);

function clearSearch() {
    SEARCH_INPUT.value = "";
    display_pokemons(allPokemons);
    NOT_FOUND_MESSAGE.style.display = "none";
}