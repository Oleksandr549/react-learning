import { useState, useReducer, useEffect } from 'react';

type Task = {
    id: string;
    text: string;
    done: boolean;
};
type Filter = 'all' | 'active' | 'done';
type Action =
  | { type: 'added'; id: string; text: string }
  | { type: 'toggled'; id: string }
  | { type: 'deleted'; id: string }
  | { type: 'clearedDone' };
function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }];
    case 'toggled':
      return tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'deleted':
      return tasks.filter(t => t.id !== action.id);
    case 'clearedDone':
      return tasks.filter(t => !t.done);
  }
}

const STORAGE_KEY = 'todo-tasks';

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
export default function ToDoApp() {
    
    const [tasks, dispatch] = useReducer(tasksReducer, [], loadTasks);
    const [text, setText] = useState('');
    const [filter, setFilter] = useState<Filter>('all');
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);
 function handleAdd(e: React.FormEvent) {
  e.preventDefault();
  if (text.trim() === '') return;
  dispatch({ type: 'added', id: crypto.randomUUID(), text: text.trim() });
  setText('');
}

function handleToggle(id: string) {
  dispatch({ type: 'toggled', id });
}
function handleClearDone() {
  dispatch({ type: 'clearedDone' });
}
function handleDelete(id: string) {
  dispatch({ type: 'deleted', id });
}
const visibleTasks = tasks.filter(t => {
  if (filter === 'active') return !t.done;
  if (filter === 'done') return t.done;
  return true;
});

const activeCount = tasks.filter(t => !t.done).length;


  return (
    
    <div>
      <h1>Todo</h1>
    <form onSubmit={handleAdd}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    
    </form>
      <div>
  {(['all', 'active', 'done'] as Filter[]).map(f => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      disabled={filter === f}
    >
      {f}
    </button>
  ))}
   <button onClick={handleClearDone}>Clear Done</button>
</div>
        <ul>
            {visibleTasks.map(t => (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => handleToggle(t.id)}
                    />
                    <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
                        {t.text}
                    </span>
                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                </li>
            ))}
        </ul>
        <p>{activeCount} active tasks</p>
    </div>
  );
}