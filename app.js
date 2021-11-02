Vue.createApp({
    data() {
      return {
        allPokemon: [
            {id: 1, name:'bulbasaur', type: 'grass'},
            {id: 2, name: 'ivysaur', type: 'grass'}
        ],
        partyPokemon: [
            {id: 2, name: 'ivysaur', type: 'grass'},
        ],
        filteredPokemon: [
            {id: 2, name: 'ivysaur', type: 'grass'},
        ],
        maxPartySize: 6
      }
    },

    methods: {
        loadPokemon() {

        },
        filterPokemon() {

        },
        addPokemonToParty(pokemon) {

        },
        removePokemonFromParty(pokemon) {

        },
        pokemonTypeString(pokemon) {
            if (pokemon.types.length > 1){
                return `${pokemon.types.type.name}`;
            }
        }
    }

  }).mount('#app')

