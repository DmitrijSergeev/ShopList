import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/todoList/todoList";
import {v1} from "uuid";

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    return (
        <div className="App">
            <TodoList tasks={tasks}/>
        </div>
    );
}

export default App;
