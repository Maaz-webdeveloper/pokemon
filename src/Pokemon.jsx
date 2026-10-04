import { useEffect, useState } from "react"
import PokemonCards from "./PokemonCards"

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("") // State for search term 
  const API = "https://pokeapi.co/api/v2/pokemon?limit=252"

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()

      const detailedPokemonData = await Promise.all(
        data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url)
          const data = await res.json()
          return data
        })
      )

      setPokemon(detailedPokemonData)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  //search functionality
  const searchdata = pokemon.filter((curPokemon) => {
    return curPokemon.name.toLowerCase().includes(search.toLowerCase())
  })

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
 
  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    )
  }
  return (
    <section className="container">
      <header>
        <h1>Lets Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input type="text" placeholder="Search Pokemon..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <ul className="cards">
          {searchdata.map((curPokemon) => {
            return (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Pokemon