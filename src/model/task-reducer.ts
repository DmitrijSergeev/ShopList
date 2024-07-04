import {SetTodolistAType} from "../model/todolists-reducer";
import {TaskStateType} from "../App";
import {TaskType} from "../api/todolist-api";

const InitialState: TaskStateType = {}

export const taskReducer = (state = InitialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'SET_TODOLIST': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

export type SetTaskType = ReturnType<typeof setTasksAC>
type ActionsType = SetTodolistAType| SetTaskType