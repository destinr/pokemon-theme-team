
console.log("Hello World")

const preparePage = async () => {
    const pokeID = Math.floor(Math.random()*1154)
    const primPokemon = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)

    imagesDiv = document.getElementById('origPoke')
    imagesDiv.innerHTML = `<img src="${primPokemon[2]}" alt="Pokemon Image" /> `

    const typeURL = primPokemon[1][0].type.url
    const otherPokemon = await getOtherPokemon(typeURL)
    console.log(otherPokemon)
    postPics(otherPokemon)
}


const getPokemon  = async (id) => {

    const response = await axios.get(id)
    console.log('you requested ' + response.data.name)
    //console.log(response)

    let pokemon = [response.data.name,response.data.types,response.data.sprites.other['official-artwork'].front_default]
    return pokemon
}

const getOtherPokemon = async (typeURL) => {
    const response = await axios.get(typeURL)
    const pokemon = response.data.pokemon
    console.log(pokemon)
    const otherPokemon = []
    for (let i = 0; i<=4; i++){
        pokeLink = response.data.pokemon[i].pokemon.url
        //console.log(pokeLink)
        tempPoke = await getPokemon(pokeLink)
        otherPokemon.push(tempPoke)
    }
    return otherPokemon  
}

const postPics = (pokeList) => {
    opDIV = document.getElementById('otherPokemon')
    for (pokemon of pokeList){
        let img = new Image()
        img.src = pokemon[2]
        opDIV.appendChild(img)
    }
}