import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/PokeCard.css';

type PokeCardProps = {
    name: string,
    types: {
        type: {
            name: string,
        }
    }[]
    weight: number,
    height: number,
        sprites: {
            front_default: string;
        }
}

type TypeColors = {
    [key: string]: string;
};

const typeColors: TypeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};
export default React.forwardRef<HTMLDivElement, PokeCardProps>(({ name, types, weight, height, sprites }: PokeCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const type = types[0].type.name;
    const cardColor = typeColors[type] || '#F5F5F5';

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className='poke-card' style={{ width: '18rem', backgroundColor: cardColor } }>
            <Card.Img variant="top" src={sprites.front_default} />
            <Card.Body>
                <Card.Title style={{fontSize: '2em', textDecoration: 'underline'}}>{name}</Card.Title>
                <Card.Text>
                    Types: {types.map(type => type.type.name).join(', ')}
                    <br />
                    Weight: {weight}
                    <br />
                    Height: {height}
                </Card.Text>
                <Button variant="primary" onClick={toggleFavorite}>
                    {isFavorite ? 'Unfavorite' : 'Favorite'}
                </Button>
            </Card.Body>
        </Card>
    );
});