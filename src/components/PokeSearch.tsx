import { useEffect, useState } from 'react'
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import UserType from '../types/auth';
import { getPokemon } from '../lib/apiWrapper';
import { Pokemon } from '../types/pokemon';

type HomeProps = {
    isLoggedIn: boolean,
    user: UserType | null,
    pokemon: Pokemon
}

const INITIAL_VALUES = {
    name: '',
    types: [],
    weight: 0,
    height: 0,
    sprites: {
        other: {
            "official-artwork": {
                front_default: 'string'
            }
        }
    }
}

export default function Home({ }: HomeProps) {

    const [pokemon, setPokemon] = useState('');
    const [pokemonResults, setPokmonResults] = useState<Pokemon | undefined>(INITIAL_VALUES);




    useEffect(() => {

        // async function searchPokemon(){

        //   if(!pokemon) return;

        //   const response = await getPokemon(pokemon);

        //   console.log({response});

        // setPokmonResults(response)
        // }

        // searchPokemon();

    }, [pokemon])

    const handleClick = () => {

        async function searchPokemon() {

            if (!pokemon) return;

            const response = await getPokemon(pokemon);

            console.log('response', response);

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
                <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" value={pokemon} onChange={(event) => setPokemon(event.target.value)} />
            </InputGroup>
            {/* <Form.Control aria-label="Large" aria-describedby="inputGroup-sizing-sm" size="lg" value={pokemon} onChange={(event) => setPokemon(event.target.value)} /> */}


            <Card style={{ width: '20rem' }}>
                <Card.Img style={{ width: '18rem' }} variant='top' src={pokemonResults?.sprites?.other['official-artwork']?.front_default}></Card.Img>
                <Card.Body>
                    <Card.Title>{pokemonResults?.name}</Card.Title>
                    <Card.Text>Type: {pokemonResults?.types[0]?.type?.name}</Card.Text>
                    <Card.Text>Weight: {pokemonResults?.weight}lbs</Card.Text>
                    <Card.Text>Height: {pokemonResults?.height}"</Card.Text>
                </Card.Body>
            </Card>
        </>


    )
}