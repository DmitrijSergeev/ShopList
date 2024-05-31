import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodoListType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
const action = {
    type: 'todos/todoAdded',
    id: v1()
}

export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TODO': {
            const id = v1();
            const newTodo: TodoListType = {id, title: action.title, filter: 'all'}
            return [ newTodo, ...state ]
        }
        case 'REMOVE-TODO': {
            return state.filter(t => t.id !== action.id)
        }
        default:
            return state
    }
}
type ActionsType = RemoveTodoType | AddTodoType

export type RemoveTodoType = {
    type: 'REMOVE-TODO'
    id: string
}
export type AddTodoType = {
    type: 'ADD-TODO'
    title: string
}