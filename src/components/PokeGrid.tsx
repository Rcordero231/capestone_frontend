import { useEffect, useState } from 'react';
import { fetchPokemon } from '../lib/apiWrapper';
import { Pokemon } from "../types/pokemon";
import PokeCard from './PokeCard';
import { Container } from 'react-bootstrap';
import '../styles/PokeGrid.css';

let currentPage = 1; // Initialize currentPage to 1

export default function PokemonGrid() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [triggerFetch, setTriggerFetch] = useState(0);

    useEffect(() => {
        const getPokemon = async () => {
            setLoading(true);
            try {
                const newPokemon = await fetchPokemon(currentPage, 20);
                const pokemonWithImages = newPokemon.filter(poke => poke.sprites.front_default);
                setPokemon(oldPokemon => [...oldPokemon, ...pokemonWithImages]);
            } catch (error) {
                setError('Failed to fetch Pokemon');
            }
            setLoading(false);
        };

        getPokemon();
    }, [triggerFetch]);

    const loadMore = () => {
        currentPage += 1;
        setTriggerFetch(oldValue => oldValue + 1);
    };


    useEffect(() => {
        loadMore();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '5rem' }}>
                {pokemon.map((poke, index) => (
                    <PokeCard key={index} {...poke} />
                ))}
            </div>
            <div className='button-container' onClick={loadMore}>
                <span className="mt-3 load-more-button">
                    {loading ? 'Loading...' : 'Load More'}
                </span >
            </div>
        </Container>
    );
}