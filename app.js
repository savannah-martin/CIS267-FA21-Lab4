
const getPokemon = async function (id) {
  // get pokemon data from pokeapi
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data;
  //createPokemonCard( data );
};

const colors = {
  fire: '#fd7d24',
  grass: '#9bcc50',
  electric: '#eed535',
  water: '#4592c4',
  ground: '#ab9842',
  rock: '#a38c21',
  fairy: '#fdb9e9',
  poison: '#b97fc9',
  bug: '#729f3f',
  dragon: '#7038f8',
  psychic: '#f366b9',
  flying: '#3dc7ef',
  fighting: '#d56723',
  normal: '#a4acaf',
  ice: '#51c4e7',
  ghost: '#7b62a3',
  dark: '#707070',
  steel: '#9eb7b8'
};

const app = Vue.createApp({
  data() {
    return {
      allPokemon: [
      ],
      partyPokemon: [],
      filteredPokemon: [],
      maxPartySize: 6,
      inputValue: "",
    };
  },
  methods: {
    clearPokemon() {
      this.filteredPokemon= []
    },
    async loadPokemon() {
      // load all pokemon from API and save into all pokemon
      const pokemon_count = 150;
      let pokemon = [];
      for (let i = 1; i <= pokemon_count; i++) {
        let p = await getPokemon(i);
        if (p.name === "mr-mime") {
          p.name = "Mr. Mime";
        }
        p.isFavorite = false;

        pokemon.push(p);
      }

      pokemon.forEach( p => {
          this.allPokemon.push(p);
      });
    },
    filterPokemon(inputValue) {
      // set filteredPokemon to matching pokemon based on search query
      this.filteredPokemon= []
      this.allPokemon.filter( pokemon => {
        if (pokemon.name.toLowerCase().includes(inputValue.toLowerCase())){
          const pokemonCopy = {...pokemon};
          pokemonCopy.guid = this.getGUID();
          this.filteredPokemon.push(  pokemonCopy );  
        
        }
        if (pokemon.types.length > 1){
          if (pokemon.types[1].type.name.toLowerCase().includes(inputValue.toLowerCase())){
            const pokemonCopy = {...pokemon};
            pokemonCopy.guid = this.getGUID();
            this.filteredPokemon.push(  pokemonCopy ); 
          }
        }
        if (pokemon.types[0].type.name.toLowerCase().includes(inputValue.toLowerCase())){
          const pokemonCopy = {...pokemon};
          pokemonCopy.guid = this.getGUID();
          this.filteredPokemon.push(  pokemonCopy ); 
        }
        if (pokemon.id.toString().includes(inputValue.toLowerCase())){
          const pokemonCopy = {...pokemon};
          pokemonCopy.guid = this.getGUID();
          this.filteredPokemon.push(  pokemonCopy ); }
      })
   },
    addPokemonToParty(pokemon) 
    {
      if (this.partyPokemon.length < 6) {
        const pokemonCopy = {...pokemon};
        pokemonCopy.guid = this.getGUID();
        console.log(pokemonCopy.guid);
        this.partyPokemon.push(  pokemonCopy );
      }
    },
    removePokemonFromParty(pokemon) {
      
      this.partyPokemon = this.partyPokemon
                            .filter( p => p.guid != pokemon.guid);
    },
    pokemonTypeString(pokemon) {
      if (pokemon.types.length > 1) {
        return `${pokemon.types[0].type.name} / ${pokemon.types[1].type.name}`;
      }
      else {
        return `${pokemon.types[0].type.name}`;
      }
    },
    getGUID() {
      return Math.floor(Math.random()* 1000000);
    }
  },
  mounted() {
    this.loadPokemon();
  },
}).mount("#app");

