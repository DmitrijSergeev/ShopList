import React, {useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./components/todoList/todoList";
import {v1} from "uuid";

export type FilterType = 'all'|'active'|'completed'

function App() {

    let [tasks, setTasks] = useState<TaskProps[]>([
        {taskId: v1(), title: 'JS', isDone: false},
        {taskId: v1(), title: 'HTML', isDone: true},
        {taskId: v1(), title: 'React', isDone: true},
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTasks = (taskId: string) => {
        const filteredTasks = tasks.filter( t => t.taskId !== taskId)
        setTasks(filteredTasks)
    }

    let tasksForFilter = tasks;
    if (filter === 'active'){
        tasksForFilter = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed'){
        tasksForFilter = tasks.filter(t => t.isDone)
    }
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <TodoList
                tasks={tasksForFilter}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                filter={filter}
            />
        </div>
    );
}

export default App;
