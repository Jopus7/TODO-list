import './App.css';
import {useEffect, useState} from "react";
import {loadFromLocalStorage, saveToLocalStorage} from "./utils/localstorage";
import uuidGen from "./utils/uuid";

import Headline from "./components/Headline";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";
import TaskShowUp from "./components/TaskShowUp";



function App() {
    const [value, setValue] = useState('')
    const [tasks, setTasks] = useState([])
    const [selection, setSelection] = useState('all')

    useEffect(() => {
        setTasks(loadFromLocalStorage('tds'));
    }, [])

    useEffect(() => {
        saveToLocalStorage('tds', tasks);
    }, [tasks])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            setTasks([{
                name: value,
                id: uuidGen(),
                status: false,
            }, ...tasks]);
            setValue('');
        }
    }

    function handleChangeStatus(id) {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task
        })
        setTasks(newTasks);
    }

    function handleDeleteTask(id) {

        setTasks(tasks.filter(task => task.id !== id))
    }

    function handleDeleteDone() {
        setTasks(tasks.filter(task => !task.status))
    }

    return (
        <div className="App">
            <Headline/>
            <TaskInput
                value={value}
                handleChange={handleChange}
                handleKeyUp={handleKeyUp}
            />
            {tasks.length === 0 ? ('') : (
                <>
                    <TaskList
                        tasks={tasks}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        selection={selection}
                    />
                    <TaskShowUp
                        tasks={tasks}
                    />
                    <div>
                        <button onClick={() => setSelection('all')}>All</button>
                        <button onClick={() => setSelection(false)}>Active</button>
                        <button onClick={() => setSelection(true)}>Completed</button>
                    </div>
                    {tasks.filter((e) => e.status).length > 0 ? (<button onClick={handleDeleteDone}>Clear completed</button>) : ('')}
                </>)}
        </div>
    );
}
export default App;
