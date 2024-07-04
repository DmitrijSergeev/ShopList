import {v1} from "uuid";
import {TodolistDomainType, todoListsReducer} from "../model/todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]

    const action = {
        type: 'REMOVE-TODO',
        id: todolistId1
    } as const

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]

    const action = {
        type: 'ADD-TODO',
        title: 'New Todo'
    } as const

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(action.title)
})