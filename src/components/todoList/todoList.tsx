import React, {useRef, KeyboardEvent, useState, ChangeEvent} from 'react';
import {FilterType} from "../../App";
import s from './todoList.module.css'

export type TaskProps = {
    taskId: string
    title: string
    isDone: boolean
}
export type TodoListProps = {
    id: string
    tasks: TaskProps[]
    removeTasks: (id: string, taskId: string) => void
    changeFilter: (todoId: string, filter: FilterType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean)=> void
    title: string
    filter: FilterType
}
export const TodoList = (props: TodoListProps) => {
    const {tasks, removeTasks, changeFilter, addTask, changeTaskStatus, id} = props;
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickAllHandler = () => {
        changeFilter(id, 'all')
    }
    const onClickActiveHandler = () => {
        changeFilter(id, 'active')
    }
    const onClickCompletedHandler = () => {
        changeFilter(id, 'completed')
    }

    const addTaskHandler = () => {
        if (inputRef.current) {
            if (inputRef.current.value !== '') {
                addTask(id, inputRef.current.value.trim());
                inputRef.current.value = ''
            } else {
                setError('Title is required')
            }
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input ref={inputRef}
                       onKeyDown={onKeyDownHandler}
                       className={error ? s.error : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>
                {tasks.map((t) => {
                    const onClickHandler = () => {
                        removeTasks(id, t.taskId)
                    }
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, t.taskId, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.taskId}>
                            <button onClick={onClickHandler}>X</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};
