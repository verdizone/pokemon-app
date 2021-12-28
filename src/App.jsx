import { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./components/Header";
import ListadoDePokemon from "./components/ListadoDePokemon";
import Pagination from "./components/Pagination";

const App = () => {
  const [pokemon, setPokemon  ] = useState([]);

  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
  const [prevPageUrl, setPrevPageUrl] = useState('')
  const [loading, setLoading] = useState(true)

  
  /*   useEffect(()=>{
    
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(res=> res.json())
    .then(data => setPokemon(data.results.map(p=>p.name)))
    
  }, [])
  */
 
  /* useEffect(()=>{
    
    axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(res=>{
      setPokemon(res.data.results.map(p=> p.name))
    })
    
  }, []) */
  
  useEffect(()=>{
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken( c=> cancel = c)
    })
    .then(res=>{
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p=> p.name))
    })
    return () =>{
      cancel()
    }  
  }, [currentPageUrl])
  
  if(loading){
     return (<h1>Loading...</h1>)
  }

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl)
  }

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl)
  }
  
  return (
    <div>
      <Header />
      <ListadoDePokemon 
        pokemon={pokemon} 
      />
      <Pagination 
        gotoNextPage={nextPageUrl && gotoNextPage}
        gotoPrevPage={prevPageUrl && gotoPrevPage}
      />
    </div>
  );
};

export default App;
