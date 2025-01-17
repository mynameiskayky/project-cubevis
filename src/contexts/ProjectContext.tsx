"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Project, Section, Task } from "@/types";

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  currentSection: Section | null;
  setCurrentProject: (project: Project | null) => void;
  setCurrentSection: (section: Section | null) => void;
  addProject: (name: string) => Project;
  editProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
  addSection: (projectId: string, title: string) => void;
  addTask: (sectionId: string, task: Omit<Task, "id">) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = "@cubevis:projects";

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (name: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      sections: [],
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const addSection = (projectId: string, title: string) => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      title,
      tasks: [],
    };

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, sections: [...project.sections, newSection] }
          : project
      )
    );
  };

  const addTask = (sectionId: string, task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
    };

    setProjects((prev) =>
      prev.map((project) => ({
        ...project,
        sections: project.sections.map((section) =>
          section.id === sectionId
            ? { ...section, tasks: [...section.tasks, newTask] }
            : section
        ),
      }))
    );
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setProjects((prev) =>
      prev.map((project) => ({
        ...project,
        sections: project.sections.map((section) => ({
          ...section,
          tasks: section.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      }))
    );
  };

  const editProject = (id: string, name: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, name } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        currentSection,
        setCurrentProject,
        setCurrentSection,
        addProject,
        editProject,
        deleteProject,
        addSection,
        addTask,
        updateTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
