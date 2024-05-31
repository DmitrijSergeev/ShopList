import React, {ChangeEvent} from 'react';
import {FilterType} from "../../App";
import s from './todoList.module.css'
import {AddItemForm} from "../../components/addItemForm/addItemForm";
import {EditAbleSpan} from "../../components/editAbleSpan/editAbleSpan";

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
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
    title: string
    filter: FilterType
    removeTodoList: (id: string) => void
    updateTask: (id: string, taskId: string, title: string)=>void
}
export const TodoList = (props: TodoListProps) => {
    const {
        tasks, removeTasks, changeFilter, addTask,
        changeTaskStatus, id, removeTodoList, title, updateTask
    } = props;

    // const [error, setError] = useState<string | null>(null)
    // const inputRef = useRef<HTMLInputElement>(null)

    const onClickAllHandler = () => {
        changeFilter(id, 'all')
    }
    const onClickActiveHandler = () => {
        changeFilter(id, 'active')
    }
    const onClickCompletedHandler = () => {
        changeFilter(id, 'completed')
    }

    const onClickDeleteHandler = () => {
        removeTodoList(id)
    }

    const addTaskCallback = (title: string) => {
        addTask(id, title)
    }

    return (
        <div>
            <div>
                <h3 className={s.container}>
                    {title}
                </h3>
                <button onClick={onClickDeleteHandler}>X</button>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {tasks.length === 0 ? (
                <p className={s.emptyTask}>Todolist is empty</p>
            ) : (
                <ul>
                    {tasks.map((t) => {
                        const onClickHandler = () => {
                            removeTasks(id, t.taskId)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, t.taskId, e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (title: string) => {
                            updateTask(id, t.taskId, title)
                        }
                        return (
                            <li key={t.taskId}>
                                <button onClick={onClickHandler}>x</button>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}
                                />
                                <EditAbleSpan value={t.title} onChange={onChangeTitleHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};
