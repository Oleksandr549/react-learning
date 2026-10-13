import {UseState} from 'react';

type Task = {
    id: string;
    text: string;
    done: boolean;
};
export default function ToDoApp() {
    const [tasks, setTasks] = UseState<Task[]>([]);
    const [task, setText] = UseState("");

 function handleAdd() {}

  function handleToggle(id: string) {}

  function handleDelete(id: string) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div>
      <h1>Todo</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
        <ul>
            {tasks.map((t) => (
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