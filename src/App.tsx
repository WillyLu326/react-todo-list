import React, { useState, useEffect } from 'react';
import './App.css';

const deleteIcon = <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1168" width="200" height="200"><path d="M608 768c-17.696 0-32-14.304-32-32V384c0-17.696 14.304-32 32-32s32 14.304 32 32v352c0 17.696-14.304 32-32 32zM416 768c-17.696 0-32-14.304-32-32V384c0-17.696 14.304-32 32-32s32 14.304 32 32v352c0 17.696-14.304 32-32 32zM928 224H768v-64c0-52.928-42.72-96-95.264-96H352c-52.928 0-96 43.072-96 96v64H96c-17.696 0-32 14.304-32 32s14.304 32 32 32h832c17.696 0 32-14.304 32-32s-14.304-32-32-32z m-608-64c0-17.632 14.368-32 32-32h320.736C690.272 128 704 142.048 704 160v64H320v-64z" p-id="1169" fill="#e6e6e6"></path><path d="M736.128 960H288.064c-52.928 0-96-43.072-96-96V383.52c0-17.664 14.336-32 32-32s32 14.336 32 32V864c0 17.664 14.368 32 32 32h448.064c17.664 0 32-14.336 32-32V384.832c0-17.664 14.304-32 32-32s32 14.336 32 32V864c0 52.928-43.072 96-96 96z" p-id="1170" fill="#e6e6e6"></path></svg>;
const pendingIcon = <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2120" width="200" height="200"><path d="M511.9 183c-181.8 0-329.1 147.4-329.1 329.1s147.4 329.1 329.1 329.1c181.8 0 329.1-147.4 329.1-329.1S693.6 183 511.9 183z m0 585.2c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z" fill="#e6e6e6" p-id="2121"></path><path d="M548.6 365.7h-73.2v161.4l120.5 120.5 51.7-51.7-99-99z" fill="#e6e6e6" p-id="2122"></path></svg>;
const completeIcon = <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3856" width="200" height="200"><path d="M823.04 823.04A439.893333 439.893333 0 1 1 341.333333 106.666667a439.893333 439.893333 0 0 1 481.706667 716.373333zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m209.493333 305.493333l-327.68 328.533334-85.333333-149.333334a35.84 35.84 0 0 0-62.293333 35.84l108.8 190.293334a36.266667 36.266667 0 0 0 31.146666 18.346666 35.84 35.84 0 0 0 17.493334-3.84 37.546667 37.546667 0 0 0 8.533333-6.826666l360.106667-361.813334a35.84 35.84 0 0 0-50.773334-51.2z" fill="#e6e6e6" p-id="3857"></path></svg>;

interface ToDo {
  text: string;
  isComplete: boolean;
}

const INIT_TODOS: ToDo[] = [
  { text: 'Learn React', isComplete: false },
  { text: 'Learn AWS', isComplete: false },
  { text: 'Learn Spring boot', isComplete: false },
];

const TodoForm = ({ addTodoItem }: { addTodoItem: (text: string) => void }) => {
  const [value, setValue] = useState('');
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }

    addTodoItem(value);
    setValue('');
    console.log('test');
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={inputChangeHandler}
      />
    </form>
  );
}

const TodoItem = ({ todo, index, removeTodoItem, completeTodoItem }: { todo: ToDo, index: number, removeTodoItem: (e: React.MouseEvent<HTMLElement>, i: number) => void, completeTodoItem: (e: React.MouseEvent<HTMLElement>, i: number) => void }) => {
  
  useEffect(() => {
    console.log('todo item start');
    return () => {
      console.log('todo item clean up');
    };
  }, []);

// test 1
// test 2
// test 3
  
  return (
    <div className="todo" onClick={(e) => completeTodoItem(e, index)}>
      <div className="todo-label">
        { todo.isComplete ? completeIcon : pendingIcon }
        <span className={todo.isComplete ? 'strike' : ''}>{todo.text}</span>
      </div>
      <div onClick={(e) => removeTodoItem(e, index)}>{deleteIcon}</div>
    </div>
  );
}

const App = () => {
  const initTodos = (): ToDo[] => {
    const t = localStorage.getItem('todos');
    console.log(t, t?.length);
    if (!t || t.length === 0) {
      return INIT_TODOS;
    }
    return JSON.parse(t);
  }

  const [todos, setTodos] = useState(initTodos());

  useEffect(() => {
    if (todos.length === 0) {
      localStorage.setItem('todos', '');
      return;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    console.log('did mount');
  }, []);

  const addTodoItemHandler = (text: string) => {
    const newTodos = [ { text, isComplete: false }, ...todos ];
    setTodos(newTodos);
  }

  const removeTodoItemHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const completeTodoItemHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newTodos = [...todos];
    if (newTodos[index].isComplete) {
      return;
    }
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todos">
        <TodoForm addTodoItem={addTodoItemHandler} />

        {
          todos.map((todo, index) => 
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              removeTodoItem={removeTodoItemHandler}
              completeTodoItem={completeTodoItemHandler}
            />
          )
        }
      </div>
    </div>
  );
}

export default App;
