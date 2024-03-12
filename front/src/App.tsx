import { useContext } from 'react';
import './App.css';
import { AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import Projects from './pages/Projects';
import { ProjectProvider } from './Providers/ProjectProvider';
import { TaskProvider } from './Providers/TaskProvider';

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext.user) return <Login />;

  return (
    <ProjectProvider>
      <TaskProvider>
        <Projects />
      </TaskProvider>
    </ProjectProvider>
  );
}

export default App;
