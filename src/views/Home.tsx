 import { useNavigate } from 'react-router-dom';
import * as PokemonApi from '../lib/pokeWrapper';
import {Fragment, useEffect, useState} from 'react'
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import UserType from '../types/auth';
import { getPokemon } from '../lib/apiWrapper';
import { Pokemon } from '../types/pokemon';

type HomeProps = {
    isLoggedIn: boolean,
    user: UserType|null,

}

export default function Home({  }: HomeProps) {

  const [pokemon, setPokemon] = useState('');
  const [pokemonResults, setPokmonResults] = useState<Pokemon[]>([]);

    
    

    useEffect(() => {

      // async function searchPokemon(){

      //   if(!pokemon) return;

      //   const response = await getPokemon(pokemon);

      //   console.log({response});

      // setPokmonResults(response)
      // }

      // searchPokemon();

    }, [pokemon])

    const handleClick=()=> {
          
      async function searchPokemon(){

        if(!pokemon) return;

        const response = await getPokemon(pokemon);

        console.log({response});

      setPokmonResults(response)
      }

      searchPokemon();
    }

    

    return (
      <>
        <InputGroup className="mb-3">
              <Button variant="outline-secondary" id="button-addon1" onClick={handleClick}>
                Button
              </Button>
              <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" value={pokemon} onChange={(event) => setPokemon(event.target.value)}/>
            </InputGroup>
          {/* <Form.Control aria-label="Large" aria-describedby="inputGroup-sizing-sm" size="lg" value={pokemon} onChange={(event) => setPokemon(event.target.value)} /> */}

          {pokemonResults.map((pokemon, index) => (
        <Fragment key={index}>
          <Card>
              <Card.Img variant='top' src={pokemon?.sprites?.other['official-artwork']?.front_default}></Card.Img>
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                {/* <Card.Text>{pokemon?.types[0]?.type?.name}</Card.Text> */}
                <Card.Text>{pokemon?.weight}</Card.Text>
                <Card.Text>{pokemon?.height}</Card.Text>
              </Card.Body>
          </Card>
        </Fragment>
      ))}

          </>


    )
}


