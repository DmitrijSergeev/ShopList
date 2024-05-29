import React, {useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./components/todoList/todoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    todoId: string
    title: string
    filter: FilterType
}

function App() {

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {todoId: v1(), title: 'What to learn?', filter: 'all'},
        {todoId: v1(), title: 'What to buy?', filter: 'all'}
    ])


    let [tasks, setTasks] = useState<TaskProps[]>([
        {taskId: v1(), title: 'JS', isDone: false},
        {taskId: v1(), title: 'HTML', isDone: true},
        {taskId: v1(), title: 'React', isDone: true},
    ])

    //const [filter, setFilter] = useState<FilterType>('all')

    const removeTasks = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.taskId !== taskId)
        setTasks(filteredTasks)
    }

    // let tasksForFilter = tasks;
    // if (filter === 'active') {
    //     tasksForFilter = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     tasksForFilter = tasks.filter(t => t.isDone)
    // }
    const changeFilter = (todoId: string, filter: FilterType) => {
        setTodoLists(todoLists.map( tl => tl.todoId === todoId ? {...tl, filter} : tl))
    }
    const addTask = (title: string) => {
        const newTask = {taskId: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.taskId === taskId ? {...t, isDone} : t))
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodoList = tasks;
                if(tl.filter === 'active'){
                    tasksForTodoList = tasks.filter(t => !t.isDone )
                }
                if (tl.filter === 'completed'){
                    tasksForTodoList = tasks.filter(t => t.isDone)
                }
                return <TodoList
                    key={tl.todoId}
                    todoId={tl.todoId}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                />
            })}
        </div>
    );
}

export default App;
