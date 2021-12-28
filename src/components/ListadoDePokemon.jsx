import {generateId} from '../assets/index'

const ListadoDePokemon = ( {pokemon} ) => {
    return (
        <div>
          {
              pokemon.map(p=>
                <h2 key={generateId()}>{p}</h2>  
              )
          }
        </div>
    )
}

export default ListadoDePokemon
