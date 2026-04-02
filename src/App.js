import './App.css' ;
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingNote, setEditingNote] = useState('');

  // Добавление новой задачи
  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { title: input, note: noteInput, done: false }]);
    setInput('');
    setNoteInput('');
  };

  // Удаление задачи
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Начало редактирования
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].title);
    setEditingNote(todos[index].note);
  };

  // Сохранение редактирования
  const saveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], title: editingText, note: editingNote };
    setTodos(newTodos);
    setEditingIndex(null);
    setEditingText('');
    setEditingNote('');
  };

  // Переключение состояния Сделано/Не сделано
  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1> Minimalistic Todo</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <input
          type="text"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Add a note..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todos-list">
        {todos.map((todo, index) => (
          <div key={index} className={`todo-card ${todo.done ? 'done' : ''}`}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
                <input
                  type="text"
                  value={editingNote}
                  onChange={(e) => setEditingNote(e.target.value)}
                  className="edit-input"
                  placeholder="Edit note..."
                />
                <button onClick={() => saveEdit(index)} className="save-btn">💾</button>
              </>
            ) : (
              <>
                <div>
                  <strong>{todo.title}</strong>
                  {todo.note && <p className="note">{todo.note}</p>}
                </div>
                <div className="actions">
                  <button onClick={() => toggleDone(index)} className="done-btn">
                    {todo.done ? '✅' : '⬜'}
                  </button>
                  <button onClick={() => startEdit(index)} className="edit-btn">✏️</button>
                  <button onClick={() => removeTodo(index)} className="delete-btn">🗑️</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App ;