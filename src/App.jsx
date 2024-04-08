import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, //means that we are doing nothing
    projects: [], 
    tasks: [],
  })

  function handleAddTask(text){
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        id: taskId, 
        text: text, 
        projectId: prevState.selectedProjectId}
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState, 
        tasks: prevState.tasks.filter(task => task.id !== id) 
      }
    })
  }

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null, //means that we are in the middle of the action of adding a new project

      }
    })
  }

  function handleQuitAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState, 
        selectedProjectId: undefined,
      }
    })
  }
  // Observatie: selectedProjectId values act only as a signal to us, so we know which components to display

  function handleSave(enteredData){
    setProjectsState(prevState => {
      const projectId = Math.random();
      const projectData = {id: projectId, ...enteredData}
      return {
        ...prevState, 
        selectedProjectId: undefined, 
        projects: [...prevState.projects, projectData] //just "...projects" is not enough, projects can be any name
        //must add "...prevState.projects"
      }
    })
  }

  function toggleProjects(projectId){
    setProjectsState(prevState => {
      return {
        ...prevState, 
        selectedProjectId: projectId
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState, 
        selectedProjectId: undefined, 
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId) 
        //this function returns a new array with all the elements that pass the given condition.
        //In this case, all the elements that do not match the selectedId, because we want to delete that element
        //And we can get the id of the element we want to delete from the previous state
      }
    })
  }

  const project = projectsState.projects.find(item => item.id === projectsState.selectedProjectId)

  let content;

  if(projectsState.selectedProjectId === null){
    content = <NewProject onCancel={handleQuitAddProject} onAdd={handleSave}/>
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }else{
    content = <SelectedProject 
    project={project} 
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask} 
    onDelete={handleDeleteProject} 
    tasks={projectsState.tasks}/>
  } //toggle between which content to display, besides the sidebar

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} 
      projects={projectsState.projects}
      onSelectProject={toggleProjects}
      selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
