import React, { useEffect, useState } from 'react';
import TodoList from './Todolist';

const apiUrl = 'https://playground.4geeks.com/todo'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const username = 'Asenius';

  const createUser = async () => {
    await fetch(apiUrl + "/users/" + username, { method: 'POST' });
  }; 

  const fetchTasks = async () => {
    const response = await fetch(apiUrl + "/users/" + username);
    const data = await response.json();
    setTasks(data.todos);
  }

  const createTask = async (newTask) => {
    const task = { label: newTask, is_done: false };
    await fetch(apiUrl + "/todos/" + username, 
                {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: { 'Content-Type': 'application/json' }
                }
              );
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await fetch(`${apiUrl}/todos/${taskId}`, {method: 'DELETE'});
    fetchTasks();
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      await createTask(newTask.trim());
      setNewTask('');
    }
  };

  useEffect(() => {
    createUser().then(() => getTasks());
  }, []);

  return (
    <div className="container">
      <h1>Lista de tareas</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe una tarea y presiona Enter"
        />
      </div>

      <TodoList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
};

export default App;