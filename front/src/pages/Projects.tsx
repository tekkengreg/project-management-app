import {
  Box,
  Typography,
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Fab,
  Modal,
  Input,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Add, ExpandMore, Logout } from '@mui/icons-material';
import TaskList from './TaskList';

function Projects() {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);
  const [projects, setProjects] = useState<any[]>([]);
  const [newProjectName, setNewProjectName] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNewProjectNameChange = (e) => {
    setNewProjectName(e.target.value);
  };
  const submitNewProject = async () => {
    if (!newProjectName) return;
    const newProject = await projectContext.createProject(newProjectName);
    setProjects([...projects, newProject]);
    setNewProjectName(null);
    setOpen(false);
  };

  useEffect(() => {
    const getProjects = async () => {
      const data = await projectContext.getProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Liste des projets
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} onClick={() => authContext.logout()}>
              <Logout />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '1OO%',
          flex: 1,
        }}
      >
        <Toolbar />
        {projects.map((project) => (
          <Accordion
            key={project._id}
            slotProps={{ transition: { unmountOnExit: true } }}
          >
            <AccordionSummary key={project._id} expandIcon={<ExpandMore />}>
              <Typography>{project.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TaskList projectId={project._id} />
            </AccordionDetails>
          </Accordion>
        ))}

        <Fab
          color="primary"
          sx={{ position: 'absolute', bottom: 15, right: 15 }}
          onClick={handleOpen}
        >
          <Add />
        </Fab>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nouveau projet
          </Typography>
          <Input
            value={newProjectName}
            id="auth-login-password"
            name="password"
            onChange={handleNewProjectNameChange}
            type={'text'}
          />
          <Button onClick={submitNewProject}>Créer</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Projects;
