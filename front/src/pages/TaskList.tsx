import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { Add, Task } from '@mui/icons-material';

function TaskList({ projectId }: { projectId: string }) {
  const taskContext = useContext(TaskContext);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskName, setNewTaskName] = useState(null);

  const handleNewTaskNameChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleToggle = async (taskId: string, isDone: boolean) => {
    const taskupdated = await taskContext.updateTask(taskId, isDone);
    setTasks(tasks.map((task) => (task._id === taskId ? taskupdated : task)));
  };

  const submitNewTask = async () => {
    if (!newTaskName) return;
    const newTask = await taskContext.createTask(projectId, newTaskName);
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await taskContext.getTasks(projectId);
      if (data === undefined) return;
      setTasks(data);
    };
    getTasks();
  }, []);

  return (
    <List>
      {tasks &&
        tasks?.map((task) => (
          <ListItem key={task._id}>
            <ListItemIcon>
              <Task />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary={task.name} />
            <Switch
              edge="end"
              onChange={(e) => handleToggle(task._id, e.target.checked)}
              checked={task.isDone}
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
            />
          </ListItem>
        ))}
      <ListItem>
        <TextField
          id="standard-basic"
          label="Nom"
          variant="standard"
          value={newTaskName}
          onChange={handleNewTaskNameChange}
          sx={{ flex: 1 }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: '10px' }}
          aria-label="directions"
          onClick={submitNewTask}
        >
          <Add />
        </IconButton>
      </ListItem>
    </List>
  );
}

export default TaskList;
