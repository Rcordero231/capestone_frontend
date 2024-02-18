

import CategoryType from '../types/category';

import UserType from '../types/auth';



type HomeProps = {
    isLoggedIn: boolean,
    user: UserType|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Home({ isLoggedIn, user}: HomeProps) {
    



    return (
        <>
            <h1>Hello {isLoggedIn ? user?.firstName + ' ' + user?.lastName : 'Friend'}</h1>
        </>
    )
}

