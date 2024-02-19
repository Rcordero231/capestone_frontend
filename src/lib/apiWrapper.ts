import axios from 'axios';
import UserType from '../types/auth';
import { Pokemon, PokemonPage } from '../types/pokemon';
import api from "./pokeWrapper"

const base: string = 'http://127.0.0.1:5000';
const userEndpoint: string = '/users';
const tokenEndpoint: string = '/token';



const getPokemon = async (name: string) => {
    try {
        const response = await api.get<Pokemon[]>("/pokemon/" + name);
        
        if(response.status === 200) {
            //@ts-ignore
        return response.data;
        }
        return []
    } catch (error) {
        console.error('There was an error fetching the pokemon:', error);
        throw error;
    }
};

const getPokemonPage = async (page: number) => {
    const pageSize = 12;
    try {
        const response = await api.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
        return response.data;
    } catch(error) {
        console.error('Error with getting PokePage: ', error);
        throw error;
    }
}


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    error?: string,
    data?: T
}

type TokenType = {
    token: string,
    tokenExpiration: string
}


async function register(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function getMe(token: string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint+"/me");
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function editUserId(token:string, editedUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, editedUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

async function deleteUserId(token:string): Promise<APIResponse<string>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

export {
    register,
    login,
    getMe,
    editUserId,
    deleteUserId,
    getPokemon,
    getPokemonPage
}