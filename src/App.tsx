// import Profile from "./01-describing-the-ui/Profile";
// import { TeaSet } from "./01-describing-the-ui/Profile";
// import Profile from "./02-adding-interactivity/Profile";
// import Profile from "./03-managing-state/Profile";
// import Profile from "./04-escape-hatches/Profile";
import AddTask from './03-managing-state/AddTask.js';
import TaskList from './03-managing-state/TaskList.js';
import { TasksProvider } from './03-managing-state/TasksContext.jsx';
export default function App() {
  
  return(
  <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  ) ;

}