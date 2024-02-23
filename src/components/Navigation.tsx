import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

type NavigationProps = {
    isLoggedIn: boolean,
    handleClick: ()=>void
}

export default function Navigation({ isLoggedIn, handleClick }:NavigationProps) {
    
    return (
        <Navbar bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>PokeDex</Navbar.Brand>
                <Nav className='me-auto'>
                    { isLoggedIn ? (
                        <>
                            <Nav.Link href='/'></Nav.Link>
                            <Nav.Link as={Link} to='/edituser'>Edit User</Nav.Link>
                            <Nav.Link as='button' onClick={handleClick}>Log Out</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to='/register'>Sign Up</Nav.Link>
                            <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}