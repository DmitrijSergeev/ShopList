import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./components/todoList/todoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/addItemForm";
import {todolistApi} from "./api/todolist-api";

export type FilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: TaskProps[]
}
let todoId1 = v1();
let todoId2 = v1();

function App() {

    useEffect(() => {
        todolistApi.createTodoLists('hhhh').then( (res)=>{
            console.log(res.data)
        } )
    }, []);

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoId1, title: 'What to learn?', filter: 'all'},
        {id: todoId2, title: 'What to buy?', filter: 'all'}
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todoId1]: [
            {taskId: v1(), title: 'JS', isDone: false},
            {taskId: v1(), title: 'HTML', isDone: true},
            {taskId: v1(), title: 'React', isDone: true},
        ],
        [todoId2]: [
            {taskId: v1(), title: 'Milk', isDone: false},
            {taskId: v1(), title: 'Juice', isDone: false},
            {taskId: v1(), title: 'Bread', isDone: true},
        ],
    })

    const removeTasks = (id: string, taskId: string) => {
        setTasks({...tasks, [id]:tasks[id].filter(t => t.taskId !==taskId)})
    }

    const changeFilter = (id: string, filter: FilterType) => {
        setTodoLists(todoLists.map(tl => tl.id === id ? {...tl, filter} : tl))
    }
    const addTask = (id: string, title: string) => {
        const newTask = {taskId: v1(), title, isDone: false}
        setTasks({ ...tasks, [id]: [newTask, ...tasks[id] ]})
    }
    const changeTaskStatus = (id: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [id]: tasks[id].map(t => t.taskId === taskId ? {...t, isDone} : t)})
    }

    const removeTodoList = (id: string) => {
        setTodoLists( todoLists.filter( t => t.id !== id) )

        delete tasks[id];
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const id = v1();
        const newTodo: TodoListType = {id, title, filter: 'all'}
        setTodoLists([newTodo, ...todoLists])
        setTasks({...tasks, [id]: []})
    }

    const updateTask = (id: string, taskId: string, title: string) => {
        setTasks({...tasks, [id]: tasks[id].map( t => t.taskId === taskId ?
                {...t, title}
                : t)})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map(tl => {
                let tasksForTodoList = tasks[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                }
                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    updateTask={updateTask}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                />
            })}
        </div>
    );
}

export default App;
