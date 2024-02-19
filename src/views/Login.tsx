import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CategoryType from '../types/category';
import UserType from '../types/auth';
import { login, getMe } from '../lib/apiWrapper';

type LoginProps = {
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null) => void,
    logUserIn: (user: UserType) => void
}

export default function Login({ flashMessage, logUserIn }: LoginProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({ username: '', password: ''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        let response = await login(userFormData.username!, userFormData.password!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log('user response', response.data);
            localStorage.setItem('token', response.data?.token as string)
            localStorage.setItem('tokenExp', response.data?.tokenExpiration as string)
            let userResponse = await getMe(response.data?.token as string)
            logUserIn(userResponse.data!)
            flashMessage('You have successfully logged in', 'success')
            navigate('/edit/'+userResponse.data?.id)
        }
    }


    return (
        <>
            <h1 className='text-center'>Log In</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' placeholder='Enter Username' value={userFormData.username} onChange={handleInputChange}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' >Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}