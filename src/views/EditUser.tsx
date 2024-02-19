import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe, editUserId, deleteUserId } from '../lib/apiWrapper';
import CategoryType from '../types/category';;
import UserType from '../types/auth';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

type EditUserProps = {
    isLoggedIn: boolean,
    user: UserType|null,
    flashMessage: (message: string, category:CategoryType) => void;
    
    logUserOut: () => void;
}

export default function EditUser({ user, flashMessage, logUserOut }: EditUserProps) {
    const navigate = useNavigate();

    const token =  localStorage.getItem('token') || "";

    const [userToEditData, setUserToEditData] = useState<Partial<UserType>>({username:'', email:'' })

    useEffect( () => {
        async function getUser(){
            let response = await getMe(token);
            if (response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else if (response.data) {
                const userToEdit = response.data
                if (userToEdit.id !== user?.id){
                    flashMessage('You do not have permission to edit this user', 'danger');
                    navigate('/')
                } else {
                    setUserToEditData({ username: userToEdit.username, email: userToEdit.email})
                }
            }
        }
        getUser();
    }, [  ] );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserToEditData({...userToEditData, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const response = await editUserId(token, userToEditData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`User has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
    
        const response = await deleteUserId(token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            logUserOut()
            navigate('/')
        }
    }

    return (
        <>
            <h1 className="text-center">User Profile</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' value={userToEditData.username} onChange={handleInputChange} />
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' value={userToEditData.email} onChange={handleInputChange} />
                        <Button variant='success' className='mt-3 w-50' type='submit'>Update User Profile</Button>
                        <Button variant='danger' className='mt-3 w-50' onClick={handleDeleteClick}>Delete Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}