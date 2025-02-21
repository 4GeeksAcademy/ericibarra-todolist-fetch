import React from 'react';

const TodoList = ({ tasks, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-message">No hay tareas, añadir tareas</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.label}</span>
            <button
            className='delete-btn'
              onClick={() => onDelete(task.id)}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;