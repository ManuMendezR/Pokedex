const MAX_POKEMON = 151;
const LIST_WRAPPER = document.querySelector(".list-wrapper");
const SEARCH_INPUT = document.querySelector("#search-input");
const NUMBER_FILTER = document.querySelector("#number");
const NAME_FILTER = document.querySelector("#name");
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
    
})

async function fetch_pokemon_data_before_redirect(id){
    try {
        const[pokemon, pokemonSpecies] = await Promise.all[fetch(`https://pokeapi.co/api/v2/pokemon${id}`)
            .then((response) =>  response.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon${id}`)
            .then((response) =>  response.json())] 
        return true
    } catch (error) {
        console.error("An error occurred while trying to fetch the data of the Pokemon before redirecting.")
    }
}