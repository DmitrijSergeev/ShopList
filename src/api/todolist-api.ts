import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b3f995ef-2a2a-447a-99a7-bd77018d4717'
    }
})

export const todolistApi = {
    getTodoLists(){
        return instance.get<TodolistType>('todo-lists')
    }
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
