import {useState} from 'react';

type Task = {
    id: string;
    text: string;
    done: boolean;
};
export default function ToDoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState('');

 function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim() === '') return;
    const newTask: Task = {
        id: crypto.randomUUID(),
        text: text.trim(),
        done: false,
    };
    setTasks([...tasks, newTask]);
    setText('');
 }

  function handleToggle(id: string) {
    setTasks(tasks.map(t => t.id === id ? {...t, done: !t.done} : t));
  }

  function handleDelete(id: string) {
    setTasks(tasks.filter(t => t.id !== id));
  }

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
        <ul>
            {tasks.map(t => (
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
    </div>
  );
}