import React from 'react';
import {FilterType} from "../../App";

export type TaskProps = {
    taskId: string
    title: string
    isDone: boolean
}
export type TodoListProps = {
    tasks: TaskProps[]
    removeTasks: (taskId: string)=>void
    changeFilter: (filter: FilterType)=>void
    filter: FilterType
}
export const TodoList = (props: TodoListProps) => {
    const {tasks, removeTasks, changeFilter, filter} = props;

    const onClickAllHandler = () => {changeFilter('all')}
    const onClickActiveHandler = () => {changeFilter('active')}
    const onClickCompletedHandler = () => {changeFilter('completed')}

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map( (el)=>{
                    const onClickHandler = () => {
                        removeTasks(el.taskId)
                    }
                    return (
                        <li key={el.taskId}>
                            <button onClick={onClickHandler}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
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
