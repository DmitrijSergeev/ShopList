import {todolistApi, TodolistType} from "../api/todolist-api";
import {FilterType} from "../App";
import {Dispatch} from "redux";

// let todolistID1 = v1()
// let todolistID2 = v1()

// const initialState: TodoListType[] = [
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ]

const initialState: TodolistDomainType[] = []

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET_TODOLIST': {
            return action.todoLists.map((tl) => ({...tl, filter: 'all'}))
        }
        case 'ADD-TODO': {
            //const id = v1();
            //const newTodo: TodolistType = {id, title: action.title, filter: 'all'}
            return state
        }
        case 'REMOVE-TODO': {
            return state.filter(t => t.id !== action.id)
        }
        default:
            return state
    }
}
type ActionsType = RemoveTodoType | AddTodoType | SetTodolistAType

export type RemoveTodoType = {
    type: 'REMOVE-TODO'
    id: string
}
export type AddTodoType = {
    type: 'ADD-TODO'
    title: string
}
export type SetTodolistAType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todoLists: TodolistType[]) => ({
    type: 'SET_TODOLIST' as const,
    todoLists
})

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistApi.getTodoLists().then( (res)=>{
            dispatch(setTodoListsAC(res.data))
        } )
    }
}