import { useEffect, useState } from 'react';
import UserProfile from './components/UserProfile.jsx';
import TaskFilterButtons from './components/TaskFilterButtons.jsx';
import TaskItem from './components/TaskItem.jsx';
import filterTasks from './utils/filterTasks.js';

export default function StudentWork() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  //  #1: Data fetching + state + UI logic all mixed together
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTasks([
        { id: 1, title: 'Learn React', completed: true },
        { id: 2, title: 'Refactor code', completed: false },
        { id: 3, title: 'Organize files', completed: false },
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // #2: Filtering logic inside component
  const visibleTasks = filterTasks(tasks, filter);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      {/* #3: Hardcoded UI, not reusable */}
      <UserProfile name="Student" />

      {/* #4: Repeated button JSX */}
      <TaskFilterButtons filter={filter} setFilter={setFilter} />

      {/* #5: Inline list rendering */}
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
