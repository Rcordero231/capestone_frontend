import axios from 'axios';
import UserType from '../types/auth';
import { Pokemon } from '../types/pokemon';
import api from "./pokeWrapper";

const base: string = 'http://127.0.0.1:5000';
const userEndpoint: string = '/users';
const tokenEndpoint: string = '/token';


const fetchPokemon = async (page: number, pageSize: number): Promise<Pokemon[]> => {
    try {
        const offset = (page - 1) * pageSize;
        let url = `/pokemon?offset=${offset}&limit=${pageSize}`;
        let allPokemon: Pokemon[] = [];

        const response = await api.get(url);
        const data = response.data;

        const pokemonPromises = data.results.map(async (poke: any) => {
            const response = await api.get(poke.url.replace(api.defaults.baseURL, ''));
            const data = response.data;

            return {
                name: data.name,
                types: data.types,
                weight: data.weight,
                height: data.height,
                sprites: {
                    front_default: data.sprites.front_default,
                }
            } as Pokemon;
        });

        allPokemon = await Promise.all(pokemonPromises);

        return allPokemon;
    } catch (error) {
        console.error('Failed to fetch Pokemon:', error);
        return [];
    }
}


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username: string, password: string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token: string) => axios.create({
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


async function register(newUserData: Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

async function login(username: string, password: string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try {
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

async function getMe(token: string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + "/me");
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

async function editUserId(token: string, editedUserData: Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(userEndpoint, editedUserData);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

async function deleteUserId(token: string): Promise<APIResponse<string>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data.success
    } catch (err) {
        if (axios.isAxiosError(err)) {
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
    fetchPokemon
}