import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoListApp = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      // console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTodo = async (title) => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
      });
      // console.log(response);
      setTodos([{ id: todos.length + 1, title, completed: false }, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      console.log(updates, id);
      await axios.put(`https://jsonplaceholder.typicode.com/todos/200`, { id, updates });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (

    <div className="todo-container">

      {/* Add todo form */}
      <form className="add-todo-form" onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        if (title.trim()) {
          addTodo(title);
          e.target.elements.title.value = '';
        }
      }}>
        <input className="add-todo-input" type="text" name="title" placeholder="Enter todo title" />
        <button className="add-todo-button" type="submit">Add Todo</button>
      </form>
      {/* Todo list */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
            <button onClick={() => updateTodo(todo.id, { completed: !todo.completed })}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListApp;
