import PokeGrid from '../components/PokeGrid';
import UserType from '../types/auth';
import '../styles/Home.css';
import proffessorOak from '../images/professoroak.png'; // Import the image

type HomeProps = {
  isLoggedIn: boolean,
  user: UserType | null;
};

export default function Home({ isLoggedIn }: HomeProps) {
  return (
    <div className='home-container'>
      {isLoggedIn ? <PokeGrid /> :
        <div>
          <h1>Gotta Log In or Sign Up Trainer</h1>
          <img src={proffessorOak} alt="Professor Oak"></img>
        </div>
      }
    </div>
  );
}


// <Card style={{ width: '20rem' }}>
// <Card.Img style={{ width: '18rem' }} variant='top' src={poke.sprites.other['official-artwork']?.front_default}></Card.Img>
// <Card.Body>
//     <Card.Title>{poke.name}</Card.Title>
//     <Card.Text>Type: {poke.types[0]?.type?.name}</Card.Text>
//     <Card.Text>Weight: {poke.weight}lbs</Card.Text>
//     <Card.Text>Height: {poke.height}"</Card.Text>
// </Card.Body>
// </Card>