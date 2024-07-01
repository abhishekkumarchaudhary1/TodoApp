import React, { useState, useEffect } from 'react';
import "./Todo.css"

function Todo() {
  const [todos, setTodos] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  const handleAddClick = () => {
    setIsInputVisible(true);
    setNewTodo('');
    setEditIndex(null);
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) => 
        index === editIndex ? { ...todo, text: newTodo } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setEditIndex(null);
    } else {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
    setNewTodo('');
    setIsInputVisible(false);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleEdit = (index) => {
    setNewTodo(todos[index].text);
    setIsInputVisible(true);
    setEditIndex(index);
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <section className="todoSection">

    <h1 className='author'>App by Abhishek</h1>
    <h2 className='appHeader'>Todo App</h2>
    <button onClick={handleAddClick} className='bigBtn'>Add Todo</button>
    {isInputVisible && (
    <div>
        <input
            className='todoInput'
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleSaveClick} className='bigBtn'>Save</button>
    </div>
    )}
    <ul>
    {todos.map((todo, index) => (
        <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(index)}
        />
        {todo.text}
        <button onClick={() => handleEdit(index)} className='iconBtn'>Edit</button>
        <button onClick={() => handleDelete(index)} className='iconBtn'>Delete</button>
        </li>
    ))}
    </ul>
    </section>
  );
}

export default Todo;
